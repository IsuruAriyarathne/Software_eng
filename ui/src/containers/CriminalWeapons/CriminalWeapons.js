import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';

import {getAllLessons, deleteLessons,updateLessons, saveLessons  } from "../../api/CriminalWeaponsAPI"
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';

const LessonTable = "Criminal Weapons Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const CriminalWeapons = props => {
  
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    getAllLessons()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setLessons(response.data)
          }
        })
  }, []);
  const { addAlert } = props; 
  // const [isLoading, setIsLoading] = useState(true);

 // const [lessons, setLessons] = useState([{id:"null", title:"null", topicid:"null", videoUrl:"null", description:"null",}]);

  const deleteLessons = useCallback(
    (recoveryID) => {
      alert("You want to delete " + recoveryID)
      deleteLessons(recoveryID)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Criminal Weapons deletion Successful!",
            });
          
        })
    },
    [addAlert]
  );

  const updateLessons = useCallback(
    (id,data) => {
      console.log(data)
      updateLessons(id,data)
        .then((response) => {
            console.log(response);
            addAlert({
              message: "Criminal Weapons Updated Successfully!",
            });
          
        })
    },
    [addAlert]
  );

  const saveLessons = useCallback(
    (data) => {
      saveLessons(data)
        .then((response) => {
          if (!response.error){
            addAlert({
              message: "Criminal Weapon Saved Successfully!",
            });
          }else{
            console.log(response.error)
          }
        })
    },
    [addAlert]
  );

  const tableColumns = [
    { title: "Id", field: "recoveryID" },
    { title: "Recovery Date", field: "recoveryDate" },
    { title: "Description", field: "description" },
    { title: "Station ID", field: "stationID" },
    
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={lessons}
      title={LessonTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>{
           var data=({
             "recoveryID": newData.recoveryID,
             "recoveryDate": newData.recoveryDate,
             "description": newData.description,
             "stationID": newData.stationID,  
           })
           saveLessons(data)
        },
        onRowUpdate: (newData, oldData) =>{
          updateLessons(oldData.recoveryID, newData )
        },
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteLessons(oldData.recoveryID);
          }),
           // {
        //   deleteUser(oldData.officerID);
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

export default connect(null, mapDispatchToProps)(CriminalWeapons);


//export default (CriminalWeapons);
