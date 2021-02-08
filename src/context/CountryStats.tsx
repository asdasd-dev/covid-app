import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { CountryData } from "../types";

export const CountryStatsContext = createContext<CountryData[]>(null);

export const CountryStatsProvider: React.FC = (props) => {
    const [countryStats, setCountryStats] = useState<CountryData[]>(null);
    useEffect(() => {
        let didCancel = false;
        axios
            .get<CountryData[]>("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true")
            .then((result) => {
                !didCancel && setCountryStats(result.data);
            });
        return () => (didCancel = true);
    }, []);

    return <CountryStatsContext.Provider value={countryStats} {...props} />;
};
