import React from "react";

function MapKey({ text, colors }) {
  return (
    <div className="flex map-key">
      {colors.map((color, index) => (
        <div
          key={index}
          className="map-key-item"
          style={{ backgroundColor: color }}
        >
          {text[index]}
        </div>
      ))}
    </div>
  );
}

export default MapKey;
