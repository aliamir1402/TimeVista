import React, { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import LineChart from "../components/charts/SimpleLineChart";
import ReactDOM from "react-dom";
import Data from "./test.geojson";
import Loader from "./loader";
import MapKey from "./MapKey";

export default function Test(props) {
  const [TextArray, setTextArray] = useState([]);
  const [ColorArray, setColorsArray] = useState([]);

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
          setColorsArray([
            "#225ea9",
            "#41b7c5",
            "#ffffcd",
            "#ffeea1",
            "#ffda76",
            "#ffb34c",
            "#fe8e3c",
            "#fd4e2a",
            "#e41a1c",
            "#be0026",
            "#800026",
            "#333333",
          ]);
          setTextArray([
            "-20 to -15 °C",
            "-15 to -10 °C",
            "-10 to 5 °C",
            "5 to 0 °C",
            "0 to 5 °C",
            "5 to 10 °C",
            "10 to 15 °C",
            "15 to 20 °C",
            "20 to 25 °C",
            "25 to 30 °C",
            "30 to 35 °C",
            "35 to 40 °C",
          ]);
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
                [
                  "all",
                  [">=", ["get", "mag"], -15],
                  ["<", ["get", "mag"], -10],
                ],
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
          setColorsArray([
            "#CCCCCC",
            "#ADD8E6",
            "#6495ED",
            "#4169E1",
            "#0000FF",
          ]);
          setTextArray([
            "0 mm - 100 mm",
            "101 mm - 300 mm",
            "301 mm - 600 mm",
            "601 mm - 1000 mm",
            "1001 mm +",
          ]);
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
                ["all", [">=", ["get", "mag"], 0], ["<", ["get", "mag"], 100]],
                "#CCCCCC", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 101],
                  ["<", ["get", "mag"], 300],
                ],
                "#ADD8E6", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 301],
                  ["<", ["get", "mag"], 600],
                ],
                "#6495ED", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 601],
                  ["<", ["get", "mag"], 1000],
                ],
                "#4169E1", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 1001]],
                "#0000FF", // If mag is between 20 and 30, color blue
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
          setColorsArray([
            "#FFFF99",
            "#CCFF99",
            "#99CCFF",
            "#CC99FF",
            "#FF99CC",
          ]);
          setTextArray([
            "0% - 20%",
            "21% - 40%",
            "41% - 60%",
            "61% - 80%",
            "81% - 100%",
          ]);
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

                ["all", [">=", ["get", "mag"], 0], ["<", ["get", "mag"], 20]],
                "#FFFF99", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 21], ["<", ["get", "mag"], 40]],
                "#CCFF99", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 41], ["<", ["get", "mag"], 60]],
                "#99CCFF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 61], ["<", ["get", "mag"], 80]],
                "#CC99FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 81]],
                "#FF99CC", // If mag is between 20 and 30, color blue
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
          setColorsArray([
            "#FFFF99",
            "#CCFF99",
            "#99CCFF",
            "#CC99FF",
            "#FF99CC",
          ]);
          setTextArray([
            "80000 Pa - 90000 Pa",
            "90001 Pa - 95000 Pa",
            "95001 Pa - 100000 Pa",
            "100001 Pa - 105000 Pa",
            "105001 Pa +",
          ]);
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

                [
                  "all",
                  [">=", ["get", "mag"], 80000],
                  ["<", ["get", "mag"], 90000],
                ],
                "#FFFF99", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 90001],
                  ["<", ["get", "mag"], 95000],
                ],
                "#CCFF99", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 95001],
                  ["<", ["get", "mag"], 100000],
                ],
                "#99CCFF", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 100001],
                  ["<", ["get", "mag"], 105000],
                ],
                "#CC99FF", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 105001]],
                "#FF99CC", // If mag is between 20 and 30, color blue
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
          setColorsArray([
            "#ADD8E6",
            "#90EE90",
            "#FFFF99",
            "#FFD700",
            "#FFA07A",
          ]);
          setTextArray([
            "0 m/s - 2 m/s",
            "2.1 m/s - 5 m/s",
            "5.1 m/s - 8 m/s",
            "8.1 m/s - 11 m/s",
            "11.1 m/s +",
          ]);
          layer = {
            id: "state-fills",
            type: "fill",
            source: "states",
            layout: {},
            paint: {
              "fill-color": [
                "case",
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

                ["all", [">=", ["get", "mag"], 0], ["<", ["get", "mag"], 2]],
                "#ADD8E6", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 2.1], ["<", ["get", "mag"], 5]],
                "#90EE90", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 5.1], ["<", ["get", "mag"], 8]],
                "#FFFF99", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 8.1], ["<", ["get", "mag"], 11]],
                "#FFD700", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 11.1]],
                "#FFA07A", // If mag is between 20 and 30, color blue
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
          setColorsArray([
            "#90EE90",
            "#FFFF00",
            "#FFA500",
            "#FF0000",
            "#8B0000",
            "#800080",
          ]);
          setTextArray([
            "0 - 50 (Good)",
            "51 - 100 (Moderate)",
            "101 - 150 (Unhealthy for Sensitive Groups)",
            "151 - 200 (Unhealthy)",
            "201 - 300 (Very Unhealthy)",
            "301 and above (Hazardous)",
          ]);
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

                ["all", [">=", ["get", "mag"], 0], ["<", ["get", "mag"], 50]],
                "#90EE90", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 51], ["<", ["get", "mag"], 100]],
                "#FFFF00", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 101],
                  ["<", ["get", "mag"], 150],
                ],
                "#FFA500", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 151],
                  ["<", ["get", "mag"], 200],
                ],
                "#FF0000", // If mag is between 20 and 30, color blue
                [
                  "all",
                  [">=", ["get", "mag"], 201],
                  ["<", ["get", "mag"], 300],
                ],
                "#8B0000", // If mag is between 20 and 30, color blue
                ["all", [">=", ["get", "mag"], 301]],
                "#800080", // If mag is between 20 and 30, color blue
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
          if (cityValue === undefined) cityValue = 100;
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
                <div class="bor m-1 p-1 text-sm flex justify-left items-left">${
                  props.Year
                } ${Type}</div>
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
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          id="TestMap"
          style={{
            width: "100%",
            height: "100%",
          }}
        ></div>
        <MapKey colors={ColorArray} text={TextArray} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center mt-72">
        <Loader></Loader>
      </div>
    );
  }
}
