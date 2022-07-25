import React, {useMemo} from 'react';
import UnitList from "../components/UnitList";
import UnitsService from "../services/UnitsService";

const UnitsPage = ({filter}:any) => {
    let unitsService = new UnitsService();
    let filteredPosts = useMemo(() => {
        return unitsService.getFiltered(filter);
    }, [filter])
    return (
        <div>
            <UnitList units={filteredPosts} />
        </div>
    );
};

export default UnitsPage;