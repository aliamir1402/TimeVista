import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import PopulationData from "../components/population.geojson";

const GISMap = () => {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [73.0479, 33.6844],
      zoom: 4.5,
    });

    map.on("load", async () => {
      map.addSource("PopulationData", {
        type: "geojson",
        data: PopulationData, // Make sure to provide the correct path to your GeoJSON data
      });

      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      map.addLayer({
        id: "city-population",
        type: "circle",
        source: "PopulationData",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "population"],
            0,
            10,
            100000,
            12,
            500000,
            14,
            1000000,
            16,
            2000000,
            18,
            5000000,
            20,
            10000000,
            22,
            20000000,
            24,
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "population"],
            0,
            "rgba(0, 117, 255, 0.8)",
            100000,
            "rgba(132, 242, 255, 1)",
            500000,
            "rgba(255, 197, 0, 1)",
            1000000,
            "rgba(255,116,0,0.8)",
            5000000,
            "rgba(255, 50, 0, 0.8)",
            10000000,
            "rgba(255, 2, 0, 0.8)",
            20000000,
            "rgba(107,2,24,0.8)",
          ],
        },
      });
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      <div className="legend">
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(0, 117, 255, 0.8)" }}
          ></div>
          0 - 100,000
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(132, 242, 255, 1)" }}
          ></div>
          100,000 - 500,000
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(255, 197, 0, 1)" }}
          ></div>
          500,000 - 1,000,000
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(255, 116, 0, 0.8)" }}
          ></div>
          1,000,000 - 5,000,000
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(255, 50, 0, 0.8)" }}
          ></div>
          5,000,000 - 10,000,000
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(255, 2, 0, 0.8)" }}
          ></div>
          10,000,000 - 20,000,000
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "rgba(107, 2, 24, 0.8)" }}
          ></div>
          20,000,000+
        </div>
      </div>
    </div>
  );
};

export default GISMap;
