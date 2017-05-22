import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { House } from './House';
import { HouseService } from './house.service';

@Component({
    selector: 'house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit, OnChanges {
    @Input() selectedHouse: House;

    constructor(private _houseService: HouseService) { }

    ngOnInit() {

    };

    ngOnChanges(changes: SimpleChanges) {
        //document.getElementById("openModalButton").click();
    };
}