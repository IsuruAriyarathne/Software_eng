import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getAllRecoveries  } from "../../api/CENviews"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const WeaponTable = "Recovery Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  console.log(props.stationID);
  const [recovery, setRecovery] = useState([]);
  useEffect(() => {
    getAllRecoveries()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setRecovery(response.data)
          }
        })
  }, []);
  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);
  
  const tableColumns = [
    { title: "Recovery ID", field: "recoveryID", editable: 'never' },
    { title: "Station Name", field: "stationName", editable: 'never' },
    // { title: "Assigned", field: "assigned" },
    { title: "Recovery Date", field: "recoveryDate" , editable: 'never'},
    { title: "Location", field: "location", editable: 'never' },
    { title: "Description", field: "description"},
    { title: "Contact Number", field: "contactNo"},
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={recovery}
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
