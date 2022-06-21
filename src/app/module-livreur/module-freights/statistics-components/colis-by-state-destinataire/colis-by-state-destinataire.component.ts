import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { ColisService } from 'src/app/module-colis/services/colis.service';
import { EChartsOption } from 'echarts';
import { GetColisByStateDestinataire } from '../../../../models/statistics/get-colis-by-state-destinataire';
import { FreightService } from '../../services/freight.service';
@Component({
  selector: 'app-colis-by-state-destinataire',
  templateUrl: './colis-by-state-destinataire.component.html',
  styleUrls: ['./colis-by-state-destinataire.component.scss']
})
export class ColisByStateDestinataireComponent implements OnInit {

  selectedCountry: string;
  colisByStateChartOptions: EChartsOption;
  colisByState: GetColisByStateDestinataire[] = [];
  colorPalette = ['#00b04f', '#ffbf00', 'ff0000', '#00b04f', '#00b04f',]

  constructor(private freightService: FreightService, private tokenStorage: TokenStorageService) { }

  async ngOnInit() {
    this.findColisByStateDestinataireAndGroupByStateDestinataire();

  }

  public async findColisByStateDestinataireAndGroupByStateDestinataire() {
    this.freightService.findColisByStateDestinataireAndGroupByStateDestinataire(this.tokenStorage.getUser().id)
      .then(data => {
        this.colisByState = data;
        console.log(this.colisByState);
        this.setOptions();
      });
  }

  setOptions() {
    this.colisByStateChartOptions = {
      title: {
        text: 'Number of packages by State',
        left: 'center'
    },
      tooltip: {
      },
      xAxis: {
        data: this.colisByState.map(c => c.stateDestinataire),
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        type: 'bar',
        data: this.colisByState.map(c => c.countStateDestinataire)
      },
      ],
    };
  }
}
