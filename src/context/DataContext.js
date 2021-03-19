import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
export const DataContext = createContext();

const api = {
  url: "https://randomuser.me/api/"
};
const DataContextProvider = (props) => {
  const [APIData, setAPIData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [fakeData, setFakeData] = useState(null);
  const [countryFDDesc, setCountryFDDesc] = React.useState(null);
  const [countryFDMobil, setCountryFDMobil] = React.useState(null);
  //const [erpData, setErpData] = useState();
  /** -------------- questionnement de l'API ----------------------  */
  const getAPIData = async () => {
    const res = await axios.get(`${api.url}?results=50`);
    setAPIData(res.data.results);
  };
  useEffect(() => {
    console.log("getapi");
    getAPIData();
  }, []);
  const getCountryDesc = (APIData) => {
    let country = [];
    APIData && APIData.map((c) => country.push(c.location.state));
    let resData = _.uniq(country);
    let finalData = _.mapKeys(resData.sort(), function (key, value) {
      return value;
    });
    setCountryFDDesc(finalData);
  };
  const getCountryMobil = (APIData) => {
    let country = [];
    APIData && APIData.map((c) => country.push({ state: c.location.state }));
    let finalData = _.uniq(country);
    setCountryFDMobil(finalData);
  };
  useEffect(() => {
    console.log("getCountry");
    getCountryDesc(APIData);
    getCountryMobil(APIData);
  }, [APIData]);

  const getFakeData = (APIData, countryFDDesc) => {
    let data = [];
    APIData &&
      countryFDDesc &&
      APIData.map((d) => {
        data.push({
          id: `${d.id.value}`,
          name: `${d.name.last}`,
          address: `${d.location.street.number}, ${d.location.street.name}`,
          city: `${d.location.city}`,
          postCode: `${d.location.postcode}`,
          status: `${d.gender}`,
          stateId: parseInt(
            Object.keys(countryFDDesc).find(
              (key) => countryFDDesc[key] === d.location.state
            ),
            10
          ),
          stateText: d.location.state,
          notice: `${d.registered.age}`,
          category: `${d.dob.age}`
        });
        return data;
      });
    setFakeData(data);
    setTableData(data);
  };
  useEffect(() => {
    console.log("getFData");
    getFakeData(APIData, countryFDDesc);
  }, [APIData, countryFDDesc]);

  /** ---------- Creation de mon state pour gèré l'affichage ------ */
  /* const getErpData = (APIData) => {
    let data = [];
    APIData &&
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
    setErpData(data);
  };
  useEffect(() => {
    console.log("getErpData");
    getErpData(APIData);
  }, [APIData]);*/

  return (
    <DataContext.Provider
      value={{
        tableData,
        fakeData,
        setTableData,
        countryFDDesc,
        countryFDMobil
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
