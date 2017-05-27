import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'network',
    template: `
      <h1>Network</h1>
    `
})

export class NetworkComponent implements OnInit {
    @Input('containerId') containerId: string;
    @Input('nodes') nodes: any; // vis.DataSet
    @Input('edges') edges: any; // vis.DataSet
    @Input('options') options: Object;

    constructor() { }

    ngOnInit() {
        console.log(this.containerId, this.nodes, this.edges, this.options);

        //// Import node models
        //var graphNodes = new vis.DataSet(this.nodes);
        //var graphEdges = new vis.DataSet(this.edges);

        //// Defined the container for the graph
        //var container = document.getElementById(this.containerId);

        //// Specifiy vis data + options
        //var data = {
        //    nodes: graphNodes,
        //    edges: graphEdges
        //};        

        //// Initialize the network, which creates a canvas in the early defined container
        //var network = new vis.Network(container, data, this.options);
    }
}