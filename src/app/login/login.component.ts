import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
formBuilder=inject(FormBuilder)
messageService=inject(MessagesService);
authService=inject(AuthService)
router =inject(Router);
http=inject(HttpClient)
  form=this.formBuilder.group({
    email:[''],
    password:['']
  })

  async onLogin() {

  const apiUrlV1:string = 'https://sandbox-api.lemonway.fr/oauth/api/v1/oauth/token';
  const  apiKEY:string = 'a2a726f0-2446-4328-b3f0-bfccb59db50e';
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `basic ${apiKEY}`,
        'accept': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      });

      const body = new HttpParams()
        .set('grant_type', 'client_credentials');

      this.http.post(apiUrlV1, body.toString(), { headers }).subscribe({
        next: data => {console.log(data)},
        error: error => {console.log(error)},

      });

  //   try {
  //     const {email ,password}=this.form.value;
  //     if(!email || !password){
  //      return  this.messageService.showMessage('Fill the message and the password','error')
  //     }
  //    await this.authService.login(email,password);
  //     await  this.router.navigate(['/home']);
  //
  //   }
  //   catch (err){
  //     this.messageService.showMessage('Error while logging in','error')
  //     console.error(err)
  //   }
  //
  }
}
