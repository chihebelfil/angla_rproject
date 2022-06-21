import { GoogleMapsAPIWrapper } from '@agm/core';
import { AfterViewInit, Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from "../../models/location";

export interface ILatLng {
  latitude: number;
  longitude: number;
}

// the will keep typescript from throwing errors w.r.t the google object
declare var google: any;

@Directive({
  selector: '[appDirectionsMap]'
})
export class DirectionsMapDirective  implements OnInit, OnChanges, AfterViewInit{
  @Input() origin: string;
  @Input() destination: string;
  @Input() showDirection: boolean;
  originLocation: Location;
  destinationLocation:Location;

  // We'll keep a single google maps directions renderer instance so we get to reuse it.
  // using a new renderer instance every time will leave the previous one still active and visible on the page
  private directionsRenderer: any;

  // We inject AGM's google maps api wrapper that handles the communication with the Google Maps Javascript
  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.drawDirectionsRoute();
  }

  ngAfterViewInit(){
    //this.showLocation();
  }

  drawDirectionsRoute() {
    console.log("HELLO DIRECTIVE")
    this.gmapsApi.getNativeMap().then(map => {
        if (!this.directionsRenderer) {
          // if you already have a marker at the coordinate location on the map, use suppressMarkers option
          // suppressMarkers prevents google maps from automatically adding a marker for you
          this.directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
        }
        const directionsRenderer = this.directionsRenderer;

        if ( this.showDirection && this.destination ) {
            const directionsService = new google.maps.DirectionsService;
            directionsRenderer.setMap(map);
            console.log("Directive destination= ",this.destination)
            directionsService.route({
                origin: this.origin,
                destination: this.destination,
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING',
                provideRouteAlternatives: true,
            }, (response, status) => {
              
                if (status === 'OK') {
                  console.log(status)
                    directionsRenderer.setDirections(response);
                    // If you'll like to display an info window along the route
                    // middleStep is used to estimate the midpoint on the route where the info window will appear
                    const middleStep = (response.routes[0].legs[0].steps.length / 2).toFixed();
                    const infowindow2 = new google.maps.InfoWindow();
                    infowindow2.setContent(`${response.routes[0].legs[0].distance.text} <br> ${response.routes[0].legs[0].duration.text}  `);
                    infowindow2.setPosition(response.routes[0].legs[0].steps[middleStep].end_location);
                    infowindow2.open(map);
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        }

      });
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.destination || changes.showDirection) {
          if (changes.showDirection && !changes.showDirection.currentValue) {
              if (this.directionsRenderer !== undefined) {
                  this.directionsRenderer.setDirections({routes: []});
                  return;
              }
          } else {
            console.log("else")
            this.drawDirectionsRoute();
          }
      }
  }

}
