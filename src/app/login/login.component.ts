import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // property
  email:string=""
  password:string=""

  constructor(private api:ApiService,private loginRouter:Router){}

  // user defined function
  login(){
    if(this.email && this.password){
      // alert(`${this.username} , ${this.password}`)
      // compare email and password with admin details
      // we should get admin details from http://localhost:3000/users/1
      // for that we have to make an API call to http://localhost:3000/users/1
      this.api.adminDetails().subscribe({
        next:(result:any)=>{
          console.log(result);
          // compare username and password with admin details
          if(this.email===result.email && this.password===result.password){
            // save detsils in local storage
            localStorage.setItem("admin_name",result.name)
            localStorage.setItem("admin_pswd",result.password)
            alert("Authorisation successfull")
            // navigate to home page - use navigateByUrl - Router class
            this.loginRouter.navigateByUrl('home')
          }
          else{
            alert("Invalid Admin Credentials")
          }
        },
        error:(result:any)=>{
          console.log(result);
          alert("Cannot fetch the data Now... Please check after sometime!!!")
        }
      })
    }
    else{
      alert(`Please fill the form completely!!!`)
    }
  }
}
