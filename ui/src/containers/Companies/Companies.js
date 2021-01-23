import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllCompanies, deleteCompanies, updateCompanies,saveCompanies } from "../../api/CompaniesAPI"
import {replaceItemInArray, removeItemFromArray, addItemToArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const CompaniesTable = "Companies Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Companies = props => {
  
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    getAllCompanies()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response.data)
            setCompanies(response.data)
          }
        })
  }, []);

  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteCompany = useCallback(
    (oldData) => {
      return new Promise((resolve, reject) => {
        deleteCompanies(oldData.supplierID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Company deletion Successful!",
                      });
                      setCompanies(removeItemFromArray(companies, 'stationID', oldData.supplierID, oldData))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, companies]
  );

  const updateCompany= useCallback(
    (newData,oldData) => {
      return new Promise((resolve, reject) => {
        updateCompanies(oldData.supplierID,newData)
            .then((response) => {
                if (!response.error) {
                    addAlert({
                        message: "Company Updated Successfully!",
                    });
                    setCompanies(replaceItemInArray(companies, 'supplierID', newData, oldData.supplierID))
                    return resolve();
                }
                return reject();
            })
      })
    },
    [addAlert, companies]
  );

  const saveCompany = useCallback(
    (newStation) => {
      var data=({
        "supplierID": newStation.supplierID,
        "name": newStation.name,
        "contactNumber": newStation.contactNumber,
        "address": newStation.address,
        "decription": newStation.decription,
      })
      return new Promise((resolve, reject) => {
        saveCompanies(data)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Company Saved Successfully!",
                      });
                      setCompanies(addItemToArray(companies, data))
                      return resolve();
                  }
                  return reject();
              })
        });
    },
    [addAlert,companies]
  );
  

  const tableColumns = [
    { title: "Supplier ID", field: "supplierID" },
    { title: "Name", field: "name" },
    { title: "Contact Number", field: "contactNumber" },
    { title: "Address", field: "address" },
    { title: "Description", field: "decription" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={companies}
      title={CompaniesTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData => saveCompany(newData),
        onRowUpdate: (newData, oldData) =>updateCompany(newData, oldData ),
        onRowDelete: oldData =>deleteCompany(oldData),
      }}
    />
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(null, mapDispatchToProps)(Companies);

// export default (Companies);

       


