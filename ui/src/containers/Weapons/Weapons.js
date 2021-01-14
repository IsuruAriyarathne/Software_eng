import React , {useState, useEffect} from "react";

import {getAllWeapons } from "../../api/WeaponsAPI"
import Table from "../../components/UI/Table/MaterialTable/Table";

const WeaponTable = "Weapons Table";

const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Weapons = props => {
  
  const [weapons, setWeapons] = useState([]);
  useEffect(() => {
    getAllWeapons()
        .then((response) => {
          console.log(response.data);
          if (!response.error) {
            // (response.data).forEach(user => setUsers(user));
            setWeapons(response.data)
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
      data={weapons}
      title={WeaponTable}
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

export default (Weapons);
