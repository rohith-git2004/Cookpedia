import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recipeModel } from '../model/recipeModel';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-manage-recipe',
  standalone: false,
  templateUrl: './admin-manage-recipe.html',
  styleUrl: './admin-manage-recipe.css',
})
export class AdminManageRecipe {
  
  router = inject(Router)
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  recipeID = this.route.snapshot.params['id']
  recipeDetails = signal<recipeModel>({})
  ingredientsArray:any = []
  instructonArray:any = []
  mealTypeArray:any = []
  toaster = inject(ToastrService)

  ngOnInit(){
    if (this.recipeID) {
      this.api.getAllRecipesAPI().subscribe((res:any)=>{
        this.recipeDetails.set(res.find((item:any)=>item._id==this.recipeID))
        this.ingredientsArray = this.recipeDetails().ingredients
        this.instructonArray = this.recipeDetails().instructions
        this.mealTypeArray = this.recipeDetails().mealType
      })
    }
  }
  
  addIngredints(ingredientInput:any){
     if (ingredientInput.value) {
      this.ingredientsArray.push(ingredientInput.value)
      ingredientInput.value = ""
     }
  }
  removeIngredient(value:string){
    this.ingredientsArray = this.ingredientsArray.filter((item:string)=>item!=value)
  }

  addInstruction(instructionInput:any){
     if (instructionInput.value) {
      this.instructonArray.push(instructionInput.value)
      instructionInput.value = ""
     }
  }
  removeInstruction(value:string){
    this.instructonArray = this.instructonArray.filter((item:string)=>item!=value)
  }

  addMeal(mealInput:any){
     if (mealInput.value) {
      this.mealTypeArray.push(mealInput.value)
      mealInput.value = ""
     }
  }
  removeMeal(value:string){
    this.mealTypeArray = this.mealTypeArray.filter((item:string)=>item!=value)
  }

  addRecipe(){
   this.recipeDetails().ingredients = this.ingredientsArray
   this.recipeDetails().instructions = this.instructonArray
   this.recipeDetails().mealType = this.mealTypeArray
   const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails()
   if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType) {
    console.log(this.recipeDetails());
    this.api.addRecipeAPI(this.recipeDetails()).subscribe({
      next:(res:any)=>{
        this.toaster.success("Recipe added successfully!!!")
        this.recipeDetails.set({})
        this.ingredientsArray = []
        this.instructonArray = []
        this.mealTypeArray = []
        this.router.navigateByUrl('/admin/recipes')
      },
      error:(reason)=>{
        this.toaster.error(reason.error)
      }
    })
   }
   else{
    this.toaster.info("Fill the form completely")
   }
  }

  editRecipe(){
   this.recipeDetails().ingredients = this.ingredientsArray
   this.recipeDetails().instructions = this.instructonArray
   this.recipeDetails().mealType = this.mealTypeArray
   const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails()
   if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType) {
    console.log(this.recipeDetails());
    this.api.editRecipeAPI(this.recipeID,this.recipeDetails()).subscribe((res:any)=>{
      this.toaster.success("Recipe updated successfully")
      this.router.navigateByUrl('/admin/recipes')
    })
   }
   else{
    this.toaster.info("Fill the form completely")
   }
  }
}
