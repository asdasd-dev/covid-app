import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Card } from "semantic-ui-react";
import { CountryData } from "../types";

export const CountryInfo: React.FC<{ country: CountryData }> = ({ country }) => {
    const map = useMap();
    useEffect(() => {
        if (country) {
            const legend = new L.Control({ position: "topright" });
            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "");
                const jsx = (
                    <Card style={{ backgroundOpacity: 0.5 }}>
                        <Card.Content textAlign="left">
                            <Card.Header>COVID-19 Cases in</Card.Header>
                            <Card.Meta>{country.country}</Card.Meta>
                            <Card.Description>
                                Cases: {country.cases}
                                <br />
                                Recovered: {country.recovered}
                                <br />
                                Deaths: {country.deaths}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                );
                ReactDOM.render(jsx, div);
                return div;
            };
            map.addControl(legend);
            return () => map.removeControl(legend);
        }
    }, [map, country]);

    return null;
};
