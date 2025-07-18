import React, { useState } from 'react';
import './setting.css';

function Setting() {
  const [darkMode, setDarkMode] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          <li className="active">General</li>
          <li>Data Controls</li>
          <li>Accessibility</li>
          <li>Keyboard Shortcuts</li>
          <li>About</li>
        </ul>
      </div>

      <div className="settings-main">
        <h3>General</h3>
        <div className="setting-item">
          <div className="setting-info">
            <p className="setting-title">Dark Mode</p>
            <p className="setting-description">Switch between light and dark theme</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <p className="setting-title">Share usage data</p>
            <p className="setting-description">Help us improve by sharing anonymous data</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={dataSharing}
              onChange={() => setDataSharing(!dataSharing)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Add more setting sections below */}
      </div>
    </div>
  );
}

export default Setting;
