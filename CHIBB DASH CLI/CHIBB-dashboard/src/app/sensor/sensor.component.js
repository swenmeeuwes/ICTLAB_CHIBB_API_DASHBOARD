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
var sensor_service_1 = require("./sensor.service");
var SensorComponent = (function () {
    function SensorComponent(_sensorService) {
        this._sensorService = _sensorService;
    }
    SensorComponent.prototype.ngOnInit = function () {
        this._sensorService.getSensors().then(function (data) {
            console.log(data);
        });
    };
    ;
    return SensorComponent;
}());
SensorComponent = __decorate([
    core_1.Component({
        selector: 'sensor',
        templateUrl: 'app/sensor/sensor.component.html'
    }),
    __metadata("design:paramtypes", [sensor_service_1.SensorService])
], SensorComponent);
exports.SensorComponent = SensorComponent;
//# sourceMappingURL=sensor.component.js.map