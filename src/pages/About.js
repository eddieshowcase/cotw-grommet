import React from "react";
import { Box, Heading, Image, Paragraph, Text } from "grommet";

export const About = () => (
    <Box
        flex
        align="center"
        margin={{
            horizontal: "none",
            top: "xlarge",
            bottom: "medium",
        }}
    >
        <Box height="medium" width="medium">
            <Image src="/cotw_logoWText_blackTrans.png" />
        </Box>
        <Heading level={4}>Front range MTB dad with a single speed addiction.</Heading>
    </Box>
);
