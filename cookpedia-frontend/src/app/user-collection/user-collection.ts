import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-collection',
  imports: [Header, Footer, RouterLink],
  templateUrl: './user-collection.html',
  styleUrl: './user-collection.css',
})
export class UserCollection {
    allRecipes:any = signal([])
    api = inject(ApiService)
    toaster = inject(ToastrService)

    ngOnInit(){
      this.getUserCollection()
    }

    getUserCollection(){
      this.api.getUserRecipesAPI().subscribe((res:any)=>{
        this.allRecipes.set(res)
        console.log(this.allRecipes());
      })
    }

    deleteRecipe(id:string){
      this.api.removeUserRecipesAPI(id).subscribe((res:any)=>{
        this.getUserCollection()
        this.toaster.warning("Recipe removed from collection")
      })
    }
}
