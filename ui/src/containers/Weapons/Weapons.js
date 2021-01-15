import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getAllWeapons, deleteWeapons,updateWeapons, saveWeapons  } from "../../api/WeaponsAPI"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const WeaponTable = "Weapons Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  
  const [weapons, setWeapons] = useState([]);
  useEffect(() => {
    getAllWeapons()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setWeapons(response.data)
          }
        })
  }, []);
  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteWeapon = useCallback(
    (weaponID) => {
      alert("You want to delete " + weaponID)
      deleteWeapons(weaponID)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Weapon deletion Successful!",
            });
          
        })
    },
    [addAlert]
  );

  const updateWeapon = useCallback(
    (id,data) => {
      console.log(data)
      updateWeapons(id,data)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Weapon Updated Successfully!",
            });
          
        })
    },
    [addAlert]
  );

  const saveWeapon = useCallback(
    (data) => {
      saveWeapons(data)
        .then((response) => {
          if (!response.error){
            addAlert({
              message: "Weapon Saved Successfully!",
            });
          }else{
            console.log(response.error)
          }
        })
    },
    [addAlert]
  );
  

  const tableColumns = [
    { title: "ID", field: "weaponID" },
    { title: "Model ID", field: "weaponModelID" },
    { title: "Order ID", field: "orderID" },
    { title: "State", field: "state" },
    
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={weapons}
      title={WeaponTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>{
           var data=({
            "weaponID": newData.weaponID,
            "weaponModelID": newData.weaponModelID,
             "orderID": newData.orderID,
             "state": newData.state,
            })
            saveWeapon(data)
        },
        onRowUpdate: (newData, oldData) =>{
          updateWeapon(oldData.weaponID, newData )
        },
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteWeapon(oldData.weaponID);
          }),
      }}
    />
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Weapons);

//export default (Weapons);
