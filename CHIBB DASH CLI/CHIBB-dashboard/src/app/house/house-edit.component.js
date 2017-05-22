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
var HouseEditComponent = (function () {
    function HouseEditComponent(_houseService, _router, _formBuilder, activatedRoute) {
        this._houseService = _houseService;
        this._router = _router;
        this._formBuilder = _formBuilder;
        this.activatedRoute = activatedRoute;
    }
    HouseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.hid = params['hid'];
        });
        // Bind form
        this.houseEditFrom = this._formBuilder.group({
            address: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])]
        });
    };
    ;
    HouseEditComponent.prototype.attemptHouseEdit = function (event) {
        var _this = this;
        this.hasAttempted = true;
        if (this.houseEditFrom.invalid)
            return;
        var formValues = this.houseEditFrom.value;
        this._houseService.editHouse({ hid: this.hid, address: formValues.address })
            .then(function () { return _this._router.navigate(['house']); })
            .catch(function (error) { return _this.errorMessage = error.errorMessage; });
    };
    return HouseEditComponent;
}());
HouseEditComponent = __decorate([
    core_1.Component({
        selector: 'house-edit',
        templateUrl: 'app/house/house-edit.component.html'
    }),
    __metadata("design:paramtypes", [house_service_1.HouseService, router_1.Router, forms_1.FormBuilder, router_1.ActivatedRoute])
], HouseEditComponent);
exports.HouseEditComponent = HouseEditComponent;
//# sourceMappingURL=house-edit.component.js.map