import { Component, OnInit } from '@angular/core';
import { SensorService } from './sensor.service';

@Component({
    selector: 'sensor',
    templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit {
    constructor(private _sensorService: SensorService) { }

    ngOnInit() {
        this._sensorService.getSensors().then((data) => {
            console.log(data);
        });
    };
}