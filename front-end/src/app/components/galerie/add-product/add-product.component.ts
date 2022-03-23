import { Artist } from './../../../models/artist';
import { Subscription } from 'rxjs';
import { ArtistService } from './../../../services/artist.service';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  productForm!: FormGroup;
  errorMessage!: string;
  loading: boolean = false
  imagePreview!: string
  artistSub!: Subscription
  artists!: Artist[]

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService : ProductService,
    private artistService : ArtistService) { }


  ngOnInit(): void {
    this.initproductForm()
    this.initArtistsSubscription()
    this.artistService.getArtists()
  }

  initproductForm(){
    this.productForm = this.formBuilder.group({
      /*validator required, email, mail length, max length*/
      produit: this.formBuilder.control(null,[Validators.required]),
      format: this.formBuilder.control(null,[Validators.required]),
      type_produit: this.formBuilder.control(null,[Validators.required]),
      prix: this.formBuilder.control(null,[Validators.required]),
      annee: this.formBuilder.control(null,[Validators.required]),
      stock: this.formBuilder.control(null,[Validators.required]),
      image: this.formBuilder.control(null,[Validators.required]),
      artistId: this.formBuilder.control(null),
      descriptif: this.formBuilder.control(null),

    })
  }

  onSubmit() :void{
    this.loading = true
    let product = new Product()
    let produit = this.productForm.get('produit');
    if (produit){
      product.produit = produit.value
    }
    let format = this.productForm.get('format');
    if(format){
      product.format = format.value
    }
    let type_produit = this.productForm.get('type_produit');
    if(type_produit){
      product.type_produit = type_produit.value
    }
    let prix = this.productForm.get('prix');
    if(prix){
      product.prix = prix.value
    }
    let annee = this.productForm.get('annee');
    if(annee){
      product.annee = annee.value
    }
    let stock = this.productForm.get('stock');
    if(stock){
      product.stock = stock.value
    }
    let artistId = this.productForm.get('artistId');
    if(artistId){
      product.artistId = artistId.value
    }
    let descriptif = this.productForm.get('descriptif');
    if(descriptif){
      product.descriptif = descriptif.value
    }
    product.image = ' ';

    // save product
    this.productService.createNewProduct(product,this.productForm.get('image')?.value)
    .then(()=>{
      this.productForm.reset()
      this.loading = false
      this.router.navigate(['/galerie'])
    })
    .catch((err)=>{
      console.log(product)
      console.log(this.productForm.get('image')?.value)
      this.loading = false
      this.errorMessage = err.message
      console.log(err)
    })
  }

  onImagePick(event: Event){
    // récupérer le fichier image
    let file = (event.target as HTMLInputElement)
    if (file.files){
      // recuperer limage
     let f = file.files[0]
     // mettre ajour limage dans le formulaire
     this.productForm.get('image')?.patchValue(f)
     // rendre le champ image valide dans le formulaire
     this.productForm.get('image')?.updateValueAndValidity();
     // lire le fichier et l'afficher
     const reader = new FileReader();
     reader.onload = ()=>{
       if(this.productForm.get('image')?.valid){
        this.imagePreview = reader.result as string
       }else{
         this.imagePreview = ""
       }
     }
     // comment je veux lire le fichier
     reader.readAsDataURL(f)
    }
  }

  initArtistsSubscription(){
    //get artists
    this.loading = true
    this.artistSub = this.artistService.artists$.subscribe({
      next:(artists : any)=>{
        this.loading = false
        this.artists = artists
      },
      error: (err)=>{
        this.loading = true
        console.log(err)
      },
      complete :()=>{
      }
    });
  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe()
  }

}
