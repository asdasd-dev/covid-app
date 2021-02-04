import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Card } from "semantic-ui-react";

export const CountryInfo: React.FC<{ hoveredCountry: string }> = ({
    hoveredCountry,
}) => {
    const map = useMap();
    useEffect(() => {
        const legend = new L.Control({ position: "topright" });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create("div", "");
            const jsx = (
                <Card style={{ backgroundOpacity: 0.5 }}>
                    <Card.Content textAlign="left">
                        <Card.Header>COVID-19 Cases in</Card.Header>
                        <Card.Meta>{hoveredCountry}</Card.Meta>
                        <Card.Description>Some stats</Card.Description>
                    </Card.Content>
                </Card>
            );
            ReactDOM.render(jsx, div);
            return div;
        };
        map.addControl(legend);
        return () => map.removeControl(legend);
    }, [map, hoveredCountry]);

    return null;
};
