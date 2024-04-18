import React from "react";
import CropMap from "../components/cropMaps";
import Header from "./header";
import Footer from "./footer";

export default function Crops() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <CropMap />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
