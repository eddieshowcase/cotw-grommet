import React, { useContext, useEffect, useState } from "react";
import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Grid,
    Heading,
    Image,
    Paragraph,
    ResponsiveContext,
    Text,
    TextInput,
} from "grommet";

import { ActivityCard } from "../components/ActivityCard";

export const Home = () => {
    const size = useContext(ResponsiveContext);

    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState({});

    // Strava Credentials
    const clientID = "58740";
    const clientSecret = "cee0e9f1d0acbcef1cc4741b2dc2d0860bcbbc3c";

    // refresh token and call address
    const refreshToken = "6fb398d854d7db57e77fb116340e05189eb4bb3f";
    // access token: 7241bc4c5b7385abcfc737950622b3d4ceae4eb9
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

    // endpoint for read-all activities. temporary token is added in getActivities()
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

    // Use refresh token to get current access token
    useEffect(() => {
        fetch(callRefresh, {
            method: "POST",
        })
            .then((result) => result.json())
            .then((result) => getActivities(result.access_token));
    }, [callRefresh]);

    // use current access token to call all activities
    function getActivities(access) {
        // console.log(callActivities + access)
        fetch(callActivities + access)
            .then((result) => result.json())
            .then(
                (data) => setActivities(data),
                setIsLoading((previous) => !previous)
            )
            .catch((error) => console.log(error));
    }

    function showActivities() {
        let cmp = <>LOADING...</>;
        if (!isLoading) {
            // console.log(activities);
            cmp = activities.length;

            if (activities.length) {
                cmp = activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ));
            }
        }
        return cmp;
    }

    return (
        <Box direction="column" gap="small" align="center" justify="center" fill>
            {/* <Heading level={4}>Is this thing on?</Heading>

            <Text>some text</Text>
            <Paragraph>Lorem ipsum paragraph...</Paragraph>

            <Heading level={4}>Activites</Heading> */}
            <Box pad="medium" heigh="100%">
                <Grid gap="medium" columns={{ count: "fit", size: "medium" }}>
                    {showActivities()}
                </Grid>
            </Box>
        </Box>
    );
};
