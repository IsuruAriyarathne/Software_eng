import React , {useState} from "react";

import Table from "../../components/UI/Table/MaterialTable/Table";

const LessonTable = "User Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Users = props => {

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
  
  const [lessons, setLessons] = useState([{id:"null", title:"null", topicid:"null", videoUrl:"null", description:"null",}]);

  const tableColumns = [
    { title: "Id", field: "id" },
    { title: "Title", field: "title" },
    { title: "Topic Id", field: "topicid" },
    { title: "Video URL", field: "videoUrl" },
    { title: "Description", field: "description" },
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
          //updateLesson(oldData.id, newData )
        },
        onRowDelete: oldData =>{
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
