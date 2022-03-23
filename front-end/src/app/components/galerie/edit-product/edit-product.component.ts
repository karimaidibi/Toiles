import { ArtistService } from './../../../services/artist.service';
import { Artist } from './../../../models/artist';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Product } from './../../../models/product';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

  productForm!: FormGroup;
  errorMessage!: string;
  loading: boolean = false
  imagePreview!: string
  product!: Product
  userId!: any
  private adminId = environment.ADMIN_ID

  //Infos artistes
  artistSub!: Subscription
  artists!: Artist[]

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService : ProductService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private artistService : ArtistService) { }

  ngOnInit(): void {
    this.userId = this.auth.userId
    this.getProductInfos()
    this.initArtistsSubscription()
    this.artistService.getArtists()
  }

  getProductInfos() : void{
    this.loading = true
    this.route.params.subscribe({
      next: (params: Params)=>{
        this.productService.getProductById(params['id'])
        .then(
          (product : any)=>{
            this.product = product
            // couche de securité admin
            if(this.adminId !== this.userId){
              console.log("permission denied")
              this.router.navigate(['/not-found'])
              return;
            }
            this.initproductForm(this.product)
            this.loading = false
            this.imagePreview = product.image
          }
        )
        .catch((err)=>{
          console.log(err.message)
          return this.router.navigate(['/home'])
        })
      },
      error: (err)=>{
        console.log(err)
      },
      complete: ()=>{
        console.log('complete edit product ts')
      }
    })
  }

  initproductForm(product : Product){
    this.productForm = this.formBuilder.group({
      /*validator required, email, mail length, max length*/
      produit: this.formBuilder.control(product.produit,[Validators.required]),
      format: this.formBuilder.control(product.format,[Validators.required]),
      type_produit: this.formBuilder.control(product.type_produit,[Validators.required]),
      prix: this.formBuilder.control(product.prix,[Validators.required]),
      annee: this.formBuilder.control(product.annee,[Validators.required]),
      stock: this.formBuilder.control(product.stock,[Validators.required]),
      image: this.formBuilder.control(product.image,[Validators.required]),
      artistId: this.formBuilder.control(product.artistId),
      descriptif: this.formBuilder.control(product.descriptif),
    })
  }

  onSubmit() :void{
    this.loading = true
    let product = new Product()
    // couche de securité admin
    if(this.adminId !== this.userId){
      console.log("permission denied")
      this.router.navigate(['/not-found'])
      return;
    }
    //recup id
    product._id = this.product._id
    // les informations que j'ai récupére du formulaire
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

    // update product
    this.productService.updateProduct(this.product._id,product,this.productForm.get('image')?.value)
    .then(()=>{
      this.productForm.reset() // re initialiser le formulaire
      this.loading = false
      this.router.navigate(['/galerie'])
    })
    .catch((err)=>{
      console.log(err.message)
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
