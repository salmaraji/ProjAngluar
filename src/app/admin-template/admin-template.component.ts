import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {
  constructor(public authService : AuthentificationService,
    private router : Router
  ){

  }
  handlelogout(){
    this.authService.logout().subscribe({
      next : (data:boolean)=>{
        this.router.navigateByUrl('/login');

      }
    });
  }
}
