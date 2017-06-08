import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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
    public isAttempting: boolean;

    public hids: string[];
    public sensorTypes: string[];

    constructor(private _sensorService: SensorService, private _houseService: HouseService, private _router: Router, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        // TO-DO: Warn if the user doesn't have a house
        // Fill house dropdown
        this._houseService.getHouses().then(response => {
            this.hids = response.result.map((house) => house.hid);            
        });

        this._sensorService.getSensorTypes().then(response => {
            this.sensorTypes = response.types.map((sensorType) => sensorType.type); 
        });

        // Bind form
        this.sensorCreationFrom = this._formBuilder.group({
            sensorIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            houseIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            type: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            location: ["", Validators.compose([Validators.required, Validators.minLength(2)])], // Optional?
            attributes: ["timestamp;unit;value;sensorState;sensorBatteryLevel", Validators.compose([Validators.required, Validators.minLength(2)])]
        });

        // Disable attributes field for now -> disabling also removes the value :c
        //this.sensorCreationFrom.controls['attributes'].disable();
    };

    attemptSensorCreation(event: any) {
        this.hasAttempted = true;

        if (this.sensorCreationFrom.invalid)
            return;

        var formValues = this.sensorCreationFrom.value;

        if (!this.isAttempting) {
            this.isAttempting = true;
            this._sensorService.createSensor(<Sensor>{ sid: formValues.sensorIdentifier, hid: formValues.houseIdentifier, location: formValues.location, type: formValues.type, attributes: formValues.attributes.split(';') })
                .then(() => this._router.navigate(['sensor']))
                .catch((error) => {
                    this.errorMessage = error.errorMessage;
                    this.isAttempting = false;
                });
        }
    }
}