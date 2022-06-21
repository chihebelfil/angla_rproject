import { Component, OnInit } from '@angular/core';
import { Freight } from 'src/app/models/freight';
import { User } from 'src/app/models/user';
import { CarriersService } from '../services/carriers.service';
import { ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import csc from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-manage-freights',
  templateUrl: './manage-freights.component.html',
  styleUrls: ['./manage-freights.component.scss']
})
export class ManageFreightsComponent implements OnInit {

  user:User;
  id:number;
  freightDialog: boolean;
  freights: Freight[];
  freight: Freight = new Freight();
  selectedFreights: Freight[];
  submitted: boolean;
  countries:any[]=[];
  states:any[]=[];
  selectedCityCode: string;
  selectedState:string;

  currentFile: File;
  progress = 0;
  message = '';
  imageUrl = environment.serverImage;
  fileInfos: Observable<any>;


  constructor(private carriersService:CarriersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorage:TokenStorageService, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.user = await this.tokenStorage.getUser();
    this.loadFreights();
    this.countries = csc.getAllCountries();
  }

  loadFreights(){
    this.carriersService.getFreightsList(this.user.id).subscribe(
      data=>{
        this.freights = data;
        console.log(this.freights)
      }
    )
  }

  openNew() {
    this.freight = new Freight();
    this.freight.type = "freight";
    this.submitted = false;
    this.freightDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.carriersService.deleteFreights(this.selectedFreights).subscribe(
            data=>{
              this.freights = this.freights.filter(val => !this.selectedFreights.includes(val));
              this.selectedFreights = [];
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Eroor', detail: 'Error deleting  Freights', life: 3000});
            }
          );
        }
    });
  }

  editProduct(freight: Freight) {
    console.log(freight);
    this.freight = {...freight};
    this.freightDialog = true;
  }

  deleteProduct(freight: Freight) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + freight.administratorFirstName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.carriersService.deleteFreightById(freight.id).subscribe(
            data=>{
              this.freights = this.freights.filter(val => val.id !== freight.id);
              this.freight = new Freight();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Deleting Freight!', life: 3000});
            }
          )
        }
    });
  }

  hideDialog() {
    this.freightDialog = false;
    this.submitted = false;
  }

  saveFreight() {
    this.submitted = true;
    this.spinner.show();
    if (this.freight.companyName.trim() && this.freight.city.trim()) {
        if (this.freight.id) {
          this.carriersService.updateFreightById(this.freight,this.freight.id).subscribe(
            data=>{
              this.spinner.hide();
              this.freightDialog = false;
              this.freights[this.findIndexById(this.freight.id)] = this.freight;               
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Freight Updated', life: 3000});
            }
          )
        }
        else {
            this.carriersService.saveFreight(this.freight,this.currentFile,this.user.id).subscribe(
              data=>{
                this.spinner.hide();
                this.freights.push(data);
                this.freightDialog = false;
                this.freight = new Freight();
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Freight Created', life: 3000});
              },
              err=>{
                this.spinner.hide();
                this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message, life: 3000});
              }
            )
        }
        
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.freights.length; i++) {
        if (this.freights[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  selectFile(event) {
    this.currentFile = event.target.files[0];
  }

  onChangeCountry(newValue) {
    this.selectedCityCode = newValue.isoCode;
    this.freight.country = newValue.name;
    this.states = csc.getStatesOfCountry(this.selectedCityCode);
  }

  onChangeState(newValue){
    console.log(newValue);
    this.freight.city = newValue.name;
  }



}
