﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { SensorService } from './sensor.service';
import { Sensor } from './Sensor';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'sensor',
    templateUrl: './sensor.component.html',
    styleUrls: ['./sensor.component.css']
})

export class SensorComponent implements OnInit {
    public sensor: Sensor;

    public errorMessage: string;
    public valueGraphReady: boolean;
    public sensorStatus: string;
    public currentBatteryLevel: number;

    private _valueGraphInitialized: boolean = false;
    private _valueGraph: any; // vis.Graph2d
    private _valueGraphDataset: any; // vis.DataSet

    private _pollTimer: any;

    constructor(private _sensorService: SensorService, private _router: Router, private _activatedRouter: ActivatedRoute) { }

    ngOnInit() {
        // Subscribe to router query parameters event
        this._activatedRouter.queryParams.subscribe((params: Params) => {
            this.initializePolling(params['sid']);
        });
    }

    initializePolling(sensorId: string) {
        // Clear polling interval if navigated from this component
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                new Promise((resolve, reject) => {
                    clearInterval(this._pollTimer);
                    resolve();
                });
            }
        });        

        this.retrieveSensorDataBySensorIdPeriod(sensorId, moment().subtract(5, "minute"), moment()).then(response => {
            this.initValueGraph('sensor-value-graph', response['result'].map((r) => {
                return {
                    x: new Date(r.timestamp),
                    y: r.value
                }
              })
            );            

            // Kick-off
            this.pollSensor(sensorId);

            // Further polling
            this._pollTimer = setInterval(() => {
                this.pollSensor(sensorId);
            }, 1000);
        }).catch(error => console.error(error));
    }

    pollSensor(sensorId: string) {
        var sensorDetailsPromise = this.retrieveSensorById(sensorId);
        var sensorDataPromise = this.retrieveLatestSensorDataBySensorId(sensorId);
        var sensorStatusPromise = this.retrieveSensorStatusBySensorId(sensorId);

        Promise.all([sensorDetailsPromise, sensorDataPromise, sensorStatusPromise]).then((promises) => {
            var statusResult = promises[2]['result'];
            this.currentBatteryLevel = statusResult['batteryLevel'];
            this.sensorStatus = statusResult['status'];

            var dataResult = promises[1]['result'];

            var sensorValueData = {
                x: new Date(dataResult.timestamp),
                y: dataResult.value
            };

            this.addRecordToValueGraph(sensorValueData);
        }).catch((error) => {
            if (!this._valueGraphInitialized)
                this.errorMessage = error;
            clearInterval(this._pollTimer);
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
                reject(error);
            })
        });
    }

    retrieveSensorDataBySensorIdPeriod(sid: string, startTime: number, endTime: number) {
        return new Promise((resolve, reject) => {
            this._sensorService.getSensorDataWithinTimeframe(sid, startTime, endTime).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    retrieveLatestSensorDataBySensorId(sid: string) {
        return new Promise((resolve, reject) => {
            this._sensorService.getLatestSensorDataById(sid).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    retrieveSensorStatusBySensorId(sid: string) {
        return new Promise((resolve, reject) => {
            this._sensorService.getSensorStatusById(sid).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    initValueGraph(containerId: string, data: Object) {
        var container = document.getElementById(containerId);

        if (container === undefined)
            return;

        this._valueGraphDataset = new vis.DataSet(data);

        var now = Date.now();

        var options = {
            start: new Date(now - 5 * 60 * 1000), // show latest 5 minutes worth of data
            end: new Date(),
            width: '100%',
            height: '400px',
            sort: false,
            sampling: false,
            style: 'points',
            drawPoints: {
                style: 'circle'
            },
            moveable: false
        };
        this._valueGraph = new vis.Graph2d(container, this._valueGraphDataset, options);

        this._valueGraphInitialized = true;
        this.valueGraphReady = true;
    }

    addRecordToValueGraph(record: Object) {
        this._valueGraph.setWindow(
            new Date(Date.now() - 5 * 60 * 1000), // show latest 5 minutes worth of data
            new Date()
        );
        if (record && record['x'] && record['y'])
          this._valueGraphDataset.add(record);
    }

    timestampToTime(unixTimestamp: number) {
        var date = new Date(unixTimestamp);

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
}