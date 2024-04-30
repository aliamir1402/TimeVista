import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
  render() {
    const { Type, Unit, Data } = this.props; // Destructure Type, Unit, and Data from props

    console.log(Data);

    const options = {
      theme: "light2",
      title: {
        text: "Historical Trend of " + Type,
      },
      subtitles: [
        {
          text: "Title",
        },
      ],
      axisY: {
        prefix: Unit + " ",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "area",
          name: "GBP",
          showInLegend: true,
          xValueFormatString: "YYYY",
          yValueFormatString: "# " + Unit,
          dataPoints: Data,
        },
      ],
    };
    return (
      <div style={{ width: "500px" }}>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default App;
