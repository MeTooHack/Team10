import React from "react";
import { VoiceGraph } from "./VoiceGraph";
import { SuppressionTechniquesList } from "./SuppressionTechniquesList";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Team TÄN</h1>
      </header>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexGrow: 1 }}>
          <VoiceGraph />
        </div>

        <div style={{ width: '400px' }}>
          <SuppressionTechniquesList />
        </div>
      </div>
    </div>
  );
}
