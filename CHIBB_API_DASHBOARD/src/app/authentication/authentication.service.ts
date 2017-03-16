import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private _headers = new Headers({ 'Content-Type': 'application/json' });
    private _apiUrl = 'http://145.24.222.157:443/user';

    constructor(private _http: Http) { };

    isAutenticated(): boolean {
        return sessionStorage.getItem("token") !== null;
    }

    login(username: string, password: string): Observable<JSON> {
        const url = `${this._apiUrl}/login/`;
        var resultObservable = this._http.post(url, JSON.stringify({ username: username, password: password }), { headers: this._headers })
            .map((response) => response.json());
        resultObservable.subscribe(
            data => sessionStorage.setItem("token", data["result"]["token"]),
            error => { },
            () => { }
        );
        return resultObservable;
    }

    register(username: string, email: string, password: string): Observable<JSON> {
        const url = `${this._apiUrl}/register/`;
        return this._http.post(url, JSON.stringify({ username: username, email: email, password: password }), { headers: this._headers })
            .map((response) => response.json());
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}