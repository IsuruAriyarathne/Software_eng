import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';

import {getAllCompanies, deleteCompanies, updateCompanies,saveCompanies } from "../../api/CompaniesAPI"
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
    (supplierID) => {
      alert("You want to delete " + supplierID)
      deleteCompanies(supplierID)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Company deletion Successful!",
            });
          
        })
    },
    [addAlert]
  );

  const updateCompany = useCallback(
    (id,data) => {
      console.log(data)
      updateCompanies(id,data)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Company Updated Successfully!",
            });
          
        })
    },
    [addAlert]
  );

  const saveCompany = useCallback(
    (data) => {
      saveCompanies(data)
        .then((response) => {
          if (!response.error){
            addAlert({
              message: "Company Saved Successfully!",
            });
          }else{
            console.log(response.error)
          }
        })
    },
    [addAlert]
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
        onRowAdd: newData =>{
          var data=({
             "supplierID": newData.supplierID,
             "name": newData.name,
             "contactNumber": newData.contactNumber,
             "address": newData.address,
             "decription": newData.decription,
           })
           saveCompany(data)
        },

        onRowUpdate: (newData, oldData) =>{
          updateCompany(oldData.supplierID, newData )
        },
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteCompany(oldData.supplierID);
          }),
        // {
        //   deleteCompany(oldData.supplierID);
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

export default connect(null, mapDispatchToProps)(Companies);

// export default (Companies);

       


