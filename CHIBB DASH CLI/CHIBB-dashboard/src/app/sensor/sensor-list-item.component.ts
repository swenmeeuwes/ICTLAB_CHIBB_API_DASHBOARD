import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from './sensor.service';
import { Sensor } from './Sensor';

@Component({
    selector: '<tr class="sensor-list-item" [sensor]></tr>',
    templateUrl: './sensor-list-item.component.html'
})
export class SensorListItemComponent {
    @Input() sensor: Sensor;

    constructor(private _router: Router) { }

    public viewSensor() {
        this._router.navigate(['/sensor/view'], { queryParams: { sid: this.sensor.sid } })
    }
}