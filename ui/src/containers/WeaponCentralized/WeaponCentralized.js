import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllWeapons, deleteWeapons, updateWeapons, saveWeapons } from "../../api/WeaponCentralizedAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const UserTable = "User Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllWeapons()
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
        deleteWeapons(oldUser.weaponID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "User deletion Successful!",
                      });
                      setUsers(removeItemFromArray(users, 'weaponID', oldUser.weaponID, oldUser))
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
        updateWeapons(oldUser.weaponID, newUser)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "User Updated Successfully!",
                      });
                      setUsers(replaceItemInArray(users, 'weaponID', newUser, oldUser.weaponID))
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
        "weaponID": newUser.weaponID,
        "name": newUser.name,
        "totalCost": newUser.totalCost,
        "date": newUser.date,
        "supplierID": newUser.supplierID,
      })
      return new Promise((resolve, reject) => {
        saveWeapons(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "User Saved Successfully!",
                      });
                      setUsers(addItemToArray(users, response.data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert, users]
  );

  const tableColumns = [
    { title: "Weapon ID", field: "weaponID", editable:"never" },
    { title: "Name", field: "name" },
    { title: "Total Cost", field: "totalCost" },
    { title: "Date", field: "date", type:"date" },
    { title: "Supplier ID", field: "supplierID" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={users}
      title={UserTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>saveUser(newData),
        onRowUpdate: (newData, oldData) =>updateUser(newData, oldData ),
        onRowDelete: oldData => deleteUser(oldData),
      }}
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
