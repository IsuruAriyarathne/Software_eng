import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllAmmunitionsModels, deleteAmmunitionsModels, updateAmmunitionsModels, saveAmmunitionsModels } from "../../api/AmmunitionModelAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const AmmunitionTable = "Ammunition Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {

  const [ammunitionModels, setammunitionModels] = useState([]);
  useEffect(() => {
    getAllAmmunitionsModels()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response)
            setammunitionModels(response.data)
          }
        })
  }, []);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteAmmunitionModel = useCallback(
    (oldAmmunitions) => {
      return new Promise((resolve, reject) => {
        deleteAmmunitionsModels(oldAmmunitions.ammoModelID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Ammunition Model deletion Successful!",
                      });
                      setammunitionModels(removeItemFromArray(ammunitionModels, 'ammoModelID', oldAmmunitions.ammoModelID, oldAmmunitions))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, ammunitionModels]
  );

  const updateAmmunitionModel = useCallback(
    (newAmmunitions,oldAmmunitions) => {
      return new Promise((resolve, reject) => {
        updateAmmunitionsModels(oldAmmunitions.ammoModelID, newAmmunitions)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Ammunition Model Updated Successfully!",
                      });
                      setammunitionModels(replaceItemInArray(ammunitionModels, 'ammoModelID', newAmmunitions, oldAmmunitions.ammoModelID))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, ammunitionModels]
  );

  const saveAmmunitionModel = useCallback(
    (newAmmunitions) => {
      var data=({
        "ammoModelID": newAmmunitions.ammoModelID,
        "name": newAmmunitions.name,
        "description": newAmmunitions.description,
      })
      return new Promise((resolve, reject) => {
        saveAmmunitionsModels(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Ammunition Model Saved Successfully!",
                      });
                      setammunitionModels(addItemToArray(ammunitionModels, response.data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert, ammunitionModels]
  );
  

  const tableColumns = [
    { title: "Ammunition Id", field: "ammoModelID", editable:"never" },
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={ammunitionModels}
      title={AmmunitionTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>saveAmmunitionModel(newData),
        onRowUpdate: (newData, oldData) =>updateAmmunitionModel(newData, oldData ),
        onRowDelete: oldData => deleteAmmunitionModel(oldData),
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
