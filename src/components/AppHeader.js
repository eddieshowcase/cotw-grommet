import React from "react";
import { Anchor, Box, Button, Heading } from "grommet";
import { Close, FormClose, Menu, Moon, Notification, Sun } from "grommet-icons";

export const AppHeader = (props) => {
    const { isDarkMode, toggleThemeMode } = props;

    return (
        <Box direction="row" tag="header" pad="medium" justify="between">
            <a href="/about">
                <Button label="About" />
            </a>

            <Anchor href="/" style={{ textDecoration: "none" }}>
                <Heading level="3" margin="none">
                    Creature of the Wheel
                </Heading>
            </Anchor>

            <Button icon={isDarkMode ? <Sun /> : <Moon />} onClick={() => toggleThemeMode()} />
        </Box>
    );
};
