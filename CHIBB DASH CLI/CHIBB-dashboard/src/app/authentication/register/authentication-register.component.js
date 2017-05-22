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
var AuthenticationRegisterComponent = (function () {
    function AuthenticationRegisterComponent(_authenticationService, _router, _formBuilder) {
        this._authenticationService = _authenticationService;
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._isBusy = false;
    }
    ;
    AuthenticationRegisterComponent.prototype.ngOnInit = function () {
        if (this._authenticationService.isAuthenticated()) {
            // User is already authenticated, redirect him back
            this._router.navigate(['./authenticate']);
        }
        this.hasRegistered = false;
        this.hasAttempted = false;
        // Bind form
        this.registrationForm = this._formBuilder.group({
            email: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
            username: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
            password: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])]
        });
    };
    AuthenticationRegisterComponent.prototype.attemptRegister = function (event) {
        var _this = this;
        this.hasAttempted = true;
        if (this.registrationForm.invalid || this._isBusy)
            return;
        this._isBusy = true;
        var formValues = this.registrationForm.value;
        this._authenticationService.register(formValues.username, formValues.email, formValues.password) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .then(function () { return _this.hasRegistered = true; })
            .catch(function (error) {
            _this.errorMessage = error.errorMessage;
            _this._isBusy = false;
        });
    };
    return AuthenticationRegisterComponent;
}());
AuthenticationRegisterComponent = __decorate([
    core_1.Component({
        selector: 'authentication-register',
        templateUrl: 'app/authentication/register/authentication-register.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, forms_1.FormBuilder])
], AuthenticationRegisterComponent);
exports.AuthenticationRegisterComponent = AuthenticationRegisterComponent;
//# sourceMappingURL=authentication-register.component.js.map