import React, {useMemo, useState} from 'react';
import UnitList from "../components/UnitList";
import UnitsService from "../services/UnitsService";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import Unit from "../models/UnitModel";
import {Dropdown} from "primereact/dropdown";
import {Captcha} from "primereact/captcha";

const UnitsPage = ({filter}:any) => {
    let filteredPosts = useMemo(() => {
        let unitsService = new UnitsService();
        return unitsService.getFiltered(filter);
    }, [filter])
    const [captchaConfirmed, setCaptchaConfirmed] = useState(false)
    const [captchaVisible, setCaptchaVisible] = useState(true)
    const [displayDialog, setDisplayDialog] = useState(false)
    const [unitToAdd, setUnitToAdd] = useState({title: ''} as Unit)
    let addUnit = () => {
        setCaptchaVisible(false)
        let unitsService = new UnitsService();
        unitsService.addUnit({...unitToAdd, id: 100})
        setDisplayDialog(false)
        filteredPosts.push(unitToAdd)
    }
    const footer = <div>
                       <Button label="Добавить" disabled={!captchaConfirmed} onClick={addUnit} icon="pi pi-check" />
                   </div>
    return (
        <div>
            <div className='flex justify-content-end m-2 mr-4'>
                <Button icon='pi pi-plus' onClick={() => {setDisplayDialog(true)}}></Button>
            </div>
            <Dialog header="Добавить запись" dismissableMask={true} visible={displayDialog} style={{ width: '50vw' }} footer={footer} onHide={() => setDisplayDialog(false)}>
                <span className="p-float-label m-3">
                            <InputText id="inputTitle" value={unitToAdd.title} autoFocus={true} onChange={(e) => setUnitToAdd({...unitToAdd, title:e.target.value})} />
                            <label htmlFor="inputTitle">Название</label>
                        </span>
                <span className="p-float-label m-3">
                            <InputText id="inputSubtitle" value={unitToAdd.subtitle} onChange={(e) => setUnitToAdd({...unitToAdd, subtitle:e.target.value})} />
                            <label htmlFor="inputSubtitle">Название 2</label>
                        </span>
                <span className="p-float-label m-3">
                            <InputText id="inputDescription" value={unitToAdd.description} onChange={(e) => setUnitToAdd({...unitToAdd, description:e.target.value})} />
                            <label htmlFor="inputDescription">Описание</label>
                        </span>
                <Dropdown value={unitToAdd.type} className="m-3" options={['company', 'blogger']} onChange={(e) => setUnitToAdd({...unitToAdd, type:e.value})} placeholder="Тип записи"/>
                {(captchaVisible)?<Captcha siteKey="6LeiVSIhAAAAAPKHbrwMb0eLwPJ_yal_vSJq8QV-" onResponse={() => {setCaptchaConfirmed(true)}}></Captcha>:null}

            </Dialog>
            <UnitList units={filteredPosts} />
        </div>
    );
};

export default UnitsPage;