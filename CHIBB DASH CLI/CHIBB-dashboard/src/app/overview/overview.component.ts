import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
    constructor(public authenticationService: AuthenticationService) { }
}