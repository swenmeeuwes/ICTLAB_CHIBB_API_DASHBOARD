import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Root component
import { AppComponent } from './app.component';

// Menu
import { MenuComponent } from './menu/menu.component';

// Overview
import { OverviewComponent } from './overview/overview.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// Authentication
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
// Authentication -> Login
import { AuthenticationLoginComponent } from './authentication/login/authentication-login.component';
// Authentication -> Register
import { AuthenticationRegisterComponent } from './authentication/register/authentication-register.component';

// House
import { HouseComponent } from './house/house.component';
import { HouseListComponent } from './house/house-list.component';
import { HouseCreationComponent } from './house/house-creation.component';
import { HouseService } from './house/house.service';

// Sensor
import { SensorComponent } from './sensor/sensor.component';
import { SensorService } from './sensor/sensor.service';

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
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'authenticate',
                component: AuthenticationComponent
            },
            {
                path: 'authenticate/login',
                component: AuthenticationLoginComponent
            },
            {
                path: 'authenticate/register',
                component: AuthenticationRegisterComponent
            },
            {
                path: 'house',
                component: HouseListComponent
            },
            {
                path: 'house/create',
                component: HouseCreationComponent
            },
            {
                path: 'sensor',
                component: SensorComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        OverviewComponent,
        DashboardComponent,
        AuthenticationComponent,
        AuthenticationLoginComponent,
        AuthenticationRegisterComponent,
        HouseComponent,
        HouseListComponent,
        HouseCreationComponent,
        SensorComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthenticationService,
        HouseService,
        SensorService
    ]
})
export class AppModule { }