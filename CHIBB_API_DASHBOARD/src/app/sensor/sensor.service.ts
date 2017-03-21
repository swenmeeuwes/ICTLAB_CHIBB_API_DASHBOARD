import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorService {
    private _headers = new Headers({ 'Content-Type': 'application/json' });
    private _apiUrl = 'http://145.24.222.157:443/sensor';

    constructor(private _http: Http, private _authenticationService: AuthenticationService) { };

    getSensors(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            if (!this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });

            var token = this._authenticationService.getToken();

            var resultObservable = this._http.get(`${this._apiUrl}?token=${token}`, { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve({result: data.result});
                },
                error => { reject({ errorMessage: error.json()["result"]["message"] }) },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });
        return promise;
    }
}