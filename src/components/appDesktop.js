import React, { useState, useEffect, forwardRef, useContext } from "react";
import axios from "axios";
import MaterialTable, { MTableBodyRow } from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";
import {
  Box,
  useMediaQuery,
  Button,
  useTheme,
  Typography,
  Switch,
  Chip,
  Tooltip
} from "@material-ui/core";
import _ from "lodash";
import { makeStyles } from "@material-ui/styles";
import { DataContext } from "../context/DataContext";
import DialogTable from "./dialogTable";
import { getNoticeRendering, getStatusRendering } from "./utils/rendering";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#fff",
    "&.MuiTableRow-root:hover": {
      background: "red",
      color: "#fff"
    }
  }
}));
export default function App() {
  const classes = useStyles();
  const { tableData, fakeData, setTableData, countryFDDesc } = useContext(
    DataContext
  );
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("ml"));

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDialog = (evt, selectedRow) => {
    setSelectedRow(selectedRow);
    setOpen(true);
  };

  const handleNameChange = (rowData) => {
    if (rowData.tableData.id === 0) {
      return (
        <React.Fragment>
          <Box>
            <Typography
              variant="caption"
              style={{
                textDecoration: "line-through",
                color: "red"
              }}
              gutterBottom
            >
              {rowData.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">{"Alpha"}</Typography>
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Typography variant="caption" gutterBottom>
            {rowData.name}
          </Typography>
        </React.Fragment>
      );
    }
  };
  const handleCLickFilter = () => {
    let filterData = tableData.filter((d) => d.notice >= 10);
    setTableData(filterData);
  };
  const handleClickResetFilter = () => {
    setTableData(fakeData);
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      {countryFDDesc && (
        <MaterialTable
          title="test affichage desktop !"
          icons={tableIcons}
          columns={[
            {
              title: "Nom",
              field: "name",
              render: (rowData) => handleNameChange(rowData)
            },
            { title: "Adresse", field: "address" },
            { title: "Ville", field: "city" },
            {
              title: "Code postal",
              field: "postCode"
            },
            {
              title: "Statut",
              field: "status",
              render: (rowData) => getStatusRendering(rowData)
            },
            { title: "Etat", field: "stateId", lookup: countryFDDesc },
            {
              title: "Avis",
              field: "notice",
              render: (rowData) => getNoticeRendering(rowData.notice)
            },
            { title: "Categorie", field: "category", type: "numeric" }
          ]}
          data={tableData}
          components={{
            Row: (props) => {
              return <MTableBodyRow {...props} className={classes.row} />;
            }
          }}
          onRowClick={(evt, selectedRow) =>
            handleClickOpenDialog(evt, selectedRow)
          }
          options={{
            exportButton: true,
            filtering: true
          }}
        />
      )}
      <Box>
        <Box>
          <Tooltip title="filtre superieur ou egal à 10">
            <Button
              color="primary"
              component="span"
              onClick={(e) => {
                handleCLickFilter(e);
              }}
            >
              <FilterList />
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="reset Filtre">
            <Button
              color="primary"
              component="span"
              onClick={(e) => {
                handleClickResetFilter(e);
              }}
            >
              <DeleteOutline />
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {selectedRow && (
        <DialogTable
          selectedRow={selectedRow}
          open={open}
          onClickClose={handleClose}
          fullScreen={fullScreen}
        />
      )}
    </div>
  );
}
