import React, { useContext, useEffect, useState } from "react";

import "semantic-ui-css/semantic.min.css";
import { Button, Card, Container, Grid, Header, Icon, Label } from "semantic-ui-react";
import { CovidMap } from "./components/CovidMap";
import styled, { ThemeContext } from "styled-components";
import moment from "moment";
import { CountryCharts } from "./components/CountryCharts";
import { useMediaQuery } from "react-responsive";
import { SelectedCountryContext } from "./context/SelectedCountry";
import { WorldStatsContext } from "./context/WorldStats";

const Stat = styled.p`
    font-size: 2rem;
    font-weight: bold;
    line-height: 0.5;
    margin: 30px 0 !important;

    sub::before {
        content: " +";
    }

    sub {
        color: grey;
        font-weight: normal;
    }
`;

export const App = () => {
    const theme = useContext(ThemeContext);
    const worldStats = useContext(WorldStatsContext);
    const { selectedCountry, setSelectedCountry } = useContext(SelectedCountryContext);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [isWorldTotal, setIsWorldTotal] = useState(true);
    useEffect(() => {
        selectedCountry && setIsWorldTotal(false);
    }, [selectedCountry]);

    const dataSourse = isWorldTotal ? worldStats : selectedCountry;

    function handleWorldTotalClick() {
        setIsWorldTotal(true);
        setSelectedCountry(null);
    }

    return (
        <Container>
            <Grid>
                <Grid.Row columns={2} verticalAlign="middle">
                    <Grid.Column>
                        <Header as="h1" style={{ margin: 30 }}>
                            COVID{"\u2011"}19{"\u00A0"}Map{" "}
                            <span
                                style={{
                                    color: theme.secondaryColor,
                                    fontSize: "small",
                                    fontWeight: "normal",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Last updated: {worldStats && moment(worldStats.updated).format("MMMM Do YYYY, h:mm a")}
                            </span>
                        </Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {isWorldTotal || (
                            <Button size="large" onClick={handleWorldTotalClick}>
                                World total
                            </Button>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ minHeight: 500 }}>
                    <CovidMap />
                </Grid.Row>
                {!dataSourse ? (
                    <Grid.Row centered>
                        <Header>Select any country</Header>
                    </Grid.Row>
                ) : (
                    <>
                        <Grid.Row centered>
                            <Header>{isWorldTotal ? "World total" : selectedCountry.country}</Header>
                        </Grid.Row>
                        <Grid.Row columns={isMobile ? 1 : 3} textAlign="center">
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Content>
                                        <Stat style={{ color: theme.casesColor }}>
                                            {dataSourse.cases}
                                            <sub>{dataSourse.todayCases || 0}</sub>
                                        </Stat>
                                        <Header size="large" color="grey">
                                            Cases
                                        </Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Content>
                                        <Stat style={{ color: theme.recoveredColor }}>
                                            {dataSourse.recovered}
                                            <sub>{dataSourse.todayRecovered || 0}</sub>
                                        </Stat>
                                        <Header size="large" color="grey">
                                            Recovered
                                        </Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card fluid>
                                    <Card.Content>
                                        <Stat style={{ color: theme.deathsColor }}>
                                            {dataSourse.deaths}
                                            <sub>{dataSourse.todayDeaths || 0}</sub>
                                        </Stat>
                                        <Header size="large" color="grey">
                                            Deaths
                                        </Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered style={{ marginTop: "40px" }}>
                            <Header textAlign="center">Daily increase charts</Header>
                        </Grid.Row>
                        <CountryCharts />
                    </>
                )}
            </Grid>
            <div className="ui vertical footer segment" style={{ marginTop: 100 }}>
                <Button as="a" labelPosition="left" href="https://github.com/asdasd-dev/covid-app">
                    <Label as="a" basic pointing="right">
                        <Icon size="big" name="github" style={{ margin: 0 }} />
                    </Label>
                    <Button icon color={theme.secondaryColor}>
                        asdasd-dev
                    </Button>
                </Button>
            </div>
        </Container>
    );
};
