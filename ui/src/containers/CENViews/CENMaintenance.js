import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getAllMaintenance  } from "../../api/CENviews"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const WeaponTable = "Maintenanace Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  console.log(props.stationID);
  const [maintenance, setMaintenance] = useState([]);
  useEffect(() => {
    getAllMaintenance()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setMaintenance(response.data)
          }
        })
  }, []);
  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);
  
  const tableColumns = [
    { title: "weapon ID", field: "id", editable: 'never' },
    { title: "Date", field: "date", editable: 'never' },
    { title: "Amount", field: "amount", editable: 'never' },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={maintenance}
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
