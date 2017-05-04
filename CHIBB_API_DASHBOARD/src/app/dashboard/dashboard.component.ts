import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent {
    constructor(public authenticationService: AuthenticationService) { }
}