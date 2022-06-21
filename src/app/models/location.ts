import { Colis } from "./colis";
import { CommercialProvider } from "./commercial-provider";

export class Location {
    lat: number; 
    lng: number;
    label:string;
    address:string;
    commercialProvider:CommercialProvider;
    iconUrl:any;
}
