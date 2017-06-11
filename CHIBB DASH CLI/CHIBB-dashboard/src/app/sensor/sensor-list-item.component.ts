import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from './sensor.service';
import { Sensor } from './Sensor';

@Component({
    selector: '<tr class="sensor-list-item" [sensor]></tr>',
    templateUrl: './sensor-list-item.component.html'
})
export class SensorListItemComponent {
    @Input() sensor: Sensor;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _router: Router, private _sensorService: SensorService) { }

    public viewSensor() {
        this._router.navigate(['/sensor/view'], { queryParams: { sid: this.sensor.sid } })
    }

    public promptDeleteSensor(sensor: Sensor) {
        document.getElementById("openDeleteModalButton" + sensor.sid).click();
    }

    public deleteSensor(sensor: Sensor) {
        this._sensorService.deleteSensor(sensor).then(() => {
            this.notify.emit('Refresh');
        });
    }
}