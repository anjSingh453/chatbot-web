// Upgrade.jsx
import React from "react";
import "./upgrade.css";

function Upgrade() {
  return (
    <div className="upgrade-container">
      <div className="upgrade-header">
        <h1>Upgrade to ChatGPT Plus</h1>
        <p>Get faster responses and access to GPT-4</p>
      </div>

      <div className="plan-box">
        <h2>ChatGPT Free</h2>
        <ul>
          <li>Access to GPT-3.5</li>
          <li>Standard response speed</li>
          <li>Regular model updates</li>
        </ul>
      </div>

      <div className="plan-box plus">
        <h2>ChatGPT Plus – <span>$20/month</span></h2>
        <ul>
          <li>Access to GPT-4</li>
          <li>Faster response speed</li>
          <li>Priority access to new features</li>
        </ul>
        <button className="upgrade-button">Upgrade to Plus</button>
      </div>

      <div className="disclaimer">
        <p>Cancel anytime. Service will renew monthly until canceled.</p>
      </div>
    </div>
  );
}

export default Upgrade;
