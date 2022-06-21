import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { CountColisByDeliveryProviderIdAndGroupByDeliveryMan } from 'src/app/models/statistics/count-colis-by-delivery-provider-id-and-group-by-delivery-man';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { FreightService } from '../../services/freight.service';

interface ReturnedData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-count-colis-group-by-delivery-man',
  templateUrl: './count-colis-group-by-delivery-man.component.html',
  styleUrls: ['./count-colis-group-by-delivery-man.component.scss']
})
export class CountColisGroupByDeliveryManComponent implements OnInit {

  countColisGroupByDeliveryMan: CountColisByDeliveryProviderIdAndGroupByDeliveryMan[] = [];
  user: User;
  colisByDeliveryManOptions: EChartsOption;
  allReturnedDate: ReturnedData[] = [];

  constructor(private freightService: FreightService, private tokenStorage: TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.tokenStorage.getUser();
    this.countColisAndGroupByDeliveryMan(this.user.id);
  }

  public countColisAndGroupByDeliveryMan(id: number) {
    return this.freightService.countColisGroupByDeliveryMan(id).then(async data => {
      this.countColisGroupByDeliveryMan = data;
      for await (const c of this.countColisGroupByDeliveryMan) {
        let returnedData: ReturnedData = { name: c.deliveryManUsername, value: c.value }
        this.allReturnedDate.push(returnedData);
      }
      this.setOptions2();

    });
  }

  setOptions2() {
    this.colisByDeliveryManOptions = {
      title: {
        text: 'Number of packages by DeliveryMan',
        left: 'center'
    },
      tooltip: {
        trigger: 'item'
    },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: false },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          type: 'pie',
          radius: [50, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: this.allReturnedDate
        }
      ]
    };
  }

}
