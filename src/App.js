import React, { useState, useEffect, forwardRef } from "react";
import "./styles.css";
import axios from "axios";
import MaterialTable from "material-table";
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
  Grid
} from "@material-ui/core";
import _ from "lodash";

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

export default function App() {
  const [fakeData, setFakeData] = useState(null);
  const [fData, setFData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [countryFD, setCountryFD] = React.useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const getFakeData = async () => {
    console.log("get api");
    const res = await axios.get(`${api.url}?results=5000`);
    setFakeData(res.data.results);
  };
  useEffect(() => {
    console.log("setapi");
    getFakeData();
  }, []);
  const getFData = (fakeData) => {
    let constData = [];
    fakeData &&
      fakeData.map((data) =>
        constData.push({
          id: `${data.id.value}`,
          name: `${data.name.last}`,
          address: `${data.location.street.number}, ${data.location.street.name}`,
          city: `${data.location.city}`,
          postCode: `${data.location.postcode}`,
          status: `${data.gender}`,
          state: `${data.location.country}`,
          notice: `${data.registered.age}`,
          category: `${data.dob.age}`
        })
      );
    setFData(constData);
  };
  useEffect(() => {
    console.log("getFData");
    getFData(fakeData);
  }, [fakeData]);
  const getCountry = (fData) => {
    let country = [];
    fData && fData.map((c) => country.push(c.state));
    _.mapKeys(country, function(value, key){return key + value} )
    setCountryFD(_.uniq(country));
  };
  useEffect(() => {
    console.log("getCountry");
    getCountry(fData);
  }, [fData]);
  console.warn("listCountry", JSON.stringify(countryFD));
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeCLick = (evt, selectedRow) => {
    setSelectedRow(selectedRow);
    setOpen(true);
  };
  const getStatusRendering = (rowData) => {
    return rowData.status === "female" ? <Check /> : <Remove />;
  };
  const getNoticeRendering = (rowData) => {
    //return rowData.notice <= 5 ? <StarIcon /> : <StarHalfIcon />;
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="test affichage !"
        icons={tableIcons}
        columns={[
          { title: "Nom", field: "name" },
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
          { title: "Etat", field: "state", lookup: { countryFD } },
          {
            title: "Avis",
            field: "notice",
            render: (rowData) => getNoticeRendering(rowData)
          },
          { title: "Categorie", field: "category", type: "numeric" }
        ]}
        data={fData}
        onRowClick={(evt, selectedRow) => handleChangeCLick(evt, selectedRow)}
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF"
          }),
          exportButton: true,
          filtering: true
        }}
      />
      {selectedRow && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
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
