import { Item } from './item';
export class Cart {
  items: Item[] = [];
  resume!: {
    quantity: number,
    costHT: number,
    costTaxe: number,
    costTTC: number
  }
  userId: string = ''
}
