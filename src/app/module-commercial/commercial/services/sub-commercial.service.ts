import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCommercial } from 'src/app/models/sub-commercial';

@Injectable({
  providedIn: 'root'
})
export class SubCommercialService {

  constructor(private Http: HttpClient) { }


  readonly host = 'http://localhost:8090/subCommercial';

  //observable =type comme list
  public add_SubCommercial(objet: SubCommercial): Promise<SubCommercial> {

    return this.Http.post<SubCommercial>(this.host + "/add", objet).toPromise();
  }

  public getAll_SubCommercial(): Observable<SubCommercial[]> {
    return this.Http.get<SubCommercial[]>(this.host + "/getAll");
  }

  public deleteOne_SubCommercial(id: number): Promise<any> {
    return this.Http.delete(this.host + "/deleteOne/" + id).toPromise();
  }

  public getOne_SubCommercial(id: number): Promise<SubCommercial> {
    return this.Http.get<SubCommercial>(this.host + "/getOne/" + id).toPromise();
  }

  public update_SubCommercial(objet: SubCommercial): Promise<SubCommercial> {
    return this.Http.put<SubCommercial>(this.host + '/update/', objet).toPromise();
  }

  public getAllPages(params): Observable<any> {
    return this.Http.get(this.host + "/pages", { params });
  }
}
