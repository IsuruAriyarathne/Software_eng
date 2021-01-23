import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllAmmunitions, deleteAmmunitions, updateAmmunitions, saveAmmunitions } from "../../api/AmmunitionCentralizedAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
import WeaponsSimpleTable from "../../components/UI/Table/WeaponsSimpleTable/WeaponsSimpleTable";

const AmmunitionTable = "Ammunition Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllAmmunitions()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response)
            setUsers(response.data)
          }
        })
  }, []);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteUser = useCallback(
    (oldUser) => {
      return new Promise((resolve, reject) => {
        deleteAmmunitions(oldUser.officerID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "User deletion Successful!",
                      });
                      setUsers(removeItemFromArray(users, 'officerID', oldUser.officerID, oldUser))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, users]
  );

  const updateUser = useCallback(
    (newUser,oldUser) => {
      return new Promise((resolve, reject) => {
        updateAmmunitions(oldUser.officerID, newUser)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "User Updated Successfully!",
                      });
                      setUsers(replaceItemInArray(users, 'officerID', newUser, oldUser.officerID))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, users]
  );

  const saveUser = useCallback(
    (newUser) => {
      var data=({
        "officerID": newUser.officerID,
        "name": newUser.name,
        "email": newUser.email,
        "stationID": newUser.stationID,
      })
      return new Promise((resolve, reject) => {
        saveAmmunitions(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "User Saved Successfully!",
                      });
                      setUsers(addItemToArray(users, data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert, users]
  );
  
  const renderWeapons = useCallback(rowData => 
    <WeaponsSimpleTable ammunitions={[rowData.AmmunitionType]} />, []
  );

  const tableColumns = [
    { title: "Id", field: "ammoModelID" },
    { title: "Count", field: "count" },
    { title: "Order ID", field: "orderID" },
    { title: "Remain", field: "remain" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={users}
      title={AmmunitionTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>saveUser(newData),
        onRowUpdate: (newData, oldData) =>updateUser(newData, oldData ),
        onRowDelete: oldData => deleteUser(oldData),
      }}
      detailPanel={[
        {
            tooltip: "Show Weapons",
            render: renderWeapons
        }]
      }
    />
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Users);

// export default (Users);
