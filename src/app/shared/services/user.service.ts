import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  authApiUrl = environment.authApiUrl;

  constructor(private http: HttpClient) { }

  public getUserById(id:number):Promise<User>{
    return this.http.get<User>(this.authApiUrl+'/user?id='+id).toPromise();
  }
}
