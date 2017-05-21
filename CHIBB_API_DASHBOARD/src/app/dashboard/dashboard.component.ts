import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HouseService } from '../house/house.service';
import { House } from '../house/House';
import { SensorService } from '../sensor/sensor.service';
import { Sensor } from '../sensor/Sensor';

declare var vis: any;

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(public authenticationService: AuthenticationService, private _houseService: HouseService, private _sensorService: SensorService) {
        
    }

    ngOnInit() {
        var houseServicePromise = this._houseService.getHouses();
        var sensorServicePromise = this._sensorService.getSensors();

        Promise.all([houseServicePromise, sensorServicePromise]).then(promiseValues => {
            var houses = promiseValues[0].result;
            var sensors = promiseValues[1].result;

            console.log(houses, sensors);

            // Start nodes at id = 1, id is used to defined edges later
            var id = 1;

            // Map houses to nodes (which vis.js uses)
            var houseNodes = houses.map((house: House) => { return { id: id++, label: house.address, hid: house.hid, group: 'house' } });

            // Map sensors to nodes
            var sensorNodes = sensors.map((sensor: Sensor) => { return { id: id++, label: sensor.type, sid: sensor.uid, group: 'sensor' } })
            

            this.graphInit('graphContainer', houseNodes, []);
        });
    }

    graphInit(containerId: string, nodes: Array<any>, edges: Array<any>) {
        // Import node models
        var graphNodes = new vis.DataSet(nodes);
        var graphEdges = new vis.DataSet(edges);

        // Defined the container for the graph
        var container = document.getElementById(containerId);

        // Specifiy vis data + options
        var data = {
            nodes: graphNodes,
            edges: graphEdges
        };
        var options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            interaction: {
                dragView: true,
                dragNodes: true,
                zoomView: false
            },
            layout: {
                hierarchical: {
                    enabled: false,
                    nodeSpacing: 220,
                }
            },
            groups: {
                house: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015',
                        size: 48,
                        color: '#DE9BF9'
                    }
                },
                sensor: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1c0',
                        size: 48,
                        color: '#FB95AF'
                    }
                }
            },
            nodes: {
                borderWidth: 1,
                borderWidthSelected: 1,
                shape: 'circle',
                scaling: {
                    max: 10
                },
                font: {
                    face: 'Montserrat'
                }
            }
        }

        // Initialize the network, which creates a canvas in the early defined container
        var network = new vis.Network(container, data, options);
    }
}