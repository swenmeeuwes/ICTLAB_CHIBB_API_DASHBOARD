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
    public sensorStatus: Object; // {text, status}
    public currentBatteryLevel: number;

    private _valueGraphInitialized: boolean = false;
    private _valueGraph: any; // vis.Graph2d
    private _valueGraphDataset: any; // vis.DataSet

    private _pollTimer: any;

    constructor(private _sensorService: SensorService, private _router: Router, private _activatedRouter: ActivatedRoute) { }

    ngOnInit() {
        this.sensorStatus = {
            text: "",
            status: ""
        };

        // Subscribe to router query parameters event
        this._activatedRouter.queryParams.subscribe((params: Params) => {
            this.initializePolling(params['sid']);
        });
    }

    initializePolling(sensorId: string) {
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                new Promise((resolve, reject) => {
                    clearInterval(this._pollTimer);
                    resolve();
                });                
            }
        });

        // Kick-off
        this.pollSensor(sensorId);

        // Further polling
        this._pollTimer = setInterval(() => {
            this.pollSensor(sensorId);
        }, 1000);
    }

    pollSensor(sensorId: string) {
        var sensorDetailsPromise = this.retrieveSensorById(sensorId);
        var sensorDataPromise = this.retrieveSensorDataBySensorId(sensorId);

        Promise.all([sensorDetailsPromise, sensorDataPromise]).then((promises) => {
            var dataResult = promises[1]['result'];
            var latestResult = dataResult[0]; // ASSUMPTION: First entry is always the latest

            if (latestResult) {
                this.currentBatteryLevel = latestResult['sensorBatteryLevel'];
                this.sensorStatus = this.computeSensorHealth(latestResult['timestamp']);
            } else {
                // Sensor is new and has not send any data yet
                this.sensorStatus = {
                    text: "Clean - No data",
                    status: "New"
                }
            }

            var sensorValueData = dataResult.map((r) => {
                return {
                    x: new Date(r.timestamp),
                    y: r.value
                }
            });
            if (!this._valueGraphInitialized)
                this.initValueGraph('sensor-value-graph', sensorValueData);
            else
                this.addRecordToValueGraph(sensorValueData[0]);
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

        if (container === undefined)
            return;

        this._valueGraphDataset = new vis.DataSet(data);

        var now = Date.now();

        var options = {
            start: new Date(now - 1 * 60 * 1000), // show latest minute worth of data
            end: new Date(),
            width: '100%',
            height: '400px',
            style: 'line',
            drawPoints: {
                style: 'circle'
            },
            shaded: {
                orientation: 'bottom'
            }
        };
        this._valueGraph = new vis.Graph2d(container, this._valueGraphDataset, options);

        this._valueGraphInitialized = true;
        this.valueGraphReady = true;
    }

    addRecordToValueGraph(record: Object) {
        this._valueGraph.setWindow(
            new Date(Date.now() - 1 * 60 * 1000), // show latest minute worth of data
            new Date()
        );
        this._valueGraphDataset.add(record);
    }

    timestampToTime(unixTimestamp: number) {
        var date = new Date(unixTimestamp);

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    computeSensorHealth(lastestRecordTimestamp: number) {
        var status = {
            text: "Healthy",
            status: "Stable"
        };
        var now = Date.now();

        // If the last record was 30 seconds from now -> sensor probably died
        if (lastestRecordTimestamp < now - 30 * 1000)
            status = {
                text: "No response",
                status: "Danger"
            }

        return status;
    }
}