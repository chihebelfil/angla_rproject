import { GoogleMapsAPIWrapper } from '@agm/core';
import { AfterViewInit, Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RoutingVRP } from 'src/app/models/optimization/routing-vrp';
import { Location } from "../../models/location";

export interface ILatLng {
  latitude: number;
  longitude: number;
}

// the will keep typescript from throwing errors w.r.t the google object
declare var google: any;

@Directive({
  selector: '[appOptimizedRoutes]'
})
export class OptimizedRoutesDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() routes: RoutingVRP[];
  @Input() origin: any;
  @Input() destinations: any;
  @Input() showDirection: boolean;
  originLocation: Location;
  destinationLocation: Location;
  public directionRenderers:any[]=[];

  private directionsRenderer: any;


  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    //this.drawDirectionsRoute();
  }

  ngAfterViewInit() {
    this.drawDirectionsRoute();
  }

  colors = ["#21409a", "#04adff", "#e48873", "#f16623", "#f44546", "#03a8a0", "#039c4b", "#66d313", "#fedf17", "#ff0984"];


  async drawDirectionsRoute() {
    this.gmapsApi.getNativeMap().then(map => {
      if (!this.directionsRenderer) {
        // if you already have a marker at the coordinate location on the map, use suppressMarkers option
        // suppressMarkers prevents google maps from automatically adding a marker for you
        this.directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      }else{
        this.directionRenderers.forEach(async d=>{
          await d.setDirections({ routes: [] });
        }) 
      }

      let i = 0;
      this.routes.forEach(r => {
        this.directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: {
          strokeColor: this.colors[i], strokeOpacity: 0.5, strokeWeight: 7
        }});
        i++;
        this.directionRenderers.push(this.directionsRenderer);
        const directionsRenderer = this.directionsRenderer;
        if (this.showDirection && r.routes) {
          const directionsService = new google.maps.DirectionsService;
          directionsRenderer.setMap(map);
          directionsService.route({
            origin: this.origin,
            destination: this.origin,
            waypoints: r.routes,
            optimizeWaypoints: false,
            travelMode: 'DRIVING',
            provideRouteAlternatives: false,
          }, (response, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(response);
            } else {
              console.log('Directions request failed due to ' + status);
            }
          });
        }
      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.destinations || changes.showDirection || changes.routes) {
      if (this.directionsRenderer !== undefined) {
        this.directionsRenderer.setDirections({ routes: [] });
        this.drawDirectionsRoute();
      }
    } else {
      
    }
  }



}
