import { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { getOrder, updateOrder, deleteOrderWeapon, deleteOrderAmmunition } from '../../api/OrderAPI';
import * as actions from '../../store/actions/index';
import { replaceItemInArray, removeItemFromArray, addItemToArray, addItemRemoveDuplicate } from '../../shared/utility';
import Table from '../../components/UI/Table/MaterialTable/Table';

const ammunitionTable = 'Order Ammunition Models';
const weaponTable = 'Order Weapon Models';

const tableOptions = {
	pageSize: 10,
	pageSizeOptions: [10, 30, 50],
};

const OrderDetail = (props) => {
	const { addAlert } = props;
	const { orderID } = useParams();
	const [orderWeapons, setorderWeapons] = useState([]);
	const [orderAmmunitions, setorderAmmunitions] = useState([]);
    console.log(orderID);
	useEffect(() => {
		getOrder(orderID).then((response) => {
			if (!response.error) {
				console.log(response.data);
				setorderAmmunitions(response.data.AmmoOrder);
				setorderWeapons(response.data.WeaponOrder);
			}
		});
	}, [orderID]);

	const deleteAmo = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteOrderAmmunition(orderID, oldData.ammoModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Ammunition deletion Successful!',
						});
						setorderAmmunitions(
							removeItemFromArray(orderAmmunitions, 'ammoModelID', oldData.ammoModelID, oldData)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderAmmunitions, orderID]
	);

	const updateAmo = useCallback(
		(newData, oldData) => {
			return new Promise((resolve, reject) => {
				updateOrder(oldData.orderID, { AmmoOrder: [newData] }).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Ammunition Updated Successfully!',
						});
						setorderAmmunitions(
							replaceItemInArray(orderAmmunitions, 'ammoModelID', newData, oldData.ammoModelID)
                        );
                        console.log(orderAmmunitions);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderAmmunitions]
	);

	const saveAmo = useCallback(
		(newStation) => {
			var data = {
				AmmoOrder: [
					{
                        orderID:orderID,
						ammoModelID: newStation.ammoModelID,
						count: newStation.count,
						state: newStation.state,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateOrder(orderID, data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Order Saved Successfully!',
						});
						let arr = addItemRemoveDuplicate(
							'ammoModelID',
							orderAmmunitions,
							response.data.AmmoOrder
						);
						setorderAmmunitions(addItemToArray(orderAmmunitions, arr[0]));
						return resolve();
					}
					return reject();
				});
			});
		},
		[orderID,addAlert, orderAmmunitions]
	);

	const deleteWeapon = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteOrderWeapon(orderID, oldData.weaponModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Weapon deletion Successful!',
						});
						setorderAmmunitions(
							removeItemFromArray(orderWeapons, 'weaponModelID', oldData.weaponModelID, oldData)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[orderID,addAlert, orderWeapons]
	);

	const updateWeapon = useCallback(
		(newData, oldData) => {
			return new Promise((resolve, reject) => {
				updateOrder(oldData.orderID, newData).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Weapon Updated Successfully!',
						});
						setorderAmmunitions(
							replaceItemInArray(orderWeapons, 'weaponModelID', newData, oldData.WeaponOrder)
                        );
                        
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderWeapons]
	);

	const saveWeapon = useCallback(
		(newStation) => {
			var data = {
				WeaponOrder: [
					{
                        orderID:orderID,
						weaponModelID: newStation.weaponModelID,
						count: newStation.count,
						state: newStation.state,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateOrder(orderID, data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Weapon Saved Successfully!',
            });
            console.log(response.data);
            let arr = addItemRemoveDuplicate('weaponModelID',orderWeapons,response.data.WeaponOrder)
            console.log(arr);
					setorderWeapons(addItemToArray(orderWeapons, arr[0]));
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderWeapons, orderID]
	);

	const tableColumnsAmo = [
		{ title: 'Model ID', field: 'ammoModelID' },
		{ title: 'Name', field: 'name' },
		{ title: 'Count', field: 'count' },
		{ title: 'State', field: 'state' },
	];

	const tableColumnsWeapon = [
		{ title: 'Model ID', field: 'weaponModelID' },
		{ title: 'Name', field: 'name' },
		{ title: 'Count', field: 'count' },
		{ title: 'State', field: 'state' },
	];

	if (false) {
		//return <Spinner />
	} else {
		return (
			<div>
				<Table
					data={orderAmmunitions}
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
					data={orderWeapons}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
