import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeProduit'
})
export class TypeProduitPipe implements PipeTransform {

  transform(values: Product[], type_produit: string): any[] {
    if(!type_produit){
      return values
    }else{
      return values.filter(product=>{
        return(product.type_produit.toLowerCase().indexOf(type_produit.toLowerCase()) > -1 )
      });
    }

  }

}
