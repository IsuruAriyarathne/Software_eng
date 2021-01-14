import React , {useState, useEffect} from "react";

import {getAllUsers } from "../../api/UsersAPI"
import Table from "../../components/UI/Table/MaterialTable/Table";

const UserTable = "User Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
      getAllUsers()
        .then((response) => {
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setUsers(response.data)
          }
        })
  }, []);
  // const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);
  // const [lessons, setLessons] = useState([]);

  // const deleteLesson = useCallback(
  //   (id) => {
  //     alert("You want to delete " + id)
  //     deleteLessons(id)
  //       .then((response) => {
  //           console.log(response);
  //           addAlert({
  //             message: "Lesson deletion Successful!",
  //           });
          
  //       })
  //   },
  //   [addAlert]
  // );

  // const updateLesson = useCallback(
  //   (id,data) => {
  //     console.log(data)
  //     updateLessons(id,data)
  //       .then((response) => {
  //           console.log(response);
  //           addAlert({
  //             message: "Lesson Updated Successfully!",
  //           });
          
  //       })
  //   },
  //   [addAlert]
  // );

  // const saveLesson = useCallback(
  //   (data) => {
  //     saveLessons(data)
  //       .then((response) => {
  //         if (!response.error){
  //           addAlert({
  //             message: "Lesson Saved Successfully!",
  //           });
  //         }else{
  //           console.log(response.error)
  //         }
  //       })
  //   },
  //   [addAlert]
  // );
  

  const tableColumns = [
    { title: "Id", field: "officerId" },
    { title: "Name", field: "name" },
    { title: "Location", field: "location" },
    // { title: "Role", field: "role" },
    { title: "stationId", field: "stationID" },
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
      data={users}
      title={UserTable}
      columns={tableColumns}
      tableOptions={tableOptions}
      editable={{
        onRowAdd: newData =>{
          console.log(newData)
        //   var data=({
        //     "id": newData.id,
        //     "title": newData.title,
        //     "topicId": newData.topic.id,
        //     "videoUrl": newData.videoUrl,
        //     "description": newData.description
        //   })
        //   saveLesson(data)
        },
        onRowUpdate: (newData, oldData) =>{
          console.log(newData)
          console.log(oldData)
          //updateLesson(oldData.id, newData )
        },
        onRowDelete: oldData =>{
          console.log(oldData)
          //deleteLesson(oldData.id);
        },
      }}
    />
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addAlert: alert => dispatch(actions.addAlert(alert))
//   };
// }

// export default connect(null, mapDispatchToProps)(Users);

export default (Users);
