import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import Data from "./test.geojson";

export default function Test() {
  useEffect(() => {
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
        data: Data,
      });

      map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
          "fill-color": [
            "case",
            ["<", ["get", "mag"], 0],
            "#eeeeee", // If mag is less than 10, color red
            ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 100]],
            "rgb(255, 255, 0)", // If mag is between 10 and 20, color green
            ["all", [">=", ["get", "mag"], 100], ["<", ["get", "mag"], 200]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 200], ["<", ["get", "mag"], 300]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 300], ["<", ["get", "mag"], 400]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 400], ["<", ["get", "mag"], 500]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 500], ["<", ["get", "mag"], 600]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 600], ["<", ["get", "mag"], 700]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 700], ["<", ["get", "mag"], 800]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 800], ["<", ["get", "mag"], 900]],
            "#0000FF", // If mag is between 20 and 30, color blue
            ["all", [">=", ["get", "mag"], 900]],
            "#333333", // If mag is between 20 and 30, color blue
            "#ffffff"
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.5,
          ],
        },
      });

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

      map.on("click", "state-fills", (e) => {
        const properties = e.features[0].properties;
        const mag = e.features[0].properties.mag;

        const popupContent = `
          <div class="bor flex map-pop-up">
            <div class="bor flex justify-center items-center" style="width: fit-content;">
              <div class="bor m-2 p-1 map-pop-up-sub" style="height:90%;">
                <div class="bor m-1 p-1 text-sm flex justify-left items-left">Current ${mag}</div>
                <div class="bor m-1 p-1 text-5xl flex justify-center items-center">${mag}</div>
                <div class="bor m-1 p-1 text-sm flex justify-center items-center">PPM</div>
              </div>
            </div>
            <div style="width: fit-content;">
              <div class="text-3xl p-2 mb-2">RealTime Stats</div>
            </div>
          </div>`;

        const popup = new maplibregl.Popup({ maxWidth: "auto" })
          .setLngLat(e.lngLat)
          .setHTML(popupContent)
          .addTo(map);
      });
    });
  }, []);

  return (
    <div
      id="TestMap"
      style={{
        width: "95vw",
        height: "95vh",
        top: "3vh",
        left: "3vw",
        borderRadius: "15px",
        boxShadow: "0px 0px 5px 1px #dddddd",
      }}
    ></div>
  );
}
