import React , {useState} from "react";

import Table from "../../components/UI/Table/MaterialTable/Table";

const LessonTable = "Companies Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Companies = props => {
  
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

export default (Companies);
