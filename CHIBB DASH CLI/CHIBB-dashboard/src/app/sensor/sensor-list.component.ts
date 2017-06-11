import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from './sensor.service';
import { Sensor } from './Sensor';

@Component({
    selector: 'sensor-list',
    templateUrl: './sensor-list.component.html',
    styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
    public sensors: Sensor[];

    constructor(private _sensorService: SensorService, private _router: Router) { }

    ngOnInit() {
        this._refreshList();
    }

    private _refreshList() {
        this._sensorService.getSensors().then((response) => {
            // Sensors, sorted on sid
            this.sensors = response['result'].sort((a, b) => {
                if (a.sid < b.sid)
                    return -1;
                if (a.sid > b.sid)
                    return 1;
                return 0;
            });

            // Retrieve status + battery level for each sensor
            this.sensors.forEach((sensor) => {
                this._sensorService.getSensorStatusById(sensor.sid).then((response) => {
                    var result = response['result'];
                    sensor.status = result.status;
                    sensor.batteryLevel = result.batteryLevel;
                });
            });
        });
    }

    public createSensor() {
        this._router.navigate(['sensor/create']);
    }

    public onNotify(event: any) {
        switch (event) {
            case 'Refresh':
                this._refreshList();
                break;
        }
    }
}