import { Component, OnInit, Directive } from '@angular/core';
import { HouseService } from './house.service';

@Component({
    selector: 'house',
    templateUrl: 'app/house/house.component.html'
})
export class HouseComponent implements OnInit {
    constructor(private _houseService: HouseService) { }

    ngOnInit() {
        
    };
}