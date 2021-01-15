import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllStations, deleteStations, updateStations, saveStations } from "../../api/Stations"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const stationsTable = "Stations Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Stations = props => {
  
  const [stations, setStations] = useState([]);
  useEffect(() => {
    getAllStations()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(Station => setStations(Station));
            setStations(response.data)
          }
        })
  }, []);
  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteStation = useCallback(
    (stationID) => {
      alert("You want to delete " + stationID)
      deleteStations(stationID)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Station deletion Successful!",
            });
          
        })
    },
    [addAlert]
  );

  const updateStation= useCallback(
    (id,data) => {
      console.log(data)
      updateStations(id,data)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Station Updated Successfully!",
            });
          
        })
    },
    [addAlert]
  );

  const saveStation = useCallback(
    (data) => {
      saveStations(data)
        .then((response) => {
          if (!response.error){
            addAlert({
              message: "Station Saved Successfully!",
            });
          }else{
            console.log(response.error)
          }
        })
    },
    [addAlert]
  );
  

  const tableColumns = [
    { title: "ID", field: "stationID" },
    { title: "Name", field: "name" },
    { title: "Location", field: "location" },
    

  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={stations}
      title={stationsTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>{
          var data=({
            "stationID": newData.stationID,
            "name": newData.name,
            "location": newData.location,
            
          })
          saveStations(data)
        },
        onRowUpdate: (newData, oldData) =>{
          updateStations(oldData.stationID, newData )
        },
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteStation(oldData.stationID);
          }),
        // {
        //   deleteStations(oldData.stationID);
        // },
      }}
    />
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Stations);

// export default (Stations);


  