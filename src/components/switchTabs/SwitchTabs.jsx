import { useState } from "react";
import "./style.scss";

// eslint-disable-next-line react/prop-types
const SwitchTabs = ({data, onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  
  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);

    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
        <div className="tabItems">
     {/* eslint-disable-next-line react/prop-types */}
     {data.map((tab, index) => (
        <span
          key={index}
          onClick={() => activeTab(tab, index)}
          className={`tabItem ${selectedTab === index ? "active" : ""}`}
        >
          {tab}
        </span>
      ))}
      <span className="movingBg" style={{ left }}></span>
        </div>
  
    </div>
  );
};

export default SwitchTabs;
