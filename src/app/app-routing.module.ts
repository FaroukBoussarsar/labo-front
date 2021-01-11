import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./main/dashboard/dashboard.component";
import {MemberListComponent} from "./main/member/member-list/member-list.component";
import {MemberFormComponent} from "./main/member/member-form/member-form.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "../services/auth.guard";
import { ToolsListComponent } from './main/tools/tools-list/tools-list.component';
import { ToolsFormComponent } from './main/tools/tools-form/tools-form.component';
import { ArticleListComponent } from './main/articles/article-list/article-list.component';
import { ArticleFormComponent } from './main/articles/article-form/article-form.component';
import { EventsListComponent } from './main/events/events-list/events-list.component';
import { EventsFormComponent } from './main/events/events-form/events-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'tools',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolsListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolsFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolsFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ArticleFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ArticleFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventsListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventsFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventsFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
