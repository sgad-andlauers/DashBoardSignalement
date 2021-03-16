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
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  Typography,
  Switch,
  Chip,
  Tooltip
} from "@material-ui/core";
import _ from "lodash";
import { makeStyles } from "@material-ui/styles";
import { DataContext } from "../context/DataContext";

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

const api = {
  url: "https://randomuser.me/api/"
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
  const { APIData } = useContext(DataContext);
  const [tableData, setTableData] = useState(null);
  const [fakeData, setFakeData] = useState(null);
  const [countryFD, setCountryFD] = React.useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const getCountry = (APIData) => {
    let country = [];
    APIData && APIData.map((c) => country.push(c.location.state));
    let resData = _.uniq(country);
    let finalData = _.mapKeys(resData.sort(), function (key, value) {
      return value;
    });
    setCountryFD(finalData);
  };
  useEffect(() => {
    console.log("getCountry");
    getCountry(APIData);
  }, [APIData]);

  const getFakeData = (APIData, countryFD) => {
    let data = [];
    APIData &&
      countryFD &&
      APIData.map((d) => {
        data.push({
          id: `${d.id.value}`,
          name: `${d.name.last}`,
          address: `${d.location.street.number}, ${d.location.street.name}`,
          city: `${d.location.city}`,
          postCode: `${d.location.postcode}`,
          status: `${d.gender}`,
          state: parseInt(
            Object.keys(countryFD).find(
              (key) => countryFD[key] === d.location.state
            ),
            10
          ),
          notice: `${d.registered.age}`,
          category: `${d.dob.age}`
        });
        return data;
      });
    setFakeData(data);
    setTableData(data);
    console.warn("tableData", tableData);
  };
  useEffect(() => {
    console.log("getFData");
    getFakeData(APIData, countryFD);
  }, [APIData, countryFD]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDialog = (evt, selectedRow) => {
    setSelectedRow(selectedRow);
    setOpen(true);
  };
  const getStatusRendering = (rowData) => {
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
  };
  const getNoticeRendering = (rowData) => {
    if (rowData.notice <= 5) {
      return (
        <Chip label={rowData.notice} style={{ backgroundColor: "#d50000" }} />
      );
    } else if (rowData.notice <= 10) {
      return (
        <Chip label={rowData.notice} style={{ backgroundColor: "#ff9800" }} />
      );
    } else if (rowData.notice > 10) {
      return (
        <Chip label={rowData.notice} style={{ backgroundColor: "#388e3c" }} />
      );
    }
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
      {countryFD && (
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
            { title: "Etat", field: "state", lookup: countryFD },
            {
              title: "Avis",
              field: "notice",
              render: (rowData) => getNoticeRendering(rowData)
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
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          size="large"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Info ligne selectionné"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={1}>
                <Grid item xs={10} md={4}>
                  <div>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>Id</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`ìd de l'entreprise : ${selectedRow.id}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>No</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`nom de l'entreprise:  ${selectedRow.name}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>Ad</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Adresse de l'entreprise: ${selectedRow.address}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>Cp</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Code postal: ${selectedRow.postCode}`}
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={10} md={4}>
                  <div>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>Vi</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`Ville : ${selectedRow.city}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>St</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Statut de l'entreprise: ${selectedRow.status}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>Av</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Avis de l'entreprise: ${selectedRow.state}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>Ct</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Catégorie de l'entreprise: ${selectedRow.category}`}
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
