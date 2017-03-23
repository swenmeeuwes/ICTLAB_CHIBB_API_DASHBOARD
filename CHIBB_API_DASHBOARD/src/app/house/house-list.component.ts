import { Component, OnInit } from '@angular/core';
import { HouseService } from './house.service';
import { House } from './House';

@Component({
    selector: 'house-list',
    templateUrl: 'app/house/house-list.component.html',
    styleUrls: [ 'app/house/house-list.component.css' ]
})
export class HouseListComponent implements OnInit {
    public houses: House[];

    public errorStatusCode: number;
    public errorMessage: string;

    constructor(private _houseService: HouseService) { }

    ngOnInit() {
        this._houseService.getHouses()
            .then((data) => {
                this.houses = data.result;
            })
            .catch((statusCode) => {
                this.handleError(parseInt(statusCode));
            });
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
}