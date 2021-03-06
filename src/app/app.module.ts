import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './core/error-interceptor';
import { AuthInterceptorProvider } from './core/auth-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, DateAdapter
} from '@angular/material';

import { PessoaFisicaService } from './service/pessoa-fisica.service';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';

import { LoginComponent } from './login/login.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditUserResolver } from './user/edit-user/edit-user.resolver';
import { ChatComponent } from './chat/chat.component';

import { MAT_DATE_LOCALE } from '@angular/material';
import { CustomDateAdapter } from './custom.date.adapter';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
  ],
  providers: [
    AuthService,
    StorageService,
    PessoaFisicaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    EditUserResolver,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
