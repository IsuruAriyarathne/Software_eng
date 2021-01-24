import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {getAllRecovery, deleteRecovery, updateRecovery, saveRecovery } from "../../api/RecoverAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
import { Button } from "@material-ui/core";

const ReoveryTable = "Recovery Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const RecoveryView = props => {
  let history = useHistory();
  const [recovery, setRecovery] = useState([]);
  useEffect(() => {
    getAllRecovery(props.stationID)
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response)
            setRecovery(response.data)
          }
        })
  }, []);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteRecoveries = useCallback(
    (oldWeapon) => {
      return new Promise((resolve, reject) => {
        deleteRecovery(oldWeapon.recoveryID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Weapon deletion Successful!",
                      });
                      setRecovery(removeItemFromArray(recovery, 'recoveryID', oldWeapon.recoveryID, oldWeapon))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, recovery]
  );

  const updateRecoveries = useCallback(
    (newWeapon,oldWeapon) => {
      return new Promise((resolve, reject) => {
        updateRecovery(oldWeapon.recoveryID, newWeapon)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Weapon Updated Successfully!",
                      });
                      setRecovery(replaceItemInArray(recovery, 'officerID', newWeapon, oldWeapon.recoveryID))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, recovery]
  );

  const saveRecoveries = useCallback(
    (newRecovery) => {
      var data=({
        "stationID": props.stationID,
        "recoveryID": newRecovery.recoveryID,
        "recoveryDate": newRecovery.recoveryDate,
        "description": newRecovery.description,
      })
      console.log(data)
      return new Promise((resolve, reject) => {
        saveRecovery(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Recovery Saved Successfully!",
                      });
                      setRecovery(addItemToArray(recovery, data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert, recovery]
  );
  
  // const renderRecoveries = useCallback(rowData => 
  //   <RecoverySimpletable recoveries={[rowData.RecoveredAmmunitions]} />, []
  // );

  const renderRecoverybtn = useCallback(
    (rowData) => <Button color="primary" onClick={() => history.push(`recovery/stationid/${rowData.recoveryID}`)}>Recovery</Button>,
    [history]
  );
  
  const tableColumns = [
    { title: "Recovery ID", field: "recoveryID", editable:"never" },
    { title: "Recovery Date", field: "recoveryDate" },
    { title: "Description", field: "description" },
    { title: "Profile", render: renderRecoverybtn},
    // { title: "station Id", field: "stationID" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={recovery}
      title={ReoveryTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>saveRecoveries(newData),
        onRowUpdate: (newData, oldData) =>updateRecoveries(newData, oldData ),
        onRowDelete: oldData => deleteRecoveries(oldData),
      }}
      // detailPanel={[
      //   {
      //       tooltip: "Show Recoveriews",
      //       render: renderRecoveries
      //   }]
      // }
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
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryView);

// export default (Users);
