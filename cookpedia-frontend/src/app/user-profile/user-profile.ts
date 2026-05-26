import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  imports: [Header,Footer,FormsModule,RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  
  api = inject(ApiService)
  downloadList:any = signal([])
  username:string = ""
  userImage:any = signal("https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png")
  toaster = inject(ToastrService)

  ngOnInit(){
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user")||"")
      this.username = user.username
      user.picture && this.userImage.set(`${this.api.server_url}/uploads/${user.picture}`)
    }
    this.getUserDownloadList()
  }

  getUserDownloadList(){
    this.api.getUserDownloadListAPI().subscribe((res:any)=>{
      this.downloadList.set(res)
      console.log(this.downloadList());
    })
  }

  updateProfilePic(event:Event){
   const input = event.target as HTMLInputElement
   if (input.files && input.files.length>0) {
    const uploadFile = input.files[0]
    const reqBody = new FormData()
    reqBody.append("picture",uploadFile)
    this.api.editUserPictureAPI(reqBody).subscribe((res:any)=>{
      this.toaster.success("Profile Picture Updated")
      sessionStorage.setItem("user",JSON.stringify(res))
      this.userImage.set(`${this.api.server_url}/uploads/${res.picture}`)
    })
   }
  }

}
