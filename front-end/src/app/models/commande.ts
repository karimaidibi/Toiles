import { Item } from './item';
export class Commande {
  date !: string;
  items: Item[] = [];
  resume!: {
    quantity: number,
    costHT: number,
    costTaxe: number,
    costTTC: number
  };
  userId: string = '';
  _id!: string
}





