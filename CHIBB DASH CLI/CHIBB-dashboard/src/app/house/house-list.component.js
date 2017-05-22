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
var sensor_service_1 = require("../sensor/sensor.service");
var house_service_1 = require("./house.service");
var HouseListComponent = (function () {
    function HouseListComponent(houseService, _sensorService, _router) {
        this.houseService = houseService;
        this._sensorService = _sensorService;
        this._router = _router;
        this.selectedHouse = {};
    }
    HouseListComponent.prototype.ngOnInit = function () {
        this.refreshHouses();
    };
    ;
    HouseListComponent.prototype.refreshHouses = function () {
        var _this = this;
        this.houseService.getHouses()
            .then(function (data) {
            _this.houses = data.result;
        })
            .catch(function (statusCode) {
            _this.handleError(parseInt(statusCode));
        });
    };
    HouseListComponent.prototype.handleError = function (statusCode) {
        this.errorStatusCode = statusCode;
        switch (statusCode) {
            case 403:
                this.errorMessage = "Your authentication token is invalid or has expired, please relog.";
                break;
            default:
                this.errorMessage = "Something went wrong :c";
                break;
        }
    };
    //linkedSensorAmount() {
    //    for (var i = 0; i < this.houses.length; i++) {
    //        this.houses[i].linkedSensors = 0;
    //    }
    //}
    HouseListComponent.prototype.viewHouse = function (house) {
        this.selectedHouse = house;
    };
    HouseListComponent.prototype.editHouse = function (house) {
        this._router.navigate(['house/edit'], { queryParams: { hid: house.hid } });
    };
    HouseListComponent.prototype.promptDelete = function (house) {
        this.selectedHouse = house;
        document.getElementById("openDeleteModalButton").click();
    };
    HouseListComponent.prototype.delete = function (house) {
        var _this = this;
        this.houseService.deleteHouse(house)
            .then(function (data) {
            _this.refreshHouses();
        })
            .catch(function (statusCode) {
            _this.handleError(parseInt(statusCode));
        });
    };
    return HouseListComponent;
}());
HouseListComponent = __decorate([
    core_1.Component({
        selector: 'house-list',
        templateUrl: 'app/house/house-list.component.html',
        styleUrls: ['app/house/house-list.component.css']
    }),
    __metadata("design:paramtypes", [house_service_1.HouseService, sensor_service_1.SensorService, router_1.Router])
], HouseListComponent);
exports.HouseListComponent = HouseListComponent;
//# sourceMappingURL=house-list.component.js.map