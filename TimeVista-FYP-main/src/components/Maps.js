<<<<<<< HEAD
import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import RainIcon from "../components/images/icons8-rainfall-96.png";
import FloodIcon from "../components/images/flood_11518282.png"; // Import another image for cat icon
import WindIcon from "../components/images/windstorm_2480645.png";
import DroughtIcon from "../components/images/desert_11056941.png";
import SnowIcon from "../components/images/snow.png";

export default function Maps() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map-markers",
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [70.0479, 30.6844],
      zoom: 5,
    });

    map.on("load", async () => {
      var rainImage = await map.loadImage(RainIcon);
      var floodImage = await map.loadImage(FloodIcon);
      var windImage = await map.loadImage(WindIcon);
      var DroughtImage = await map.loadImage(DroughtIcon);
      var SnowImage = await map.loadImage(SnowIcon);

      map.addImage("rain", rainImage.data);
      map.addImage("flood", floodImage.data);
      map.addImage("wind", windImage.data);
      map.addImage("Drought", DroughtImage.data);
      map.addImage("Snow", SnowImage.data);

      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [72.38, 34.1478], // Coordinates for Sialkot
              },
              properties: {
                cityName: "Sialkot",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.4816, 30.199], // Coordinates for Bahawalpur
              },
              properties: {
                cityName: "Bahawalpur",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.4389, 30.1968], // Coordinates for Rahim Yar Khan
              },
              properties: {
                cityName: "Rahim Yar Khan",
                icon: "wind",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [70.4506, 31.5566], // Coordinates for Jhelum
              },
              properties: {
                cityName: "Jhelum",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [68.8497, 25.1282], // Coordinates for Hyderabad
              },
              properties: {
                cityName: "Hyderabad",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [73.7512, 33.9949], // Coordinates for Sheikhupura
              },
              properties: {
                cityName: "Sheikhupura",
                icon: "wind",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.6296, 30.1984], // Coordinates for Dera Ghazi Khan
              },
              properties: {
                cityName: "Dera Ghazi Khan",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [68.4216, 28.4224], // Coordinates for Sukkur
              },
              properties: {
                cityName: "Sukkur",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.6312, 30.1998], // Coordinates for Muzaffargarh
              },
              properties: {
                cityName: "Muzaffargarh",
                icon: "wind",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [73.2562, 31.4686], // Coordinates for Chakwal
              },
              properties: {
                cityName: "Chakwal",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [68.4153, 28.2668], // Coordinates for Larkana
              },
              properties: {
                cityName: "Larkana",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [68.8484, 25.3933], // Coordinates for Nawabshah
              },
              properties: {
                cityName: "Nawabshah",
                icon: "wind",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [70.6254, 32.0836], // Coordinates for Khushab
              },
              properties: {
                cityName: "Khushab",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [69.5541, 30.2016], // Coordinates for Rajanpur
              },
              properties: {
                cityName: "Rajanpur",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.493, 31.594], // Coordinates for Mandi Bahauddin
              },
              properties: {
                cityName: "Mandi Bahauddin",
                icon: "wind",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.6504, 33.6077], // Coordinates for Okara
              },
              properties: {
                cityName: "Okara",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [72.1296, 32.5789], // Coordinates for Mianwali
              },
              properties: {
                cityName: "Mianwali",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [68.8671, 27.8057], // Coordinates for Jacobabad
              },
              properties: {
                cityName: "Jacobabad",
                icon: "wind",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [73.0422, 33.7356], // Coordinates for Gujrat
              },
              properties: {
                cityName: "Gujrat",
                icon: "rain",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.455, 29.5532], // Coordinates for Bhakkar
              },
              properties: {
                cityName: "Bhakkar",
                icon: "flood",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [74.0011, 34.1478],
              },
              properties: {
                cityName: "Karachi",
                year: "2010",
                icon: "Snow",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [74.3587, 31.5204],
              },
              properties: {
                cityName: "Lahore",
                year: "2015",
                icon: "Snow",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [73.0479, 33.6844],
              },
              properties: {
                cityName: "Islamabad",
                year: "2001",
                icon: "Snow",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [67.8808, 29.5532],
              },
              properties: {
                cityName: "Sibi",
                year: "2001",
                icon: "Drought",
              },
            },
          ],
        },
      });

      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": ["get", "icon"], // Use the "icon" property from GeoJSON
          "icon-size": 0.35,
        },
      });
      // Add click event listener
      map.on("click", "points", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = "City: " + e.features[0].properties.cityName; // You can replace this with your desired popup content

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "points", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "points", function () {
        map.getCanvas().style.cursor = "";
      });
    });
  }, []);

  return (
    <>
      <div id="map-markers" className="map-markers"></div>
    </>
  );
}
=======
import React, { useEffect } from "react";
import maplibregl from "maplibre-gl"; // Import the maplibregl library
import RainIcon from "../components/images/icons8-rainfall-96.png"; // Import your image

export default function Maps() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map-markers",
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [73.0479, 33.6844],
      zoom: 9,
    });

    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    map.on("load", async () => {
      // Convert image to data URI
      const image = await getBase64Image(RainIcon);
      map.addImage("rain-icon", image);

      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [73.0479, 33.6844],
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [71.0479, 33.6844],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "rain-icon",
          "icon-size": 0.15,
        },
      });
    });
  }, []);

  // Function to convert image to data URI
  const getBase64Image = async (imgSrc) => {
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Error converting image to data URI:", error);
    }
  };

  return (
    <>
      <div id="map-markers" className="map-markers"></div>
    </>
  );
}
>>>>>>> 2e7c0252ff7f2f52cd831d3f8aebfbcb23cbfcde
