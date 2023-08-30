import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent,ErrorMessagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgIf,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
