import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../sensor/sensor.service';

@Component({
    selector: 'sensor-health-tile',
    templateUrl: './sensor-health-tile.component.html',
    styleUrls: ['./tile.component.css', './sensor-health-tile.component.css']
})

export class SensorHealthTile implements OnInit {
    public init: boolean;

    public amountOfSensors: number;
    public amountOfHealthySensors: number;     

    constructor(private _sensorService: SensorService) { }

    ngOnInit() {
        this._sensorService.getSensors().then((response) => {
            this.amountOfSensors = response.result.length;
            var sensorIds = response.result.map((sensor) => { return sensor.sid; });

            var sensorStatusPromises = [];
            sensorIds.forEach((sid) => {
                sensorStatusPromises.push(
                    this._sensorService.getSensorStatusById(sid)
                );
            });

            Promise.all(sensorStatusPromises).then((responses) => {
                var statusses = responses.map((r) => { return r.result; });                
                this.amountOfHealthySensors = statusses.filter((report) => { return report.status === "Active" || report.status === "Clean" }).length;

                this.init = true;
            });
        });        
    }
}