import React, { useState } from "react";

import {
  Dialog,
  Box,
  Grid,
  Chip,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Card,
  CardContent,
  Typography,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNoticeRendering } from "./utils/rendering";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "auto"
  }
}));
export default function DialogTable(props) {
  const classes = useStyles();
  const { selectedRow, open, onClickClose, fullScreen } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.warn("selectrow", selectedRow);
  return (
    <div style={{ maxWidth: "100%" }}>
      {selectedRow && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClickClose}
          aria-labelledby="responsive-dialog-title"
          size="xl"
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Info ligne selectionné"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    justifyContent="center"
                    gutterBottom
                  >
                    Informations générals
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="name"
                        label="Nom"
                        fullWidth
                        variant="outlined"
                        value={selectedRow.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="raisonSocial"
                        label="Raison social"
                        variant="outlined"
                        fullWidth
                        value={selectedRow.id}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="nextEvent"
                        label="Prochain évènement"
                        fullWidth
                        variant="outlined"
                        value="Prochain évènement"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="caption"
                        justifyContent="center"
                        align="center"
                        gutterBottom
                      >
                        {"Avis : "}
                      </Typography>
                      {getNoticeRendering(selectedRow.notice)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="state"
                        label="Etat"
                        fullWidth
                        variant="outlined"
                        value={selectedRow.status}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="date"
                        label="Du"
                        type="date"
                        defaultValue="2017-05-24"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="date"
                        label="Au"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {/**deuxieme option d'affichage  */}
              <Typography variant="h6" gutterBottom>
                Adresse de l'entreprise
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="address"
                    name="adress"
                    label="Adresse"
                    fullWidth
                    variant="outlined"
                    value={selectedRow.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="addressLane"
                    name="addressLane"
                    label="Nom de la rue"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="postalBox"
                    name="postalBox"
                    label="Boite postal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="zipCode"
                    name="zipCode"
                    label="Code postal"
                    variant="outlined"
                    value={selectedRow.postCode}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    name="city"
                    label="Ville"
                    value={selectedRow.city}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="arrondissement"
                    name="arrondissement"
                    label="Arrondissement"
                    variant="outlined"
                    value={selectedRow.city}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="nParcelle"
                    name="nParcelle"
                    label="Numéro de parcelle"
                    value={selectedRow.stateId}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="canton"
                    name="canton"
                    label="Canton"
                    variant="outlined"
                    value={selectedRow.city}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="section"
                    name="section"
                    label="Section"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="zone"
                    name="zone"
                    label="Zone"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onClickClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
