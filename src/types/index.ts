export interface WorldData extends CommonStats {
    casesPerOneMillion: number;
    updated: string;
}

export interface CountryData extends CommonStats {
    oneCasePerPeople: number;
    country: string;
    countryInfo: {
        iso3: string;
    };
}

export interface CommonStats {
    cases: number;
    recovered: number;
    deaths: number;
    todayCases: number;
    todayRecovered: number;
    todayDeaths: number;
}
