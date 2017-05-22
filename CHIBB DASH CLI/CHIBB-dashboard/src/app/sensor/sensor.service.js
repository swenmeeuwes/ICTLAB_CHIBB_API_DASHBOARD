"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var authentication_service_1 = require("../authentication/authentication.service");
var config_service_1 = require("../config/config.service");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var SensorService = (function () {
    function SensorService(_http, _authenticationService, _config) {
        this._http = _http;
        this._authenticationService = _authenticationService;
        this._config = _config;
        this._headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._apiUrl = _config.get('apiUrl');
    }
    ;
    SensorService.prototype.getSensors = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (!_this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });
            var token = _this._authenticationService.getToken();
            var resultObservable = _this._http.get(_this._apiUrl + "/sensor?token=" + token, { headers: _this._headers })
                .map(function (response) { return response.json(); });
            resultObservable.subscribe(function (data) {
                resolve({ result: data["result"] });
            }, function (error) { reject(error.json()["responseCode"]); }, function () { clearTimeout(timeout); });
            // Timeout after 15 seconds
            var timeout = setTimeout(function () { return reject({ errorMessage: "Timed-out" }); }, 15000);
        });
        return promise;
    };
    SensorService.prototype.getSensorsFromHouse = function (house) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (!_this._authenticationService.isAuthenticated())
                reject({ errorMessage: "Not authenticated" });
            var token = _this._authenticationService.getToken();
            var resultObservable = _this._http.get(_this._apiUrl + "/sensor/" + house.hid + "?token=" + token, { headers: _this._headers })
                .map(function (response) { return response.json(); });
            resultObservable.subscribe(function (data) {
                resolve({ result: data["result"] });
            }, function (error) { reject(error.json()["responseCode"]); }, function () { clearTimeout(timeout); });
            // Timeout after 15 seconds
            var timeout = setTimeout(function () { return reject({ errorMessage: "Timed-out" }); }, 15000);
        });
        return promise;
    };
    SensorService.prototype.createSensor = function (sensor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var token = _this._authenticationService.getToken();
            var resultObservable = _this._http.post(_this._apiUrl + "/sensor?token=" + token, sensor, { headers: _this._headers })
                .map(function (response) { return response.json(); });
            resultObservable.subscribe(function (data) {
                resolve(data["responseCode"]);
            }, function (error) { reject(error.json()["responseCode"]); }, function () { clearTimeout(timeout); });
            // Timeout after 15 seconds
            var timeout = setTimeout(function () { return reject({ errorMessage: "Timed-out" }); }, 15000);
        });
    };
    return SensorService;
}());
SensorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService, config_service_1.ConfigService])
], SensorService);
exports.SensorService = SensorService;
//# sourceMappingURL=sensor.service.js.map