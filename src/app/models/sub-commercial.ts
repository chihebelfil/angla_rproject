export class SubCommercial {
    id: number;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    phoneNumber: number;
    companyName: string;
    country: string;
    city: string;
    zipCode: string;
    companyAddress: string;
    type:string = "subcommercial";
    constructor(){
        this.type="subcommercial";
    }
}
