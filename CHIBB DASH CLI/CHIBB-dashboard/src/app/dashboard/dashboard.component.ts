import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { HouseService } from '../house/house.service';
import { House } from '../house/House';
import { SensorService } from '../sensor/sensor.service';
import { Sensor } from '../sensor/Sensor';

//import { NetworkComponent } from './network/network.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private _nodes: Array<any>;

    constructor(public authenticationService: AuthenticationService, private _router: Router, private _houseService: HouseService, private _sensorService: SensorService) { }

    ngOnInit() {
        var houseServicePromise = this._houseService.getHouses();

        houseServicePromise.then(houses => {
            var houses = houses.result;

            // DEFINITION OF NODES
            // Create 'user' node first as a center point
            var userNode = {
                id: 1,
                label: 'You',
                group: 'user'
            }

            // Start nodes at id = 2 (the user=1), id is used to defined edges later
            var id = 2;

            // Map houses to nodes (which vis.js uses)
            var houseNodes = houses.map((house: House) => {
                return {
                    id: id++,
                    label: `${house.hid}\n${house.address}`,
                    hid: house.hid,
                    group: 'house'
                }
            });

            // Request sensors for each house
            var sensorPromises = [];
            for (var i = 0; i < houses.length; i++) {
                sensorPromises.push(this._sensorService.getSensorsFromHouse(houses[i]));
            }

            Promise.all(sensorPromises).then(promiseValues => {
                var sensors = <any>[];
                for (var i = 0; i < promiseValues.length; i++) {
                    sensors = sensors.concat(promiseValues[i].result);                    
                }

                // Map sensors to nodes
                var sensorNodes = sensors.map((sensor: Sensor) => {
                    return {
                        id: id++,
                        label: `${sensor.type}\n${sensor.location}`,
                        hid: sensor.hid,
                        sid: sensor.sid,
                        group: 'sensor'
                    }
                })

                // Concatenation of all nodes
                var allNodes = houseNodes.concat(sensorNodes);
                // Add the user nodes aswell
                allNodes.push(userNode);
                // Store nodes for lookup when they are clicked
                this._nodes = allNodes;


                // DEFINITION OF EDGES
                var edges = <any>[];

                // Create edges between the user and their houses            
                for (var i = 0; i < houseNodes.length; i++) {
                    edges.push({
                        from: 1,
                        to: houseNodes[i].id
                    });
                }
                // Create edges between houses and their sensors
                for (var i = 0; i < sensorNodes.length; i++) {                    
                    edges.push({
                        from: houseNodes.find((node: any) => { return node.hid === sensorNodes[i].hid }).id,
                        to: sensorNodes[i].id
                    });
                }

                this.graphInit('graphContainer', allNodes, edges);
            });
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
                zoomView: false,
                navigationButtons: false
            },
            layout: {
                hierarchical: {
                    enabled: false,
                    nodeSpacing: 220,
                }
            },
            groups: {
                user: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf007',
                        size: 48,
                        color: '#b3cde3'
                    }
                },
                house: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015',
                        size: 48,
                        color: '#decbe4'
                    }
                },
                sensor: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf1c0',
                        size: 48,
                        color: '#ccebc5'
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

        network.on("click", function (params: any) {
            this.handleNodeClick(params.nodes[0]);
        }.bind(this));
    }

    handleNodeClick(nodeId: number) {
        var node = this._nodes.find((node: any) => { return node.id === nodeId });

        if (!node)
            return;

        // Execute depending on the group of the node
        switch (node.group) {
            case 'house':
                this._router.navigate(['house/edit'], { queryParams: { hid: node.hid } });
                break;
            case 'sensor':
                this._router.navigate(['sensor/view'], { queryParams: { sid: node.sid } });
                break;
        }
    }
}