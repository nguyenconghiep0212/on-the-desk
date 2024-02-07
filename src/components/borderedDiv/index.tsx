import React, { ReactElement } from "react";
import "./style.scss";
function Component({ slot, style }: { slot: ReactElement; style: any }) {
  return (
    <div className="relative max-h-min">
      <div className="overlay">
        <div className="card">
          <div className="box" style={{ ...style }}>
            {slot}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
