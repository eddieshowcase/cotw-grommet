import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
    Box,
    Button,
    Collapsible,
    Grommet,
    grommet, // grommet theme
    Heading,
    Layer,
    Paragraph,
    ResponsiveContext,
    Text,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { Close, FormClose, Menu, Moon, Notification, Sun } from "grommet-icons";
import { hpe } from "grommet-theme-hpe";

import { SidebarNav } from "./components/SidebarNav";
import { About } from "./pages/About";
import { Home } from "./pages/Home";

const customTheme = deepMerge(hpe, {
    // all items here that can be customized are in ~/base.js of the grommet theme
    global: {
        // global overrides here
        // colors: {
        //   brand: { dark: "#0E5265", light: "#00C8FF" },
        // },
        // font: {
        //   family: "Roboto",
        //   size: "18px",
        //   height: "20px",
        // },
    },
    // specific (non-global) theme overrides here
});

const AppBar = (props) => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    />
);

export const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <Grommet theme={customTheme} themeMode={darkMode ? "dark" : "light"} full>
            <ResponsiveContext.Consumer>
                {(size) => (
                    <Box fill>
                        <AppBar>
                            <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
                            <Button label="About" onClick={() => {}} />
                            <Heading level="3" margin="none">
                                Creature of the Wheel
                            </Heading>
                            <Button
                                icon={darkMode ? <Sun /> : <Moon />}
                                onClick={() => setDarkMode(!darkMode)}
                            />
                        </AppBar>
                        <Router>
                            <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                                {!showSidebar || size !== "small" ? (
                                    <Collapsible direction="horizontal" open={showSidebar}>
                                        <Box
                                            flex
                                            width="medium"
                                            background={{ dark: "light-2", light: "dark-2" }}
                                            elevation="small"
                                            align="center"
                                            // justify="center"
                                        >
                                            <SidebarNav />
                                        </Box>
                                    </Collapsible>
                                ) : (
                                    <Layer>
                                        <Box
                                            background="light-2"
                                            tag="header"
                                            align="center"
                                            direction="row"
                                        >
                                            <Button
                                                icon={<Close />}
                                                onClick={() => setShowSidebar(false)}
                                            />
                                        </Box>
                                        <Box
                                            fill
                                            background="light-2"
                                            align="center"
                                            justify="center"
                                        >
                                            <SidebarNav />
                                            (mobile)
                                        </Box>
                                    </Layer>
                                )}

                                <Switch>
                                    <Route path="/about">
                                        <About />
                                    </Route>
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </Box>
                        </Router>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
};
