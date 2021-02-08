import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface WorldData extends Record<string, number | string> {
    cases: number;
    recovered: number;
    deaths: number;
    casesPerOneMillion: number;
    todayCases: number;
    todayRecovered: number;
    todayDeaths: number;
}

export const WorldStatsContext = createContext<WorldData>(null);

export const WorldStatsProvider: React.FC = (props) => {
    const [worldStats, setWorldStats] = useState<WorldData>(null);
    useEffect(() => {
        let didCancel = false;
        axios.get("https://disease.sh/v3/covid-19/all").then((result) => {
            !didCancel && setWorldStats(result.data);
        });
        return () => (didCancel = true);
    }, []);

    return <WorldStatsContext.Provider value={worldStats} {...props} />;
};
