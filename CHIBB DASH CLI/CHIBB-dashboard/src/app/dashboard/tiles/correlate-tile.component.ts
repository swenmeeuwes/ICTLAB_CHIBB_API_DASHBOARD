import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'correlate-tile',
    templateUrl: './correlate-tile.component.html',
    styleUrls: ['./tile.component.css']
})

export class CorrelateTile implements OnInit {
    public init: boolean;

    constructor() { }

    ngOnInit() {
        this.init = true;
    }
}