import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { House } from './House';
import { HouseService } from './house.service';

@Component({
    selector: 'house-creation',
    templateUrl: 'app/house/house-creation.component.html'
})
export class HouseCreationComponent implements OnInit {
    public houseCreationFrom: FormGroup;

    public errorMessage: string;
    public hasAttempted: boolean;

    constructor(private _houseService: HouseService, private _router: Router, private _formBuilder: FormBuilder) { }
    
    ngOnInit() {
        // Bind form
        this.houseCreationFrom = this._formBuilder.group({
            houseIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            address: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    };

    attemptHouseCreation(event: any) {
        this.hasAttempted = true;

        if (this.houseCreationFrom.invalid)
            return;

        var formValues = this.houseCreationFrom.value;

        this._houseService.createHouse(<House>{ hid: formValues.houseIdentifier, address: formValues.address }) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .then(() => this._router.navigate(['house']))
            .catch((error) => this.errorMessage = error.errorMessage);
    }
}