import React, {useMemo} from 'react';
import UnitsService from "../services/UnitsService";
import {useParams} from "react-router-dom";

const UnitPage = () => {
    let params = useParams();
    let id:number = parseInt(params.id!);

    let unit = useMemo(()=>{
        let unitsService = new UnitsService();
        return unitsService.getUnit((id));
    }, [id])
    return (
        <div>
            {unit.title}
        </div>
    );
};

export default UnitPage;