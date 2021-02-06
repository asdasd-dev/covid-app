import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";

const initialState: StatsState = {
    stats: null,
    selectedCountry: null,
    worldStats: null,
};

export const StatsContext = createContext<{ state: StatsState; dispatch: (action: StatsAction) => void }>({
    state: initialState,
    dispatch: () => {},
});

interface StatsState {
    stats: CountryData[];
    selectedCountry: CountryData;
    worldStats: WorldData;
}

interface StatsAction {
    type: string;
    payload?: any;
}

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

interface WorldData extends Record<string, number | string> {
    cases: number;
    recovered: number;
    deaths: number;
    casesPerOneMillion: number;
    todayCases: number;
    todayRecovered: number;
    todayDeaths: number;
}

function reducer(state: StatsState, action: StatsAction) {
    switch (action.type) {
        case "SET_STATS":
            return {
                ...state,
                stats: action.payload as CountryData[],
            };
        case "SET_SELECTED_COUNTRY":
            return {
                ...state,
                selectedCountry: action.payload && state.stats.find((country) => country.countryIso3 === action.payload),
            };
        case "SET_WORLD_STATS":
            return {
                ...state,
                worldStats: action.payload,
            };
    }
}

export const StatsProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        let didCancel = false;
        axios
            .get("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true")
            .then((result) => {
                result.data = result.data.map((item: any) => {
                    item.countryIso3 = item.countryInfo.iso3;
                    return item;
                });

                !didCancel &&
                    dispatch({
                        type: "SET_STATS",
                        payload: result.data as CountryData[],
                    });
            });
        axios.get("https://disease.sh/v3/covid-19/all").then((result) => {
            !didCancel &&
                dispatch({
                    type: "SET_WORLD_STATS",
                    payload: result.data as WorldData,
                });
        });
        return () => (didCancel = true);
    }, []);

    return <StatsContext.Provider value={{ state, dispatch }} {...props} />;
};
