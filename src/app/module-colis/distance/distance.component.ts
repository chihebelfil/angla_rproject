import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColisService } from '../services/colis.service';
import { DataModel } from '../../models/data-model';
declare var google: any;
import { RoutingVRP } from '../../models/optimization/routing-vrp';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { FreightService } from 'src/app/module-livreur/module-freights/services/freight.service';
import { DeliveryMan } from 'src/app/models/delivery-man';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colis } from 'src/app/models/colis';
import { MessageService } from 'primeng/api';
import { DeliveryManRoute } from '../../models/delivery-man-route';
import {PrimeIcons} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailColisComponent } from '../detail-colis/detail-colis.component';
import { MapCardComponent } from '../map-card/map-card.component';

interface EtatColis {
  name: string;
  code: string;
}

interface OptimizationType {
  type: string;
  code: string;
}

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss']
})
export class DistanceComponent implements OnInit {

  public user: User;
  public deliveryMEN: DeliveryMan[] = [];
  public routes: RoutingVRP[] = [];
  public displayMap: boolean = false;

  public dataModel: DataModel = new DataModel();
  origin = "Tunisia Governorate"
  public destinations: string[] = [];

  public optimizationForm: FormGroup;
  public etatsColis: EtatColis[];
  public listColis: Colis[] = [];
  public optimizationTypes: OptimizationType[];
  public optimizationType: string;
  public showLoadingView: boolean = false;
  events: any[];
  colors = ["#21409a", "#04adff", "#e48873", "#f16623", "#f44546", "#03a8a0", "#039c4b", "#66d313", "#fedf17", "#ff0984"];


  constructor(private colisService: ColisService, private tokenStorage: TokenStorageService,
    private freightService: FreightService, private fb: FormBuilder, private messageService: MessageService,
    private spinner: NgxSpinnerService, public modalService: NgbModal) {
    this.etatsColis = [
      { name: 'A RECUPERER', code: 'A_RECUPERER' },
      { name: 'ENREGISTRER', code: 'ENREGISTRER' },
      { name: 'A LIVRER', code: 'A_LIVRER' },
    ]
    this.optimizationTypes = [
      { type: 'WIN TIME', code: 'TIME' },
      { type: 'WIN DISTANCE', code: 'DISTANCE' }
    ]
  }

  setupOptimizationForm() {
    this.optimizationForm = this.fb.group({
      'selectOptimizationType': [null, Validators.required],
      'selectedDeliveryMEN': [null, Validators.required],
      'selectedColisState': [null, Validators.required],
      'selectedColis': [null, Validators.required],
    });
  }

  get selectOptimizationType() {
    return this.optimizationForm.get("selectOptimizationType");
  }

  get selectedDeliveryMEN() {
    return this.optimizationForm.get("selectedDeliveryMEN");
  }

  get selectedColisState() {
    return this.optimizationForm.get("selectedColisState");
  }

  get selectedColis() {
    return this.optimizationForm.get("selectedColis");
  }

  public errorMessages = {
    selectOptimizationType: [
      { type: "required", message: "Optimization type is required" },
    ],
    selectedDeliveryMEN: [
      { type: "required", message: "Delivery Man is required" },
    ],
    selectedColisState: [
      { type: "required", message: "Etat colis is required" },
    ],
    selectedColis: [
      { type: "required", message: "Colis is required" },
    ],
  }

  async ngOnInit() {
    this.setupOptimizationForm();
    this.user = this.tokenStorage.getUser();

    this.dataModel.origin = 'Tunisia Governorate';
    this.dataModel.destinations = this.destinations;
    await this.loadData();

    this.events = [
      {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
      {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
      {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
      {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
  ];

  }

  public async loadData() {
    this.showLoadingView = true;
    this.deliveryMEN = await this.getDeliveryManByFreightID();
    this.showLoadingView = false;
  }

  public getDeliveryManByFreightID() {
    return this.freightService.getDeliveryMenByFreightId(this.user.id);
  }

  async createDestinations() {
    let selectedParcels: Colis[];
    selectedParcels = this.selectedColis.value;
    this.destinations = [];
    this.destinations.push('Tunisia Governorate')
    let colis:Colis = new Colis();
    colis.id = 0;
    this.dataModel.colis = [];
    this.dataModel.colis.push(colis);
    this.dataModel.colis = this.dataModel.colis.concat(selectedParcels);
    for await (const colis of selectedParcels) {
      this.destinations.push(colis.countryDestinataire + ', ' + colis.stateDestinataire);
    }
    this.dataModel.destinations = this.destinations;
  }

  public async onSubmit() {
    this.spinner.show();
    if (!this.optimizationForm.valid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Please validate the filter form', life: 3000 });
      return;
    }
    this.spinner.show();
    this.dataModel.vehicleNumber = this.selectedDeliveryMEN.value.length;
    await this.createDestinations();
    this.getDistance();
  }

  public getDistanceMatrix(matrix) {
    this.dataModel.depot = 0;
    this.colisService.calculateDistanceMatrix(this.dataModel).subscribe(data => {
      this.routes = data;
      console.log("ROUTES FROM API=",this.routes);
    }, err => {
      console.log(err);
    })
  }

  public getDistance() {
    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      matrix.getDistanceMatrix({
        origins: this.destinations,
        destinations: this.destinations,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      }, (response, status) => {
        if (status === 'OK') {
          var origins = response.originAddresses;
          this.createMatrix1(origins, response);
        } else {
          reject(response);
        }
      });
    });
  }

  public createMatrix1(origins, response) {
    var matrix = new Array(origins.length);
    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      matrix[i] = new Array(origins.length);
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        if (this.optimizationType === "DISTANCE") {
          matrix[i][j] = element.distance.value
        } else {
          matrix[i][j] = element.duration.value
        }
      }
    }
    this.dataModel.distanceMatrix = matrix;
    this.getDistanceMatrix(matrix)
  }

  public async onChange(event) {
    this.listColis = await this.colisService.findColisByCommercialProviderIdAndEtat(this.user.id, event.value);
  }

  public onChangeOptimization(event) {
    this.optimizationType = event.value;
  }

  async recieveMarkers(newItem: any[]) {
    if(newItem.length>1){
      this.spinner.hide();
    }
  }

  public showDetail(colis:Colis){
    this.openModal(colis);
  }

  openModal(colis:Colis) {
    const modalRef = this.modalService.open(MapCardComponent);
    modalRef.componentInstance.colis = colis;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
