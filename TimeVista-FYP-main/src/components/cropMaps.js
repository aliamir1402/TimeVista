import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import Data from "./data.geojson";

export default function CropMaps() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "CropsMap",
      style:
        "https://api.maptiler.com/maps/basic/style.json?key=ub6D6mcohLuVpSQqkHI2",
      center: [-120, 50],
      zoom: 2,
    });

    map.on("load", () => {
      // Add a geojson point source.
      // Heatmap layers also work with a vector tile source.
      map.addSource("earthquakes", {
        type: "geojson",
        data: Data,
      });

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
              6,
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
              "#333333", // Transparent
              0.5,
              "rgb(144,238,144)", // Light Green
              1,
              "rgb(255,255,0)", // Light Yellow
              1.5,
              "rgb(60,179,113)", // Medium Green
              2,
              "rgb(255,215,0)", // Medium Yellow
              2.5,
              "rgb(0,100,0)", // Dark Green
              3,
              "rgb(255,165,0)", // Dark Yellow
              3.5,
              "rgb(178,24,43)", // Assuming it continues with Dark Red
              4,
              "rgb(253,219,199)",
              4.5,
              "rgb(239,138,98)",
              5,
              "rgb(178,24,43)",
              // Continue as necessary
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
              7,
              "rgba(33,102,172,0)",
              7.5,
              "rgb(103,169,207)",
              8,
              "rgb(209,229,240)",
              8.5,
              "rgb(253,219,199)",
              9,
              "rgb(239,138,98)",
              9.5,
              "rgb(178,24,43)",
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
  });
  return (
    <>
      <div id="CropsMap"></div>
    </>
  );
}
