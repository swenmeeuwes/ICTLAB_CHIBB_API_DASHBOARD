﻿import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'authentication-register',
    templateUrl: './authentication-register.component.html'
})
export class AuthenticationRegisterComponent implements OnInit {
    public registrationForm: FormGroup;

    public hasRegistered: boolean;
    public hasAttempted: boolean;

    public errorMessage: string;

    private _isBusy: boolean = false;

    constructor(private _authenticationService: AuthenticationService, private _router: Router, private _formBuilder: FormBuilder) { };

    ngOnInit() {
        if (this._authenticationService.isAuthenticated()) {
            // User is already authenticated, redirect him back
            this._router.navigate(['./authenticate']);
        }

        this.hasRegistered = false;
        this.hasAttempted = false;

        // Bind form
        this.registrationForm = this._formBuilder.group({
            email: ["", Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
            username: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    }

    attemptRegister(event: any) {
        this.hasAttempted = true;

        if (this.registrationForm.invalid || this._isBusy)
            return;

        this._isBusy = true;

        var formValues = this.registrationForm.value;

        this._authenticationService.register(formValues.username, formValues.email, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .then(() => this.hasRegistered = true)
            .catch((error) => {
                this.errorMessage = error.errorMessage;
                this._isBusy = false
            });
    }
}