import { Component, Input, OnInit } from '@angular/core';
import { EStateColis } from 'src/app/models/enums/estate-colis.enum';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { ColisService } from 'src/app/module-colis/services/colis.service';
import { FreightService } from '../../services/freight.service';

@Component({
  selector: 'app-number-colis-by-state',
  templateUrl: './number-colis-by-state.component.html',
  styleUrls: ['./number-colis-by-state.component.scss']
})
export class NumberColisByStateComponent implements OnInit {

  @Input() estateColis:EStateColis;
  @Input() estate:string;
  public total:number;
  public user:User;

  constructor(private freightService: FreightService,private tokenStorage:TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.tokenStorage.getUser();
    this.total = await this.countColisByDeliveryProviderIdAndEtat(this.user.id,this.estateColis);
    console.log(this.estateColis,"=",this.total)
  }

  public async countColisByDeliveryProviderIdAndEtat(id:number,eStateColis:EStateColis){
    return this.freightService.countColisByDeliveryProviderIdAndEtat(id,eStateColis);
  }

  

}
