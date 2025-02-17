import Navbar from "./components/Navbar";
import UiComponent from "./components/UiComponent";
import React from "react";
function App() {
  
  return (
    <div className="max-h-screen overflow-y-scroll bg-gray-100">
      <Navbar />
      <UiComponent />
    </div>
  );
}

export default App;
