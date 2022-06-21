import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.authApiUrl+'/api/auth/';
const AUTH_API_Commercial = 'http://localhost:8082/auth/commercial/';
const AUTH_API_Sub_Commercial = 'http://localhost:8090/auth/subCommercial/';
const Signin = 'http://localhost:8090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly host = environment.authApiUrl+'/auth/commercial/';

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    console.log(credentials);
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  getProfile(id:number):Observable<any>{
    return this.http.get<any>(AUTH_API+'profile/'+id,httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user, httpOptions);
  }

  registerCarriers(user,image:File): Observable<any> {
    const formData = new FormData();
    formData.append('carriers',JSON.stringify(user))
    formData.append('image',image);
    return this.http.post(AUTH_API + 'carriers/signup', formData);
  }

  registerFreights(user,image:File): Observable<any> {
    const formData = new FormData();
    formData.append('carriers',JSON.stringify(user))
    formData.append('image',image);
    return this.http.post(AUTH_API + 'freight/signup', formData);
  }

  registerCommercial(user,image:File): Observable<any> {
    console.log(' credentials username Commercial =======', user.username);
    const formData = new FormData();
    formData.append('commercial',JSON.stringify(user))
    formData.append('image',image);
  
    return this.http.post(AUTH_API_Commercial + 'signup', formData);
  }

  registerSubCommercial(user,image:File): Observable<any> {
    console.log(' credentials username Sub_Commercial =======', user.username);
    const formData = new FormData();
    formData.append('subcommercial',JSON.stringify(user))
    formData.append('image',image);

    return this.http.post(AUTH_API_Sub_Commercial + 'signup', formData);
  }


  forgotPassword(email: any): Observable<any> {
    console.log(' EMAAIIIIIILLLLL =======', email.email);
    return this.http.post(Signin + "forgot-password/?email=" + email.email, httpOptions)
  }



  ResetPassword(token: any, password: any): Observable<any> {
    console.log(' TOKEEENNNN =======', token);
    console.log(' passwordddd  =======', password);

    return this.http.put(Signin + 'reset-password/?token=' + token + '&password=' + password, httpOptions);
  }


} 