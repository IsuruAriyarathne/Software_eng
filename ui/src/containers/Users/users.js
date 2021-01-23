import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllUsers, deleteUsers, updateUsers, saveUsers } from "../../api/UsersAPI"
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
      getAllUsers()
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
        deleteUsers(oldUser.officerID)
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
          updateUsers(oldUser.officerID, newUser)
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
        "stationName": newUser.stationName,
      })
      return new Promise((resolve, reject) => {
        saveUsers(data)
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
  

  const tableColumns = [
    { title: "Id", field: "officerID" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Role", field: "role", lookup: { admin:"admin", cenofficer:"cenofficer", officer:"officer"} },
    { title: "station Name", field: "stationName" },
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
