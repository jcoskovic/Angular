import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpWrapperService } from './services/http-wrapper.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from  '@angular/material/icon';

@NgModule({
  declarations: [
    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
   
  ],
  providers: [
   
  ],
  bootstrap: []
})
export class AppModule { }