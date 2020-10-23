import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExchangeComponent } from './components/exchange.component';
import { HttpClientModule } from "@angular/common/http";
import { ExchangePollingService } from "./services/exchange-polling.service";

@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ ExchangePollingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
