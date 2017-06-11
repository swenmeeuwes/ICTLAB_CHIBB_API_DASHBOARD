import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { House } from './House';
import { HouseService } from './house.service';

@Component({
    selector: 'house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
    public house: House;

    constructor(private _houseService: HouseService, private _router: Router, private _activatedRouter: ActivatedRoute) { }

    ngOnInit() {
        this._activatedRouter.queryParams.subscribe((params: Params) => {
            this._houseService.getHouseById(params['hid'])
                .then(response => {
                    this.house = response['result'][0];
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
}