import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import {
  FilterList,
  Search,
  CheckBox,
  CheckBoxOutlineBlank
} from "@material-ui/icons";
import {
  Box,
  useMediaQuery,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CardActions,
  CardContent,
  TablePagination,
  Menu,
  MenuItem,
  Checkbox,
  InputBase,
  Paper,
  IconButton,
  TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import { makeStyles } from "@material-ui/styles";

const accentsMap = {
  a: "á|à|ã|â|À|Á|Ã|Â",

  e: "é|è|ê|É|È|Ê",

  i: "í|ì|î|Í|Ì|Î",

  o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",

  u: "ú|ù|û|ü|Ú|Ù|Û|Ü",

  c: "ç|Ç",

  n: "ñ|Ñ"
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px"
  },
  row: {
    backgroundColor: "#fff",
    "&.MuiTableRow-root:hover": {
      background: "red",
      color: "#fff"
    }
  },
  search: {
    display: "flex",
    alignItems: "center",
    width: 400
  },
  inputSearch: {
    flex: 1
  },
  iconButtonSearch: {
    padding: 10
  }
}));
export default function AppMobile() {
  const classes = useStyles();
  const { APIData } = useContext(DataContext);
  const [tableData, setTableData] = useState(null);
  const [fakeData, setFakeData] = useState(null);
  const [countryFD, setCountryFD] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const unaccent = (text) => {
    for (var pattern in accentsMap) {
      text = text

        .toString()

        .replace(new RegExp(accentsMap[pattern], "g"), pattern);
    }

    return text;
  };
  /**-------------------------- set FakeData ----------------------- */
  const getCountry = (APIData) => {
    let country = [];
    APIData && APIData.map((c) => country.push({ state: c.location.state }));
    let finalData = _.uniq(country);
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
          id: d.id.value,
          name: d.name.last,
          address: `${d.location.street.number}, ${d.location.street.name}`,
          city: d.location.city,
          postCode: d.location.postcode,
          status: d.gender,
          state: d.location.state,
          notice: d.registered.age,
          category: d.dob.age
        });
        return data;
      });
    setFakeData(data);
    setTableData(data);
  };
  useEffect(() => {
    console.log("getFakeData");
    getFakeData(APIData, countryFD);
  }, [APIData, countryFD]);
  /** ------------------------ set Row Per Page -------------------------------*/
  const tableDataLength = tableData && tableData.length;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  /** ------------------------- set filter -----------------------------------*/
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickResetFilter = () => {
    setTableData(fakeData);
    setOpen(false);
    setAnchorEl(null);
  };
  const handleCLickFilterTen = () => {
    let filterData = fakeData.filter((d) => d.notice >= 10);
    setTableData(filterData);
    setAnchorEl(null);
  };
  const handleCLickFilterState = (e) => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handleChangeComplete = (e, value, reason) => {
    let state = [];
    _.forEach(value, function (d) {
      state.push(d.state);
    });
    let filterState = fakeData.filter((d) => _.includes(state, d.state));
    setTableData(filterState);
  };
  const handleChangeCheckSearch = (e) => {
    let inputValueSearchEpuree = unaccent(e.target.value).toLowerCase();

    let filterData = _.filter(fakeData, function (data) {
      return Object.values(data).some(
        (value) =>
          value &&
          unaccent(value).toLowerCase().includes(inputValueSearchEpuree)
      );
    });

    setTableData(filterData);
  };
  /** ----------------------------- End filter ---------------------------------*/
  return (
    <div style={{ maxWidth: "100%" }}>
      <Box
        display="flex"
        lineHeight={2.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" lineHeight={2.5} alignItems="center">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClickOpen}
          >
            <FilterList />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClickResetFilter}>Reset filtre</MenuItem>
            <MenuItem onClick={handleCLickFilterTen}>
              Item supperieur a 10
            </MenuItem>
            <MenuItem onClick={handleCLickFilterState}>
              Choix de l'Etat
            </MenuItem>
          </Menu>
        </Box>
        <Box display="flex" lineHeight={2.5} alignItems="center">
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.inputSearch}
              placeholder="Recherche ERP"
              inputProps={{ "aria-label": "Recherche ERP" }}
              onChange={(e) => handleChangeCheckSearch(e)}
            />
            <IconButton
              type="submit"
              className={classes.iconButtonSearch}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </Paper>
        </Box>
      </Box>
      <Box
        display={tableData && open === true ? "block" : "none"}
        maxWidth="80%"
        ml={10}
        mt={2}
        lineHeight={2.5}
        alignItems="center"
        justifyContent="center"
      >
        {countryFD && (
          <Autocomplete
            multiple
            id="searchByState"
            options={countryFD}
            disableCloseOnSelect
            getOptionLabel={(option) => option.state}
            onChange={(e, value, reason) =>
              handleChangeComplete(e, value, reason)
            }
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.state}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Recherche par etat"
                placeholder="Recherche par etat"
              />
            )}
          />
        )}
      </Box>

      {tableData &&
        tableData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data) => {
            return (
              <Card className={classes.root}>
                <CardContent>
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>No</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Nom:  ${data.name}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>St</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Statut:  ${data.status}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>Av</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Avis:  ${data.notice}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>Et</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Etat:  ${data.state}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>Ct</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Catégorie:  ${data.category}`} />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            );
          })}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        count={tableDataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, newPage) => {
          handleChangePage(e, newPage);
        }}
        onChangeRowsPerPage={(e) => {
          handleChangeRowsPerPage(e);
        }}
      />

      {/** 
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
      */}
    </div>
  );
}
