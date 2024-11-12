import React from "react";
import SideBar from "./SideBar/SideBar";
import MyProfile from "./MyProfile/MyProfile";
import Managejob from "./Managejob/Managejob";

export default function Dashboard() {
  return (
    <div style={{ height: "68.9vh", display: "flex" }}>
      <SideBar />
      {/* <MyProfile/> */}
      {/* <Managejob /> */}
    </div>
  );
}
