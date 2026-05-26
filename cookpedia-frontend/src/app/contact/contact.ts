import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
    
  name:string = ""
  email:string = ""
  message:string = ""
  api = inject(ApiService)
  toaster = inject(ToastrService)

  addFeedback(){
    if (this.name && this.email && this.message) {
      this.api.addFeedbackAPI({name:this.name,email:this.email,message:this.message}).subscribe((res:any)=>{
        console.log(res);
        this.toaster.success("Thankyou for your feedback... we appreciate your effort to improve us!!!")
        this.name = ""
        this.email = ""
        this.message = ""
      })
    }
    else{
      this.toaster.info("Fill the form completely")
    }
  }

}
