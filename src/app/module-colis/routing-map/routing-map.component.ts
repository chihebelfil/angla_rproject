import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MapService } from '../services/map.service';
import { Location } from "../../models/location";
import { RoutingVRP } from 'src/app/models/optimization/routing-vrp';

@Component({
  selector: 'app-routing-map',
  templateUrl: './routing-map.component.html',
  styleUrls: ['./routing-map.component.scss']
})
export class RoutingMapComponent implements OnInit, OnChanges {

  @Input() routes: RoutingVRP[];
  @Input() origin: any;
  @Input() destinations: any;
  showDirection: boolean = true;
  public zoom = 1;
  public originLocation: Location = null;
  public destinationLocation: Location = null;
  public markers: Location[] = [];
  public allMarkers: any[] = [];
  colors = ["#21409a", "#04adff", "#e48873", "#f16623", "#f44546", "#03a8a0", "#039c4b", "#66d313", "#fedf17", "#ff0984"];
  public svgMarker = {
    path: "M-5,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",
    fillColor: "red",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  };

  @Output() sendAllMarkers = new EventEmitter<any[]>();

  constructor(private mapService: MapService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.routes) {
      this.calculateMarkers();
    }
  }

  async calculateMarkers() {
    let location = await this.getLatLng(this.origin);
    this.originLocation = location;
    this.originLocation.label = "A";
    this.originLocation.address = this.origin;
    this.markers=[];
    this.allMarkers=[];
    this.markers.push(this.originLocation);
    this.allMarkers.push(this.markers);
    for (var i = 0; i < this.routes.length; i++) {
      this.markers = [];
      let label: string = "A";
      let k = i;
      if (this.routes[i].routes.length > 2) {
        this.routes[i].routes.shift();
        this.routes[i].routes.pop();
        for await (const route of (this.routes[i].routes).map(async (address,i) => {
          let location = await this.getLatLng(address.location);
          this.originLocation = location;
          this.originLocation.label = String.fromCharCode(label.charCodeAt(0) + (i+1));
          this.originLocation.address = address.location;
          this.svgMarker.fillColor = this.colors[k];
          this.originLocation.iconUrl = this.svgMarker;
          this.markers[i]=(this.originLocation);
        }));
        this.allMarkers.push(this.markers);
      }
    }
    this.sendMarkers(this.allMarkers);
  }

  sendMarkers(value: any[]) {
    this.sendAllMarkers.emit(value);
  } 

  async getLatLng(address: string) {
    return this.mapService.geocodeAddress(address);
  }
}
