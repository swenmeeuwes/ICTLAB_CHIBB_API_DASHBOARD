import { Injectable } from "@angular/core";
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

    private _timeoutDuration: number = 15000;

    constructor(private _http: Http, private _authenticationService: AuthenticationService, private _config: ConfigService) {
        this._apiUrl = _config.get('apiUrl');
    };

    getSensorTypes(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            this._http.get(`/assets/config/sensor-types.json`)
                .map(res => res.json())
                .subscribe((data) => {
                    resolve(data);
                });

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

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

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

    getSensorById(sid: string): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            // Can be removed since there is an auth guard?
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/id/${sid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

    getSensorsFromHouse(house: House): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/house/${house.hid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

    getLatestSensorDataById(sid: string): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            // Can be removed since there is an auth guard?
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/latest/${sid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

    getSensorDataWithinTimeframe(sid: string, startTime: number, endTime: number): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            // Can be removed since there is an auth guard?
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/data/${sid}/${startTime}/${endTime}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

    getSensorDataById(sid: string): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            // Can be removed since there is an auth guard?
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/data/${sid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
        return promise;
    }

    getSensorStatusById(sid: string): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            // Can be removed since there is an auth guard?
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}/sensor/status/${sid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data["result"] });
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
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
                    if (data.result.error)
                        reject({ errorMessage: data.result.error });
                    resolve(data["responseCode"]);
                },
                error => { reject({ errorMessage: error.json()["responseCode"] })},
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
    }

    deleteSensor(sensor: Sensor): Promise<any> {
        return new Promise((resolve, reject) => {
            var token = this._authenticationService.getToken();

            var resultObservable = this._http.delete(`${this._apiUrl}/sensor/${sensor.sid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    if (data.result.error)
                        reject({ errorMessage: data.result.error });
                    resolve(data["responseCode"]);
                },
                error => { reject({ errorMessage: error.json()["responseCode"] }) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after _timeoutDuration milliseconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), this._timeoutDuration);
        });
    }
}