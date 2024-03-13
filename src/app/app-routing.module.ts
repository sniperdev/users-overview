import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingEnum } from './utils/enums/app-routing.enum';

const routes: Routes = [
  {
    path: AppRoutingEnum.home,
    redirectTo: AppRoutingEnum.users,
    pathMatch: 'full',
  },
  {
    path: AppRoutingEnum.users,
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
