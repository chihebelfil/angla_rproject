import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {Colis} from 'src/app/models/colis';
import { EStateColis } from 'src/app/models/enums/estate-colis.enum';
import { GetColisByStateDestinataire } from 'src/app/models/statistics/get-colis-by-state-destinataire';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ColisService {

  constructor(private Http: HttpClient) { }

  readonly host = 'http://localhost:8081/api/commercial';

  readonly apiColis = environment.colisApiUrl;

  public getColisList(id:number):Observable<Colis[]>{
    return this.Http.get<Colis[]>(this.host+'/getColisByCommercial?id='+id);
  }


  public saveColis(colis: Colis,files:File[],id:number):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('colis',JSON.stringify(colis));
    console.log('File NUMBER = ',files.length);
    for(let i=0;i<files.length;i++){
      console.log("appending");
      formData.append('files',files[i]);
    }
    formData.append('id',id.toString());
    return this.Http.post<any>(this.host+'/add-colis',formData);
  }

  public update_Colis(colis: Colis, id:number):Observable<Colis>{
    return this.Http.put<Colis>(this.host+'/update-colis?id='+id,colis,httpOptions)
  }


  public deleteOne_Colis(id_colis: Number) {
    return this.Http.delete(this.apiColis + "/api/colis/deleteOne/" + id_colis)
  }

  async getColisToCollect():Promise<Colis[]>{
    return this.Http.get<Colis[]>(this.apiColis+"/api/delivery/get-colis/toCollect").toPromise();
  }

  public getColisById(id:number):Observable<Colis>{
    return this.Http.get<Colis>(this.apiColis+"/api/colis/get-colis/"+id,httpOptions);
  }

  public updateSelectedColis(idColis:number,idDeliveryMan:number,idDeliveryProvider:number):Observable<Colis>{
    return this.Http.put<Colis>(this.apiColis+
      "/api/delivery/update-selected-colis/"+idColis+"/"+idDeliveryMan+"/"+idDeliveryProvider,httpOptions);
  }

  public calculateDistanceMatrix(distanceMatrix):Observable<any>{
    return this.Http.post<any>(this.apiColis+"/api/colis/distance-matrix",distanceMatrix);
  }

  public findColisByCommercialProviderIdAndEtat(id:number,etat:string):Promise<Colis[]>{
    return this.Http.get<Colis[]>(this.apiColis+"/api/delivery/get-colis/"+id+"/"+etat).toPromise();
  }


}
