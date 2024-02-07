import React, { useState } from "react";
import PersonalInfo from "./personalInfo";
import RegistationInfo from "./registationInfo";
import LocationInfo from "./locationInfo";

function Component() {
  const [edit, setEdit] = useState("");
  return (
    <div className="flex-grow space-y-3">
      <PersonalInfo isEdit={edit === "PersonalInfo"} setEdit={setEdit} />
      <RegistationInfo isEdit={edit === "RegistationInfo"} setEdit={setEdit} />
      <LocationInfo isEdit={edit === "LocationInfo"} setEdit={setEdit} />
    </div>
  );
}

export default Component;
