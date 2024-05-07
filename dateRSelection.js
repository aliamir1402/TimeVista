import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function DateRSelection() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <>
      <div className="date-box">
        <Datepicker
          placeholder={"Start Date - End Date"}
          displayFormat={"MM/YYYY"}
          primaryColor={"purple"}
          value={value}
          onChange={handleValueChange}
          showShortcuts={true}
          containerClassName="relative"
          popoverDirection="down"
          toggleClassName="absolute bg-violet-500 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>
    </>
  );
}
