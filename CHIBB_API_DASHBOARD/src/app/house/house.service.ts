import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Sensor } from '../sensor/Sensor';
import { Observable } from 'rxjs/Observable';
import { House } from './House';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HouseService {
    private _headers = new Headers({ 'Content-Type': 'application/json' });
    private _apiUrl = 'http://145.24.222.157:443/house';

    constructor(private _http: Http, private _authenticationService: AuthenticationService) { };

    getHouses(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({ result: data.result });                    
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });
        return promise;
    }

    deleteHouse(house: House): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.delete(`${this._apiUrl}/${house.uid}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    console.log(data);
                    resolve(data["responseCode"]);
                },
                error => { reject(error.json()["responseCode"]) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });
        return promise;
    }
}