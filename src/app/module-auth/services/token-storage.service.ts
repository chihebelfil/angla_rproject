import { Injectable } from '@angular/core';
import * as CryptoJS from '../../../../node_modules/crypto-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private roles: string[] = [];
  private SECRET_KEY = environment.secretKey;

  constructor(private router:Router) { }

  get isLoggedIn() {
    if(helper.isTokenExpired(this.getToken()) == false){
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  getRole(role:string):boolean{
    if(this.getRoles().indexOf(role)!=-1){
      return true;
    }
    return false;
  }

  public getRoles(){
    if(this.getUser != null){
      return this.roles = this.getUser().roles;
    }
    return null;
  }

  signOut(): void {
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  public async saveToken(token: string) {
    localStorage.removeItem(USER_KEY);
    var tokenEncrypt = await this.encryptToken(token);
    localStorage.setItem(TOKEN_KEY, tokenEncrypt);
  }

  public getToken(): string {
    return this.decryptToken();
  }

  public async saveUser(user) {
    
    localStorage.removeItem(USER_KEY);
    var userEncrypt = await this.encryptUser(user);
    localStorage.setItem(USER_KEY, userEncrypt);
    this.loggedIn.next(true);
  }

  public getUser(): any {
    return this.decryptUser();
  }

  private encryptUser(user:any){
    return CryptoJS.AES.encrypt(JSON.stringify(user), this.SECRET_KEY).toString();
  }

  private encryptToken(token:string){
    return CryptoJS.AES.encrypt(token, this.SECRET_KEY).toString();
  }

  private decryptUser():any{
    let decrypt:any ={};
    let encryptedUser =localStorage.getItem(USER_KEY);
    if (encryptedUser){
      decrypt= CryptoJS.AES.decrypt(encryptedUser,this.SECRET_KEY);
      decrypt =JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
      return decrypt;
    }
    return null;
  }

  private decryptToken():any{
    let decrypt:any;
    var encryptedToken = localStorage.getItem(TOKEN_KEY);
    if(encryptedToken){
      decrypt= CryptoJS.AES.decrypt(encryptedToken,this.SECRET_KEY);
      decrypt =decrypt.toString(CryptoJS.enc.Utf8);
      return decrypt;
    }
    return null;
  }


}
