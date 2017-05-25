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

    private valueGraphInitialized: boolean = false;

    constructor(private _sensorService: SensorService, private _activatedRouter: ActivatedRoute) { }

    ngOnInit() {
        // Subscribe to router query parameters event
        this._activatedRouter.queryParams.subscribe((params: Params) => {            
            var sensorDetailsPromise = this.retrieveSensorById(params['sid']);
            var sensorDataPromise = this.retrieveSensorDataBySensorId(params['sid']);

            Promise.all([sensorDetailsPromise, sensorDataPromise]).then((promises) => {
                var sensorValueData = promises[1]['result'].map((r) => {
                    return {
                        x: new Date(r.timestamp),
                        y: r.value
                    }
                });
                this.initValueGraph('sensor-value-graph', sensorValueData);
            });
        });
    }

    retrieveSensorById(sid: string) {
        return new Promise((resolve, reject) => {
            this._sensorService.getSensorById(sid).then((data) => {
                if (data.result.length === 0) {
                    this.errorMessage = `There is no sensor that belongs to you with the id: '${sid}'.`;
                    reject(this.errorMessage);
                } else {
                    this.sensor = <Sensor>data.result[0];
                    resolve(this.sensor);
                }
            });
        });        
    }

    retrieveSensorDataBySensorId(sid: string) {
        return new Promise((resolve, reject) => {
            this._sensorService.getSensorDataById(sid).then((data) => {
                resolve(data);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        });
    }

    initValueGraph(containerId: string, data: Object) {
        var container = document.getElementById(containerId);

        var dataset = new vis.DataSet(data);

        var now = new Date();
        var start = now;
        var end = this.timestampToTime(new Date().getTime());

        var options = {
            //start: new Date(),
            //end: new Date(),
            width: '100%',
            height: '400px',
            style: 'line',
            drawPoints: {
                style: 'circle'
            }
        };
        var Graph2d = new vis.Graph2d(container, dataset, options);
    }

    timestampToTime(unixTimestamp: number) {
        var date = new Date(unixTimestamp);

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
}