import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import PopulationData from "../components/population.geojson";
import Loader from "../components/loader";

const GISMap = (props) => {
  var x = props.flag;
  var dtaa = props.data.length;
  useEffect(() => {
    if (x === 1) {
      const map = new maplibregl.Map({
        container: "map",
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=ub6D6mcohLuVpSQqkHI2",
        center: [73.0479, 33.6844],
        zoom: 4.5,
      });

      map.on("load", async () => {
        map.addSource("PopulationData", {
          type: "geojson",
          data: props.data, //PopulationData,Make sure to provide the correct path to your GeoJSON data
        });

        map.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          })
        );

        var legend;
        if (props.feature === 1) {
          map.addLayer({
            id: "city-population",
            type: "circle",
            source: "PopulationData",
            paint: {
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                -20,
                10,
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                -20,
                "blue",
                -10,
                "rgba(132, 242, 255, 0.8)",
                0,
                "rgba(255, 197, 0, 0.8)",
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
          var legend = document.createElement("div");
          legend.className = "legend";
          legend.innerHTML = `
          <div class="flex ml-4">
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: blue;color:#efefef;border-radius:10px 0px 0px 10px;"
          >-20 to -10 °C</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(132, 242, 255, 0.8)"
          >-10 to 0 °C</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 197, 0, 0.8)"
          >0 to 10 °C</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 116, 0, 0.8)"
          >10 to 20 °C</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 50, 0, 0.8);color:#efefef;"
          >20 to 30 °C</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 2, 0, 0.8);color:#efefef;"
          >30 to 40 °C</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(107,2,24,0.8);color:#efefef;border-radius:0px 10px 10px 0px;"
          >40+ °C</div>
          
        </div></div>
      `;
        } else if (props.feature === 2) {
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
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                0,
                "grey",
                250,
                "rgba(132, 242, 255, 1)",
                500,
                "rgba(0, 0, 255, 1)",
                1000,
                "rgba(0, 0, 139, 1)",
                1500,
                "rgba(128, 0, 128, 1)",
                2000,
                "rgba(75, 0, 130, 1)",
              ],
            },
          });
          // Positioning the legend within the map container
          var legend = document.createElement("div");
          legend.className = "legend";
          legend.innerHTML = `
          <div class="flex ml-4">
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: grey;color:#efefef;border-radius:10px 0px 0px 10px;"
          >0 to 250 mm</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(132, 242, 255, 1);"
          >251 to 500 mm</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(0, 0, 255, 1);;color:#efefef;"
          >501 to 1000 mm</div>
        
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(0, 0, 139, 1);color:#efefef;"
          >1001 to 1500 mm</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(128, 0, 128, 1);color:#efefef;border-radius:0px 10px 10px 0px;"
          >1501 to 2000 mm</div>
          
        </div>   
      `;
        } else if (props.feature === 3) {
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
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                0,
                "grey",
                20,
                "rgba(224, 255, 255, 1)",
                40,
                "rgba(144, 238, 144, 1)",
                60,
                "rgba(238, 221, 130, 1)",
                80,
                "rgba(238, 221, 130, 1)",
                100,
                "rgba(240, 128, 128, 1)",
              ],
            },
          });
          var legend = document.createElement("div");
          legend.className = "legend";
          legend.innerHTML = `
          <div class="flex ml-4">
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: grey;color:#efefef;border-radius:10px 0px 0px 10px;"
          >0 to 20 %</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(224, 255, 255, 1)"
          >21 to 40 %</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(144, 238, 144, 1)"
          >41 to 60 %</div>
        
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(238, 221, 130, 1)"
          >61 to 80 %</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(240, 128, 128, 1); color:#efefef;border-radius:0px 10px 10px 0px;"
          >81 to 100 %</div>
          
        </div></div>
      `;
        } else if (props.feature === 4) {
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
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                0,
                "grey",
                70000,
                "rgba(224, 255, 255, 1)",
                80000,
                "rgba(144, 238, 144, 1)",
                90000,
                "rgba(238, 221, 130, 1)",
                100000,
                "rgba(255, 50, 0, 0.7)",
                110000,
                "rgba(240, 128, 128, 1)",
                120000,
                "rgba(139, 0, 0, 1)",
              ],
            },
          });
          var legend = document.createElement("div");
          legend.className = "legend";
          legend.innerHTML = `
          <div class="flex ml-4">
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: grey;color:#efefef;border-radius:10px 0px 0px 10px;">
            0 to 70000 Pa
          </div>
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(224, 255, 255, 1)"
          >70001 to 80000 Pa</div>
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(144, 238, 144, 1)"
          >80001 to 90000 Pa</div>
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(238, 221, 130, 1)"
          >90001 to 100000 Pa
          </div>
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(240, 128, 128, 1)"
          >100001 to 110000 Pa</div>
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(139, 0, 0, 1); color:#efefef;border-radius:0px 10px 10px 0px;"
          >110000+ Pa</div>
        </div></div>
      `;
        } else if (props.feature === 5) {
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
                12,
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                0,
                "black",
                2,
                "rgba(173, 216, 230, 1)",
                4,
                "rgba(144, 238, 144, 1)",
                6,
                "rgba(255, 255, 102, 1)",
                8,
                "rgba(255, 165, 0, 1)",
                10,
                "rgba(139, 0, 0, 1)",
              ],
            },
          });
          var legend = document.createElement("div");
          legend.className = "legend";
          legend.innerHTML = `
          <div class="flex ml-4">
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: grey;color:#efefef;border-radius:10px 0px 0px 10px;">
          0 to 2 m/s (Calm)</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(173, 216, 230, 1)"
          >2.1 to 4 m/s (Light Breeze)</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(144, 238, 144, 1)"
          >4.1 to 6 m/s (Moderate Breeze)</div>
        
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 255, 102, 1)"
          >6.1 to 8 m/s (Fresh Breeze)</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(255, 165, 0, 1)"
          >8.1 to 10 m/s (Strong Breeze)</div>
          
        </div>
        <div class="legend-item">
          <div
            class="legend-color"
            style="background-color: rgba(139, 0, 0, 1);color:#efefef;border-radius:0px 10px 10px 0px;"
          >10+ m/s (Strong Breeze)</div>
          
        </div></div>
      `;
        } else if (props.feature === 6) {
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
                12,
              ],
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "population"],
                0,
                "black",
                50,
                "rgba(173, 216, 230, 1)",
                100,
                "rgba(144, 238, 144, 1)",
                150,
                "rgba(255, 255, 102, 1)",
                200,
                "rgba(255, 165, 0, 1)",
                300,
                "rgba(139, 0, 0, 1)",
              ],
            },
          });
          var legend = document.createElement("div");
          legend.className = "legend";
          legend.innerHTML = `
          <div class="flex mr-6">
          <div class="legend-item">
            <div class="legend-color" style="background-color: grey;color:#efefef;border-radius:10px 0px 0px 10px;">
            Very Low Smog (Below 50 µg/m³)
            </div>
          </div>
          <div class="legend-item">
            <div
              class="legend-color"
              style="background-color: rgba(173, 216, 230, 1)"
            >
            Low Smog (50 µg/m³ - 100 µg/m³)
            </div>
          </div>
          <div class="legend-item">
            <div
              class="legend-color"
              style="background-color: rgba(144, 238, 144, 1)"
            >
            Moderate Smog (101 µg/m³ - 150 µg/m³)
            </div>
          </div>
          <div class="legend-item">
            <div
              class="legend-color"
              style="background-color: rgba(255, 255, 102, 1)"
            >
            High Smog (151 µg/m³ - 200 µg/m³)
            </div>
          </div>
          <div class="legend-item">
            <div
              class="legend-color"
              style="background-color: rgba(255, 165, 0, 1)"
            >
            Very High Smog (201 µg/m³ - 300 µg/m³)
            </div>
          </div>
          <div class="legend-item">
            <div
              class="legend-color"
              style="background-color: rgba(139, 0, 0, 1);color:#efefef;border-radius:0px 10px 10px 0px;"
            >
            Extreme Smog (Above 300 µg/m³)
            </div>
          </div>
        </div>
      `;
        }

        map.getContainer().appendChild(legend);
      });

      let popup; // Declare popup variable outside of event listeners

      map.on("click", "city-population", function (e) {
        // Create a button element
        var coordinates = e.features[0].geometry.coordinates.slice();
        var cityName = e.features[0].properties.city;
        var cityValue = Math.round(e.features[0].properties.population);

        // Create the main div element
        var popupContent = document.createElement("div");
        popupContent.className = "pop-up";
        popupContent.classList.add("popup-content");

        // Create the div element for the city name
        var cityNameDiv = document.createElement("div");
        cityNameDiv.className = "sub-pop-up";
        cityNameDiv.textContent = "City: " + cityName;
        popupContent.appendChild(cityNameDiv);

        // Create the div element for the city value
        var cityValueDiv = document.createElement("div");
        cityValueDiv.className = "sub-pop-up";
        cityValueDiv.textContent = "Value: " + cityValue;
        popupContent.appendChild(cityValueDiv);

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Create new popup and assign it to popup variable
        var popup = new maplibregl.Popup()
          .setLngLat(coordinates)
          .setDOMContent(popupContent) // Set the button as the popup content
          .addTo(map);
      });
    }
  }, [props.data]); // Added props.data to the dependency array

  if (x === 1) {
    return (
      <div>
        <div
          id="map"
          style={{
            height: "530px",
            width: "100%",
            borderRadius: "10px",
          }}
        ></div>{" "}
      </div>
    );
  } else {
    return (
      <>
        <div
          className="flex justify-center items-center text-center"
          style={{
            height: "500px",
            width: "100%",
          }}
        >
          <img src={Loader} alt="Loader" />
        </div>{" "}
      </>
    );
  }
};

export default GISMap;
