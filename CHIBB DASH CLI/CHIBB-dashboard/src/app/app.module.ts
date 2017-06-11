import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Config
import { ConfigService } from './config/config.service';

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
// Dashboard -> Network
import { NetworkComponent } from './dashboard/network/network.component';
// Dashboard -> Tile
import { SensorHealthTile } from './dashboard/tiles/sensor-health-tile.component';
import { HouseTile } from './dashboard/tiles/house-tile.component';
import { CorrelateTile } from './dashboard/tiles/correlate-tile.component';

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
import { HouseEditComponent } from './house/house-edit.component';
import { HouseService } from './house/house.service';

// Sensor
import { SensorComponent } from './sensor/sensor.component';
import { SensorListComponent } from './sensor/sensor-list.component';
import { SensorListItemComponent } from './sensor/sensor-list-item.component';
import { SensorCreationComponent } from './sensor/sensor-creation.component';
import { SensorService } from './sensor/sensor.service';

// Analyses
import { CorrelationComponent } from './analyses/correlation.component';

// Guards
// Authentication guard
import { AuthenticationGuard } from './authentication/authentication-guard.service';

export function loadConfig(configService: ConfigService): Function {
    return () => configService.load();
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
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
                canActivate: [AuthenticationGuard],
                component: DashboardComponent
            },
            {
                path: 'authenticate',
                component: AuthenticationComponent
            },
            // Apply children?
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
                canActivate: [AuthenticationGuard],
                component: HouseListComponent
            },
            {
                path: 'house/create',
                canActivate: [AuthenticationGuard],
                component: HouseCreationComponent
            },
            {
                path: 'house/edit',
                canActivate: [AuthenticationGuard],
                component: HouseEditComponent
            },
            {
                path: 'sensor',
                canActivate: [AuthenticationGuard],
                component: SensorListComponent
            },
            {
                path: 'sensor/view',
                canActivate: [AuthenticationGuard],
                component: SensorComponent
            },            
            {
                path: 'sensor/create',
                canActivate: [AuthenticationGuard],
                component: SensorCreationComponent
            },
            {
                path: 'correlate',
                canActivate: [AuthenticationGuard],
                component: CorrelationComponent
            },
            {
                path: '**',
                redirectTo: '/overview',
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        OverviewComponent,
        DashboardComponent,        
        NetworkComponent,
        SensorHealthTile,
        HouseTile,
        CorrelateTile,
        AuthenticationComponent,
        AuthenticationLoginComponent,
        AuthenticationRegisterComponent,
        HouseComponent,
        HouseListComponent,
        HouseCreationComponent,
        HouseEditComponent,
        SensorComponent,
        SensorListComponent,
        SensorListItemComponent,
        SensorCreationComponent,
        CorrelationComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthenticationService,
        HouseService,
        SensorService,
        AuthenticationGuard,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [ConfigService],
            multi: true
        }
    ]
})
export class AppModule { }