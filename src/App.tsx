import React, { useContext, useState } from "react";

import "semantic-ui-css/semantic.min.css";
import { Card, Container, Grid, Header } from "semantic-ui-react";
import { StatsContext } from "./context/StatsContext";
import { CovidMap } from "./components/CovidMap";

export const App = () => {
    const stats = useContext(StatsContext);

    const [selectedCountry, setSelectedCountry] = useState<GeoJSON.Feature>(
        null
    );

    let countryInfo;

    if (stats && selectedCountry) {
        countryInfo = stats.find(
            (data) => data.countryInfo.iso3 === selectedCountry.id
        );
    }

    return (
        <Container textAlign="center">
            <Grid>
                <Grid.Row>
                    <Header as="h1" style={{ margin: 30 }}>
                        COVID-19 Map
                    </Header>
                </Grid.Row>
                <Grid.Row style={{ minHeight: 500 }}>
                    <CovidMap
                        onSelectCountry={setSelectedCountry}
                        selectedCountry={
                            selectedCountry && selectedCountry.id.toString()
                        }
                    />
                </Grid.Row>
                {!selectedCountry ? (
                    <Grid.Row centered>
                        <Header>Select any country</Header>
                    </Grid.Row>
                ) : (
                    <>
                        <Grid.Row centered>
                            <Header as="h2">
                                {selectedCountry &&
                                    selectedCountry.properties.name}
                            </Header>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header as="h1">Cases</Card.Header>
                                        <Card.Content>
                                            {countryInfo && countryInfo.cases}
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header as="h1">
                                            Recovered
                                        </Card.Header>
                                        <Card.Content>
                                            {countryInfo &&
                                                countryInfo.recovered}
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header as="h1">
                                            Deaths
                                        </Card.Header>
                                        <Card.Content>
                                            {countryInfo && countryInfo.deaths}
                                        </Card.Content>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </>
                )}
            </Grid>
        </Container>
    );
};
