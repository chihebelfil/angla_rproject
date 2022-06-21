export class Commercial {
    id: number;
    nom: String;
    prenom: String;
    username: String;
    email: String;
    numTel: String;
    logo:string;
    type:string = "commercial";
    constructor(){
        this.type="commercial";
    }
}
