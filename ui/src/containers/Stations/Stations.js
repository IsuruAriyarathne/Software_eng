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
            console.log(response.data);
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

  const updateStations= useCallback(
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

  const saveStations = useCallback(
    (newStation) => {
      var data=({
        "stationID": newStation.stationID,
        "stationName": newStation.stationName,
        "location": newStation.location,
        "contactNo": newStation.contactNo,
      })
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
    { title: "Name", field: "stationName" },
    { title: "Location", field: "location" },
    { title: "Contact Number", field: "contactNo" },

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
        onRowAdd: newData => saveStations(newData),
        onRowUpdate: (newData, oldData) =>updateStations(newData, oldData),
        onRowDelete: oldData =>deleteStation(oldData),

      }}
    />
  }
};

const mapStateToProps = (state) => {
  return {
      error: state.auth.error,
      stationID:state.auth.stationID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stations);

// export default (Stations);


  