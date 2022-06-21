import { EStateColis } from "./enums/estate-colis.enum";
import { ImageColis } from "./image-colis";
import { CommercialProvider } from "./commercial-provider";
import { ESize } from './enums/esize.enum';
import { EDeliveryType } from './enums/edelivery-type.enum';
import { DeliveryMan } from "./delivery-man";

export class Colis {
      id: number;
      nomDestinataire: string;
      prenomDestinataire: string;
      countryDestinataire: string;
      stateDestinataire: string;
      adresseDestinataire: string;
      phoneNumberDestinataire: string;
      numCommande: string;
      dateLivraison: Date;
      created:Date;
      code: string;
      image: ImageColis;
      etat: EStateColis;
      size: ESize;
      deliveryType: EDeliveryType;
      commercialProvider: CommercialProvider;
      deliveryMan:DeliveryMan;

}