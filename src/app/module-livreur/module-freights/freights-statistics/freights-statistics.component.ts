import { Component, OnInit } from '@angular/core';
import { EStateColis } from 'src/app/models/enums/estate-colis.enum';

@Component({
  selector: 'app-freights-statistics',
  templateUrl: './freights-statistics.component.html',
  styleUrls: ['./freights-statistics.component.scss']
})
export class FreightsStatisticsComponent implements OnInit {

  public A_LIVRER=EStateColis.A_LIVRER;
  public A_RECUPERER=EStateColis.A_RECUPERER;
  public LIVRER=EStateColis.LIVRER;
  public ENREGISTRER=EStateColis.ENREGISTRER;

  constructor() {}

  ngOnInit(): void {
  }

}
