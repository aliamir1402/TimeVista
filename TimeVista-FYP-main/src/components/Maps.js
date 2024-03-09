import React, { useEffect } from "react";
import maplibregl from "maplibre-gl"; // Import the maplibregl library

export default function Maps() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map-markers",
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [73.0479, 33.6844],
      zoom: 9,
    });
    const marker = new maplibregl.Marker()
      .setLngLat([73.0479, 33.6844])
      .addTo(map);

    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    map.on("load", async () => {
      {
        /* ICONS */
      }
      const image = await map.loadImage(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png"
      );
      map.addImage("cat", image.data);

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
          "icon-image": "cat",
          "icon-size": 0.15,
        },
      });
      {
        /*  */
      }
    });
  }, []);
  return (
    <>
      <div id="map-markers" className="map-markers"></div>
    </>
  );
}
