import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { CountryStatsContext } from "context/CountryStats";
import { SelectedCountryContext } from "context/SelectedCountry";
import { WorldStatsContext } from "context/WorldStats";
import { CountryData, WorldData } from "types";

const theme = {
    recoveredColor: "#8ACA2B",
    deathsColor: "#696969",
    casesColor: "#AAA",
    secondaryColor: "lightgrey",
};

const stubWorldData: WorldData = {
    cases: 100,
    casesPerOneMillion: 100,
    deaths: 66,
    recovered: 44,
    todayCases: 5,
    todayDeaths: 3,
    todayRecovered: 4,
    updated: "2020-12-12",
};

const stubRusData: CountryData = {
    cases: 100,
    deaths: 66,
    recovered: 44,
    todayCases: 5,
    todayDeaths: 3,
    todayRecovered: 4,
    country: "Russia",
    countryInfo: {
        iso3: "RUS",
    },
    oneCasePerPeople: 30,
};

const stubUsaData: CountryData = {
    cases: 101,
    deaths: 56,
    recovered: 45,
    todayCases: 3,
    todayDeaths: 2,
    todayRecovered: 3,
    country: "United States of America",
    countryInfo: {
        iso3: "USA",
    },
    oneCasePerPeople: 32,
};

const stubTheme = {
    recoveredColor: "#8ACA2B",
    deathsColor: "#696969",
    casesColor: "#AAA",
    secondaryColor: "lightgrey",
};

interface ProviderOptions {
    theme?: typeof stubTheme;
    selectedCountry?: CountryData;
    setSelectedCountry?: (data: CountryData) => void;
    countryData?: CountryData[];
    worldData?: WorldData;
}

const AllTheProviders: React.FC<ProviderOptions> = ({
    children,
    countryData = [stubRusData, stubUsaData],
    worldData = stubWorldData,
    selectedCountry = stubRusData,
    setSelectedCountry = jest.fn(),
}) => {
    return (
        <ThemeProvider theme={theme}>
            <CountryStatsContext.Provider value={countryData}>
                <WorldStatsContext.Provider value={worldData}>
                    <SelectedCountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
                        {children}
                    </SelectedCountryContext.Provider>
                </WorldStatsContext.Provider>
            </CountryStatsContext.Provider>
        </ThemeProvider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
