﻿import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class Config {
    private _config: Object // Environment specific configuration
    private _environment: Object // Shared configuration

    constructor(private http: Http) { }

    load() {      
        return new Promise((resolve, reject) => {
            // Load environment.json
            this.http.get('src/app/config/environment.json')
            .map(res => res.json())
                .subscribe((environment_data) => {
                // When the loading is done load the config according to the enviroment specificied
                this._environment = environment_data;
                this.http.get(`src/app/config/${this._environment['environment']}.json`)
                .map(res => res.json())
                .subscribe((data) => {
                    this._config = data;
                    resolve(true);
                });
            });
        });
    }

    getEnvironment(key: string) {
        return this._environment[key];
    }

    get(key: string) {
        return this._config[key];
    }
};