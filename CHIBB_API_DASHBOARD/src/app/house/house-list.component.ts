import { Component, OnInit } from '@angular/core';
import { Sensor } from '../sensor/Sensor';
import { SensorService } from '../sensor/sensor.service';
import { HouseService } from './house.service';
import { House } from './House';

@Component({
    selector: 'house-list',
    templateUrl: 'app/house/house-list.component.html',
    styleUrls: ['app/house/house-list.component.css']
})
export class HouseListComponent implements OnInit {
    public houses: House[];
    public selectedHouse: House = <House>{};

    public errorStatusCode: number;
    public errorMessage: string;

    private sensors: Sensor[];

    constructor(public houseService: HouseService, private _sensorService: SensorService) { }

    ngOnInit() {
        //var sensorPromise = this._sensorService.getSensors()
        //    .then((data: Sensor[]) => {
        //        this.sensors = data;                
        //    })
        //    .catch((statusCode) => {
        //        this.handleError(parseInt(statusCode));
        //    });

        var housePromise = this.houseService.getHouses()
            .then((data) => {
                this.houses = data.result;
            })
            .catch((statusCode) => {
                this.handleError(parseInt(statusCode));
            });

        //Promise.all([sensorPromise, housePromise])
        //    .then(() => {
        //        this.linkedSensorAmount();
        //    })
        //    .catch((error) => {
        //        console.warn(error);
        //    });
    };

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

    view(house: House) {
        this.selectedHouse = house;
    }

    promptDelete(house: House) {
        this.selectedHouse = house;
        document.getElementById("openDeleteModalButton").click();
    }

    delete(house: House) {
        this.houseService.deleteHouse(house)
            .then((data) => {

            })
            .catch((statusCode) => {
                this.handleError(parseInt(statusCode));
            });
    }
}