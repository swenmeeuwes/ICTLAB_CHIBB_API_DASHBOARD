﻿import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { Sensor } from './Sensor';
import { House } from '../house/House';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorService {
    private _headers = new Headers({ 'Content-Type': 'application/json' });
    private _apiUrl: string;

    constructor(private _http: Http, private _authenticationService: AuthenticationService, private _config: ConfigService) {
        this._apiUrl = _config.get('apiUrl');
    };

    getSensors(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });
        return promise;
    }

    getSensorsFromHouse(house: House): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/${house.hid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });
        return promise;
    }

    createSensor(sensor: Sensor): Promise<any> {
        return new Promise((resolve, reject) => {
            var token = this._authenticationService.getToken();

            var resultObservable = this._http.post(`${this._apiUrl}/sensor?token=${token}`, sensor, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve(data["responseCode"]);
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });
    }
}