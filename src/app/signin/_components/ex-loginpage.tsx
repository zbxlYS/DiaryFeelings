import React from "react";
import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      isRequired
      type="text"
      label="Email"
      defaultValue="junior@nextui.org"
      className="max-w-xs"
      ref={idRef}
      value={id}
      onChange={(e) => setId(e.target.value)}
    />
  );
}

import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";


