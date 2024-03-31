import React from "react";

export default function loader() {
  return (
    
    <div class="terminal-loader">
      <div class="terminal-header">
        <div cla ss="terminal-title">
          Status
        </div>
        <div class="terminal-controls">
          <div class="control close"></div>
          <div class="control minimize"></div>
          <div class="control maximize"></div>
        </div>
      </div>
      <div class="text">TimeVista...</div>
    </div>
  );
}
