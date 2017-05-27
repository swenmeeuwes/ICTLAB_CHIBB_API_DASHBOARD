import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../house/house.service';

@Component({
    selector: 'house-tile',
    templateUrl: './house-tile.component.html',
    styleUrls: ['./tile.component.css', './house-tile.component.css']
})

export class HouseTile implements OnInit {
    public init: boolean;

    public amountOfHouses: number;

    constructor(private _houseService: HouseService) { }

    ngOnInit() {
        this._houseService.getHouses().then((response) => {
            this.amountOfHouses = response.result.length;
            
            this.init = true;
        });
    }
}