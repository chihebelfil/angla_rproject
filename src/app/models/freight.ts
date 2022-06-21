export class Freight {

    id:number;
    username:string;
    email:string;
    password:string;
    created:Date;
    updated:Date;
    isEnabled:boolean;
    isActivated:boolean;
    /* Set<Colis> colis;
    Set<DeliveryMan> deliveryMen; */

    companyName:string;
    logo:string;
    country:string;
    city:string;
    zipCode:string;
    companyAddress:string;
    phoneNumber:number;
    administratorFirstName:string;
    administratorLastName:string;
    administratorEmail:string;
    administratorPhoneNumber:string;
    type:string = "freight";
    constructor(){
        this.type="freight";
    }
}
