import React, { useState, useEffect } from "react";
import CameraAim from "./p5/CameraAim";
import CameraCursor from "./p5/CameraCursor";

const Mode = {
  AIM: 'AIM',
  CURSOR: 'CURSOR'
}

function App() {
  const [mode, setMode] = useState(Mode.AIM)

  return (
    <div>
      <div className="mode-choose">
        <div className="radio-wrapper">
          <input
            type="radio" id="radio-mode-aim"
            value={ Mode.AIM }
            checked={ mode === Mode.AIM }
            onChange={ (event) => setMode(event.target.value) }
          />
          <label htmlFor="radio-mode-aim"> { Mode.AIM } </label>
        </div>
        <div className="radio-wrapper">
          <input
            type="radio" id="radio-mode-cursor"
            value={ Mode.CURSOR }
            checked={ mode === Mode.CURSOR }
            onChange={ (event) => setMode(event.target.value) }
          />
          <label htmlFor="radio-mode-cursor"> { Mode.CURSOR } </label>
        </div>
      </div>
      {
        mode === Mode.AIM ? <CameraAim /> : <CameraCursor />
      }
    </div>
  );
}

export default App;
