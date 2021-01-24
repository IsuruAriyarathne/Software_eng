import { useEffect, useState ,useCallback} from 'react';
import { connect } from 'react-redux';

import { useParams } from "react-router-dom";
// import Spinner from "../../components/UI/Spinner/Spinner";
import { getWeaponDetails } from '../../api/WeaponCentralizedAPI';
// import { changePassword } from "../../api/UsersAPI";
import * as actions from '../../store/actions/index';
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";
import { deleteStations, updateStations, saveStations } from "../../api/Stations"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";

const ammunitionTable = "Weapon Details Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const WeaponDetails = props => {
    const { addAlert } = props;

    const { id } = useParams();
    // const [isLoading, setIsLoading] = useState(true);
    const [weaponDetails, setweaponDetails] = useState([]);

    useEffect(() => {
        getWeaponDetails(id)
            .then(response => {
                if (!response.error) {
                    console.log(response.data);
                    console.log(response.data.RecoveredAmmunitions);
                    setweaponDetails(response.data);
                }
            })
    }, [id]);

    const deleteData = useCallback(
        (oldData) => {
          return new Promise((resolve, reject) => {
            deleteStations(oldData.weaponModelID)
                  .then((response) => {
                    console.log(response);
                      if (!response.error) {
                          addAlert({
                              message: "Ammunition deletion Successful!",
                          });
                          setweaponDetails(removeItemFromArray(weaponDetails, 'weaponModelID', oldData.weaponModelID, oldData))
                          return resolve();
                      }
                      return reject();
                  })
          });
        },
        [addAlert, weaponDetails]
      );
    
      const updateData= useCallback(
        (newData,oldData) => {
          return new Promise((resolve, reject) => {
            updateStations(oldData.weaponModelID,newData)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "Ammunition Updated Successfully!",
                        });
                        setweaponDetails(replaceItemInArray(weaponDetails, 'weaponModelID', newData, oldData.weaponModelID))
                        return resolve();
                    }
                    return reject();
                })
          })
        },
        [addAlert, weaponDetails]
      );
    
      const saveData = useCallback(
        (newStation) => {
          var data=({
            "weaponModelID": newStation.weaponModelID,
            "orderID": newStation.orderID,
            "state": newStation.state,
          })
          return new Promise((resolve, reject) => {
            saveStations(data)
                  .then((response) => {
                      if (!response.error) {
                          addAlert({
                              message: "Ammunition Saved Successfully!",
                          });
                          setweaponDetails(addItemToArray(weaponDetails, data))
                          return resolve();
                      }
                      return reject();
                  })
            });
        },
        [addAlert,weaponDetails]
      );
      
    
      const tableColumns= [
        { title: "Assigned", field: "assigned" },
        { title: "Assigned Date", field: "assignedDate" },
        { title: "Station Name", field: "stationName" },
        { title: "Contact Number", field: "contactNo" },
      ];
    
      if (false) {
        //return <Spinner />
      } else {
        return <Table
          data={weaponDetails}
          title={ammunitionTable}
          columns={tableColumns}
          tableOptions={tableOptions}
          editable={{
            onRowAdd: newData =>saveData(newData),
            onRowUpdate: (newData, oldData) =>updateData(newData, oldData ),
            onRowDelete: oldData => deleteData(oldData),
          }}
        />
      }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(WeaponDetails);