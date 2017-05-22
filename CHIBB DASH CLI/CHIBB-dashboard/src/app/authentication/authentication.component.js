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
var router_1 = require("@angular/router");
var authentication_service_1 = require("./authentication.service");
var AuthenticationComponent = (function () {
    function AuthenticationComponent(_authenticationService, _router) {
        this._authenticationService = _authenticationService;
        this._router = _router;
        this._output = null;
    }
    ;
    AuthenticationComponent.prototype.ngOnInit = function () {
        var isAuthenticated = this._authenticationService.isAuthenticated();
        if (!isAuthenticated) {
            //this._authenticationService.login("thatGuy", "somePassword")
            //    .subscribe(
            //      data => this._output = data["result"]["token"],
            //      error => console.error(error),
            //      () => console.log("Request complete")
            //    );
            this._router.navigate(['authenticate/login']);
        }
        else {
            this._output = "you are already logged in!";
        }
    };
    return AuthenticationComponent;
}());
AuthenticationComponent = __decorate([
    core_1.Component({
        selector: 'authentication',
        templateUrl: 'app/authentication/authentication.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
], AuthenticationComponent);
exports.AuthenticationComponent = AuthenticationComponent;
//# sourceMappingURL=authentication.component.js.map