import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userProfile:any;
  public user:User;

  constructor(private authService:AuthService, private tokenStorage:TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.tokenStorage.getUser();
    this.getProfile(this.user.id);
  }

  public getProfile(id:number){
    this.authService.getProfile(id).subscribe(data=>{
      this.userProfile = data;
    },err=>{
      console.log(err);
    })
  }

}
