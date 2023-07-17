import { useState } from "react";
import UploadSelect from "./UploadSelect";

export default function Upload() {
  const [currState, setCurrState] = useState(0);
  return (
    <div>
      <UploadSelect />
    </div>
  )
}