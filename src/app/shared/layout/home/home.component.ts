import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';

const ROLE_CARRIERS:string = 'ROLE_CARRIERS'
const ROLE_FREIGHT:string = 'ROLE_FREIGHT';
const ROLE_LIVREUR:string = 'ROLE_LIVREUR';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn:Observable<boolean> ;
  isCarriers:boolean = false;
  isFreight:boolean = false;
  isLivreur:boolean = false;

  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLoggedIn;
    this.isFreight = this.tokenStorage.getRole(ROLE_FREIGHT);
    this.isCarriers = this.tokenStorage.getRole(ROLE_CARRIERS);
    this.isLivreur = this.tokenStorage.getRole(ROLE_LIVREUR);
  }

}
