import React , {useState, useEffect} from "react";

import {getAllAmmunition } from "../../api/AmmunitionAPI"
import Table from "../../components/UI/Table/MaterialTable/Table";

const AmmunitionTable = "Ammunation Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Ammunation = props => {
  
  const [ammunition, setAmmunition] = useState([]);
  useEffect(() => {
    getAllAmmunition()
      .then((response) => {
        if (!response.error) {
          // (response.data).forEach(user => setUsers(user));
          setAmmunition(response.data)
        }
      })
}, []);

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
      data={ammunition}
      title={AmmunitionTable}
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

export default (Ammunation);