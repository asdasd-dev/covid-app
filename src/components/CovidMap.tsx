import axios from "axios";
import { LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Loader } from "semantic-ui-react";
import { CountryStatsContext } from "../context/CountryStats";
import { SelectedCountryContext } from "../context/SelectedCountry";
import { CasesInfo } from "./CasesInfo";
import { CountryInfo } from "./CountryInfo";

const getJsonUrl = "https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson";

const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];
export const oneCasePerPeopleBounds = [3200, 1600, 800, 400, 200, 100, 50, 20];

export function getColor(oneCasePerPeople: number) {
    const index = oneCasePerPeopleBounds.findIndex((_, index, array) => {
        return index < array.length - 1 ? oneCasePerPeople > array[index + 1] : true;
    });
    return colors[index];
}

export const CovidMap: React.FC = () => {
    const countryStats = useContext(CountryStatsContext);
    const { selectedCountry, setSelectedCountry } = useContext(SelectedCountryContext);

    const geoJSONRef = useRef(null);

    const [countriesData, setCountriesData] = useState<GeoJSON.FeatureCollection>(null);
    useEffect(() => {
        let didCancel = false;
        axios.get(getJsonUrl).then(({ data }) => !didCancel && setCountriesData(data));
        return () => (didCancel = false);
    }, []);

    const [hoveredCountry, setHoveredCountry] = useState(null);
    useEffect(() => {
        geoJSONRef.current && geoJSONRef.current.setStyle(style);
    }, [hoveredCountry, selectedCountry, countryStats]);

    if (!countriesData || !countryStats) {
        return (
            <Loader size="massive" active>
                Loading map
            </Loader>
        );
    }

    function style(feature: any) {
        if (!countryStats) {
            return;
        }
        const data = countryStats.find((country) => country.countryIso3 === feature.id);
        if (selectedCountry && feature.id === selectedCountry.countryIso3) {
            return {
                weight: 5,
                color: "#666",
            };
        } else if (feature.id === hoveredCountry) {
            return {
                weight: 2,
                color: "#666",
            };
        } else {
            return {
                weight: 1,
                color: "white",
                fillColor: data ? getColor(data.oneCasePerPeople) : "white",
                fillOpacity: 0.4,
            };
        }
    }

    const geoJsonEventHandlers = {
        click: (e: LeafletMouseEvent) => {
            console.log(e.sourceTarget.feature.id)
            setSelectedCountry(countryStats.find((country) => country.countryIso3 === e.sourceTarget.feature.id));
            e.sourceTarget.bringToFront();
        },
        mouseover: (e: LeafletMouseEvent) => {
            setHoveredCountry(e.sourceTarget.feature.id);
            e.sourceTarget.bringToFront();
        },
        mouseout: (e: LeafletMouseEvent) => {
            setHoveredCountry(null);
            e.sourceTarget.feature.id !== selectedCountry?.countryIso3 && e.sourceTarget.bringToBack();
        },
    };

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            scrollWheelZoom={false}
            maxZoom={5}
            style={{ height: 500, width: "100%" }}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" noWrap />
            <GeoJSON data={countriesData} style={style} ref={geoJSONRef} eventHandlers={geoJsonEventHandlers} />
            <CountryInfo
                country={
                    hoveredCountry
                        ? countryStats.find((country) => country.countryIso3 === hoveredCountry)
                        : selectedCountry || null
                }
            />
            <CasesInfo />
        </MapContainer>
    );
};
