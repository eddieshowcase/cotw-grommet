import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Close,
    Heading,
    Image,
    Text,
} from "grommet";

export const ActivityCard = (props) => {
    const { activity } = props;
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [activityData, setActivityData] = useState({});
    const [activityImageUrl, setActivityImageUrl] = useState(
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80"
    );

    // Strava Credentials
    const clientID = "58740";
    const clientSecret = "cee0e9f1d0acbcef1cc4741b2dc2d0860bcbbc3c";

    // refresh token and call address
    const refreshToken = "6fb398d854d7db57e77fb116340e05189eb4bb3f";
    // access token: 7241bc4c5b7385abcfc737950622b3d4ceae4eb9
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

    // endpoint for read-all activities. temporary token is added in getActivities()
    const callActivityData = `https://www.strava.com/api/v3/activities/${activity.id}?access_token=`;

    // Use refresh token to get current access token
    useEffect(() => {
        fetch(callRefresh, {
            method: "POST",
        })
            .then((result) => result.json())
            .then((result) => getActivityData(result.access_token));
    }, [callRefresh]);

    // use current access token to call all activities
    function getActivityData(access) {
        console.log(callActivityData + access);
        fetch(callActivityData + access)
            .then((result) => result.json())
            .then((data) => {
                setActivityData(data);
                if (data.photos.primary.urls[600]) {
                    setActivityImageUrl(data.photos.primary.urls[600]);
                }
                setIsLoading((previous) => !previous);
            })
            .catch((error) => console.log(error));
    }

    function showImage() {
        let cmp = <>LOADING...</>;
        if (!isLoading) {
            // console.log(activities);
            // cmp = activities.length;
            cmp = <>FETCHED!</>;

            // if (activities.length) {
            //     cmp = activities.map((activity) => (
            //         <ActivityCard key={activity.id} activity={activity} />
            //     ));
            // }
        }
        return cmp;
    }

    return (
        <Anchor
            key={activity.id}
            href={`https://www.strava.com/activities/${activity.id}`}
            target="_blank"
            style={{
                textDecoration: "none",
                borderRadius: "12px",
            }}
        >
            {/* <Button
                href={`https://www.strava.com/activities/${activity.id}`}
                target="_blank"
                hoverIndicator={{
                    background: {
                        color: "background-contrast",
                    },
                    elevation: "medium",
                }}
            > */}
            <Card height="medium">
                <CardBody pad="none">
                    <Image src={activityImageUrl} fit="cover" />
                </CardBody>
                <CardFooter height="xsmall">
                    <Text color="text-strong" size="large" weight="bold">
                        {activity.name}
                    </Text>
                    {showImage()}
                    <Text color="text-strong">{activity.type}</Text>
                </CardFooter>
            </Card>
            {/* </Button> */}
        </Anchor>

        // <Box height="medium" round="small" overflow="hidden" border={{ color: "white" }}>
        //     <Button
        //         href={`https://www.strava.com/activities/${activity.id}`}
        //         target="_blank"
        //         hoverIndicator={{
        //             background: {
        //                 color: "background-contrast",
        //             },
        //             elevation: "medium",
        //         }}
        //     >
        //         <Box pad="none" border={{ color: "white" }}>
        //             <Image
        //                 src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80"
        //                 fit="cover"
        //             />
        //         </Box>
        //         <Box height="xsmall" pad="small" border={{ color: "white" }}>
        //             <Text color="text-strong" size="large" weight="bold">
        //                 {activity.name}
        //             </Text>
        //             <Text color="text-strong">{activity.type}</Text>
        //         </Box>
        //     </Button>
        // </Box>
    );
};
