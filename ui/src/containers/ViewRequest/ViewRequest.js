import React , {useState, useEffect} from "react";
import { connect } from 'react-redux';

import {getALLRequests  } from "../../api/ViewRequest"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const WeaponTable = "Stations Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  console.log(props.stationID);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getALLRequests()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setRequests(response.data)
          }
        })
  }, []);
  // const [isLoading, setIsLoading] = useState(true);
  
  const tableColumns = [
    { title: "Request ID", field: "requestID", editable: 'never' },
    { title: "State", field: "state", editable: 'never' },
    { title: "Comments", field: "comments", editable: 'never' },
    // { title: "Assigned", field: "assigned" },
    { title: "Date", field: "date" , editable: 'never'},
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={requests}
      title={WeaponTable}
      columns={tableColumns}
      tableOptions={tableOptions}
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
