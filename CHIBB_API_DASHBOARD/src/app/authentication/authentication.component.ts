import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'authentication',
    templateUrl: 'app/authentication/authentication.component.html'
})
export class AuthenticationComponent implements OnInit {
    private _output: string = null;

    constructor(private _authenticationService: AuthenticationService) { };

    ngOnInit() {
        var isAuthenticated = this._authenticationService.isAutenticated();

        if (!isAuthenticated) {
            this._authenticationService.login("thatGuy", "somePassword")
                .subscribe(
                  data => this._output = data["result"]["token"],
                  error => console.error(error),
                  () => console.log("Request complete")
                );
        } else {
            this._output = "You are already logged in!";
        }
    }
}