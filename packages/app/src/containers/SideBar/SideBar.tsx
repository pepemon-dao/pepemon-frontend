import React from "react";

const SideBar: React.FC<any> = () => {
  return (
    <div
      style={{
        flex: "2",
        backgroundColor: "darkgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "15rem",
      }}
    >
      <div style={{ margin: "2rem" }}>SIDEBAR 1</div>
      <div style={{ margin: "2rem" }}>SIDEBAR 2</div>
      <div style={{ margin: "2rem" }}>SIDEBAR 3</div>
      <div style={{ margin: "2rem" }}>SIDEBAR 4</div>
    </div>
  );
};

export default SideBar;
