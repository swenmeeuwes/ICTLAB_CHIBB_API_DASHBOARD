import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Root component
import { AppComponent } from './app.component';

// Overview
import { OverviewComponent } from './overview/overview.component';

// Authentication
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                component: OverviewComponent
            },
            {
                path: 'authenticate',
                component: AuthenticationComponent
            }
        ])
    ],
    declarations: [AppComponent, AuthenticationComponent, OverviewComponent],
    bootstrap: [AppComponent],
    providers: [AuthenticationService]
})
export class AppModule { }