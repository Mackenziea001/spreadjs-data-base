import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SpreadSheetsModule } from "@grapecity/spread-sheets-angular";
import { AppComponent } from './app.component';
import * as GC from "@grapecity/spread-sheets";

GC.Spread.Sheets.LicenseKey = "CE GrapeCity Testing,E657388347722541#B0AHrIdXTxIGVxY7NzhzMoFTMwFTSnl6Ma56btZkeatkcv3SU9V7YYZXU596S6ZGaFVVSu3CRpJ4Nv5kQ5tEZDJDbxN5aUZ6Kv36bYBzYwY6d0N4LvZDVhB7YrIUYVRWdM34dyZ4QkpWdB5EewE5bGdlRxZTUSlGZQ9mTt9UUvwUR6Q4dJxkM6cmYNplevpWQDhTYvUXSrJjeWZnapJ7ZvNTVDNEdVBXei36dxRDdzNXY9kDcYdmbJl6dqlnMqVVMXxkWiZTZspGUHtEZsx4dvkkY9l6KlB7SKFGW8hTezYneiNWZNJFRxZkI0IyUiwiIENjREZUR9IjI0ICSiwCN6gzM8ETNygTM0IicfJye&Qf35VfiU5TzYjI0IyQiwiIzEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsIiMwYTM5ADI7ETMwAjMwIjI0ICdyNkIsIyZulGdzVGVgkHdpNUZwFmcHBSRDJiOiEmTDJCLlVnc4pjIsZXRiwiIxQTNyIzN7QzM8gzM7UjNiojIklkIs4XZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34TUl5WaFNXczYUMUBlREF5QMZ7TihTNHpFSUlGZMR7K9ATM5oFb0dVd5hFVmp6QYF7dzFDN9gGby8ERZJGW6pWbQNnVSRHb4hWTSd5Y454SGFHMvJkajRUQvsWViNTZyE5ThZne8VjZx56Mym2Ot";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule, SpreadSheetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
