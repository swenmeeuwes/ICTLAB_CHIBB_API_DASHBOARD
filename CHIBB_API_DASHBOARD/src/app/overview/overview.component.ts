import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'overview',
    templateUrl: 'app/overview/overview.component.html',
    styleUrls: ['app/overview/overview.component.css']
})
export class OverviewComponent {
    constructor(public authenticationService: AuthenticationService) { }
}