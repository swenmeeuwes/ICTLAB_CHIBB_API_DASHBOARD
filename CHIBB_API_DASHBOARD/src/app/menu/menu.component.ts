import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'menu',
    templateUrl: 'app/menu/menu.component.html',
    styleUrls: ['app/menu/menu.component.css']
})
export class MenuComponent {
    constructor(public authenticationService: AuthenticationService) { }
}