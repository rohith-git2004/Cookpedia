import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header,Footer,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
    
    p: number = 1
    searchKey:string = ""
    allRecipes:any = signal([])
    dummyAllRecipes:any = []
    mealTypeArray:any = signal([])
    cuisineArray:any = signal([])
    api = inject(ApiService)
    router = inject(Router)
    toaster = inject(ToastrService)

    ngOnInit(){
      this.getAllRecipes()
    }

    getAllRecipes(){
      this.api.getAllRecipesAPI().subscribe((res:any)=>{
        this.allRecipes.set(res)
        this.dummyAllRecipes = this.allRecipes()
        // console.log(this.allRecipes());
        this.allRecipes().forEach((item:any)=>{
          !this.cuisineArray().includes(item.cuisine) && this.cuisineArray().push(item.cuisine)
        })
        // console.log(this.cuisineArray());
        let dummyMealTypeArray = this.allRecipes().map((item:any)=>item.mealType).flat(Infinity)
        dummyMealTypeArray.forEach((item:any)=>!this.mealTypeArray().includes(item) && this.mealTypeArray().push(item))
        console.log(this.mealTypeArray());
        
      })
    }

    filterRecipe(key:string,value:string){
      this.allRecipes.set(this.dummyAllRecipes.filter((item:any)=>item[key]==value))
    }

    viewRecipe(recipeId:string){
      if (sessionStorage.getItem("token")) {
        this.router.navigateByUrl(`recipes/${recipeId}/view`)
      }
      else{
        this.toaster.info("Please Login to access Recipes Details")
      }
    }
}
