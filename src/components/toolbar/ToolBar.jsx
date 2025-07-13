import React from "react";

function ToolBar({ children }) {
  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center py-4 gap-3">
      {children}
    </div>
  );
}

export default ToolBar;
