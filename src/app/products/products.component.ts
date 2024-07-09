import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PageProduct, Product } from '../modele/product.modele';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! :  Array<Product>;
  currentPage: number=0;
  pageSize: number=5;
  totalPages:number=0;
  errorMessage! : string ;
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  constructor(private producService :ProductService,private fb : FormBuilder,
    public authService : AuthentificationService,
    private router : Router

  ){}
 
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(null)
    });
    
    this.handleGetPageProduct();
     
  }
  handleGetAllProduct(){
    this.producService.getAllProducts().subscribe({
      next : (data:any[])=>{
        this.products=data;
      },
      error : (err)=> {
        this.errorMessage=err
      }
    });
  }
  handleDeleteProduct(p: Product){
    let conf = confirm("etes vous sur de supprimer?");
    if(conf==false) return;
    this.producService.deleteProduct(p.id).subscribe({
      next : (data : boolean)=>{
        //this.handleGetAllProduct();
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }
  handleSetPromotion(p :Product) {
        let promo = p.promotion;
        this.producService.setPromotion(p.id).subscribe( {
          next : (data:boolean)=>{
             
            p.promotion =!promo;
          },
        error : err => {
          this.errorMessage=err;
        }
      
      })
  }
  handleSearchProducts(){
    this.currentAction="search";
    this.currentPage=0;
    let keyword=this.searchFormGroup.value.keyword;
    this.producService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
        next :(data:PageProduct)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      }
    })
  }

  handleGetPageProduct(){
    this.producService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next : (data:PageProduct)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
        console.log(this.totalPages);
        
      },
      error : (err)=> {
        this.errorMessage=err
      }
  })
 }
 gotoPage(i:number){
  this.currentPage=i;
  if(this.currentAction==='all')
    this.handleGetPageProduct();
  else
  this.handleSearchProducts();
 }
 handleNewProduct(){
    this.router.navigateByUrl("/admin/newProduct");
 }
 handleEditProduct(p:Product){
  this.router.navigateByUrl("/admin/editProduct/"+p.id);
 }
}



