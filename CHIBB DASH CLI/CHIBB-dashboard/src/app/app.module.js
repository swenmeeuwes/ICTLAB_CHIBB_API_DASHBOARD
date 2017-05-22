"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// Config
var config_service_1 = require("./config/config.service");
// Modules
var platform_browser_1 = require("@angular/platform-browser");
var http_2 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
// Root component
var app_component_1 = require("./app.component");
// Menu
var menu_component_1 = require("./menu/menu.component");
// Overview
var overview_component_1 = require("./overview/overview.component");
// Dashboard
var dashboard_component_1 = require("./dashboard/dashboard.component");
// Authentication
var authentication_component_1 = require("./authentication/authentication.component");
var authentication_service_1 = require("./authentication/authentication.service");
// Authentication -> Login
var authentication_login_component_1 = require("./authentication/login/authentication-login.component");
// Authentication -> Register
var authentication_register_component_1 = require("./authentication/register/authentication-register.component");
// House
var house_component_1 = require("./house/house.component");
var house_list_component_1 = require("./house/house-list.component");
var house_creation_component_1 = require("./house/house-creation.component");
var house_edit_component_1 = require("./house/house-edit.component");
var house_service_1 = require("./house/house.service");
// Sensor
var sensor_component_1 = require("./sensor/sensor.component");
var sensor_list_component_1 = require("./sensor/sensor-list.component");
var sensor_creation_component_1 = require("./sensor/sensor-creation.component");
var sensor_service_1 = require("./sensor/sensor.service");
// Guards
// Authentication guard
var authentication_guard_service_1 = require("./authentication/authentication-guard.service");
function loadConfig(configService) {
    return function () { return configService.load(); };
}
exports.loadConfig = loadConfig;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_2.HttpModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    redirectTo: '/overview',
                    pathMatch: 'full'
                },
                {
                    path: 'overview',
                    component: overview_component_1.OverviewComponent
                },
                {
                    path: 'dashboard',
                    canActivate: [authentication_guard_service_1.AuthenticationGuard],
                    component: dashboard_component_1.DashboardComponent
                },
                {
                    path: 'authenticate',
                    component: authentication_component_1.AuthenticationComponent
                },
                // Apply children?
                {
                    path: 'authenticate/login',
                    component: authentication_login_component_1.AuthenticationLoginComponent
                },
                {
                    path: 'authenticate/register',
                    component: authentication_register_component_1.AuthenticationRegisterComponent
                },
                {
                    path: 'house',
                    canActivate: [authentication_guard_service_1.AuthenticationGuard],
                    component: house_list_component_1.HouseListComponent
                },
                {
                    path: 'house/create',
                    canActivate: [authentication_guard_service_1.AuthenticationGuard],
                    component: house_creation_component_1.HouseCreationComponent
                },
                {
                    path: 'house/edit',
                    canActivate: [authentication_guard_service_1.AuthenticationGuard],
                    component: house_edit_component_1.HouseEditComponent
                },
                {
                    path: 'sensor',
                    canActivate: [authentication_guard_service_1.AuthenticationGuard],
                    component: sensor_component_1.SensorComponent
                },
                {
                    path: 'sensor/create',
                    canActivate: [authentication_guard_service_1.AuthenticationGuard],
                    component: sensor_creation_component_1.SensorCreationComponent
                }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            menu_component_1.MenuComponent,
            overview_component_1.OverviewComponent,
            dashboard_component_1.DashboardComponent,
            authentication_component_1.AuthenticationComponent,
            authentication_login_component_1.AuthenticationLoginComponent,
            authentication_register_component_1.AuthenticationRegisterComponent,
            house_component_1.HouseComponent,
            house_list_component_1.HouseListComponent,
            house_creation_component_1.HouseCreationComponent,
            house_edit_component_1.HouseEditComponent,
            sensor_component_1.SensorComponent,
            sensor_list_component_1.SensorListComponent,
            sensor_creation_component_1.SensorCreationComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            authentication_service_1.AuthenticationService,
            house_service_1.HouseService,
            sensor_service_1.SensorService,
            authentication_guard_service_1.AuthenticationGuard,
            config_service_1.ConfigService,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: loadConfig,
                deps: [config_service_1.ConfigService, http_1.Http],
                multi: true
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map