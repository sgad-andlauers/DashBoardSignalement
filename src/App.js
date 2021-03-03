import React, { useState, useEffect, forwardRef } from "react";
import "./styles.css";
import axios from "axios";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

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
  const getFakeData = async () => {
    console.log("get api");
    const res = await axios.get(`${api.url}?results=5`);
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
  console.warn("fakeData", fakeData);
  console.warn("constData", fData);
  const handleChangeCLick = (evt, selectedRow) => {
    console.warn("selectRow", selectedRow);
    setSelectedRow(selectedRow.tableData.id);
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
          { title: "Statut", field: "status" },
          { title: "Etat", field: "state" },
          { title: "Avis", field: "notice" },
          { title: "Categorie", field: "category" }
        ]}
        data={fData}
        onRowClick={(evt, selectedRow) => handleChangeCLick(evt, selectedRow)}
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF"
          })
        }}
      />
    </div>
  );
}
