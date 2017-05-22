import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'authentication-login',
    templateUrl: './authentication-login.component.html'
})
export class AuthenticationLoginComponent implements OnInit {
    public loginForm: FormGroup;

    public errorMessage: string;
    public hasAttempted: boolean;
    public pending: boolean;

    constructor(private _authenticationService: AuthenticationService, private _router: Router, private _formBuilder: FormBuilder) { };

    ngOnInit() {
        if (this._authenticationService.isAuthenticated()) {
            // User is already authenticated, redirect him back
            this._router.navigate(['./authenticate']);
        }

        this.hasAttempted = false;
        this.pending = false;

        // Bind form
        this.loginForm = this._formBuilder.group({
            username: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    }

    attemptLogin(event: any) {
        this.hasAttempted = true;
        this.pending = true;

        if (this.loginForm.invalid) {
            this.pending = false;
            return;
        }

        var formValues = this.loginForm.value;

        this._authenticationService.login(formValues.username, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .then(() => this._router.navigate(['dashboard']))
            .catch((error) => {
                this.errorMessage = error.errorMessage;
                this.pending = false;
            });            
    }
}