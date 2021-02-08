import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { WorldData } from "../types";

export const WorldStatsContext = createContext<WorldData>(null);

export const WorldStatsProvider: React.FC = (props) => {
    const [worldStats, setWorldStats] = useState<WorldData>(null);
    useEffect(() => {
        let didCancel = false;
        axios.get<WorldData>("https://disease.sh/v3/covid-19/all").then((result) => {
            !didCancel && setWorldStats(result.data);
        });
        return () => (didCancel = true);
    }, []);

    return <WorldStatsContext.Provider value={worldStats} {...props} />;
};
