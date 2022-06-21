import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Colis } from 'src/app/models/colis';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { ColisService } from '../services/colis.service';
import csc from 'country-state-city';
import { ESize } from '../../models/enums/esize.enum';
import { EDeliveryType } from 'src/app/models/enums/edelivery-type.enum';


export enum SizeEtat {
  XS='XS',
  S='S',
  M='M',
  L='L',
  XL='XL',
  XXL='XXL'
}

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.scss']
})

export class AddColisComponent implements OnInit {

/*   modesLabels = [                        // <-- you still need the array
    EStateColis.ENREGISTRER, 
    EStateColis.LIVRER, 
    EStateColis.INTROUVABLE,
    EStateColis.NON_LIVRER,
    EStateColis.A_RECUPER,
    EStateColis.EN_TRANSIT,
    EStateColis.RETOUR_EXPEDITEUR 
  ]; */

  user:User;
  id:number;
  colisDialog: boolean;
  colises: Colis[]=[];
  colis: Colis = new Colis();
  selectedColises: Colis[];
  submitted: boolean;
  countries:any[]=[];
  states:any[]=[];
  selectedCityCode: string;
  selectedState:string;
  size:ESize;
  deliveryType:EDeliveryType;

  currentFile: File[]
  progress = 0;
  message = '';
  public imageUrl= environment.serverImage;
  
  fileInfos: Observable<any>;
  public sizes= [
    {label:"fas fa-fw fa-glasses",value:ESize.XS},
    {label:"fas fa-fw fa-book",value:ESize.S},
    {label:"fas fa-fw fa-desktop",value:ESize.M},
    {label:"fas fa-fw fa-guitar",value:ESize.L},
    {label:"fas fa-fw fa-couch",value:ESize.XL},
    {label:"fas fa-fw fa-warehouse",value:ESize.XXL}
  ];

  public deliveryTypes = [
    {label:"Livraison super urgente",value:EDeliveryType.SUPER_RUSH},
    {label:"Livraison urgente",value:EDeliveryType.RUSH},
    {label:"Livraison le jour même",value:EDeliveryType.SAME_DAY},
    {label:"Livraison le lendemain",value:EDeliveryType.NEXT_DAY},
    {label:"Livraison standard",value:EDeliveryType.STANDARD}
  ]


  public fileTypes = Object.keys(SizeEtat).map(key => SizeEtat[key]);
  sizeEtat = SizeEtat ;

  options : string[];

 modes =[];
 primaryMode: any;

  constructor(private colisService: ColisService,private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorage:TokenStorageService) {
    }

  async ngOnInit(){
    this.user = await this.tokenStorage.getUser();
    this.countries = csc.getAllCountries();
    this.loadColis();
  }

  loadColis(){
    this.colisService.getColisList(this.user.id).subscribe(
      data=>{
        this.colises = data;
        console.log(this.colises)
      }
    )
  }


  openNew() {
    this.colis = new Colis();
    this.submitted = false;
    this.colisDialog = true;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.colises.length; i++) {
        if (this.colises[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  }

  selectFile(event) {
    this.currentFile = event.target.files;
  }


  hideDialog() {
    this.colisDialog = false;
    this.submitted = false;
  }

  onChangeCountry(newValue) {
    this.selectedCityCode = newValue.isoCode;
    this.colis.countryDestinataire = newValue.name;
    this.states = csc.getStatesOfCountry(this.selectedCityCode);
  }

  onChangeState(newValue){
    console.log(newValue);
    this.colis.stateDestinataire = newValue.name;
  }

  onChangeEtat(event){
    console.log('eataat 1 ==',);
   
    //this.colis.etat;
   //this.etatsList = this.etats.forEach(element => this.etatsList.push());
    //this.colis.etat = newValue.name;
   
    //console.log('eataat 3 ==', this.colis.etat);
  }

  primaryModeChangeHandler(event) {
    console.log("You Selected: ",this.primaryMode); 
     
  }


  saveColis() {
    this.submitted = true;
    console.log("eaataaa ====",this.colis);
    if (this.colis.nomDestinataire.trim() && this.colis.prenomDestinataire.trim()) {
        if (this.colis.id) {
          this.colisService.update_Colis(this.colis,this.colis.id).subscribe(
            data=>{
              this.colis = data;
              this.colises[this.findIndexById(this.colis.id)] = this.colis;               
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Colis Updated', life: 3000});
            }
          )
        }
        else {
          this.colis.size = this.size;
          console.log(this.colis);
            this.colisService.saveColis(this.colis,this.currentFile,this.user.id).subscribe(
              data=>{
                this.colises.push(this.colis);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Colis Created', life: 3000});
                //console.log("COLIIIISSS 1 ===",this.colis.etat);
                console.log("COLIIIISSS 2 ===",this.colis.nomDestinataire);
                this.colises = [...this.colises];
                this.colisDialog = false;
                this.colis = new Colis();
              },
              err=>{
                console.log(err)
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Une erreur est survenue!', life: 3000});
              }
            )
        }
        
    }
  }



  editColis(colis: Colis) {
    console.log(colis);
    this.colis = {...colis};
    this.colisDialog = true;
  }

  deleteColis(){}


  deleteOneColis(colis: Colis) {
    console.log('aaaaaaaaaaaaaaaa')
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete Colis Num : ' + colis.id + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.colisService.deleteOne_Colis(colis.id).subscribe(
            data=>{
              this.colises = this.colises.filter(val => val.id !== colis.id);
              this.colis = new Colis();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Colis Added', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Deleting Colis!', life: 3000});
            }
          )
        }
    });
  }

  public selectedSize(event){
    this.size = event.value.value;
    this.colis.size = this.size;
  }

  public selectedDeliveryType(event){
    this.deliveryType = event.value.value;
    this.colis.deliveryType = this.deliveryType;
    console.log("colis type",this.colis)
  }






}
