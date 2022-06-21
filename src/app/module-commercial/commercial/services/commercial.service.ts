import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commercial } from 'src/app/models/commercial';
import { SubCommercial } from 'src/app/models/sub-commercial';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommercialService {


  constructor(private Http: HttpClient) { }


  readonly host = 'http://localhost:8095/commercial';

  //observable =type comme list
  public add_Commercial(objet: Commercial): Observable<Commercial> {

    return this.Http.post<Commercial>(this.host + "/add", objet);
  }

  public getAll_Commercial() {
    return this.Http.get<Commercial[]>(this.host + "/getAll")
  }

  public deleteOne_Commercial(id_SuperVendeur: Number) {
    return this.Http.delete(this.host + "/deleteOne/" + id_SuperVendeur)
  }

  public getOne_Commercial(id: number) {
    return this.Http.get<Commercial>(this.host + "/getOne/" + id);
  }

  public update_Commercial(objet: Commercial) {
    return this.Http.put<Commercial>(this.host + '/update/', objet);
  }

  public delete_Commercials(commercial:Commercial[]):Observable<any>{
    return this.Http.post<any>(this.host+'/deleteAll',commercial);
  }
  /*------------------------------------------------------------------------------------------------------------------*/ 

  public getSubCommercialList(id:number):Observable<SubCommercial[]>{
    return this.Http.get<SubCommercial[]>(this.host+'/getSubCommercialsByCommercialsId?id='+id);
  }


  public saveSubCommercial(subCommercial:SubCommercial,image:File,id:number):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('subCommercial',JSON.stringify(subCommercial));
    formData.append('image',image);
    formData.append('id',id.toString());
    return this.Http.post<any>(this.host+'/AddSubCommercial?id=',formData);
  }

  


  public updateSubCommercialById(subCommercial: SubCommercial, id:number):Observable<SubCommercial>{
    return this.Http.put<SubCommercial>(this.host+'/updateSubCommercial?id='+id,subCommercial)
  }

  public deleteSubCommercials(subCommercials:SubCommercial[]):Observable<any>{
    return this.Http.post<any>(this.host+'/deleteSubCommercial',subCommercials,httpOptions);
  }

  public deleteSubCommercialById(id:number):Observable<any>{
    return this.Http.delete<any>(this.host+'/deleteSubCommercial/'+id,httpOptions);
  }

}
