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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var sensor_service_1 = require("./sensor.service");
var SensorCreationComponent = (function () {
    function SensorCreationComponent(_sensorService, _router, _formBuilder) {
        this._sensorService = _sensorService;
        this._router = _router;
        this._formBuilder = _formBuilder;
    }
    SensorCreationComponent.prototype.ngOnInit = function () {
        // Bind form
        this.sensorCreationFrom = this._formBuilder.group({
            sensorIdentifier: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
            houseIdentifier: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
            type: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
            location: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])] // Optional?
        });
    };
    ;
    SensorCreationComponent.prototype.attemptSensorCreation = function (event) {
        var _this = this;
        this.hasAttempted = true;
        if (this.sensorCreationFrom.invalid)
            return;
        var formValues = this.sensorCreationFrom.value;
        this._sensorService.createSensor({ sid: formValues.sensorIdentifier, hid: formValues.houseIdentifier, location: formValues.location, type: formValues.type, attributes: [] })
            .then(function () { return _this._router.navigate(['sensor']); })
            .catch(function (error) { return _this.errorMessage = error.errorMessage; });
    };
    return SensorCreationComponent;
}());
SensorCreationComponent = __decorate([
    core_1.Component({
        selector: 'sensor-creation',
        templateUrl: 'app/sensor/sensor-creation.component.html'
    }),
    __metadata("design:paramtypes", [sensor_service_1.SensorService, router_1.Router, forms_1.FormBuilder])
], SensorCreationComponent);
exports.SensorCreationComponent = SensorCreationComponent;
//# sourceMappingURL=sensor-creation.component.js.map