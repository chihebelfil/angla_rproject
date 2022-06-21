import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DeliveryMan } from 'src/app/models/delivery-man';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  readonly colisApi = environment.colisApiUrl;
  readonly livreurApi = environment.livreurApiUrl;

  constructor(private http: HttpClient) { }

  public getLivreurByFreightId(id:number):Observable<DeliveryMan[]>{
    return this.http.get<DeliveryMan[]>(this.livreurApi + "/api/freight/getDeliveryManByFreightId?id="+id,httpOptions);
  }
}
