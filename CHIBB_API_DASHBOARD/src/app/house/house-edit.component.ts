import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { House } from './House';
import { HouseService } from './house.service';

@Component({
    selector: 'house-edit',
    templateUrl: 'app/house/house-edit.component.html'
})
export class HouseEditComponent implements OnInit {
    @Input() public selectedHouse: House;

    public houseEditFrom: FormGroup;

    public errorMessage: string;
    public hasAttempted: boolean;

    constructor(private _houseService: HouseService, private _router: Router, private _formBuilder: FormBuilder) { }
    
    ngOnInit() {
        console.log(this.selectedHouse);

        // Bind form
        this.houseEditFrom = this._formBuilder.group({            
            address: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    };

    attemptHouseEdit(event: any) {
        this.hasAttempted = true;

        if (this.houseEditFrom.invalid)
            return;

        var formValues = this.houseEditFrom.value;

        this._houseService.editHouse(<House>{ hid: formValues.houseIdentifier, address: formValues.address })
            .then(() => this._router.navigate(['house']))
            .catch((error) => this.errorMessage = error.errorMessage);
    }
}