import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SensorService } from './sensor.service';
import { Sensor } from './Sensor';

@Component({
    selector: 'sensor',
    templateUrl: './sensor.component.html',
    styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
    public sensor: Sensor;

    public errorMessage: string;

    constructor(private _sensorService: SensorService, private _activatedRouter: ActivatedRoute) { }

    ngOnInit() {
        // Subscribe to router query parameters event
        this._activatedRouter.queryParams.subscribe((params: Params) => {            
            this.retrieveSensorById(params['sid']);
            //this.retrieveSensorDataBySensorId(params['sid']);
        });
    };

    retrieveSensorById(sid: string) {
        this._sensorService.getSensorById(sid).then((data) => {
            if (data.result.length === 0) {
                this.errorMessage = `There is no sensor that belongs to you with the id: '${sid}'.`;
            } else {
                this.sensor = <Sensor>data.result[0];
            }
        });
    }

    retrieveSensorDataBySensorId(sid: string) {
        this._sensorService.getSensorDataById(sid).then((data) => {
            console.log(data);
        });
    }
}