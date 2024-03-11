<<<<<<< HEAD
import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import PopulationData from "../components/population.geojson";
import Loader from "../components/images/Loader.gif";

const GISMap = (props) => {
  var x = 1; //props.flag;;
  useEffect(() => {
    if (x === 1) {
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
          data: PopulationData, //props.data, // // Make sure to provide the correct path to your GeoJSON data
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
              -20,
              "rgba(0, 117, 255, 0.8)",
              -10,
              "rgba(132, 242, 255, 1)",
              0,
              "rgba(255, 197, 0, 1)",
              10,
              "rgba(255,116,0,0.8)",
              20,
              "rgba(255, 50, 0, 0.8)",
              30,
              "rgba(255, 2, 0, 0.8)",
              40,
              "rgba(107,2,24,0.8)",
            ],
          },
        });

        // Positioning the legend within the map container
        const legend = document.createElement("div");
        legend.className = "legend";
        legend.innerHTML = `
        <div class="legend-item">
          <div
            class="legend-color"
          ></div>
          -20 to -10
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(132, 242, 255, 1)"
          ></div>
          -10 to 0
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 197, 0, 1)"
          ></div>
          0 to 10
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 116, 0, 0.8)"
          ></div>
          10 to 20
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 50, 0, 0.8)"
          ></div>
          20 to 30 
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 2, 0, 0.8)"
          ></div>
          30 to 40
        </div>
      `;
        map.getContainer().appendChild(legend);
      });
    }
  }, [props.data]); // Added props.data to the dependency array

  if (x === 1) {
    return (
      <div>
        <div
          id="map"
          style={{ height: "530px", width: "100%", borderRadius: "10px" }}
        ></div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="flex justify-center items-center text-center"
          style={{ height: "500px", width: "100%" }}
        >
          <img src={Loader} alt="Loader" />
        </div>
      </>
    );
  }
};

export default GISMap;
=======
import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import PopulationData from "../components/population.geojson";
import Loader from "../components/images/Loader.gif";

const GISMap = (props) => {
  var x =  1//props.flag;;
  useEffect(() => {
    if (x === 1) {
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
          data: PopulationData, //props.data, // // Make sure to provide the correct path to your GeoJSON data
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
              -20,
              "rgba(0, 117, 255, 0.8)",
              -10,
              "rgba(132, 242, 255, 1)",
              0,
              "rgba(255, 197, 0, 1)",
              10,
              "rgba(255,116,0,0.8)",
              20,
              "rgba(255, 50, 0, 0.8)",
              30,
              "rgba(255, 2, 0, 0.8)",
              40,
              "rgba(107,2,24,0.8)",
            ],
          },
        });

        // Positioning the legend within the map container
        const legend = document.createElement("div");
        legend.className = "legend";
        legend.innerHTML = `
        <div class="legend-item">
          <div
            class="legend-color"
          ></div>
          -20 to -10
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(132, 242, 255, 1)"
          ></div>
          -10 to 0
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 197, 0, 1)"
          ></div>
          0 to 10
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 116, 0, 0.8)"
          ></div>
          10 to 20
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 50, 0, 0.8)"
          ></div>
          20 to 30 
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 2, 0, 0.8)"
          ></div>
          30 to 40
        </div>
      `;
        map.getContainer().appendChild(legend);
      });
    }
  }, [props.data]); // Added props.data to the dependency array

  if (x === 1) {
    return (
      <div>
        <div
          id="map"
          style={{ height: "530px", width: "100%", borderRadius: "10px" }}
        ></div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="flex justify-center items-center text-center"
          style={{ height: "500px", width: "100%" }}
        >
          <img src={Loader} alt="Loader" />
        </div>
      </>
    );
  }
};

export default GISMap;
>>>>>>> 2e7c0252ff7f2f52cd831d3f8aebfbcb23cbfcde
