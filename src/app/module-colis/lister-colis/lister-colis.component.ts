import { Component, OnInit, Output } from '@angular/core';
import { Colis } from 'src/app/models/colis';
import { environment } from 'src/environments/environment';
import { DirectionsMapDirective } from '../directives/directions-map.directive';
import { ColisService } from '../services/colis.service';
import { Location } from '../../models/location';
@Component({
  selector: 'app-lister-colis',
  templateUrl: './lister-colis.component.html',
  styleUrls: ['./lister-colis.component.scss']
})
export class ListerColisComponent implements OnInit {

  public listColis:Colis [] = [];
  public imageUrl = environment.serverImage;

  constructor(private colisService:ColisService) { }

  async ngOnInit() {
    this.listColis = await this.getColisToCollect();
    console.log(this.listColis)
  }

  async getColisToCollect(){
    return this.colisService.getColisToCollect();
  }



}
