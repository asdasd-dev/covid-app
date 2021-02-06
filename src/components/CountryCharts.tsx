import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";
import { Grid, Loader } from "semantic-ui-react";
import { ThemeContext } from "styled-components";

export const CountryCharts: React.FC<{ country: string }> = ({ country }) => {
    const theme = useContext(ThemeContext);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    const [data, setData] = useState(null);
    useEffect(() => {
        let didCancel = false;
        axios
            .get(`https://disease.sh/v3/covid-19/historical/${country || "all"}?lastdays=all`)
            .then((result) => !didCancel && setData(country ? result.data.timeline : result.data));
        return () => {
            didCancel = true;
            setData(null);
        };
    }, [country]);

    if (!data) {
        return (
            <Grid.Row textAlign="center" style={{ height: "300px" }}>
                <Loader active size="large">
                    Loading charts..
                </Loader>
            </Grid.Row>
        );
    }

    const casesData = {
        labels: Object.keys(data.cases),
        datasets: [
            {
                label: "Daily cases",
                data: Object.values(data.cases).map((count: number, index, array: number[]) => {
                    if (index === 0) {
                        return count;
                    }
                    if (count < array[index - 1]) {
                        return 0;
                    }
                    return count - array[index - 1];
                }),
                backgroundColor: theme.casesColor,
            },
        ],
    };

    const recoversData = {
        labels: Object.keys(data.recovered),
        datasets: [
            {
                label: "Daily recovers",
                data: Object.values(data.recovered).map((count: number, index, array: number[]) => {
                    if (index === 0) {
                        return count;
                    }
                    if (count < array[index - 1]) {
                        return 0;
                    }
                    return count - array[index - 1];
                }),
                backgroundColor: theme.recoveredColor,
            },
        ],
    };

    const deathsData = {
        labels: Object.keys(data.deaths),
        datasets: [
            {
                label: "Daily deaths",
                data: Object.values(data.deaths).map((count: number, index, array: number[]) => {
                    if (index === 0) {
                        return count;
                    }
                    if (count < array[index - 1]) {
                        return 0;
                    }
                    return count - array[index - 1];
                }),
                backgroundColor: theme.deathsColor,
            },
        ],
    };

    return (
        <Grid.Row columns={isMobile ? 1 : isTablet ? 2 : 3}>
            <Grid.Column>
                <Bar data={casesData} height={300} />
            </Grid.Column>
            <Grid.Column>
                <Bar data={recoversData} height={300} />
            </Grid.Column>
            <Grid.Column>
                <Bar data={deathsData} height={300} />
            </Grid.Column>
        </Grid.Row>
    );
};
