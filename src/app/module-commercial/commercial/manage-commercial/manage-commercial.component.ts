import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Commercial } from 'src/app/models/commercial';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { CommercialService } from '../services/commercial.service';

@Component({
  selector: 'app-manage-commercial',
  templateUrl: './manage-commercial.component.html',
  styleUrls: ['./manage-commercial.component.scss']
})
export class ManageCommercialComponent implements OnInit {


  user:User;
  id:number;
  commercialDialog: boolean;
  commercials: Commercial[];
  commercial: Commercial = new Commercial();
  selectedCommercials: Commercial[];
  submitted: boolean;
  countries:any[]=[];
  states:any[]=[];
  selectedCityCode: string;
  selectedState:string;

  currentFile: File;
  progress = 0;
  message = '';
  //imageUrl = environment.serverImage;
  //fileInfos: Observable<any>;

  constructor(private commercialService:CommercialService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorage:TokenStorageService) { }

  async ngOnInit() {

    this.user = await this.tokenStorage.getUser();
    this.loadCommercials()
  }


  loadCommercials(){
    this.commercialService.getAll_Commercial().subscribe(
      data=>{
        this.commercials = data;
        console.log(this.commercials)
      }
    )
  }


  openNew() {
    this.commercial = new Commercial();
    this.commercial.type = "commercial";
    this.submitted = false;
    this.commercialDialog = true;
  }


  deleteSelectedCommercials() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected Commercials ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.commercialService.delete_Commercials(this.selectedCommercials).subscribe(
            data=>{
              this.commercials = this.commercials.filter(val => !this.selectedCommercials.includes(val));
              this.selectedCommercials = [];
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Commercials Deleted', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Eroor', detail: 'Error deleting Commercials', life: 3000});
            }
          );
            
        }
    });
  }



  editCommercial(commercial: Commercial) {
    console.log('ahawaaa  COMMERCIAL',commercial);
    this.commercial = {...commercial};
    this.commercialDialog = true;
  }


  deleteOneCommercial(commercial: Commercial) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + commercial.username + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.commercialService.deleteOne_Commercial(commercial.id).subscribe(
            data=>{
              this.commercials = this.commercials.filter(val => val.id !== commercial.id);
              this.commercial = new Commercial();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Commercial Deleted', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Deleting Commercial!', life: 3000});
            }
          )
        }
    });
  }


  hideDialog() {
    this.commercialDialog = false;
    this.submitted = false;
  }

  saveCommercial() {
    this.submitted = true;
    console.log(this.commercial);
    if (this.commercial.username.trim() && this.commercial.email.trim()) {
        if (this.commercial.id) {
          this.commercialService.update_Commercial(this.commercial).subscribe(
            data=>{
              this.commercial = data;
              this.commercials[this.findIndexById(this.commercial.id)] = this.commercial;               
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }
          )
        }
        else {console.log("SSUUUUUBBB =======",this.user.id);
            this.commercialService.add_Commercial(this.commercial).subscribe(
              data=>{
                console.log("SSUUUUUBBB =======",this.commercial);
                this.commercials.push(this.commercial);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
              },
              err=>{
                console.log(err)
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Une erreur est survenue!', life: 3000});
              }
            )
        }
        this.commercials = [...this.commercials];
        this.commercialDialog = false;
        this.commercial = new Commercial();
    }
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.commercials.length; i++) {
        if (this.commercials[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }




}
