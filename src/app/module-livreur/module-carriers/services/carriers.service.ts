import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Freight } from '../../../models/freight';
import { Pageable } from '../../../models/pageable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarriersService {

  readonly livreurApiUrl = environment.livreurApiUrl;

  constructor(private http: HttpClient) { }

  public getFreightsList(id:number):Observable<Freight[]>{
    return this.http.get<Freight[]>(this.livreurApiUrl+'/api/carriers/getFreightsByCarriersId?id='+id);
  }

  public saveFreight(freight:Freight,image:File,id:number):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('freight',JSON.stringify(freight));
    formData.append('image',image);
    formData.append('id',id.toString());
    return this.http.post<any>(this.livreurApiUrl+'/api/carriers/add-freight',formData);
  }

  public updateFreightById(freight: Freight, id:number):Observable<Freight>{
    return this.http.put<Freight>(this.livreurApiUrl+'/api/carriers/update-freight?id='+id,freight,httpOptions)
  }

  public deleteFreights(freights:Freight[]):Observable<any>{
    return this.http.post<any>(this.livreurApiUrl+'/api/carriers/delete-freight',freights,httpOptions);
  }

  public deleteFreightById(id:number):Observable<any>{
    return this.http.delete<any>(this.livreurApiUrl+'/api/carriers/delete-freight-id/'+id,httpOptions);
  }


}
