import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

// Root component
import { AppComponent } from './app.component';

// Authentication
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
    imports: [BrowserModule, HttpModule, ReactiveFormsModule],
    declarations: [AppComponent, AuthenticationComponent],
    bootstrap: [AppComponent],
    providers: [AuthenticationService]
})
export class AppModule { }