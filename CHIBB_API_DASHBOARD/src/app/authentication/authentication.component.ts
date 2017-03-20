import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'authentication',
    templateUrl: 'app/authentication/authentication.component.html'
})
export class AuthenticationComponent implements OnInit {
    private _output: string = null;

    constructor(private _authenticationService: AuthenticationService, private _router: Router) { };

    ngOnInit() {
        var isAuthenticated = this._authenticationService.isAuthenticated();

        if (!isAuthenticated) {
            //this._authenticationService.login("thatGuy", "somePassword")
            //    .subscribe(
            //      data => this._output = data["result"]["token"],
            //      error => console.error(error),
            //      () => console.log("Request complete")
            //    );
            this._router.navigate(['authenticate/login']);
        } else {
            this._output = "you are already logged in!";
        }
    }
}