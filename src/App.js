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

import { AppHeader } from "./components/AppHeader";
import { SidebarNav } from "./components/SidebarNav";
import { useLocalStorageState } from "./hooks/appHooks.ts";
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

export const App = () => {
    const [darkMode, setDarkMode] = useLocalStorageState(false);

    return (
        <Grommet theme={customTheme} themeMode={darkMode ? "dark" : "light"} full>
            <Box align="center" fill>
                <Box direction="column" width="xlarge">
                    <AppHeader
                        isDarkMode={darkMode}
                        toggleThemeMode={() => setDarkMode(!darkMode)}
                    />
                    <Router>
                        <Box direction="row" flex>
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
            </Box>
        </Grommet>
    );
};
