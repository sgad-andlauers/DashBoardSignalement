import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();

const api = {
  url: "https://randomuser.me/api/"
};
const DataContextProvider = (props) => {
  const [APIData, setAPIData] = useState(null);
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
    <DataContext.Provider value={{ APIData, setAPIData }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
