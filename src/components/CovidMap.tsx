import axios from "axios";
import { LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Loader } from "semantic-ui-react";
import { StatsContext } from "../context/StatsContext";
import { CasesInfo } from "./CasesInfo";
import { CountryInfo } from "./CountryInfo";

const getJsonUrl =
    "https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson";

const colors = [
    "#FFEDA0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026",
];

export const casesBounds = [
    0,
    5000,
    10000,
    20000,
    40000,
    80000,
    300000,
    1000000,
];

export function getColor(cases: number) {
    const index = casesBounds.findIndex((_, index, array) => {
        return index < array.length - 1 ? cases < array[index + 1] : true;
    });
    return colors[index];
}

export const CovidMap: React.FC<{
    onSelectCountry: CallableFunction;
    selectedCountry?: string;
}> = ({ onSelectCountry, selectedCountry }) => {
    const stats = useContext(StatsContext);

    const geoJSONRef = useRef(null);
    const [
        countriesData,
        setCountriesData,
    ] = useState<GeoJSON.FeatureCollection>(null);
    useEffect(() => {
        let didCancel = false;
        axios
            .get(getJsonUrl)
            .then(({ data }) => !didCancel && setCountriesData(data));
        return () => (didCancel = false);
    }, []);

    const [hoveredCountry, setHoveredCountry] = useState(null);
    useEffect(() => {
        geoJSONRef.current && geoJSONRef.current.setStyle(style);
    }, [hoveredCountry, selectedCountry]);

    if (!countriesData) {
        return (
            <Loader size="massive" active>
                Loading map
            </Loader>
        );
    }

    function style(feature: any) {
        const data = stats.find((data) => data.countryInfo.iso3 === feature.id);
        const cases = data ? data.cases : 0;
        if (feature.id === selectedCountry) {
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
                fillColor: getColor(cases),
                fillOpacity: 0.4,
            };
        }
    }

    const geoJsonEventHandlers = {
        click: (e: LeafletMouseEvent) => {
            onSelectCountry(e.sourceTarget.feature);
            e.sourceTarget.bringToFront();
        },
        mouseover: (e: LeafletMouseEvent) => {
            setHoveredCountry(e.sourceTarget.feature.id);
            e.sourceTarget.bringToFront();
        },
        mouseout: (e: LeafletMouseEvent) => {
            setHoveredCountry(null);
            e.sourceTarget.feature.id !== selectedCountry &&
                e.sourceTarget.bringToBack();
        },
    };

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            scrollWheelZoom={true}
            maxZoom={5}
            style={{ height: 500, width: "100%" }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
                noWrap
            />
            <GeoJSON
                data={countriesData}
                style={style}
                ref={geoJSONRef}
                eventHandlers={geoJsonEventHandlers}
            />
            <CountryInfo hoveredCountry={hoveredCountry} />
            <CasesInfo />
        </MapContainer>
    );
};
