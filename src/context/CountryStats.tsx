import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export interface CountryData extends Record<string, number | string> {
    cases: number;
    recovered: number;
    deaths: number;
    countryIso3: string;
    oneCasePerPeople: number;
    country: string;
    todayCases: number;
    todayRecovered: number;
    todayDeaths: number;
}

export const CountryStatsContext = createContext<CountryData[]>(null);

export const CountryStatsProvider: React.FC = (props) => {
    const [countryStats, setCountryStats] = useState<CountryData[]>(null);
    useEffect(() => {
        let didCancel = false;
        axios
            .get("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true")
            .then((result) => {
                result.data = result.data.map((item: any) => {
                    item.countryIso3 = item.countryInfo.iso3;
                    return item;
                });
                !didCancel && setCountryStats(result.data);
            });
        return () => (didCancel = true);
    }, []);

    return <CountryStatsContext.Provider value={countryStats} {...props} />;
};
