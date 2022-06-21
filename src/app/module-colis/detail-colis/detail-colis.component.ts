import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colis } from 'src/app/models/colis';
import { ColisService } from '../services/colis.service';
import { MapService } from '../services/map.service';
import { Location } from '../../models/location';
import { environment } from 'src/environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectColisModalComponent } from '../components/modals/select-colis-modal/select-colis-modal.component';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { User } from 'src/app/models/user';
declare var google: any;

@Component({
  selector: 'app-detail-colis',
  templateUrl: './detail-colis.component.html',
  styleUrls: ['./detail-colis.component.scss']
})
export class DetailColisComponent implements OnInit {

  public id:number;
  public colis:Colis;
  public showDirection: boolean = true;
  public zoom = 14;
  public markers: Location[] = [];
  public origin: Location = null;
  public destination: Location = null;
  public showMap:boolean = false;
  public imageUrl = environment.serverImage;
  public closeResult:string;
  public user:User;


  constructor(private router:ActivatedRoute, private colisService:ColisService,
    private mapService: MapService, public modalService: NgbModal,
    private tokenStorage:TokenStorageService) { }

  async ngOnInit() {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.getColisById(this.id);
  }

  public getColisById(id:number){
    this.colisService.getColisById(id).subscribe(data=>{
      this.colis = data;
      this.addressToCoordinates();
      this.user = this.tokenStorage.getUser();
    });
  }

  addressToCoordinates() {
    this.mapService.geocodeAddress(this.colis.commercialProvider.city + ',' + this.colis.commercialProvider.country+","+this.colis.commercialProvider.companyAddress)
      .then((location: Location) => {
        
        this.origin = location;
        this.origin.label = "A";
        this.origin.address = this.colis.commercialProvider.country + ',' + this.colis.commercialProvider.city +","+this.colis.commercialProvider.companyAddress;
        this.origin.commercialProvider = this.colis.commercialProvider;
        this.markers.push(this.origin);
        this.mapService.geocodeAddress(this.colis.countryDestinataire + ',' + this.colis.stateDestinataire)
          .then((location: Location) => {
            this.destination = location;
            this.destination.label = "B";
            this.destination.address = this.colis.countryDestinataire + ',' + this.colis.stateDestinataire;
            this.markers.push(this.destination);
            this.showMap = true;
            console.log("showMap",this.showMap)
            console.log("markers = ", this.markers);
          })
      }
      );
  }

  openModal() {
    const modalRef = this.modalService.open(SelectColisModalComponent);
    modalRef.componentInstance.colis = this.colis;
    modalRef.result.then((result) => {
      console.log(result);
      this.updateColis();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public updateColis(){
    this.colisService.updateSelectedColis(this.colis.id,this.colis.deliveryMan.id,this.user.id)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
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
