import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllUsers, deleteUsers, updateUsers, saveUsers } from "../../api/UsersAPI"
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
            setUsers(response.data)
          }
        })
  }, []);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteUser = useCallback(
    (officerID) => {
      alert("You want to delete " + officerID)
      deleteUsers(officerID)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "User deletion Successful!",
            });
          
        })
    },
    [addAlert]
  );

  const updateUser = useCallback(
    (id,data) => {
      console.log(data)
      updateUsers(id,data)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "User Updated Successfully!",
            });
          
        })
    },
    [addAlert]
  );

  const saveUser = useCallback(
    (data) => {
      saveUsers(data)
        .then((response) => {
          if (!response.error){
            addAlert({
              message: "User Saved Successfully!",
            });
          }else{
            console.log(response.error)
          }
        })
    },
    [addAlert]
  );
  

  const tableColumns = [
    { title: "Id", field: "officerId" },
    { title: "Name", field: "name" },
    { title: "Location", field: "location" },
    { title: "stationId", field: "stationID" },
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
        onRowAdd: newData =>{
          var data=({
            "officerId": newData.officerId,
            "name": newData.name,
            "location": newData.location,
            "stationID": newData.stationID,
          })
          saveUser(data)
        },
        onRowUpdate: (newData, oldData) =>{
          updateUser(oldData.officerId, newData )
        },
        onRowDelete: oldData =>{
          deleteUser(oldData.officerId);
        },
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
