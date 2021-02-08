import React, { createContext, useState } from "react";
import { CountryData } from "../types";

export const SelectedCountryContext = createContext<{
    selectedCountry: CountryData;
    setSelectedCountry(data: CountryData): void;
}>(null);

export const SelectedCountryProvider: React.FC = (props) => {
    const [selectedCountry, setSelectedCountry] = useState<CountryData>(null);

    return <SelectedCountryContext.Provider value={{ selectedCountry, setSelectedCountry }} {...props} />;
};
