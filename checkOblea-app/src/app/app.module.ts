import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { QrFormComponent } from './components/qr-form/qr-form.component';
import { TablaComponent } from './components/tabla/tabla.component';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    QrFormComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
