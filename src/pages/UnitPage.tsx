import React, {useMemo} from 'react';
import UnitsService from "../services/UnitsService";
import {useParams} from "react-router-dom";

const UnitPage = () => {
    let params = useParams();
    let id:number = parseInt(params.id!);
    let unitsService = new UnitsService();
    let unit = useMemo(()=>{
        return unitsService.getUnit((id));
    }, [id, unitsService])
    return (
        <div>
            {unit.title}
        </div>
    );
};

export default UnitPage;