import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {getAllWeapons, deleteWeapons, updateWeapons, saveWeapons } from "../../api/WeaponCentralizedAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
import { Button } from "@material-ui/core";

const UserTable = "Weapons Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {
  let history = useHistory();
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
                  addAlert({
                    message: "Failed!",
                  });
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
                          message: "Weapon Updated Successfully!",
                      });
                      setUsers(replaceItemInArray(users, 'weaponID', newUser, oldUser.weaponID))
                      return resolve();
                  }
                  addAlert({
                    message: "Failed!",
                  });
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
                          message: "Weapon Saved Successfully!",
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

  const renderRWeaponbtn = useCallback(
    (rowData) => <Button color="primary" onClick={() => history.push(`recovery/weapons/${rowData.weaponID}`)}>View Weapon</Button>,
    [history]
  );

  const tableColumns = [
    { title: "Weapon ID", field: "weaponID", editable:"never" },
    { title: "Name", field: "name",editable:"never" },
    { title: "State", field: "state",  lookup: { Maintainance:"Maintainance", Available:"Available", Lost:"Lost"} },
    { title: "Weapon", render: renderRWeaponbtn},
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
