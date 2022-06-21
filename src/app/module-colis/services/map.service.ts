import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { tap, map, switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {}

  private initGeocoder() {

    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      return from(this.mapLoader.load())
      .pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Promise<any> {
    return this.waitForMapsToLoad().pipe(
      filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({'address': location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[0].geometry.location.lat(), 
                lng: results[0].geometry.location.lng()
              });
            } else {
                console.log('Error - ', results, ' & Status - ', status);
                observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        })        
      })
    ).toPromise()
  }
}
