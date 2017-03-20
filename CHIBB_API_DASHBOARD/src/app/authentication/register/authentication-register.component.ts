import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'authentication-register',
    templateUrl: 'app/authentication/register/authentication-register.component.html'
})
export class AuthenticationRegisterComponent implements OnInit {
    public registrationForm: FormGroup;
    public hasRegistered: boolean;

    constructor(private _authenticationService: AuthenticationService, private _router: Router, private _formBuilder: FormBuilder) { };

    ngOnInit() {
        if (this._authenticationService.isAutenticated()) {
            // User is already authenticated, redirect him back
            this._router.navigate(['./authenticate']);
        }

        this.hasRegistered = false;

        // Bind form
        this.registrationForm = this._formBuilder.group({
            email: ["", Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
            username: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    }

    attemptRegister(event: any) {
        if (this.registrationForm.invalid)
            return;

        var formValues = this.registrationForm.value;

        this._authenticationService.register(formValues.username, formValues.email, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .subscribe(
            data => {
                console.log(data.status);
                //this._router.navigate(['./authenticate/login']);
                this.hasRegistered = true;
            },
            error => {
                // To-do: Show feedback
                console.error(error.json()["result"]["message"])
            },
            () => { }
            );
    }
}