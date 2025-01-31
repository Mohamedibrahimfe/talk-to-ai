import Navbar from "./components/Navbar";
import React from 'react'
import UiComponent from "./components/UiComponent";

function App() {
  return (
    <div className="max-h-screen overflow-y-scroll bg-gray-100">
      <Navbar />
      <UiComponent />
    </div>
  );
}

export default App;
