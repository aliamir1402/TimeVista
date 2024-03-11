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
