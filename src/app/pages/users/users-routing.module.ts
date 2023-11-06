import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersRoutingEnum} from "./utils/enums/users-routing.enum";
import {UsersComponent} from "./users.component";

const routes: Routes = [
  {
    path: UsersRoutingEnum.home,
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
