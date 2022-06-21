import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryMan } from 'src/app/models/delivery-man';
import { EStateColis } from 'src/app/models/enums/estate-colis.enum';
import { GetColisByStateDestinataire } from 'src/app/models/statistics/get-colis-by-state-destinataire';
import { environment } from 'src/environments/environment';
import { CountColisByDeliveryProviderIdAndGroupByDeliveryMan } from 'src/app/models/statistics/count-colis-by-delivery-provider-id-and-group-by-delivery-man';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FreightService {

  readonly livreurApiUrl = environment.livreurApiUrl;
  readonly apiColis = environment.colisApiUrl;
  constructor(private http:HttpClient) { }

  async getDeliveryMen():Promise<DeliveryMan[]>{
    return this.http.get<DeliveryMan[]>(this.livreurApiUrl+"/api/freight/get-deliverymen",httpOptions).toPromise();
  }

  async getDeliveryMenByFreightId(id:number):Promise<DeliveryMan[]>{
    return this.http.get<DeliveryMan[]>(this.livreurApiUrl+'/api/freight/getDeliveryManByFreightId?id='+id).toPromise();
  }

  public addDeliverMan(deliveryMan:DeliveryMan,image:File,id:number):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('deliveryMan',JSON.stringify(deliveryMan));
    formData.append('image',image);
    formData.append('id',id.toString());
    return this.http.post<any>(this.livreurApiUrl+'/api/freight/add-deliveryman',formData);
  }

  public updateDeliveryMan(deliveryMan:DeliveryMan,image:File):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('deliveryMan',JSON.stringify(deliveryMan));
    formData.append('image',image);
    return this.http.put<any>(this.livreurApiUrl+"/api/freight/update-deliveryman",formData);
  }

  public countColisByDeliveryProviderIdAndEtat(id:number,eStateColis:EStateColis):Promise<number>{
    return this.http.get<number>(this.apiColis+"/api/colis/count/"+id+"/"+eStateColis).toPromise();
  }

  public findColisByStateDestinataireAndGroupByStateDestinataire(id:number):Promise<GetColisByStateDestinataire[]>{
    return this.http.get<GetColisByStateDestinataire[]>(this.apiColis+"/api/colis/group-by/state-destinataire/"+id).toPromise();
  }

  public countColisGroupByDeliveryMan(id:number):Promise<CountColisByDeliveryProviderIdAndGroupByDeliveryMan[]>{
    return this.http.get<CountColisByDeliveryProviderIdAndGroupByDeliveryMan[]>(this.apiColis+"/api/colis/group-by/delivery-man/"+id).toPromise();
  }
}
