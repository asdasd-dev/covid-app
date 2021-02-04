import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StatsContext = createContext([]);

export const StatsProvider: React.FC = (props) => {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        let didCancel = false;
        console.log('useEffect');
        axios
            .get(
                "https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true"
            )
            .then((result) => !didCancel && setStats(result.data));
        return () => (didCancel = true);
    }, []);

    return <StatsContext.Provider value={stats} {...props} />;
};