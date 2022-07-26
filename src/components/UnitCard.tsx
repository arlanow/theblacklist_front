import React from 'react';
import {Card} from "primereact/card";

const UnitCard = ({unit, onDoubleClick}:any) => {
    return (
        <Card title={unit.title} className='m-2 w-auto h-9rem' subTitle={unit.subtitle} onDoubleClick={() => {onDoubleClick(unit.id)}}>
            <p className="m-0">{unit.description}</p>
        </Card>
    );
};

export default UnitCard;