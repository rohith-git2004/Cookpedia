import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-recipelist',
  standalone: false,
  templateUrl: './admin-recipelist.html',
  styleUrl: './admin-recipelist.css',
})
export class AdminRecipelist {

  api = inject(ApiService)
  allRecipes:any = signal([])
  searchKey:string = ""
  toaster = inject(ToastrService)

  ngOnInit(){
    this.getRecipes()
  }

  getRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes.set(res)
      console.log(this.allRecipes());
    })
  }

  deleteRecipe(id:string){
    this.api.removeRecipeAPI(id).subscribe((res:any)=>{
      this.toaster.success("Recipe removed from collection")
      this.getRecipes()
    })
  }
}
