import React from "react";
import { Chip, Switch, Tooltip } from "@material-ui/core";
import { Check, Remove } from "@material-ui/icons";
export function getStatusRendering(rowData) {
  if (rowData.tableData.id === 0) {
    return <Switch checked />;
  }
  return rowData.status === "female" ? (
    <Tooltip title="female">
      <Check />
    </Tooltip>
  ) : (
    <Tooltip title="male">
      <Remove />
    </Tooltip>
  );
}
export function getNoticeRendering(rowData) {
  if (rowData <= 5) {
    return <Chip label={rowData} style={{ backgroundColor: "#d50000" }} />;
  } else if (rowData <= 10) {
    return <Chip label={rowData} style={{ backgroundColor: "#ff9800" }} />;
  } else if (rowData > 10) {
    return <Chip label={rowData} style={{ backgroundColor: "#388e3c" }} />;
  }
}
