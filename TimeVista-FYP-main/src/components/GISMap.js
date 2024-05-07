import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import LineChart from "../components/charts/SimpleLineChart";
import ReactDOM from "react-dom";
import Data from "./test.geojson";
import Loader from "./loader";

export default function Test(props) {
  useEffect(() => {
    if (props.flag) {
      const map = new maplibregl.Map({
        container: "TestMap",
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=ub6D6mcohLuVpSQqkHI2",
        center: [73.234906738972, 31.70562200131828],
        zoom: 5,
      });

      let hoveredStateId = null;
      let paintColor = "#FF0000";

      map.on("load", () => {
        map.addSource("states", {
          type: "geojson",
          data: props.Data,
        });
        var layer;
        if (props.feature === 1) {
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                [
                  "all",
                  [">=", ["get", "mag"], -20],
                  ["<", ["get", "mag"], -15],
                ],
                "#225ea9", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], -15], ["<", ["get", "mag"], -10]],
                "#41b7c5", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], -10], ["<", ["get", "mag"], -5]],
                "#ffffcd", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], -5], ["<", ["get", "mag"], 0]],
                "#ffeea1", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 0], ["<", ["get", "mag"], 5]],
                "#ffda76", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 5], ["<", ["get", "mag"], 10]],
                "#ffb34c", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 15], ["<", ["get", "mag"], 20]],
                "#fe8e3c", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 20], ["<", ["get", "mag"], 25]],
                "#fd4e2a", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 25], ["<", ["get", "mag"], 30]],
                "#e41a1c", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 30], ["<", ["get", "mag"], 35]],
                "#be0026", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 35], ["<", ["get", "mag"], 40]],
                "#800026", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 40]],
                "#333333", // If mag is between 20 and 30, color blue
                "#ffffff",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
            },
          };
        } else if (props.feature === 2) {
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["<", ["get", "mag"], 0],
                "rgb(100, 255, 0)", // If mag is less than 10, color red
                ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 15]],
                [
                  "interpolate",
                  ["linear"],
                  ["get", "mag"],
                  5,
                  "rgb(176, 255, 0)", // Light green
                  10,
                  "rgb(0, 128, 0)", // Dark green
                ],
                [
                  "all",
                  [">=", ["get", "mag"], -20],
                  ["<", ["get", "mag"], -10],
                ],
                "#FF00FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], -10], ["<", ["get", "mag"], 0]],
                "#FF00FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 0], ["<", ["get", "mag"], 10]],
                "#FF00FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 15]],
                "#FF00FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 15], ["<", ["get", "mag"], 20]],
                "#FF00FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 20], ["<", ["get", "mag"], 25]],
                "#ffe600", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 25], ["<", ["get", "mag"], 30]],
                "#00FFFF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 30], ["<", ["get", "mag"], 35]],
                "#0FF0FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 35], ["<", ["get", "mag"], 40]],
                "#0FF0FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 40], ["<", ["get", "mag"], 45]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 45], ["<", ["get", "mag"], 50]],
                "#F000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 50]],
                "#333333", // If mag is between 20 and 30, color blue
                "#ffffff",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
            },
          };
        } else if (props.feature === 3) {
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["<", ["get", "mag"], 0],
                "rgb(100, 255, 0)", // If mag is less than 10, color red
                ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 100]],
                [
                  "interpolate",
                  ["linear"],
                  ["get", "mag"],
                  5,
                  "rgb(176, 255, 0)", // Light green
                  10,
                  "rgb(0, 128, 0)", // Dark green
                ],

                ["all", [">=", ["get", "mag"], 100], ["<", ["get", "mag"], 15]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 200], ["<", ["get", "mag"], 20]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 300], ["<", ["get", "mag"], 25]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 400], ["<", ["get", "mag"], 30]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 500], ["<", ["get", "mag"], 35]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 600], ["<", ["get", "mag"], 40]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 700], ["<", ["get", "mag"], 45]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 800], ["<", ["get", "mag"], 50]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 50]],
                "#333333", // If mag is between 20 and 30, color blue
                "#ffffff",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
            },
          };
        } else if (props.feature === 4) {
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["<", ["get", "mag"], 0],
                "rgb(100, 255, 0)", // If mag is less than 10, color red
                ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 100]],
                [
                  "interpolate",
                  ["linear"],
                  ["get", "mag"],
                  5,
                  "rgb(176, 255, 0)", // Light green
                  10,
                  "rgb(0, 128, 0)", // Dark green
                ],

                ["all", [">=", ["get", "mag"], 100], ["<", ["get", "mag"], 15]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 200], ["<", ["get", "mag"], 20]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 300], ["<", ["get", "mag"], 25]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 400], ["<", ["get", "mag"], 30]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 500], ["<", ["get", "mag"], 35]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 600], ["<", ["get", "mag"], 40]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 700], ["<", ["get", "mag"], 45]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 800], ["<", ["get", "mag"], 50]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 50]],
                "#333333", // If mag is between 20 and 30, color blue
                "#ffffff",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
            },
          };
        } else if (props.feature === 5) {
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["<", ["get", "mag"], 0],
                "rgb(100, 255, 0)", // If mag is less than 10, color red
                ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 100]],
                [
                  "interpolate",
                  ["linear"],
                  ["get", "mag"],
                  5,
                  "rgb(176, 255, 0)", // Light green
                  10,
                  "rgb(0, 128, 0)", // Dark green
                ],

                ["all", [">=", ["get", "mag"], 100], ["<", ["get", "mag"], 15]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 200], ["<", ["get", "mag"], 20]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 300], ["<", ["get", "mag"], 25]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 400], ["<", ["get", "mag"], 30]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 500], ["<", ["get", "mag"], 35]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 600], ["<", ["get", "mag"], 40]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 700], ["<", ["get", "mag"], 45]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 800], ["<", ["get", "mag"], 50]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 50]],
                "#333333", // If mag is between 20 and 30, color blue
                "#ffffff",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
            },
          };
        } else if (props.feature === 6) {
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["<", ["get", "mag"], 0],
                "rgb(100, 255, 0)", // If mag is less than 10, color red
                ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 100]],
                [
                  "interpolate",
                  ["linear"],
                  ["get", "mag"],
                  5,
                  "rgb(176, 255, 0)", // Light green
                  10,
                  "rgb(0, 128, 0)", // Dark green
                ],

                ["all", [">=", ["get", "mag"], 100], ["<", ["get", "mag"], 15]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 200], ["<", ["get", "mag"], 20]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 300], ["<", ["get", "mag"], 25]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 400], ["<", ["get", "mag"], 30]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 500], ["<", ["get", "mag"], 35]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 600], ["<", ["get", "mag"], 40]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 700], ["<", ["get", "mag"], 45]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 800], ["<", ["get", "mag"], 50]],
                "#0000FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 50]],
                "#333333", // If mag is between 20 and 30, color blue
                "#ffffff",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5,
              ],
            },
          };
        }

        map.addLayer(layer);

        map.addLayer({
          id: "state-borders",
          type: "line",
          source: "states",
          layout: {},
          paint: {
            "line-color": "#444444",
            "line-width": 2,
          },
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.

        map.on("mousemove", "state-fills", (e) => {
          if (e.features.length > 0) {
            if (hoveredStateId) {
              map.setFeatureState(
                { source: "states", id: hoveredStateId },
                { hover: false }
              );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
              { source: "states", id: hoveredStateId },
              { hover: true }
            );
          }
        });
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on("mouseleave", "state-fills", () => {
          if (hoveredStateId) {
            map.setFeatureState(
              { source: "states", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = null;
        });

        map.on("click", "state-fills", function (e) {
          // Create a button element
          var coordinates = e.features[0].geometry.coordinates.slice();
          var cityName = e.features[0].properties.cityName;
          var cityValue = e.features[0].properties.mag;
          var Type = e.features[0].properties.type;
          var Unit = "";
          if (Type === "Temperature") Unit = "° C";
          else if (Type === "RainFall") Unit = "mm";
          else if (Type === "Pressure") Unit = "Pa";
          else if (Type === "Humidity") Unit = "%";
          else if (Type === "Wind Speed") Unit = "m/s";
          else if (Type === "Smog") Unit = "ppm";

          var popupContent = `
          <div class="bor flex map-pop-up">
            <div style="width: fit-content;">
              <div class="bor  m-2 p-1 map-pop-up-sub" style="height:48%;">
                <div class="bor m-1 p-1 text-sm flex justify-left items-left">City</div>
                <div class="bor m-1 p-1 text-5xl flex justify-center items-center">${cityName}</div>
              </div>
              <div class="bor m-2 p-1 map-pop-up-sub" style="height:48%;">
                <div class="bor m-1 p-1 text-sm flex justify-left items-left">Current ${Type}</div>
                <div class="bor m-1 p-1 text-5xl flex justify-center items-center">${cityValue.toFixed(
                  1
                )}<div class="bor m-1 p-1 text-sm flex justify-center items-center">${Unit}</div></div>
                
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

          // Calculate and set the popup width and height based on its content
          var popupNode = popup._content;
          popupNode.style.width = popupNode.offsetWidth + "px";
          popupNode.style.height = popupNode.offsetHeight + "px";
        });
      });
    }
  }, [props.Data]);

  if (props.flag) {
    return (
      <div
        id="TestMap"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    );
  } else {
    return (
      <div className="flex justify-center items-center mt-72">
        <Loader></Loader>
      </div>
    );
  }
}
