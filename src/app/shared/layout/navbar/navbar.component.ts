import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnChanges {

  isLoggedIn:Observable<boolean> ;
  user:User;
  serverImage = environment.serverImage;

  constructor(private tokenStorage:TokenStorageService,
    private userService:UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.isLoggedIn){
      this.getUser();
    }
  }

  async ngOnInit() {
    this.isLoggedIn = this.tokenStorage.isLoggedIn;
    await this.getUser();
  }
  async getUser(){
    this.isLoggedIn.subscribe(async loggedIn=>{
      if(loggedIn == true){
          this.user = await this.userService.getUserById(this.tokenStorage.getUser().id); 
      }
    })
  }

  signout(){
    this.tokenStorage.signOut();
  }

}
