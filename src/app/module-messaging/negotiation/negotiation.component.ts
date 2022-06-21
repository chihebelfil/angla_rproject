import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-negotiation',
  templateUrl: './negotiation.component.html',
  styleUrls: ['./negotiation.component.scss']
})
export class NegotiationComponent implements OnInit {
  isLoggedIn:Observable<boolean>;
  user:User;
  serverImage = environment.serverImage;

  constructor(private tokenStorage:TokenStorageService, private userService:UserService) { }

  async ngOnInit() {
    this.user = await this.userService.getUserById(this.tokenStorage.getUser().id);
    console.log("API USER",this.user);
  }

}
