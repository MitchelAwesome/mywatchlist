import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './common/app-error-handler';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { TvshowService } from './services/tvshow.service';
import { WatchlistButtonComponent } from './partials/watchlist-button/watchlist-button.component';
import { SearchService } from './services/search.service';
import { WatchStatusToggleButtonComponent } from './partials/watch-status-toggle-button/watch-status-toggle-button.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent,
    TvshowsComponent,
    WatchlistButtonComponent,
    WatchStatusToggleButtonComponent,
    ShowDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'myshows', component: TvshowsComponent, canActivate: [AuthGuard]  },
      { path: 'tvshows', component: TvshowsComponent, canActivate: [AuthGuard]  },
      { path: 'showdetails/:id', component: ShowDetailComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'no-access', component: NoAccessComponent},
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    HttpClient,
    AuthService,
    TvshowService,
    SearchService,
    AuthGuard,
    AdminAuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
