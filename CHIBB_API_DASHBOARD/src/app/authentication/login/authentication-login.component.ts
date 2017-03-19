import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'authentication-login',
    templateUrl: 'app/authentication/login/authentication-login.component.html'
})
export class AuthenticationLoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private _authenticationService: AuthenticationService, private _router: Router, private _formBuilder: FormBuilder) { };

    ngOnInit() {
        if (this._authenticationService.isAutenticated()) {
            // User is already authenticated, redirect him back
            this._router.navigate(['./authentication']);
        }

        // Bind form
        this.loginForm = this._formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    attemptLogin(event: any) {
        if (this.loginForm.invalid) {
            // Form is invalid
            console.warn("Invalid form!");
            for (var formControl in this.loginForm.controls) {
                if (this.loginForm.controls[formControl].invalid) {
                    // To-do: Show feedback ...
                    console.warn(`Please fill in the ${formControl} field`);
                }
            }
            return;
        }

        var formValues = this.loginForm.value;

        this._authenticationService.login(formValues.username, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .subscribe(
            data => {
                console.log(data["result"]["token"]);
                this._router.navigate(['./authentication']);
            },
            error => {
                // To-do: Show feedback
                console.error(error.json()["result"]["message"])
            },
            () => { }
            );

        // If promise
        //this._authenticationService.login(formValues.username, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
        //    .then(function (data) {
        //        this._router.navigate(['./authentication']);
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    });
    }
}