import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OnlyAuthGuard} from '@core/guards/only-auth.guard';
import {AlreadyAuthGuard} from '@core/guards/already-auth.guard';

const routes: Routes = [
  {
    path: 'chat',
    // component: AppWrapperComponent,
    canActivateChild: [OnlyAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/chat/chat.module').then((m) => m.ChatModule),
      },
    ],
  },
  {
    path: 'auth',
    canActivateChild: [AlreadyAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
