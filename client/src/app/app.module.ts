import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandmarkListComponent } from './landmark-list/landmark-list.component';
import { LandmarkComponent } from './landmark/landmark.component';
import { LandmarkDetailsComponent } from './landmark-details/landmark-details.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './http.interceptor';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    LandmarkListComponent,
    LandmarkComponent,
    LandmarkDetailsComponent,
    LoginComponent,
    LoginModalComponent,
    HomeComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
