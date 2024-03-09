import React from "react";
import Header from "./header.js";
import TabsInForsights from "./TabsInForsights.js";
import Welcome from "./welcome.js";
import Sidebar from "./sidebar.js";
import Footer from "../components/footer.js";

export default function Analytics() {
  return (
    <>
      <div className="analytics-main">
        <Header></Header>
        <TabsInForsights></TabsInForsights>
        <div id="footer">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
