import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from '../sensor/sensor.service';
import { Sensor } from '../sensor/Sensor';

@Component({
    selector: 'correlation',
    templateUrl: './correlation.component.html',
    styleUrls: ['./correlation.component.css']

})
export class CorrelationComponent implements OnInit {
    public sensors: Sensor[]; // All the sensors that can still be added to the graph
    public addedSensors: Sensor[]; // The sensors that are already added to the graph

    public startDate;
    public endDate;

    public drawPointsStyle: string = 'circle';
    public drawStyle: string = 'points';
    public interpolation: string = 'none';

    private _graph: any; // vis.Graph2D    

    constructor(private _sensorService: SensorService, private _router: Router) { };

    ngOnInit() {
        this.addedSensors = [];

        this.startDate = moment().subtract(1, 'hour').format('YYYY-MM-DDTHH:mm:ss');
        this.endDate = moment().format('YYYY-MM-DDTHH:mm:ss');

        this._sensorService.getSensors().then(response => {
            this.sensors = <Sensor[]>response['result'];
        });

        $(document).ready(() => {
            this._initGraph('graph');
        });
    }

    private _initGraph(graphId: string) {
        var container = document.getElementById(graphId);
        var dataset = new vis.DataSet();
        var options = {
            start: new vis.moment(this.startDate),
            end: new vis.moment(this.endDate),
            showCurrentTime: false,
            legend: {
                enabled: true
            },
            style: this.drawStyle
        };

        var graph2d = new vis.Graph2d(container, dataset, options);
        graph2d.graphId = graphId;
        graph2d.groups = [];
        graph2d.graphOptions = options;
        graph2d.dataset = dataset;
        graph2d.itemDictionary = {};

        this._graph = graph2d;
    }

    private _retrieveSeries(sensorSid: string, startTime: number, endTime: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._sensorService.getSensorDataWithinTimeframe(sensorSid, startTime, endTime).then(response => {
                var items = response['result'].map(record => {
                    return {
                        x: new Date(record.timestamp),
                        y: record.value,
                        group: sensorSid
                    };
                });

                resolve(items);
            });
        });
    }

    public addSeries(graphId: string) {
        var sensorSerieId = $(`#addSeries_${graphId}`).val();

        if (!sensorSerieId)
            return;

        // Remove the series from the dropdown and remember it so that it can be removed later
        var sensor = this.sensors.find(sensor => sensor.sid === sensorSerieId);
        this.addedSensors.push(this.sensors.splice(this.sensors.indexOf(sensor), 1)[0]);

        this._graph.groups.push({
            id: sensorSerieId,
            content: `${sensor.type} - ${sensor.location}`,
            options: {
                drawPoints: {
                    style: this.drawPointsStyle,
                    size: this.drawPointsStyle === 'none' ? 0 : 6
                }
            }
        });

        this._graph.setGroups(new vis.DataSet(this._graph.groups));

        this._retrieveSeries(sensorSerieId, moment(this.startDate).valueOf(), moment(this.endDate).valueOf()).then(items => {
            this._graph.itemDictionary[sensorSerieId] = items;
            this._graph.dataset.add(items);
        });
    }

    public removeSeries(graphId: string) {
        var sensorSerieId = $(`#removeSeries_${graphId}`).val();

        if (!sensorSerieId)
            return;

        // Add the removed series to the dropdown and remember it so that it can be added later
        var sensor = this.addedSensors.find(sensor => sensor.sid === sensorSerieId);
        this.sensors.push(this.addedSensors.splice(this.addedSensors.indexOf(sensor), 1)[0]);

        this._graph.groups.splice(this._graph.groups.indexOf({
            id: sensorSerieId,
            content: sensorSerieId,
            options: {
                drawPoints: {
                    style: this.drawPointsStyle
                },
                interpolation: {
                    enabled: this.interpolation !== 'none' ? true : false,
                    parametrization: this.interpolation
                }
            }
        }), 1);

        this._graph.dataset.remove(this._graph.itemDictionary[sensorSerieId]);

        this._graph.setGroups(new vis.DataSet(this._graph.groups));

        delete this._graph.itemDictionary[sensorSerieId];
    }

    public updateStyle() {
        var drawPointSize = 6; // Default
        if (this.drawPointsStyle === 'none')
            drawPointSize = 0;

        this._graph.groups.forEach(group => {
            group.options.drawPoints.style = this.drawPointsStyle;
            group.options.drawPoints.size = drawPointSize;
            group.options.interpolation = {
                enabled: this.interpolation !== 'none' ? true : false,
                parametrization: this.interpolation
            };
        });

        this._graph.graphOptions.style = this.drawStyle;
        this._graph.setOptions(this._graph.graphOptions);

        this._graph.setGroups(new vis.DataSet(this._graph.groups));
    }

    public updatePeriod() {
        this._graph.setWindow(this.startDate, this.endDate);
    }
}