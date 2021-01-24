import { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Spinner from "../../components/UI/Spinner/Spinner";
import { getDetails } from '../../api/CompaniesAPI';
// import { changePassword } from "../../api/UsersAPI";
import * as actions from '../../store/actions/index';
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";
import { updateCompanies, saveCompanies,deleteCompanies } from '../../api/CompaniesAPI';
import { replaceItemInArray, removeItemFromArray, addItemToArray } from '../../shared/utility';
import Table from '../../components/UI/Table/MaterialTable/Table';

const ammunitionTable = 'Ammunition Supply Table';
const weaponTable = 'Weapons Suply Table';

const tableOptions = {
	pageSize: 10,
	pageSizeOptions: [10, 30, 50],
};

const CompanyDetail = (props) => {
	const { addAlert } = props;

	const { id } = useParams();
	// const [isLoading, setIsLoading] = useState(true);
	const [ammunitionTypes, setAmmunitionTypes] = useState([]);
	const [weaponModels, setWeaponModels] = useState([]);

	useEffect(() => {
		getDetails(id).then((response) => {
			if (!response.error) {
				console.log(response.data);
				console.log(response.data.SupplyAmmunition);
				setAmmunitionTypes(response.data.SupplyAmmunition);
				setWeaponModels(response.data.SupplyWeapon);
			}
		});
	}, [id]);

	const deleteAmo = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteCompanies(oldData.ammoModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Ammunition deletion Successful!',
						});
						setAmmunitionTypes(
							removeItemFromArray(ammunitionTypes, 'ammoModelID', oldData.ammoModelID, oldData)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, ammunitionTypes]
	);

	const saveAmo = useCallback(
		(newAmmo) => {
			var data = {
				SupplyAmmunition: [
					{
						ammoModelID: newAmmo.ammoModelID,
						supplierID: id,
					},
				],
			};
			return new Promise((resolve, reject) => {
				updateCompanies(id,data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Ammunition Saved Successfully!',
            });
            console.log(response.data);
						setAmmunitionTypes(addItemToArray(ammunitionTypes, response.data.SupplyAmmunition));
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, ammunitionTypes]
	);

	const deleteWeapon = useCallback(
		(oldData) => {
			return new Promise((resolve, reject) => {
				deleteCompanies(oldData.weaponModelID).then((response) => {
					console.log(response);
					if (!response.error) {
						addAlert({
							message: 'Weapon deletion Successful!',
						});
						setWeaponModels(
							removeItemFromArray(weaponModels, 'weaponModelID', oldData.weaponModelID, oldData)
						);
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, weaponModels]
	);

	const saveWeapon = useCallback(
		(newWeapon) => {
			var data = {
				SupplyWeapon: [{ weaponModelID: newWeapon.weaponModelID, supplierID: id }],
			};
			return new Promise((resolve, reject) => {
				updateCompanies(id,data).then((response) => {
					if (!response.error) {
						addAlert({
							message: 'Weapon Saved Successfully!',
						});
						setWeaponModels(addItemToArray([], response.data.SupplyWeapon));
						return resolve();
					}
					return reject();
				});
			});
		},
		[addAlert, weaponModels]
	);

	const tableColumnsAmo = [
		{ title: 'Ammunition ID', field: 'ammoModelID',  },
		{ title: 'Name', field: 'name', editable: 'never' },
		{ title: 'Description', field: 'description', editable: 'never' },
	];

	const tableColumnsWeapon = [
		{ title: 'Weapon ID', field: 'weaponModelID' },
		{ title: 'Name', field: 'name', editable: 'never' },
		{ title: 'Description', field: 'description', editable: 'never' },
	];

	if (false) {
		//return <Spinner />
	} else {
		return (
			<div>
				<Table
					data={ammunitionTypes}
					title={ammunitionTable}
					columns={tableColumnsAmo}
					tableOptions={tableOptions}
					editable={{
						onRowAdd: (newData) => saveAmo(newData),
						onRowDelete: (oldData) => deleteAmo(oldData),
					}}
				/>
				<Table
					data={weaponModels}
					title={weaponTable}
					columns={tableColumnsWeapon}
					tableOptions={tableOptions}
					editable={{
						onRowAdd: (newData) => saveWeapon(newData),
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
