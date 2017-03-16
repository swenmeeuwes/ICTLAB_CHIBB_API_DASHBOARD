import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, AuthenticationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }