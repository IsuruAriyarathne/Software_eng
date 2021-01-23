import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllStations, deleteStations, updateStations, saveStations } from "../../api/Stations"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
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
    (oldData) => {
      return new Promise((resolve, reject) => {
        deleteStations(oldData.stationID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Station deletion Successful!",
                      });
                      setStations(removeItemFromArray(stations, 'stationID', oldData.stationID, oldData))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, stations]
  );

  const updateStation= useCallback(
    (newData,oldData) => {
      return new Promise((resolve, reject) => {
        updateStations(oldData.stationID,newData)
            .then((response) => {
                if (!response.error) {
                    addAlert({
                        message: "Statin Updated Successfully!",
                    });
                    setStations(replaceItemInArray(stations, 'stationID', newData, oldData.stationID))
                    return resolve();
                }
                return reject();
            })
      })
    },
    [addAlert, stations]
  );

  const saveStation = useCallback(
    (newStation) => {
      var data=({
        "stationID": newStation.stationID,
        "stationName": newStation.stationName,
        "location": newStation.location,
        "type": newStation.type,
        "contactNo": newStation.contactNo,
      })
      return new Promise((resolve, reject) => {
        saveStations(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Station Saved Successfully!",
                      });
                      setStations(addItemToArray(stations, data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert]
  );
  

  const tableColumns = [
    { title: "ID", field: "stationID" },
    { title: "Name", field: "stationName" },
    { title: "Location", field: "location" },
    { title: "Type", field: "type",  lookup: { office:"office", inventory:"inventory"} },
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
        onRowAdd: newData => saveStation(newData),
        onRowUpdate: (newData, oldData) =>updateStation(newData, oldData ),
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


  