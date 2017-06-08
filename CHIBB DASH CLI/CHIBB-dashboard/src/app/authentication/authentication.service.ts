import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private _headers = new Headers({ 'Content-Type': 'application/json' });
    private _apiUrl: string;

    constructor(private _http: Http, private _config: ConfigService) {
        this._apiUrl = _config.get('apiUrl');
    };

    getUsername(): string {
        return sessionStorage.getItem("username");
    }

    getToken(): string {
        return sessionStorage.getItem("token");
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem("token") !== null;
    }

    logout(): boolean {
        if (!this.isAuthenticated())
            return false;

        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        return true;
    }

    login(username: string, password: string): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            const url = `${this._apiUrl}/user/login/`;
            var resultObservable = this._http.post(url, JSON.stringify({ username: username, password: password }), { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {                    
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("token", data["result"]["token"]);
                    resolve();
                },
                error => {
                    if (error.json()["message"])
                        reject({ errorMessage: error.json()["message"] });
                    else
                        reject({ errorMessage: "Oops, something went wrong!" });                    
                },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });

        return promise;
    }

    register(username: string, email: string, password: string): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            const url = `${this._apiUrl}/user/register/`;
            var resultObservable = this._http.post(url, JSON.stringify({ username: username, email: email, password: password }), { headers: this._headers })
                .map((response) => response.json());

            resultObservable.subscribe(
                data => {
                    resolve();
                },
                error => {
                    if (error.json()["message"])
                        reject({ errorMessage: error.json()["message"] });
                    else
                        reject({ errorMessage: "Oops, something went wrong!" });  
                },
                () => { clearTimeout(timeout); }
            );

            // Timeout after 15 seconds
            var timeout = setTimeout(() => reject({ errorMessage: "Timed-out" }), 15000);
        });

        return promise;
    }
}