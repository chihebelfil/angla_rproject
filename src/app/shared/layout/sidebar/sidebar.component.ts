import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';

const ROLE_CARRIERS:string = 'ROLE_CARRIERS'
const ROLE_FREIGHT:string = 'ROLE_FREIGHT';
const ROLE_LIVREUR:string = 'ROLE_LIVREUR';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isCarriers:boolean = false;
  isFreight:boolean = false;
  isLivreur:boolean = false;

  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.isFreight = this.tokenStorage.getRole(ROLE_FREIGHT);
    this.isCarriers = this.tokenStorage.getRole(ROLE_CARRIERS);
    this.isLivreur = this.tokenStorage.getRole(ROLE_LIVREUR);
  }

}
