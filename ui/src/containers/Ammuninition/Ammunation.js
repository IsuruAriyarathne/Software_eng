import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getAllAmmunition, deleteAmmunition,updateAmmunition, saveAmmunition  } from "../../api/AmmunitionAPI"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const AmmunitionTable = "Ammunation Table";


const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Ammunation = props => {
  
  const [ammunition, setAmmunition] = useState([]);
  useEffect(() => {
    getAllAmmunition()
      .then((response) => {
        if (!response.error) {
          // (response.data).forEach(user => setUsers(user));
          setAmmunition(response.data)
        }
      })
}, []);

  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteAmmunitions = useCallback(
    (ammoModelID) => {
      alert("You want to delete " + ammoModelID)
      deleteAmmunition(ammoModelID)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Ammunition deletion Successful!",
            });
          
        })
    },
    [addAlert]
  );

  const updateAmmunitions = useCallback(
    (id,data) => {
      console.log(data)
      updateAmmunition(id,data)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Weapon Ammunition Updated Successfully!",
            });
          
        })
    },
    [addAlert]
  );

  const saveAmmunitions = useCallback(
    (data) => {
      saveAmmunition(data)
        .then((response) => {
          if (!response.error){
            addAlert({
              message: "Ammunition Saved Successfully!",
            });
          }else{
            console.log(response.error)
          }
        })
    },
    [addAlert]
  );
  

  const tableColumns = [
    { title: "Ammunition Model ID", field: "ammoModelID" },
    { title: "Weapon Model ID", field: "weaponModelID" },
    
    
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
    data={ammunition}
    title={AmmunitionTable}
    columns={tableColumns}
    tableOptions={tableOptions}
    editable={{
        onRowAdd: newData =>{
           var data=({
            "ammoModelID": newData.ammoModelID,
            "weaponModelID": newData.weaponModelID,
             
            })
            saveAmmunitions(data)
        },
        onRowUpdate: (newData, oldData) =>{
          updateAmmunitions(oldData.ammoModelID, newData )
        },
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteAmmunitions(oldData.ammoModelID);
          }),
          // {
        //   deleteUser(oldData.officerID);
        // },
      }}
    />
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Ammunation);

//export default (Ammunation);
