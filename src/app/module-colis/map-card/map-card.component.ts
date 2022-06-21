import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { Location } from "../../models/location";
import { Colis } from 'src/app/models/colis';


// the will keep typescript from throwing errors w.r.t the google object
declare var google: any;

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit {
  @Input() colis: Colis;
  public showDirection: boolean = true;
  public zoom = 1;
  public markers: Location[] = [];
  public originLocation: Location = null;
  public destinationLocation: Location = null;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.addressToCoordinates();
  }

  addressToCoordinates() {
    this.mapService.geocodeAddress(this.colis.commercialProvider.city + ',' + this.colis.commercialProvider.country+","+this.colis.commercialProvider.companyAddress)
      .then((location: Location) => {
        this.originLocation = location;
        this.originLocation.label = "A";
        this.originLocation.address = this.colis.commercialProvider.country + ',' + this.colis.commercialProvider.city +","+this.colis.commercialProvider.companyAddress;
        this.originLocation.commercialProvider = this.colis.commercialProvider;
        this.markers.push(this.originLocation);
        this.mapService.geocodeAddress(this.colis.countryDestinataire + ',' + this.colis.stateDestinataire)
          .then((location: Location) => {
            this.destinationLocation = location;
            this.destinationLocation.label = "B";
            this.destinationLocation.address = this.colis.countryDestinataire + ',' + this.colis.stateDestinataire;
            this.markers.push(this.destinationLocation);
            console.log("markers = ", this.markers);
          })
      }
      );
  }



}
