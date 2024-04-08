import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";
import RainFallIcon from "../components/images/rain.png";
import FloodsIcon from "../components/images/flooded-house.png"; // Import another image for cat icon
import WindsIcon from "../components/images/wind.png";
import DroughtIcon from "../components/images/drought.png";
import SnowIcon from "../components/images/snow.png";
import EarthquakeIcon from "../components/images/earthquake.png";
import HailStormIcon from "../components/images/hailstorm.png"; // Import another image for cat icon
import HeatWaveIcon from "../components/images/global-warming.png";
import CycloneIcon from "../components/images/tornado.png";
import LocustIcon from "../components/images/locust.png";
import Loader from "./loader.js";
import InfoImage from "../components/images/LandScapeImg.jpg";
import CloseIcon from "../components/images/close.svg";
import { Notes } from "@mui/icons-material";

export default function Maps(props) {
  useEffect(() => {
    if (props.flag && props.data.features.length !== 0) {
      const map = new maplibregl.Map({
        container: "map-markers",
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=ub6D6mcohLuVpSQqkHI2",
        center: [70.0479, 30.6844],
        zoom: 5,
      });

      map.on("load", async () => {
        var rainImage = await map.loadImage(RainFallIcon);
        var floodImage = await map.loadImage(FloodsIcon);
        var windImage = await map.loadImage(WindsIcon);
        var DroughtImage = await map.loadImage(DroughtIcon);
        var SnowImage = await map.loadImage(SnowIcon);
        var EarthqaukeImage = await map.loadImage(EarthquakeIcon);
        var HailStormImage = await map.loadImage(HailStormIcon);
        var HeatWaveImage = await map.loadImage(HeatWaveIcon);
        var CycloneImage = await map.loadImage(CycloneIcon);
        var LocustImage = await map.loadImage(LocustIcon);

        map.addImage("RainFall", rainImage.data);
        map.addImage("Floods", floodImage.data);
        map.addImage("Winds", windImage.data);
        map.addImage("Drought", DroughtImage.data);
        map.addImage("Snow", SnowImage.data);
        map.addImage("Earthquake", EarthqaukeImage.data);
        map.addImage("HailStorm", HailStormImage.data);
        map.addImage("Heatwave", HeatWaveImage.data);
        map.addImage("Cyclone", CycloneImage.data);
        map.addImage("Locust", LocustImage.data);

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
          data: props.data,
        });

        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": ["get", "icon"], // Use the "icon" property from GeoJSON
            "icon-size": 0.08,
          },
        });
        let popup; // Declare popup variable outside of event listeners

        map.on("click", "points", function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var cityName = e.features[0].properties.cityName;
          var Event = e.features[0].properties.Event;
          var year = e.features[0].properties.year;
          var region = e.features[0].properties.region;
          var duration = e.features[0].properties.duration;
          var icon = e.features[0].properties.icon;
          var notes = e.features[0].properties.notes;
          var url = e.features[0].properties.url;

          // Create a button element
          // Create the parent div element
          var infoBoxShow = document.createElement("div");
          infoBoxShow.id = "info_box_show";
          infoBoxShow.className = "flex_box";

          // Create the first child div element
          var infoSub1 = document.createElement("div");
          infoSub1.id = "info_sub_1";
          infoSub1.className = "flex justify-center text-center text-3xl";
          var img = document.createElement("img");
          img.src =
            "https://en.wikipedia.org/wiki/File:Phet_2010-06-02_0655Z.jpg";
          img.alt = "image";
          infoSub1.appendChild(img);

          // Create the second child div element
          var infoSub2 = document.createElement("div");
          infoSub2.className = "info_sub_2";

          // Create the title div element
          var titleDiv = document.createElement("div");
          titleDiv.className = "justify-center text-center info_sub_2_title";
          titleDiv.textContent = Event;

          // Create the section div elements for category and location
          var categoryDiv = document.createElement("div");
          categoryDiv.className =
            "justify-center text-center info_sub_2_section flex_item";
          categoryDiv.textContent = icon;

          var locationDiv = document.createElement("div");
          locationDiv.className =
            "justify-center text-center info_sub_2_section flex_item";
          locationDiv.textContent = cityName + " " + region;

          var timeDiv = document.createElement("div");
          timeDiv.className = "info_sub_2_section justify-center text-center";
          timeDiv.textContent = year + " - " + duration;

          // Create the description and references div elements
          var descriptionDiv = document.createElement("div");
          descriptionDiv.className = "justify-center text-center info_sub_2_section";
          descriptionDiv.textContent = notes;

          var referencesDiv = document.createElement("div");
          referencesDiv.className = "justify-center text-center info_sub_2_section";

          // Create an anchor element
          var linkElement = document.createElement("a");
          linkElement.href = url; // Set the href attribute to the URL
          linkElement.textContent = url; // Set the text content to display

          // Append the anchor element to the referencesDiv
          referencesDiv.appendChild(linkElement);

          // Append child elements to their respective parent elements
          infoSub2.appendChild(titleDiv);
          infoSub2.appendChild(
            document.createElement("div").appendChild(categoryDiv)
          );
          infoSub2.appendChild(
            document.createElement("div").appendChild(locationDiv)
          );
          infoSub2.appendChild(timeDiv);
          infoSub2.appendChild(descriptionDiv);
          infoSub2.appendChild(referencesDiv);

          // Append all child elements to the parent div
          infoBoxShow.appendChild(infoSub1);
          infoBoxShow.appendChild(infoSub2);

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Create new popup and assign it to popup variable
          popup = new maplibregl.Popup({ maxWidth: "auto" })
            .setLngLat(coordinates)
            .setDOMContent(infoBoxShow) // Set the button as the popup content
            .addTo(map);
        });
      });
      console.log(props.data);
    }
  }, [props.flag, props.data]);
  if (props.flag && props.data.features.length !== 0) {
    return (
      <>
        <div id="map-markers" className="map-markers"></div>
      </>
    );
  } else if (props.flag && props.data.features.length === 0) {
    return (
      <>
        <div>No Events Occured!</div>
      </>
    );
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
}

/*
[
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [72.38, 34.1478], // Coordinates for Sialkot
              },
              properties: {
                cityName: "Sialkot",
                icon: "RainFall",
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
                icon: "Floods",
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
                icon: "Winds",
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
                icon: "RainFall",
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
                icon: "Floods",
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
                icon: "Winds",
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
                icon: "RainFall",
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
                icon: "Floods",
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
                icon: "Winds",
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
                icon: "RainFall",
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
                icon: "Floods",
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
                icon: "Winds",
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
                icon: "RainFall",
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
                icon: "Floods",
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
                icon: "Winds",
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
                icon: "RainFall",
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
                icon: "Floods",
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
                icon: "Winds",
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
                icon: "RainFall",
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
                icon: "Floods",
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
*/
