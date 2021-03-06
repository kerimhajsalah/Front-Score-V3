import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotdoctor',
  templateUrl: './forgotdoctor.component.html',
  styleUrls: ['./forgotdoctor.component.css']
})
export class ForgotdoctorComponent implements OnInit {

  id: any;
  token: any;
  
   constructor(private route: Router ,private router: ActivatedRoute , private auth: AuthService){
    
   }
  
 
   loginUserData = {
 
  
     password: '',
     confirm: ''
 
   };
 
   passwordAlert = false;
 
   ngOnInit(): void {
 
     this.id = this.router.snapshot.paramMap.get('id');
     this.token = this.router.snapshot.paramMap.get('token');
    
     
     let toreturn : any;
     this.auth.checkLinkDoctor(this.id, this.token).subscribe(
       res=>{
         toreturn = true;
       },
       err=>{
         toreturn = false;
         this.route.navigate(['/forgotpassword']);
       }
     );
   }
 
   success = false;
 
   reset(){
     if(this.loginUserData.password !== this.loginUserData.confirm){
 
       this.passwordAlert = true;
 
     }else{
       this.passwordAlert = false;
       this.auth.resetPasswordDoctor(this.id, this.token , this.loginUserData).subscribe(
         res=>{
           this.success = true;
           setTimeout(()=>{
             this.route.navigate(['/login']);
           } , 2000);
         },
         err=>{
           this.success = true;
           setTimeout(()=>{
             this.route.navigate(['/login']);
           } , 2000);
           
         }
       )
 
     }
 
   }
}
