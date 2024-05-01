import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import Data from "./data.geojson";
import BarChart from "../components/charts/SimpleBarChart";
import ReactDOM from "react-dom";

export default function SmogMaps(props) {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "CropsMap",
      style:
        "https://api.maptiler.com/maps/basic/style.json?key=ub6D6mcohLuVpSQqkHI2",
      center: [70, 31],
      zoom: 5.5,
    });

    map.on("load", () => {
      // Add a geojson point source.
      // Heatmap layers also work with a vector tile source.
      map.addSource("earthquakes", {
        type: "geojson",
        data: props.Data,
      });

      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      map.addLayer(
        {
          id: "earthquakes-heat",
          type: "heatmap",
          source: "earthquakes",
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              1000,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "#333333",
              0.1,
              "rgb(255, 165, 0)", // Orange
              0.2,
              "rgb(255, 255, 0)", // Yellow
              0.3,
              "rgb(0, 255, 0)", // Lime Green
              0.4,
              "rgb(0, 0, 255)", // Blue
              0.5,
              "rgb(128, 0, 128)", // Purple
              0.6,
              "rgb(139, 0, 139)", // Dark Magenta
              0.7,
              "rgb(128, 0, 0)", // Maroon
              0.8,
              "rgb(255, 192, 203)", // Pink
              0.9,
              "rgb(0, 0, 0)", // Black
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              9,
              0,
            ],
          },
        },
        "waterway"
      );

      map.addLayer(
        {
          id: "earthquakes-point",
          type: "circle",
          source: "earthquakes",
          minzoom: 7,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
              16,
              ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
            ],
            // Color circle by earthquake magnitude
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              "rgb(255, 255, 0)", // Yellow
              100,
              "rgb(255, 255, 0)", // Yellow
              200,
              "rgb(173, 255, 47)", // Light Green
              300,
              "rgb(50, 205, 50)", // Lime Green
              400,
              "rgb(0, 128, 0)", // Green
              500,
              "rgb(0, 191, 255)", // Sky Blue
              600,
              "rgb(65, 105, 225)", // Royal Blue
              700,
              "rgb(0, 0, 255)", // Blue
              800,
              "rgb(0, 0, 128)", // Navy Blue
              900,
              "rgb(25, 25, 112)", // Midnight BlueF
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            // Transition from heatmap to circle layer by zoom level
            "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
          },
        },
        "waterway"
      );
    });

    map.on("click", "earthquakes-point", function (e) {
      // Create a button element
      var coordinates = e.features[0].geometry.coordinates.slice();
      var cityName = e.features[0].properties.districts;
      var cityValue = e.features[0].properties.mag;
      var Type = e.features[0].properties.type;

      // Create the main div element
      var popupContent = `
        <div class="bor flex map-pop-up">
          <div class="bor flex justify-center items-center" style="width: fit-content;">
            <div class="bor m-2 p-1 map-pop-up-sub" style="height:90%;">
              <div class="bor m-1 p-1 text-sm flex justify-left items-left">Current ${Type}</div>
              <div class="bor m-1 p-1 text-5xl flex justify-center items-center">${cityValue}</div>
              <div class="bor m-1 p-1 text-sm flex justify-center items-center">PPM</div>
            </div>
          </div>
          <div style="width: fit-content;">
            <div class="text-3xl p-2 mb-2">RealTime Stats</div>
            <div class="bor m-2 p-2 Chart-popup" id="chartContainer">
            </div>
          </div>
        </div>`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Create new popup element
      var popup = new maplibregl.Popup({ maxWidth: "auto" })
        .setLngLat(e.lngLat)
        .setHTML(popupContent)
        .addTo(map);

      // Render the LineChart component into the chartContainer div
      ReactDOM.render(
        <BarChart Data={props.Data.History} Type={Type} />,
        document.getElementById("chartContainer")
      );

      // Calculate and set the popup width and height based on its content
      var popupNode = popup._content;
      popupNode.style.width = popupNode.offsetWidth + "px";
      popupNode.style.height = popupNode.offsetHeight + "px";
    });
  });
  return (
    <>
      <div id="CropsMap"></div>
    </>
  );
}
