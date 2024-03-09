import React from "react";
import InsightsBoxs from "./InsightsBoxs.js";
import Foresights from "./Foresights.js";
import SimpleAreaChart from "./charts/SimpleAreaChart.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TempIcon from "./images/icons8-temperature-80.png";
import calender from "../components/images/calender.svg";

export default function Temperature() {
  return (
    <>
      <div className="flex_box">
        <div className="mb-4">
          <SimpleAreaChart
            feature="Temperature"
            TempIcon={TempIcon}
          ></SimpleAreaChart>
        </div>

        <div
          className="p-6 ml-8 w-fit h-fit div-box-feature"
          style={{ boxShadow: "0px 0px 10px 0px rgb(230, 230, 230)" }}
        >
          <div className="p-2 bgcolor-feature-2 mb-4">
            <div className="name-box-feature-2 mb-4">Stats</div>
            <div className="name-box-feature-description-2">14.2 °C</div>
            <div className="name-box-feature-date-2 flex">
              <div className="">
                <img src={calender} alt="calender" height={20} width={20} />
              </div>
              <div className="name-box-feature-date-sub-2">Sep 28, 2018</div>
            </div>
          </div>

          <div
            className="p-2 bgcolor-feature-2 mb-4"
            style={{ backgroundColor: "#cdafdb" }}
          >
            <div
              className="name-box-feature-2"
              style={{ borderColor: "#be4ee0" }}
            >
              Stats
            </div>
            <div className="name-box-feature-description-2">18.2 °C</div>
            <div className="name-box-feature-date-2 flex">
              <div className="">
                <img src={calender} alt="calender" height={20} width={20} />
              </div>
              <div
                className="name-box-feature-date-sub-2"
                style={{ color: "#434343" }}
              >
                Sep 28, 2018
              </div>
            </div>
          </div>
          <div className="p-2 bgcolor-feature-1 mb-4">
            <div className="name-box-feature-1">Stats</div>
            <div className="name-box-feature-description-1">28.2 °C</div>
            <div className="name-box-feature-date-1 flex">
              <div className="">
                <img src={calender} alt="calender" height={20} width={20} />
              </div>
              <div className="name-box-feature-date-sub-1">Sep 28, 2018</div>
            </div>
          </div>
        </div>

        {/*
        <div className="flex_item p-4 flex_box">
          <div className="flex_item">
            <Tabs variant="soft-rounded" colorScheme="cyan">
              <TabList>
                <Tab>Insights</Tab>
                <Tab>ForeSights</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <InsightsBoxs></InsightsBoxs>
                </TabPanel>
                <TabPanel>
                  <Foresights></Foresights>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          {/** 
          <div className="flex_item">
            <iframe
              className="mapsiframe"
              src="https://map.worldweatheronline.com/temperature"
              frameborder="0"
            ></iframe>
          </div>
          /}
        </div>
        */}
      </div>
    </>
  );
}
