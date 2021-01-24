import { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { getOrder, updateOrder, deleteOrderWeapon, deleteOrderAmmunition } from '../../api/OrderAPI';
import * as actions from '../../store/actions/index';
import { replaceItemInArray, removeItemFromArray, addItemToArray, addItemRemoveDuplicate } from '../../shared/utility';
import Table from '../../components/UI/Table/MaterialTable/Table';

const ammunitionTable = 'Recovered Ammunition Table';
const weaponTable = 'Recovered Weapon Table';

const tableOptions = {
	pageSize: 10,
	pageSizeOptions: [10, 30, 50],
};

const OrderDetail = (props) => {
	const { addAlert } = props;
	const { id } = useParams();
	const [orderWeapons, setorderWeapons] = useState([]);
	const [orderAmmunitions, setorderAmmunitions] = useState([]);

	useEffect(() => {
		getOrder(props.orderID).then((response) => {
			if (!response.error) {
				console.log(response.data);
				setorderWeapons(response.data.AmmoOrder);
				setorderAmmunitions(response.data.WeaponOrder);
			}
		});
	}, [id]);

	const deleteAmo = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteOrderAmmunition(id, oldData.ammoModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Ammunition deletion Successful!',
						});
						setorderWeapons(
							removeItemFromArray(orderAmmunitions, 'ammoModelID', oldData.ammoModelID, oldData)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderWeapons]
	);

	const updateAmo = useCallback(
		(newData, oldData) => {
			return new Promise((resolve, reject) => {
				updateOrder(oldData.orderID, { AmmoOrder: [newData] }).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Ammunition Updated Successfully!',
						});
						setorderWeapons(
							replaceItemInArray(orderAmmunitions, 'ammoModelID', newData, oldData.ammoModelID)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderWeapons]
	);

	const saveAmo = useCallback(
		(newStation) => {
			var data = {
				orderWeapons: [
					{
                        orderID:id,
						ammoModelID: newStation.ammoModelID,
						count: newStation.count,
						state: newStation.state,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateOrder(id, data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Order Saved Successfully!',
						});
						let arr = addItemRemoveDuplicate(
							'ammoModelID',
							orderWeapons,
							response.data.AmmoOrder
						);
						setorderWeapons(addItemToArray(orderWeapons, arr[0]));
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderWeapons]
	);

	const deleteWeapon = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteOrderWeapon(id, oldData.weaponModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Weapon deletion Successful!',
						});
						setorderAmmunitions(
							removeItemFromArray(orderAmmunitions, 'weaponModelID', oldData.weaponModelID, oldData)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderAmmunitions]
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
		[addAlert, orderAmmunitions]
	);

	const saveWeapon = useCallback(
		(newStation) => {
			var data = {
				WeaponOrder: [
					{
                        orderID:id,
						weaponModelID: newStation.weaponModelID,
						count: newStation.count,
						state: newStation.state,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateOrder(id, data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Weapon Saved Successfully!',
            });
            let arr = addItemRemoveDuplicate('weaponModelID',orderWeapons,response.data.WeaponOrder)
						setorderAmmunitions(addItemToArray(orderWeapons, arr[0]));
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, orderAmmunitions]
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
					data={orderWeapons}
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
					data={orderAmmunitions}
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
		orderID: state.auth.orderID,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addAlert: (alert) => dispatch(actions.addAlert(alert)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
