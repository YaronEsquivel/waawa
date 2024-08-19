import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'colors',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/colors/colors.module').then((m) => m.ColorsModule),
  },
  {
    path: 'colors/:id',
    loadChildren: () =>
      import('./pages/colors/color-detail/color-detail.module').then(
        (m) => m.ColorDetailModule
      ),
  },
  {
    path: 'events',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'users',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'users/:id',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/edit-user/edit-user.module').then((m) => m.EditUserModule),
  },
  {
    path: 'create',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/create-user/create-user.module').then((m) => m.CreateUserModule),
  },
  {
    path: 'dashboard',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
