import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {
  
  relatedRecipes:any = signal([])
  recipe:any = signal({})
  api = inject(ApiService) 
  activateRoute = inject(ActivatedRoute)
  recipeId:string = ""
  router = inject(Router)
  toaster = inject(ToastrService)

  ngOnInit(){
    this.activateRoute.params.subscribe((res:any)=>{
      this.recipeId = res['id']
      this.getRecipe(this.recipeId)
    })

  }

  getRecipe(recipeId:string){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
      this.recipe.set(res)
      // console.log(this.recipe());
      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.getRelatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if (res.length>1) {
        this.relatedRecipes.set(res.filter((item:any)=>item.name!=this.recipe().name))
      }
      else{
        this.relatedRecipes.set([])
      }
      console.log(this.relatedRecipes());
      
    })
  }

  viewRelatedRecipeDetails(recipeId:string){
    this.router.navigateByUrl(`recipes/${recipeId}/view`)
    this.getRecipe(recipeId)
  }

  downloadRecipe(){
    this.api.addToDownloadAPI(this.recipeId,{name:this.recipe().name,cuisine:this.recipe().cuisine,image:this.recipe().image}).subscribe({
      next:((res:any)=>{
        console.log(res);
        this.api.getChartData()
        this.pdfRecipe()
      }),
      error:(reason:any)=>{
        console.log(reason);
      }
    })
  }

  // download recipe
  pdfRecipe(){
    let pdf = new jsPDF()
    let titleRow = [`Name`,'Cuisine','Servings','Ingredients','Instructions']
    let bodyData = [this.recipe().name,this.recipe().cuisine,this.recipe().servings,this.recipe().ingredients,this.recipe().instructions]

    autoTable(pdf,{
      head:[titleRow],
      body:[bodyData]
    })
    pdf.save(`${this.recipe().name}`)
  }

  saveRecipe(){
    this.api.addToSaveRecipeAPI(this.recipeId,{name:this.recipe().name,image:this.recipe().image}).subscribe({
      next:((res:any)=>{
       this.toaster.success(`${res.name} add to your recipe collection`)
      }),
      error:(reason:any)=>{
        console.log(reason);
        this.toaster.info(reason.error)
      }
    })
  }

}
