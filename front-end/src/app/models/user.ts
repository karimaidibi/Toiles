import { Product } from './product';
export class User {
  _id!: string
  username!: string
  nom!: string
  prenom!: string
  codePostal!: number
  rue!: string
  ville!: string
  pays!: string
  favoris!: Product[]
  panier!: []
  email!: string
  password!: string
  createdAt!: string
}
