import { Component } from '@angular/core';
import { FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../modele/product.modele';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  {
  productFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,
    private prodService : ProductService
  ){

  }
  ngOnInit() : void {
    this.productFormGroup=this.fb.group({
    name : this.fb.control(null,[Validators.required,Validators.minLength(4)]),
    price : this.fb.control(null,[Validators.required,Validators.min(200)]),
    promotion : this.fb.control(null,[Validators.required,]),

    });
  }
  handleAddProduct(){
    let product = this.productFormGroup.value;
    this.prodService.addNewProduct(product).subscribe({
      next : (data : Product)=>{
        alert("product added successfully")
        this.productFormGroup.reset();
      },error : err =>{
        console.log(err); 

      }

    })   
  }
    getErrorMessage(fieldName:string,error:ValidationErrors){
      if(error['required']){
        return fieldName+" is required";
      }else if(error['minlength']) {
        return fieldName+ " should have at leat "+error['minlength']['requiredLength']+" Characters";

      }else if (error['min']){
        return fieldName+ " should have min value "+error['min']['min'];
      }else return "";    

    }
  
}
