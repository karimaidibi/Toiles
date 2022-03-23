import { Product } from './product';
export class Favoris {
  userId!: string
  favoris: string[] = []
  products: Product[] = []
}
