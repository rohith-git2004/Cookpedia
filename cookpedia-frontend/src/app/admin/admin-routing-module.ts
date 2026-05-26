import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminDownloadlist } from './admin-downloadlist/admin-downloadlist';
import { AdminUserlist } from './admin-userlist/admin-userlist';
import { AdminFeedbacklist } from './admin-feedbacklist/admin-feedbacklist';
import { AdminRecipelist } from './admin-recipelist/admin-recipelist';
import { AdminManageRecipe } from './admin-manage-recipe/admin-manage-recipe';

const routes: Routes = [
  // http://localhost:4200/admin
  {
    path:'', component:AdminDashboard, title:'dashboard'
  },
  {
    path:'downloads', component:AdminDownloadlist, title:'Downloads'
  },
  {
    path:'users',component:AdminUserlist,title:'Users'
  },
  {
    path:'feedbacks',component:AdminFeedbacklist,title:'Feedbaks'
  },
  {
    path:'recipes',component:AdminRecipelist,title:'Recipes'
  },
  {
    path:'recipes/add',component:AdminManageRecipe,title:'Add Recipes'
  },
  {
    path:'recipes/:id',component:AdminManageRecipe,title:'Edit Recipes'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
