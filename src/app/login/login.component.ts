import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { AppUser } from '../modele/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userFormGroup! : FormGroup;
  errorMessage: any ;

constructor(private fb:FormBuilder,
  private authService : AuthentificationService,
private router : Router){

}
ngOnInit(): void{
  this.userFormGroup=this.fb.group({
    username : this.fb.control(""),
    password : this.fb.control("")
  })
}
 handleLogin(){
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next:(appUser:AppUser)=>{
        this.authService.authentificateUser(appUser).subscribe({
          next : (data : boolean)=>{
            this.router.navigateByUrl("/admin");


          }
        })

      },
      error:(err)=>{
        this.errorMessage=err;
      }
    })
}
}
