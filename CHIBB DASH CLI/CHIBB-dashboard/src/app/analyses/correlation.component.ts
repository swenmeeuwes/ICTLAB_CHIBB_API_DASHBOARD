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

    public selectedSensor: Sensor;

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
            sampling: true,
            drawPoints: {
                enabled: false,
                size: 3
            },
            legend: {
                enabled: true
            },
            style: this.drawStyle
        };

        var graph2d = new vis.Graph2d(container, dataset, options);
        graph2d.graphId = graphId;
        graph2d.graphGroups = [];
        graph2d.graphOptions = options;
        graph2d.dataset = dataset;
        graph2d.itemDictionary = {};

        graph2d.on('rangechanged', this._onRangeChanged.bind(this));

        this._graph = graph2d;
    }

    private _onRangeChanged(event) {
        this.startDate = moment(event.start).format('YYYY-MM-DDTHH:mm:ss');
        this.endDate = moment(event.end).format('YYYY-MM-DDTHH:mm:ss');
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

        this._graph.graphGroups.push({
            id: sensorSerieId,
            content: `${sensor.type} - ${sensor.location}`,
            options: {
                style: this.drawStyle,
                drawPoints: {
                    style: this.drawPointsStyle,
                    size: this.drawPointsStyle === 'none' ? 0 : 3
                },
                interpolation: {
                    enabled: this.interpolation !== 'none' ? true : false,
                    parametrization: this.interpolation
                }
            }
        });

        this._graph.setGroups(new vis.DataSet(this._graph.graphGroups));

        this._retrieveSeries(sensorSerieId, moment(this.startDate).valueOf(), moment(this.endDate).valueOf()).then(items => {
            this._graph.itemDictionary[sensorSerieId] = items;
            this._graph.dataset.add(items);
        });
    }

    public removeSeries(graphId: string, sensorSerieId: string) {        
        //var sensorSerieId = $(`#removeSeries_${graphId}`).val();

        if (!sensorSerieId)
            return;

        if (sensorSerieId === this.selectedSensor.sid)
            this.selectedSensor = null;

        // Add the removed series to the dropdown and remember it so that it can be added later
        this.sensors.push(
            this.addedSensors.splice(
                this.addedSensors.findIndex(
                    sensor => sensor.sid === sensorSerieId
                ), 1)[0]);
        
        this._graph.graphGroups.splice(
            this._graph.graphGroups.findIndex(
                group => group.id === sensorSerieId
            ), 1);

        this._graph.dataset.remove(this._graph.itemDictionary[sensorSerieId]);

        this._graph.setGroups(new vis.DataSet(this._graph.graphGroups));

        delete this._graph.itemDictionary[sensorSerieId];
    }

    public selectSensor(sensor: Sensor) {
        this.selectedSensor = sensor;
        var group = this._graph.graphGroups.find(group => group.id === sensor.sid);
        this.drawStyle = group.options.style;
        this.drawPointsStyle = group.options.drawPoints.style;
        this.interpolation = group.options.interpolation.parametrization;
    }

    public updateStyle() {
        var drawPointSize = 3; // Default
        if (this.drawPointsStyle === 'none')
            drawPointSize = 0;

        var group = this._graph.graphGroups.find(group => group.id === this.selectedSensor.sid);
        group.options.style = this.drawStyle;
        group.options.drawPoints.style = this.drawPointsStyle;
        group.options.drawPoints.size = drawPointSize;
        group.options.interpolation = {
            enabled: this.interpolation !== 'none' ? true : false,
            parametrization: this.interpolation
        };

        //this._graph.graphGroups.forEach(group => {
        //    group.options.drawPoints.style = this.drawPointsStyle;
        //    group.options.drawPoints.size = drawPointSize;
        //    group.options.interpolation = {
        //        enabled: this.interpolation !== 'none' ? true : false,
        //        parametrization: this.interpolation
        //    };
        //});

        //this._graph.graphOptions.style = this.drawStyle;
        this._graph.setOptions(this._graph.graphOptions);
        this._graph.setWindow(this.startDate, this.endDate);

        this._graph.setGroups(new vis.DataSet(this._graph.graphGroups));
    }

    public updatePeriod() {
        this._graph.setWindow(this.startDate, this.endDate);
    }
}