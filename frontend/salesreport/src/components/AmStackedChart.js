import React, { Component } from 'react';
import axios from 'axios';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

import './AmStackedChart';

am4core.useTheme(am4themes_animated);

class AmStackedChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reportData: [],
            refreshChild: false,
        }; 
    }

    getTableRowData(entry) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/fruitReport/${entry}`)
               .then( function(response) {
                   resolve(response.data);
               });
        });
    }

    componentDidUpdate(props) {
        if(this.props.refreshChild !== this.state.refreshChild ) {
            this.props.selectedDates.forEach((entry) =>  {
                this.getTableRowData(entry)
                .then( (data) => {
                    this.setState( state => {
                        const reportData = state.reportData.concat(data);
                        return {
                            reportData,
                            refreshChild: true,
                        }
                    })
                })
            });
        }
    }

  renderChart() {
    if(this.state.reportData.length === 0) {
        return;
    }

    // Apply chart themes
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.marginRight = 400;

    // Add data
    chart.data = this.state.reportData;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.title.text = "Sale Month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Sales / Month";

    // Create series
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "bananas";
    series1.dataFields.categoryX = "date";
    series1.name = "Bananas";
    series1.tooltipText = "{name}: [bold]{valueY}[/]";
    series1.stacked = true;
    let totalBullet = series1.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -2;
    totalBullet.label.text = "{valueY.total}";
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 18;
    totalBullet.label.background.fill = series1.stroke;
    totalBullet.label.background.fillOpacity = 0.2;
    totalBullet.label.padding(5, 10, 5, 10);


    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "strawberries";
    series2.dataFields.categoryX = "date";
    series2.name = "Strawberries";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.stacked = true;
    totalBullet = series2.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -2;
    totalBullet.label.text = "{valueY.total}";
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 18;
    totalBullet.label.background.fill = series2.stroke;
    totalBullet.label.background.fillOpacity = 0.2;
    totalBullet.label.padding(5, 10, 5, 10);

    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "apples";
    series3.dataFields.categoryX = "date";
    series3.name = "Apples";
    series3.tooltipText = "{name}: [bold]{valueY}[/]";
    series3.stacked = true;
    totalBullet = series3.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -2;
    totalBullet.label.text = "{valueY.total}";
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 18;
    totalBullet.label.background.fill = series3.stroke;
    totalBullet.label.background.fillOpacity = 0.2;
    totalBullet.label.padding(5, 10, 5, 10);

    var series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.valueY = "oranges";
    series4.dataFields.categoryX = "date";
    series4.name = "Oranges";
    series4.tooltipText = "{name}: [bold]{valueY}[/]";
    series4.stacked = true;
    totalBullet = series4.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -2;
    totalBullet.label.text = "{valueY.total}";
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 18;
    totalBullet.label.background.fill = series4.stroke;
    totalBullet.label.background.fillOpacity = 0.2;
    totalBullet.label.padding(5, 10, 5, 10);

    // Add cursor
    chart.cursor = new am4charts.XYCursor()
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
        <div id="chartdiv" style={{ width: "100%", height: "500px", marginTop: "50px" }}>
            {this.renderChart()}
        </div>
    );
  }
}

export default AmStackedChart;