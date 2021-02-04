import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Card, Icon } from "semantic-ui-react";
import { casesBounds, getColor } from "./CovidMap";

export const CasesInfo: React.FC = () => {
    const map = useMap();
    useEffect(() => {
        const legend = new L.Control({ position: "bottomright" });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create("div", "");
            const jsx = (
                <Card fluid>
                    <Card.Content textAlign="left">
                        <Card.Description>
                            {casesBounds &&
                                casesBounds.map((bound) => (
                                    <div key={bound}>
                                        <Icon
                                            name="circle"
                                            style={{ color: getColor(bound) }}
                                        />
                                        {">"}
                                        {bound}
                                    </div>
                                ))}
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
            ReactDOM.render(jsx, div);
            return div;
        };
        map.addControl(legend);
        return () => map.removeControl(legend);
    }, [map]);

    return null;
};
