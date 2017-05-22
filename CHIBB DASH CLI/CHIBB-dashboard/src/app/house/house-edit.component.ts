import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { House } from './House';
import { HouseService } from './house.service';

@Component({
    selector: 'house-edit',
    templateUrl: './house-edit.component.html'
})
export class HouseEditComponent implements OnInit {    
    public houseEditFrom: FormGroup;

    public errorMessage: string;
    public hasAttempted: boolean;

    public hid: string;

    constructor(private _houseService: HouseService, private _router: Router, private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }
    
    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.hid = params['hid'];
        });

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

        this._houseService.editHouse(<House>{ hid: this.hid, address: formValues.address })
            .then(() => this._router.navigate(['house']))
            .catch((error) => this.errorMessage = error.errorMessage);
    }
}