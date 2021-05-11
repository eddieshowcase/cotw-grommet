import React from "react";
import { Box, Heading, Paragraph, Text } from "grommet";

export const Home = () => {
  return (
    <Box flex align="center" justify="center">
      <Heading level={4}>Is this thing on?</Heading>
      <Text>some text</Text>
      <Paragraph>Lorem ipsum paragraph...</Paragraph>
    </Box>
  );
};
