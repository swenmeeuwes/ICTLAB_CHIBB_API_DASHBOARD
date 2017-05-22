import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sensor } from './Sensor';
import { SensorService } from './sensor.service';

@Component({
    selector: 'sensor-creation',
    templateUrl: './sensor-creation.component.html'
})
export class SensorCreationComponent implements OnInit {
    public sensorCreationFrom: FormGroup;

    public errorMessage: string;
    public hasAttempted: boolean;

    constructor(private _sensorService: SensorService, private _router: Router, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        // Bind form
        this.sensorCreationFrom = this._formBuilder.group({
            sensorIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            houseIdentifier: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            type: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
            location: ["", Validators.compose([Validators.required, Validators.minLength(2)])] // Optional?
        });
    };

    attemptSensorCreation(event: any) {
        this.hasAttempted = true;

        if (this.sensorCreationFrom.invalid)
            return;

        var formValues = this.sensorCreationFrom.value;

        this._sensorService.createSensor(<Sensor>{ sid: formValues.sensorIdentifier, hid: formValues.houseIdentifier, location: formValues.location, type: formValues.type, attributes: [] })
            .then(() => this._router.navigate(['sensor']))
            .catch((error) => this.errorMessage = error.errorMessage);
    }
}