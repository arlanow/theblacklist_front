import React, {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Captcha} from "primereact/captcha";
import {Dialog} from "primereact/dialog";
// eslint-disable-next-line import/no-unresolved
import Unit from "../models/UnitModel";

const UnitsTablePage = () => {
  const [units, setUnits] = useState([] as Unit[]);

  const loadUnits = () => {
    fetch("http://localhost:3001/unit").then(response => {
      response.json().then(result => {
        setUnits(result)
      })
    })
  }

  useEffect(loadUnits,[])

  const createUnit = (unit: Unit) => {
    unit.type = 0;
    let options = {
      method: "POST",
      body: JSON.stringify(unit),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch("http://localhost:3001/unit", options).then(res => {
      if (!res.ok) console.log(res.statusText); else {
        loadUnits()
      }
    })
  }

  const dt = useRef<DataTable | null>(null)
  const navigate = useNavigate();
  const goto = (id: number) => {
    navigate("/unit/"+id)
  }

  const [captchaConfirmed, setCaptchaConfirmed] = useState(false)
  const [captchaVisible, setCaptchaVisible] = useState(true)
  const [displayDialog, setDisplayDialog] = useState(false)
  const [unitToAdd, setUnitToAdd] = useState({title: ""} as Unit)
  const [editable, setEditable] = useState(false);
  let addUnit = () => {
    setCaptchaVisible(false)
    setDisplayDialog(false)
    createUnit(unitToAdd)
  }

  const textEditor = (options:any) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const footer = <div>
    <Button label="Добавить" disabled={!captchaConfirmed} onClick={addUnit} icon="pi pi-check" />
  </div>


  const header = <div className='flex gap-2 h-3rem'>
    <p className=''>Чёрный список</p>
    <div className='flex-grow-1'></div>
    {/*<InputText placeholder="Найти" type="text" />*/}
    <Button icon='pi pi-pencil' className='' onClick={() => {setEditable(!editable)}}></Button>
    <Button icon='pi pi-filter-slash' className='' onClick={() => {dt.current?.reset()}}></Button>
    <Button icon='pi pi-download' className='' onClick={() => {dt.current?.exportCSV()}}></Button>
    <Button icon='pi pi-plus' className='' onClick={() => {setDisplayDialog(true)}}></Button>
    <Dialog header="Добавить запись" dismissableMask={true} visible={displayDialog} style={{ width: "50vw" }} footer={footer} onHide={() => setDisplayDialog(false)}>
      <span className="p-float-label m-3">
        <InputText id="inputTitle" value={unitToAdd.title} onChange={(e) => setUnitToAdd({...unitToAdd, title:e.target.value})} />
        <label htmlFor="inputTitle">Название</label>
      </span>
      <span className="p-float-label m-3">
        <InputText id="inputDescription" value={unitToAdd.description} onChange={(e) => setUnitToAdd({...unitToAdd, description:e.target.value})} />
        <label htmlFor="inputDescription">Описание</label>
      </span>
      <Dropdown value={unitToAdd.type} className="m-3" options={["company", "blogger"]} onChange={(e) => setUnitToAdd({...unitToAdd, type: e.value})} placeholder="Тип записи"/>
      {(captchaVisible)?<Captcha siteKey="6LeiVSIhAAAAAPKHbrwMb0eLwPJ_yal_vSJq8QV-" onResponse={() => {setCaptchaConfirmed(true)}}></Captcha>:null}

    </Dialog>
  </div>
  return (
    <div>
      <DataTable className='m-2' editMode="row" dataKey="id" header={header} responsiveLayout="stack" ref={dt} value={units} showGridlines stripedRows reorderableColumns removableSort resizableColumns size="small" stateKey='UnitsTable' paginator rows={10} rowsPerPageOptions={[10,25,50]} sortMode="multiple" filterDisplay="menu" onRowDoubleClick={(e)=>{goto(e.data.id)}}>
        {
          editable?<Column style={{width:"5px"}} resizeable={false} rowEditor headerStyle={{ width: "10%", minWidth: "8rem" }} bodyStyle={{ textAlign: "center" }}></Column>:null
        }
        <Column field="title" sortable filter editor={(options) => textEditor(options)} header="Название"></Column>
        <Column field="description" sortable editor={(options) => textEditor(options)} filter header="Описание"></Column>
        <Column field="url" sortable editor={(options) => textEditor(options)} filter header="Сайт"></Column>
        <Column field="type" sortable filter editor={(options) => textEditor(options)} header="Тип"></Column>
        <Column field="tags" filter header="Тэги"></Column>
        <Column field="country" filter header="Страна"></Column>
      </DataTable>
    </div>
  );
};

export default UnitsTablePage;