import React from "react";
import Header from "./header.js";
import AnalyticsContent from "./AnalyticsContent.js";
import Welcome from "./welcome.js";
import Sidebar from "./sidebar.js";
import Footer from "../components/footer.js";

export default function Analytics() {
  return (
    <>
      <div className="analytics-main">
        <Header></Header>
        <AnalyticsContent></AnalyticsContent>
        <div id="footer">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
