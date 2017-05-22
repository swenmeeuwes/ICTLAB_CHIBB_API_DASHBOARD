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
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../authentication.service");
var AuthenticationLoginComponent = (function () {
    function AuthenticationLoginComponent(_authenticationService, _router, _formBuilder) {
        this._authenticationService = _authenticationService;
        this._router = _router;
        this._formBuilder = _formBuilder;
    }
    ;
    AuthenticationLoginComponent.prototype.ngOnInit = function () {
        if (this._authenticationService.isAuthenticated()) {
            // User is already authenticated, redirect him back
            this._router.navigate(['./authenticate']);
        }
        this.hasAttempted = false;
        this.pending = false;
        // Bind form
        this.loginForm = this._formBuilder.group({
            username: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
            password: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])]
        });
    };
    AuthenticationLoginComponent.prototype.attemptLogin = function (event) {
        var _this = this;
        this.hasAttempted = true;
        this.pending = true;
        if (this.loginForm.invalid) {
            this.pending = false;
            return;
        }
        var formValues = this.loginForm.value;
        this._authenticationService.login(formValues.username, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .then(function () { return _this._router.navigate(['dashboard']); })
            .catch(function (error) {
            _this.errorMessage = error.errorMessage;
            _this.pending = false;
        });
    };
    return AuthenticationLoginComponent;
}());
AuthenticationLoginComponent = __decorate([
    core_1.Component({
        selector: 'authentication-login',
        templateUrl: 'app/authentication/login/authentication-login.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, forms_1.FormBuilder])
], AuthenticationLoginComponent);
exports.AuthenticationLoginComponent = AuthenticationLoginComponent;
//# sourceMappingURL=authentication-login.component.js.map