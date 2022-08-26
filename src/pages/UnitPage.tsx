import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Unit from "../models/UnitModel";
import {Button} from "primereact/button";

const UnitPage = () => {
  const navigate = useNavigate();
  let params = useParams();
  let id:number = parseInt(params.id!);
  const [unit, setUnit] = useState({} as Unit);
  
  useEffect(() => {
    fetch("http://localhost:3001/unit/"+id).then(response => {
      response.json().then(result => {
        setUnit(result)
      })
    })
  }, [id])

  const deleteUnit = () => {
    let options = {
      method: "DELETE"
    }
    fetch("http://localhost:3001/unit/"+id, options).then(res => {
      if (!res.ok) console.log(res.statusText); else navigate("/units")
    })
  };
  return (
    <div>
      <Button icon='pi pi-trash' onClick={deleteUnit}></Button>
      {unit.title}
    </div>
  );
};

export default UnitPage;