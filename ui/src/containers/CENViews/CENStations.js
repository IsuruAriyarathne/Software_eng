import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getALLStations  } from "../../api/CENviews"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const WeaponTable = "Stations Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  console.log(props.stationID);
  const [stations, setStations] = useState([]);
  useEffect(() => {
    getALLStations()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setStations(response.data)
          }
        })
  }, []);
  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);
  
  const tableColumns = [
    { title: "Station ID", field: "stationID", editable: 'never' },
    { title: "Station Name", field: "stationName", editable: 'never' },
    { title: "Name", field: "location", editable: 'never' },
    // { title: "Assigned", field: "assigned" },
    { title: "Type", field: "type" , editable: 'never'},
    { title: "Contact Number", field: "contactNo", editable: 'never' },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={stations}
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
