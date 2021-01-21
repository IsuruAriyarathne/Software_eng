import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getAllWeapons,updateWeapons  } from "../../api/WeaponsAPI"
import {replaceItemInArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const WeaponTable = "Weapons Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  console.log(props.stationID);
  const [weapons, setWeapons] = useState([]);
  useEffect(() => {
    getAllWeapons(props.stationID)
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


  const updateWeapon = useCallback(
    (newWeapon,oldWeapon) => {
      return new Promise((resolve, reject) => {
        updateWeapons(oldWeapon.weaponID, newWeapon)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Weapon Updated Successfully!",
                      });
                      setWeapons(replaceItemInArray(weapons, 'weaponID', newWeapon, oldWeapon.weaponID))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, weapons]
  );
  
  const tableColumns = [
    { title: "weapon ID", field: "weaponID" },
    { title: "Name", field: "name" },
    // { title: "Assigned", field: "assigned" },
    { title: "Assigned Date", field: "assignedDate" },
    { title: "Description", field: "description" },
    { title: "Status", field: "state",  lookup: { Available:"Available", Lost:"Lost", Maintainance:"Maintainance"},},
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
        onRowUpdate: (newData, oldData) =>updateWeapon(newData, oldData ),
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

export default connect(mapStateToProps, mapDispatchToProps)(Weapons);

//export default (Weapons);
