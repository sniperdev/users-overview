import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRoutingEnum } from './utils/enums/users-routing.enum';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {
    path: UsersRoutingEnum.home,
    component: UsersComponent,
  },
  {
    path: UsersRoutingEnum.userDetails,
    component: UserDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
