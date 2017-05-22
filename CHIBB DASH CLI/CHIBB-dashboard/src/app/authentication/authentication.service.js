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
var config_service_1 = require("../config/config.service");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var AuthenticationService = (function () {
    function AuthenticationService(_http, _config) {
        this._http = _http;
        this._config = _config;
        this._headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._apiUrl = _config.get('apiUrl');
    }
    ;
    AuthenticationService.prototype.getUsername = function () {
        return sessionStorage.getItem("username");
    };
    AuthenticationService.prototype.getToken = function () {
        return sessionStorage.getItem("token");
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return sessionStorage.getItem("token") !== null;
    };
    AuthenticationService.prototype.logout = function () {
        if (!this.isAuthenticated())
            return false;
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        return true;
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this._apiUrl + "/user/login/";
            var resultObservable = _this._http.post(url, JSON.stringify({ username: username, password: password }), { headers: _this._headers })
                .map(function (response) { return response.json(); });
            resultObservable.subscribe(function (data) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("token", data["result"]["token"]);
                resolve();
            }, function (error) {
                if (error.ok)
                    reject({ errorMessage: error.json()["result"]["errorMessage"] });
                else
                    reject({ errorMessage: "Oops, something went wrong!" });
            }, function () { clearTimeout(timeout); });
            // Timeout after 15 seconds
            var timeout = setTimeout(function () { return reject({ errorMessage: "Timed-out" }); }, 15000);
        });
        return promise;
    };
    AuthenticationService.prototype.register = function (username, email, password) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this._apiUrl + "/user/register/";
            var resultObservable = _this._http.post(url, JSON.stringify({ username: username, email: email, password: password }), { headers: _this._headers })
                .map(function (response) { return response.json(); });
            resultObservable.subscribe(function (data) {
                resolve();
            }, function (error) { reject({ errorMessage: error.json()["result"]["message"] }); }, function () { clearTimeout(timeout); });
            // Timeout after 15 seconds
            var timeout = setTimeout(function () { return reject({ errorMessage: "Timed-out" }); }, 15000);
        });
        return promise;
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map