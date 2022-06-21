import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SubCommercial } from 'src/app/models/sub-commercial';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommercialService } from '../services/commercial.service';
@Component({
  selector: 'app-manage-sub-commercial',
  templateUrl: './manage-sub-commercial.component.html',
  styleUrls: ['./manage-sub-commercial.component.scss']
})
export class ManageSubCommercialComponent implements OnInit {

  user:User;
  id:number;
  subCommercialDialog: boolean;
  subCommercials: SubCommercial[];
  subCommercial: SubCommercial = new SubCommercial();
  selectedSubCommercials: SubCommercial[];
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


    async ngOnInit(){
    this.user = await this.tokenStorage.getUser();
    console.log('USEEEEERRR ====== ',this.user)
    console.log('USEEEEERRR 2 ====== ',await this.tokenStorage.getUser())
    this.loadSubCommercials()
  }

  loadSubCommercials(){
    this.commercialService.getSubCommercialList(this.user.id).subscribe(
      data=>{
        this.subCommercials = data;
        console.log(this.subCommercials)
        console.log(this.subCommercials)
      }
    )
  }


  openNew() {
    this.subCommercial = new SubCommercial();
    this.subCommercial.type = "subcommercial";
    this.submitted = false;
    this.subCommercialDialog = true;
  }


  deleteSelectedSubCommercials() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected Sub Commercials ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.commercialService.deleteSubCommercials(this.selectedSubCommercials).subscribe(
            data=>{
              this.subCommercials = this.subCommercials.filter(val => !this.selectedSubCommercials.includes(val));
              this.selectedSubCommercials = [];
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Sub Commercials Added Succefully', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Eroor', detail: 'Error deleting  Sub Commercials', life: 3000});
            }
          );
            
        }
    });
  }


  editSubCommercial(subCommercial: SubCommercial) {
    console.log('ahawaaa SUB COMMERCIAL',subCommercial);
    this.subCommercial = {...subCommercial};
    this.subCommercialDialog = true;
  }

  deleteSubCommercial(subCommercial: SubCommercial) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + subCommercial.nom + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.commercialService.deleteSubCommercialById(subCommercial.id).subscribe(
            data=>{
              this.subCommercials = this.subCommercials.filter(val => val.id !== subCommercial.id);
              this.subCommercial = new SubCommercial();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Sub Commercial updated successfully', life: 3000});
            },err=>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error Deleting Sub Commercial!', life: 3000});
            }
          )
        }
    });
  }

  hideDialog() {
    this.subCommercialDialog = false;
    this.submitted = false;
  }

  saveSubCommercial() {
    this.submitted = true;
    console.log(this.subCommercial);
    if (this.subCommercial.username.trim() && this.subCommercial.email.trim()) {
        if (this.subCommercial.id) {
          this.commercialService.updateSubCommercialById(this.subCommercial,this.subCommercial.id).subscribe(
            data=>{
              this.subCommercial = data;
              this.subCommercials[this.findIndexById(this.subCommercial.id)] = this.subCommercial;               
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }
          )
        }
        else {console.log("SSUUUUUBBB =======",this.user.id);
            this.commercialService.saveSubCommercial(this.subCommercial,this.currentFile,this.user.id).subscribe(
              data=>{
                console.log("SSUUUUUBBB =======",this.subCommercial);
                this.subCommercials.push(this.subCommercial);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
              },
              err=>{
                console.log(err)
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Une erreur est survenue!', life: 3000});
              }
            )
        }
        this.subCommercials = [...this.subCommercials];
        this.subCommercialDialog = false;
        this.subCommercial = new SubCommercial();
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.subCommercials.length; i++) {
        if (this.subCommercials[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  selectFile(event) {
    this.currentFile = event.target.files[0];
  }




}
