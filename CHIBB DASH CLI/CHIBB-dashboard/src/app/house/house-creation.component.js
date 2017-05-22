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
var house_service_1 = require("./house.service");
var HouseCreationComponent = (function () {
    function HouseCreationComponent(_houseService, _router, _formBuilder) {
        this._houseService = _houseService;
        this._router = _router;
        this._formBuilder = _formBuilder;
    }
    HouseCreationComponent.prototype.ngOnInit = function () {
        // Bind form
        this.houseCreationFrom = this._formBuilder.group({
            houseIdentifier: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
            address: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])]
        });
    };
    ;
    HouseCreationComponent.prototype.attemptHouseCreation = function (event) {
        var _this = this;
        this.hasAttempted = true;
        if (this.houseCreationFrom.invalid)
            return;
        var formValues = this.houseCreationFrom.value;
        this._houseService.createHouse({ hid: formValues.houseIdentifier, address: formValues.address }) // Wish: Would maybe be nice to pass in a whole 'UserModel'
            .then(function () { return _this._router.navigate(['house']); })
            .catch(function (error) { return _this.errorMessage = error.errorMessage; });
    };
    return HouseCreationComponent;
}());
HouseCreationComponent = __decorate([
    core_1.Component({
        selector: 'house-creation',
        templateUrl: 'app/house/house-creation.component.html'
    }),
    __metadata("design:paramtypes", [house_service_1.HouseService, router_1.Router, forms_1.FormBuilder])
], HouseCreationComponent);
exports.HouseCreationComponent = HouseCreationComponent;
//# sourceMappingURL=house-creation.component.js.map