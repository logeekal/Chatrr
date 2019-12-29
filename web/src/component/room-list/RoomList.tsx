import React, { ReactElement, useState } from "react";
import TextField from "../text-field/TextField";

interface Props {
  roomList?: Array<{
    id: string;
    label: string;
  }>;
}

export default function RoomList(props: Props): ReactElement {
  const [value, setValue] = useState<string>("");
  return (
    <div>
      <TextField
        className="body-primary upper"
        label="testing"
        inputProps={{
          placeholder: "testing",
          value: value,
          onChange: function(e) {
            setValue(e.target.value);
          }
        }}
        data-testid="input-field"
      />
    </div>
  );
}
