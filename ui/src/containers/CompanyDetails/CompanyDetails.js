import { useEffect, useState ,useCallback} from 'react';
import { connect } from 'react-redux';

import { useParams } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// import Spinner from "../../components/UI/Spinner/Spinner";
import { getDetails } from '../../api/CompaniesAPI';
import Button from '@material-ui/core/Button';
import { updateObject, formIsValid } from '../../shared/utility';
import { checkValidity } from '../../shared/validate';
import { buildTextFields } from '../../helpers/uiHelpers';
// import { changePassword } from "../../api/UsersAPI";
import * as actions from '../../store/actions/index';
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";
import {getAllStations, deleteStations, updateStations, saveStations } from "../../api/Stations"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";

const ammunitionTable = "Ammunition Supply Table";
const weaponTable = "Weapons Suply Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const RecoveryDetail = props => {
    const { addAlert } = props;

    const { id } = useParams();
    // const [isLoading, setIsLoading] = useState(true);
    const [recoveredammunitions, setrecoveredammunitions] = useState([]);
    const [recoveredweapons, setrecoveredweapons] = useState([]);

    useEffect(() => {
        getDetails(id)
            .then(response => {
                if (!response.error) {
                    console.log(response.data);
                    console.log(response.data.RecoveredAmmunitions);
                    setrecoveredammunitions(response.data.SupplyAmmunition);
                    setrecoveredweapons(response.data.SupplyWeapon);
                }
            })
    }, [recoveredammunitions,recoveredweapons, id]);

    const deleteAmo = useCallback(
        (oldData) => {
          return new Promise((resolve, reject) => {
            deleteStations(oldData.ammoModelID)
                  .then((response) => {
                    console.log(response);
                      if (!response.error) {
                          addAlert({
                              message: "Ammunition deletion Successful!",
                          });
                          setrecoveredammunitions(removeItemFromArray(recoveredammunitions, 'ammoModelID', oldData.ammoModelID, oldData))
                          return resolve();
                      }
                      return reject();
                  })
          });
        },
        [addAlert, recoveredammunitions]
      );
    
      const updateAmo= useCallback(
        (newData,oldData) => {
          return new Promise((resolve, reject) => {
            updateStations(oldData.ammoModelID,newData)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "Ammunition Updated Successfully!",
                        });
                        setrecoveredammunitions(replaceItemInArray(recoveredammunitions, 'ammoModelID', newData, oldData.ammoModelID))
                        return resolve();
                    }
                    return reject();
                })
          })
        },
        [addAlert, recoveredammunitions]
      );
    
      const saveAmo = useCallback(
        (newStation) => {
          var data=({
            "ammoModelID": newStation.ammoModelID,
            "description": newStation.description,
            "amount": newStation.amount,
            "name": newStation.name,
          })
          return new Promise((resolve, reject) => {
            saveStations(data)
                  .then((response) => {
                      if (!response.error) {
                          addAlert({
                              message: "Ammunition Saved Successfully!",
                          });
                          setrecoveredammunitions(addItemToArray(recoveredammunitions, response.data))
                          return resolve();
                      }
                      return reject();
                  })
            });
        },
        [addAlert,recoveredammunitions]
      );
      
      const deleteWeapon = useCallback(
        (oldData) => {
          return new Promise((resolve, reject) => {
            deleteStations(oldData.weaponModelID)
                  .then((response) => {
                    console.log(response);
                      if (!response.error) {
                          addAlert({
                              message: "Weapon deletion Successful!",
                          });
                          setrecoveredweapons(removeItemFromArray(recoveredweapons, 'weaponModelID', oldData.weaponModelID, oldData))
                          return resolve();
                      }
                      return reject();
                  })
          });
        },
        [addAlert, recoveredweapons]
      );
    
      const updateWeapon= useCallback(
        (newData,oldData) => {
          return new Promise((resolve, reject) => {
            updateStations(oldData.weaponModelID,newData)
                .then((response) => {
                    if (!response.error) {
                        addAlert({
                            message: "Weapon Updated Successfully!",
                        });
                        setrecoveredweapons(replaceItemInArray(recoveredweapons, 'weaponModelID', newData, oldData.weaponModelID))
                        return resolve();
                    }
                    return reject();
                })
          })
        },
        [addAlert, recoveredweapons]
      );
    
      const saveWeapon = useCallback(
        (newStation) => {
          var data=({
            "recoveryID": newStation.weaponModelID,
            "description": newStation.description,
            "amount": newStation.amount,
            "name": newStation.name,
          })
          return new Promise((resolve, reject) => {
            saveStations(data)
                  .then((response) => {
                      if (!response.error) {
                          addAlert({
                              message: "Weapon Saved Successfully!",
                          });
                          setrecoveredweapons(addItemToArray(recoveredweapons, data))
                          return resolve();
                      }
                      return reject();
                  })
            });
        },
        [addAlert,recoveredweapons]
      );
    
      const tableColumnsAmo = [
        { title: "Ammunition ID", field: "ammoModelID" },
        { title: "Description", field: "description" },
        { title: "Amount", field: "amount" },
        { title: "Supplier ID", field: "supplierID"},
      ];

      const tableColumnsWeapon = [
        { title: "Weapon ID", field: "weaponModelID" },
        { title: "Supplier ID", field: "supplierID"},
        { title: "Amount", field: "amount" },
        { title: "Description", field: "description" },  
      ];
    
      if (false) {
        //return <Spinner />
      } else {
        return (
            <div>
                <Table
                    data={recoveredammunitions}
                    title={ammunitionTable}
                    columns={tableColumnsAmo}
                    tableOptions={tableOptions}
                    editable={{
                        onRowAdd: newData => saveAmo(newData),
                        onRowUpdate: (newData, oldData) =>updateAmo(newData, oldData ),
                        onRowDelete: oldData =>deleteAmo(oldData),
                    }}
                />
                <Table
                    data={recoveredweapons}
                    title={weaponTable}
                    columns={tableColumnsWeapon}
                    tableOptions={tableOptions}
                    editable={{
                        onRowAdd: newData => saveWeapon(newData),
                        onRowUpdate: (newData, oldData) =>updateWeapon(newData, oldData ),
                        onRowDelete: oldData =>deleteWeapon(oldData),
                    }}
                />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryDetail);