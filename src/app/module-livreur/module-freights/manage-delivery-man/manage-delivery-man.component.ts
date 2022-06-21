import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/module-auth/services/token-storage.service';
import { DeliveryMan } from '../../../models/delivery-man';
import { FreightService } from '../services/freight.service';
import csc from 'country-state-city';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-manage-delivery-man',
    templateUrl: './manage-delivery-man.component.html',
    styleUrls: ['./manage-delivery-man.component.scss']
})
export class ManageDeliveryManComponent implements OnInit {
    public user: User;
    public deliveryDialog: boolean;
    public deliveryMen: DeliveryMan[] = [];
    public deliveryMan: DeliveryMan = new DeliveryMan();
    public selectedDelivery: DeliveryMan[] = [];
    public submitted: boolean;
    public countries: any[] = [];
    public states: any[] = [];
    public selectedCityCode: string;
    public selectedState: string;

    currentFile: File;
    progress = 0;
    message = '';
    imageUrl = environment.serverImage;
    fileInfos: Observable<any>;

    constructor(private freightService: FreightService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private tokenStorage: TokenStorageService, private spinner: NgxSpinnerService) { }

    async ngOnInit() {
        this.user = this.tokenStorage.getUser();
        this.deliveryMen = await this.freightService.getDeliveryMenByFreightId(this.user.id);
        this.countries = csc.getAllCountries();
        console.log(csc.getStatesOfCountry("TN"));
    }

    openNew() {
        this.deliveryMan = new DeliveryMan();
        this.submitted = false;
        this.deliveryDialog = true;
    }

    deleteSelectedDeliverMen() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deliveryMen = this.deliveryMen.filter(val => !this.selectedDelivery.includes(val));
                this.selectedDelivery = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editDeliveryMan(deliveryMan: DeliveryMan) {
        console.log(deliveryMan);
        this.deliveryMan = { ...deliveryMan };
        this.deliveryDialog = true;
    }

    deleteDeliveryMan(deliveryMan: DeliveryMan) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + deliveryMan.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deliveryMen = this.deliveryMen.filter(val => val.id !== deliveryMan.id);
                this.deliveryMan = new DeliveryMan();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.deliveryDialog = false;
        this.submitted = false;
    }

    async saveDeliveryMan() {
        if (this.deliveryMan.username.trim()) {
            this.spinner.show();
            if (this.deliveryMan.id) {
                this.freightService.updateDeliveryMan(this.deliveryMan, this.currentFile).subscribe(
                    data => {
                        this.spinner.hide();
                        this.deliveryDialog = false;
                        this.deliveryMen[this.findIndexById(this.deliveryMan.id)] = data;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Delivery Man Updated', life: 3000 });
                    }, err => {
                        this.spinner.hide();
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delivery Man Could Not Be Updated', life: 3000 });
                    }
                )

            }
            else {
                this.freightService.addDeliverMan(this.deliveryMan, this.currentFile, this.user.id).subscribe(
                    data => {
                        this.spinner.hide();
                        this.submitted = true;
                        this.deliveryDialog = false;
                        this.deliveryMen.push(data);
                        this.deliveryMan = new DeliveryMan();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Delivery Man Created', life: 3000 });
                    }, err => {
                        this.spinner.hide();
                        this.deliveryMan = new DeliveryMan();
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
                    }
                )
            }
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.deliveryMen.length; i++) {
            console.log(id)
            if (this.deliveryMen[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onChangeCountry(newValue) {
        this.selectedCityCode = newValue.isoCode;
        this.deliveryMan.country = newValue.name;
        this.states = csc.getStatesOfCountry(this.selectedCityCode);
        var nabeul = { name: "Nabeul Governorate", isoCode: "24", countryCode: "TN", latitude: "36.40911880", longitude: "10.14231720" }
        this.states.push(nabeul);
    }

    onChangeState(newValue) {
        console.log(newValue);
        this.deliveryMan.city = newValue.name;
    }

    selectFile(event) {
        this.currentFile = event.target.files[0];
    }

}
