import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sensor } from './Sensor';
import { SensorService } from './sensor.service';
import { HouseService } from '../house/house.service';

@Component({
    selector: 'sensor-creation',
    templateUrl: './sensor-creation.component.html'
})
export class SensorCreationComponent implements OnInit {
    public sensorCreationFrom: FormGroup;

    public errorMessage: string;
    public hasAttempted: boolean;

    constructor(private _sensorService: SensorService, private _houseService: HouseService, private _router: Router, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        // TO-DO: Warn if the user doesn't have a house
        // Fill house dropdown
        this._houseService.getHouses().then((response) => {
            var hids = response.result.map((house) => house.hid);
            hids.forEach((hid) => $('#houseDropdown').append($('<option>').text(hid)));
        });        

        // Bind form
        this.sensorCreationFrom = this._formBuilder.group({
            sensorIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            houseIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            type: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            location: ["", Validators.compose([Validators.required, Validators.minLength(2)])], // Optional?
            attributes: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
        });
    };

    attemptSensorCreation(event: any) {
        this.hasAttempted = true;

        if (this.sensorCreationFrom.invalid)
            return;

        var formValues = this.sensorCreationFrom.value;

        this._sensorService.createSensor(<Sensor>{ sid: formValues.sensorIdentifier, hid: formValues.houseIdentifier, location: formValues.location, type: formValues.type, attributes: formValues.attributes.split(';') })
            .then(() => this._router.navigate(['sensor']))
            .catch((error) => this.errorMessage = error.errorMessage);
    }
}