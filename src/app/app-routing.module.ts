import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',loadChildren : () => import("./home/home.module").then(m => m.HomeModule)
},{
  path:'tasks',loadChildren:() => import("./create-task/create-task.module").then(m => m.CreateTaskModule)
},{
  path:'taskdetails',loadChildren:() => import("./task-details/task-details.module").then(m => m.TaskDetailsModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
