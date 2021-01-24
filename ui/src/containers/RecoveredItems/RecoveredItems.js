import { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { getRecovery, deleteRecoveryAmmunition, deleteRecoveryWeapon, updateRecovery } from '../../api/RecoverAPI';
import * as actions from '../../store/actions/index';
import { deleteStations, updateStations, saveStations } from '../../api/Stations';
import { replaceItemInArray, removeItemFromArray, addItemToArray, addItemRemoveDuplicate } from '../../shared/utility';
import Table from '../../components/UI/Table/MaterialTable/Table';

const ammunitionTable = 'Recovered Ammunition Table';
const weaponTable = 'Recovered Weapon Table';

const tableOptions = {
	pageSize: 10,
	pageSizeOptions: [10, 30, 50],
};

const RecoveryDetail = (props) => {
	const { addAlert } = props;
	const { id } = useParams();
	const [recoveredammunitions, setrecoveredammunitions] = useState([]);
	const [recoveredweapons, setrecoveredweapons] = useState([]);

	useEffect(() => {
		getRecovery(props.stationID, id).then((response) => {
			if (!response.error) {
				console.log(response.data);
				console.log(response.data.RecoveredAmmunitions);
				setrecoveredammunitions(response.data.RecoveredAmmunitions);
				setrecoveredweapons(response.data.RecoveredWeapons);
			}
		});
	}, [id]);

	const deleteAmo = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteRecoveryAmmunition(id, oldData.ammoModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Ammunition deletion Successful!',
						});
						setrecoveredammunitions(
							removeItemFromArray(recoveredammunitions, 'ammoModelID', oldData.ammoModelID, oldData)
						);
						return resolve();
					}
					addAlert({
						message: "Failed!",
					  });
					return reject();
				});
			});
		},
		[addAlert, recoveredammunitions]
	);

	const updateAmo = useCallback(
		(newData, oldData) => {
			return new Promise((resolve, reject) => {
				updateRecovery(oldData.recoveryID, { RecoveredAmmunitions: [newData] }).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Ammunition Updated Successfully!',
						});
						setrecoveredammunitions(
							replaceItemInArray(recoveredammunitions, 'ammoModelID', newData, oldData.ammoModelID)
						);
						return resolve();
					}
					addAlert({
						message: "Failed!",
					  });
					return reject();
				});
			});
		},
		[addAlert, recoveredammunitions]
	);

	const saveAmo = useCallback(
		(newStation) => {
			var data = {
				RecoveredAmmunitions: [
					{
            recoveryID:id,
						ammoModelID: newStation.ammoModelID,
						amount: newStation.amount,
						description: newStation.description,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateRecovery(id, data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Ammunition Saved Successfully!',
						});
						let arr = addItemRemoveDuplicate(
							'ammoModelID',
							recoveredammunitions,
							response.data.RecoveredAmmunitions
						);
						setrecoveredammunitions(addItemToArray(recoveredammunitions, arr[0]));
						return resolve();
					}
					addAlert({
						message: "Failed!",
					  });
					return reject();
				});
			});
		},
		[addAlert, recoveredammunitions]
	);

	const deleteWeapon = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteRecoveryWeapon(id, oldData.weaponModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Weapon deletion Successful!',
						});
						setrecoveredweapons(
							removeItemFromArray(recoveredweapons, 'weaponModelID', oldData.weaponModelID, oldData)
						);
						return resolve();
					}
					addAlert({
						message: "Failed!",
					  });
					return reject();
				});
			});
		},
		[addAlert, recoveredweapons]
	);

	const updateWeapon = useCallback(
		(newData, oldData) => {
			return new Promise((resolve, reject) => {
				updateRecovery(oldData.recoveryID, newData).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Weapon Updated Successfully!',
						});
						setrecoveredweapons(
							replaceItemInArray(recoveredweapons, 'weaponModelID', newData, oldData.weaponModelID)
						);
						return resolve();
					}
					addAlert({
						message: "Failed!",
					  });
					return reject();
				});
			});
		},
		[addAlert, recoveredweapons]
	);

	const saveWeapon = useCallback(
		(newStation) => {
			var data = {
				RecoveredWeapons: [
					{
            recoveryID:id,
						weaponModelID: newStation.weaponModelID,
						amount: newStation.amount,
						description: newStation.description,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateRecovery(id, data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Weapon Saved Successfully!',
            });
            let arr = addItemRemoveDuplicate('weaponModelID',recoveredweapons,response.data.RecoveredWeapons)
						setrecoveredweapons(addItemToArray(recoveredweapons, arr[0]));
						return resolve();
					}
					addAlert({
						message: "Failed!",
					  });
					return reject();
				});
			});
		},
		[addAlert, recoveredweapons]
	);

	const tableColumnsAmo = [
		{ title: 'Model ID', field: 'ammoModelID' },
		{ title: 'Amount', field: 'amount' },
		{ title: 'Name', field: 'name', editable:"never" },
		{ title: 'Description', field: 'description' },
	];

	const tableColumnsWeapon = [
		{ title: 'Model ID', field: 'weaponModelID' },
		{ title: 'Amount', field: 'amount' },
		{ title: 'Name', field: 'name',editable:"never" },
		{ title: 'Description', field: 'description' },
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
						onRowAdd: (newData) => saveAmo(newData),
						onRowUpdate: (newData, oldData) => updateAmo(newData, oldData),
						onRowDelete: (oldData) => deleteAmo(oldData),
					}}
				/>
				<Table
					data={recoveredweapons}
					title={weaponTable}
					columns={tableColumnsWeapon}
					tableOptions={tableOptions}
					editable={{
						onRowAdd: (newData) => saveWeapon(newData),
						onRowUpdate: (newData, oldData) => updateWeapon(newData, oldData),
						onRowDelete: (oldData) => deleteWeapon(oldData),
					}}
				/>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		stationID: state.auth.stationID,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addAlert: (alert) => dispatch(actions.addAlert(alert)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryDetail);
