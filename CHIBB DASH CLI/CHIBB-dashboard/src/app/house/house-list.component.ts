﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sensor } from '../sensor/Sensor';
import { SensorService } from '../sensor/sensor.service';
import { HouseService } from './house.service';
import { House } from './House';

@Component({
    selector: 'house-list',
    templateUrl: './house-list.component.html',
    styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
    public houses: House[];
    public selectedHouse: House = <House>{};

    public errorStatusCode: number;
    public errorMessage: string;

    private sensors: Sensor[];

    constructor(public houseService: HouseService, private _sensorService: SensorService, private _router: Router) { }

    ngOnInit() {
        this.refreshHouses();
    };

    refreshHouses() {
        this.houseService.getHouses()
            .then((data) => {
                this.houses = data.result;
            })
            .catch((statusCode) => {
                this.handleError(parseInt(statusCode));
            });
    }

    handleError(statusCode: number) {
        this.errorStatusCode = statusCode;
        switch (statusCode) {
            case 403:
                this.errorMessage = "Your authentication token is invalid or has expired, please relog.";
                break;
            default:
                this.errorMessage = "Something went wrong :c";
                break;
        }
    }

    //linkedSensorAmount() {
    //    for (var i = 0; i < this.houses.length; i++) {
    //        this.houses[i].linkedSensors = 0;
    //    }
    //}

    viewHouse(house: House) {
        this.selectedHouse = house;
    }

    editHouse(house: House) {
        this._router.navigate(['house/edit'], { queryParams: { hid: house.hid } });
    }

    promptDelete(house: House) {
        this.selectedHouse = house;
        document.getElementById("openDeleteModalButton").click();
    }

    delete(house: House) {
        this.houseService.deleteHouse(house)
            .then((data) => {
                this.refreshHouses();
            })
            .catch((statusCode) => {
                this.handleError(parseInt(statusCode));
            });
    }
}