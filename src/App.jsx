import React, { useState, useEffect } from "react";
import Home from './components/home.jsx';
import Preload from './components/preload.jsx';
import Draggable from 'react-draggable';


function App() {
  const [showHome, setShowHome] = useState(false);
  const handleButtonClick = () => {
    setShowHome(true);
  }
  useEffect(() => {
    if (showHome) {
    }
  }, [showHome]);
  return (
    <div className="wrapper">
      {showHome ? (
        <Home />
      ) : (
        <Preload onButtonClick={handleButtonClick} />
      )}
      {/* <Home /> */}
    </div>
  );
}

export default App;
