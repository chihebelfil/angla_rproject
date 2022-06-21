import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Colis } from 'src/app/models/colis';
import { DeliveryMan } from 'src/app/models/delivery-man';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { LivreurService } from 'src/app/module-colis/services/livreur.service';

@Component({
  selector: 'app-select-colis-modal',
  templateUrl: './select-colis-modal.component.html',
  styleUrls: ['./select-colis-modal.component.scss']
})
export class SelectColisModalComponent implements OnInit {

  @Input() public colis:Colis;
  @Input() public test:number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public user:User;
  public deliveryMEN:DeliveryMan[] = [];
  public deliveryMan:DeliveryMan;

  constructor(public activeModal: NgbActiveModal, public modalService: NgbModal,
    private livreurService:LivreurService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    console.log(this.colis);
    console.log(this.test);
    this.user = this.tokenStorage.getUser();
    this.getDeliveryMENByFreightId(this.user.id);
  }

  public getDeliveryMENByFreightId(id:number){
    this.livreurService.getLivreurByFreightId(id).subscribe(data=>{
      this.deliveryMEN = data;
      console.log(this.deliveryMEN);
    },err=>{
      console.log(err);
    })
  }

  passBack() {
    this.passEntry.emit(this.colis);
    this.activeModal.close(this.colis);
  }

  selectedDeliveryMan(event){
    console.log(event.target.value)
  }

}
