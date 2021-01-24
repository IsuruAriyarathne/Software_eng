import React , {useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {deleteRecovery, updateRecovery } from "../../api/RecoverAPI"
import {getAllOrders} from "../../api/OrderAPI"
import {replaceItemInArray, removeItemFromArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';
import Button from '@material-ui/core/Button';

const ReoveryTable = "Order Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const ViewOrders = props => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            console.log(response)
            setOrders(response.data)
          }
        })
  }, []);
   const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const deleteOrders = useCallback(
    (oldWeapon) => {
      return new Promise((resolve, reject) => {
        deleteRecovery(oldWeapon.orderID)
              .then((response) => {
                console.log(response);
                  if (!response.error) {
                      addAlert({
                          message: "Weapon deletion Successful!",
                      });
                      setOrders(removeItemFromArray(orders, 'orderID', oldWeapon.orderID, oldWeapon))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, orders]
  );

  const updateOrders = useCallback(
    (newWeapon,oldWeapon) => {
      return new Promise((resolve, reject) => {
        updateRecovery(oldWeapon.orderID, newWeapon)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Weapon Updated Successfully!",
                      });
                      setOrders(replaceItemInArray(orders, 'orderID', newWeapon, oldWeapon.orderID))
                      return resolve();
                  }
                  return reject();
              })
      });
    },
    [addAlert, orders]
  );

//   const saveOrders = useCallback(
//     (newRecovery) => {
//       var data=({
//         "supplierID": newRecovery.supplierID,
//         "state": newRecovery.state,
//         "name": newRecovery.name,
//         "date": newRecovery.date,
//       })
//       console.log(data)
//       return new Promise((resolve, reject) => {
//         saveRecovery(data)
//               .then((response) => {
//                   if (!response.error) {
//                       addAlert({
//                           message: "Recovery Saved Successfully!",
//                       });
//                       setOrders(addItemToArray(orders, response.data))
//                       return resolve();
//                   }
//                   return reject();
//               })
//         });
//     },
//     [addAlert, orders]
//   );
  
  const renderProfilebtn = useCallback(
    (rowData) => <Button color="primary" onClick={() => history.push(`/order/${rowData.orderID}`)}>Order details</Button>,
    [history]
  );
  
  const tableColumns = [
    { title: "Order ID", field: "orderID", editable:"never" },
    { title: "Supplier ID", field: "supplierID", editable:"never" },
    { title: "Name", field: "name", editable:"never" },
    { title: "Date", field: "date", editable:"never" },
    { title: "State", field: "state", lookup: { Pending:"Pending", Complete:"Complete", Returned:"Returned", Rejected:"Rejected"} },
    { title: "Details", render: renderProfilebtn},
    // { title: "station Id", field: "stationID" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={orders}
      title={ReoveryTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        // onRowAdd: newData =>saveOrders(newData),
        onRowUpdate: (newData, oldData) =>updateOrders(newData, oldData ),
        onRowDelete: oldData => deleteOrders(oldData),
      }}
      // detailPanel={[
      //   {
      //       tooltip: "Show Recoveriews",
      //       render: renderRecoveries
      //   }]
      // }
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);

// export default (Users);