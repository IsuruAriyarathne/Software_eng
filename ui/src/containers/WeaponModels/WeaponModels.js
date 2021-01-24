import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllWeaponModels, deleteWeaponModels, updateWeaponModels, saveWeaponModels } from "../../api/WeaponModelAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
import WeaponsSimpleTable from "../../components/UI/Table/WeaponsSimpleTable/WeaponsSimpleTable";

const WeaponTable = "Weapon Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {

  const [weaponModel, setweaponModel] = useState([]);
  useEffect(() => {
    getAllWeaponModels()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response)
            setweaponModel(response.data)
          }
        })
  }, []);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteWeaponModel = useCallback(
    (oldWeapons) => {
      return new Promise((resolve, reject) => {
        deleteWeaponModels(oldWeapons.weaponModelID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Weapon deletion Successful!",
                      });
                      setweaponModel(removeItemFromArray(weaponModel, 'officerID', oldWeapons.weaponModelID, oldWeapons))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, weaponModel]
  );

  const updateWeaponModel = useCallback(
    (newWeapons,oldWeapons) => {
      return new Promise((resolve, reject) => {
        updateWeaponModels(oldWeapons.weaponModelID, newWeapons)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Weapon MOdel Updated Successfully!",
                      });
                      setweaponModel(replaceItemInArray(weaponModel, 'officerID', newWeapons, oldWeapons.weaponModelID))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, weaponModel]
  );

  const saveWeaponMOdel = useCallback(
    (newWeapons) => {
      var data=({
        "weaponModelID": newWeapons.weaponModelID,
        "name": newWeapons.name,
        "description": newWeapons.description,
      })
      return new Promise((resolve, reject) => {
        saveWeaponModels(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Weapon MOdel Saved Successfully!",
                      });
                      setweaponModel(addItemToArray(weaponModel, response.data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert, weaponModel]
  );
  

  const tableColumns = [
    { title: "Weapon Id", field: "weaponModelID", editable:"never" },
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
  ];

  const renderWeapons = useCallback(rowData => <WeaponsSimpleTable topics={rowData.topics} />, []);

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={weaponModel}
      title={WeaponTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>saveWeaponMOdel(newData),
        onRowUpdate: (newData, oldData) =>updateWeaponModel(newData, oldData ),
        onRowDelete: oldData => deleteWeaponModel(oldData),
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
