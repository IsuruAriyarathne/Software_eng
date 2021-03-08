import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllMaintenance, deleteMaintenance, updateMaintenance, saveMaintenance } from "../../api/MaintenanceAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const UserTable = "Maintenance Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {

  const [maintenance, setMaintenance] = useState([]);
  useEffect(() => {
    getAllMaintenance(props.stationID)
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response)
            setMaintenance(response.data)
          }
        })
  }, [props.stationID]);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteUser = useCallback(
    (oldUser) => {
      return new Promise((resolve, reject) => {
        deleteMaintenance(oldUser.id)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Maintenance deletion Successful!",
                      });
                      setMaintenance(removeItemFromArray(maintenance, 'id', oldUser.id, oldUser))
                      return resolve();
                  }
                  addAlert({
                    message: "Failed!",
                  });
                  return reject();
              })
      });
    },
    [addAlert, maintenance]
  );

  const updateUser = useCallback(
    (newUser,oldUser) => {
      return new Promise((resolve, reject) => {
        updateMaintenance(oldUser.id, newUser)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Maintainance records Updated Successfully!",
                      });
                      setMaintenance(replaceItemInArray(maintenance, 'id', newUser, oldUser.id))
                      return resolve();
                  }
                  addAlert({
                    message: "Failed!",
                  });
                  return reject();
              })
      });
    },
    [addAlert, maintenance]
  );

  const saveUser = useCallback(
    (newUser) => {
      var data=({
        "weaponID": newUser.weaponID,
        "amount": newUser.amount,
        "date": newUser.date,
        "description": newUser.description,
      })
      return new Promise((resolve, reject) => {
        saveMaintenance(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Maintainance Record Saved Successfully!",
                      });
                      setMaintenance(addItemToArray(maintenance, response.data))
                      return resolve();
                  }
                  addAlert({
                    message: "Failed!",
                  });
                  return reject();
              })
        });
    },
    [addAlert, maintenance]
  );
  

  const tableColumns = [
    { title: "Id", field: "id", editable:"never" },
    { title: "Weapon ID", field: "weaponID" },
    { title: "Amount", field: "amount" },
    { title: "Date", field: "date", type:"date" },
    { title: "Description", field: "description" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={maintenance}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Users);


// export default (Users);
