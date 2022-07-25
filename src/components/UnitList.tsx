import React from 'react';
import UnitCard from "./UnitCard";
import {useNavigate} from "react-router-dom";

const UnitList = ({units}:any) => {
    const navigate = useNavigate();
    const click = (id: number) => {
        navigate('/unit/'+id)
    }
    return (
        <div>
            <div className="flex flex-column w-full">
                {units.map((unit:any) => {
                    return (<UnitCard unit={unit} key={unit.id} onClick={click}></UnitCard>)
                })}
            </div>
        </div>
    );
};

export default UnitList;