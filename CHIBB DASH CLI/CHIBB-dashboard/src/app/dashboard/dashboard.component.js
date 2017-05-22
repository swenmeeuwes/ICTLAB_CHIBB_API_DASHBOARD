"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../authentication/authentication.service");
var house_service_1 = require("../house/house.service");
var sensor_service_1 = require("../sensor/sensor.service");
var DashboardComponent = (function () {
    function DashboardComponent(authenticationService, _router, _houseService, _sensorService) {
        this.authenticationService = authenticationService;
        this._router = _router;
        this._houseService = _houseService;
        this._sensorService = _sensorService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var houseServicePromise = this._houseService.getHouses();
        houseServicePromise.then(function (houses) {
            var houses = houses.result;
            // DEFINITION OF NODES
            // Create 'user' node first as a center point
            var userNode = {
                id: 1,
                label: 'You',
                group: 'user'
            };
            // Start nodes at id = 2 (the user=1), id is used to defined edges later
            var id = 2;
            // Map houses to nodes (which vis.js uses)
            var houseNodes = houses.map(function (house) {
                return {
                    id: id++,
                    label: house.address,
                    hid: house.hid,
                    group: 'house'
                };
            });
            // Request sensors for each house
            var sensorPromises = [];
            for (var i = 0; i < houses.length; i++) {
                sensorPromises.push(_this._sensorService.getSensorsFromHouse(houses[i]));
            }
            Promise.all(sensorPromises).then(function (promiseValues) {
                var sensors = [];
                for (var i = 0; i < promiseValues.length; i++) {
                    sensors = sensors.concat(promiseValues[i].result);
                }
                // Map sensors to nodes
                var sensorNodes = sensors.map(function (sensor) {
                    return {
                        id: id++,
                        label: sensor.type + "\n" + sensor.location,
                        hid: sensor.hid,
                        sid: sensor.sid,
                        group: 'sensor'
                    };
                });
                // Concatenation of all nodes
                var allNodes = houseNodes.concat(sensorNodes);
                // Add the user nodes aswell
                allNodes.push(userNode);
                // Store nodes for lookup when they are clicked
                _this._nodes = allNodes;
                // DEFINITION OF EDGES
                var edges = [];
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
                        from: houseNodes.find(function (node) { return node.hid === sensorNodes[i].hid; }).id,
                        to: sensorNodes[i].id
                    });
                }
                _this.graphInit('graphContainer', allNodes, edges);
            });
        });
    };
    DashboardComponent.prototype.graphInit = function (containerId, nodes, edges) {
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
        };
        // Initialize the network, which creates a canvas in the early defined container
        var network = new vis.Network(container, data, options);
        network.on("click", function (params) {
            this.handleNodeClick(params.nodes[0]);
        }.bind(this));
    };
    DashboardComponent.prototype.handleNodeClick = function (nodeId) {
        var node = this._nodes.find(function (node) { return node.id === nodeId; });
        if (!node)
            return;
        // Execute depending on the group of the node
        switch (node.group) {
            case 'house':
                this._router.navigate(['house/edit'], { queryParams: { hid: node.hid } });
                break;
        }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: 'app/dashboard/dashboard.component.html',
        styleUrls: ['app/dashboard/dashboard.component.css']
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, house_service_1.HouseService, sensor_service_1.SensorService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map