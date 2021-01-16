import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "../@root/shared.module";
import {LayoutComponent} from './layout/layout.component';
import {FirebaseModule} from "../@root/firebase/firebase.module";
import {LoginComponent} from './auth/login/login.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from 'src/services/token.interceptor';
import { ToolsFormComponent } from './main/tools/tools-form/tools-form.component';
import { ToolsListComponent } from './main/tools/tools-list/tools-list.component';
import { ArticleFormComponent } from './main/articles/article-form/article-form.component';
import { ArticleListComponent } from './main/articles/article-list/article-list.component';
import { EventsFormComponent } from './main/events/events-form/events-form.component';
import { EventsListComponent } from './main/events/events-list/events-list.component';
import { MemberInfoComponent } from './main/member/member-info/member-info.component';
import { MemberInfoTeacherComponent } from './main/member/member-info-teacher/member-info-teacher.component';
import { MemberAddComponent } from './main/member/member-add/member-add.component';
import { MemberEncadrantComponent } from './main/member/member-encadrant/member-encadrant.component';
import { MemberPopupComponent } from './main/member/member-popup/member-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    MemberFormComponent,
    LoginComponent,
    ToolsFormComponent,
    ToolsListComponent,
    ArticleFormComponent,
    ArticleListComponent,
    EventsFormComponent,
    EventsListComponent,
    MemberInfoComponent,
    MemberInfoTeacherComponent,
    MemberAddComponent,
    MemberEncadrantComponent,
    MemberPopupComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FirebaseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
