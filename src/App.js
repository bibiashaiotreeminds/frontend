import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import ProtectedRoute from "./userRoleContext/ProtectedRoutes";  // Ensure the correct import path
import { UserRoleProvider } from "./userRoleContext/userLoginPermission";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <ProtectedRoute
            exact
            path={route.route}
            component={route.component}
            key={route.key}
            roles={route.roles}  // Pass roles to ProtectedRoute
          />
        );
      }

      return null;
    });

  const configsButton = (
    <></>
    // <VuiBox
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   width="3.5rem"
    //   height="3.5rem"
    //   bgColor="info"
    //   shadow="sm"
    //   borderRadius="50%"
    //   position="fixed"
    //   right="2rem"
    //   bottom="2rem"
    //   zIndex={99}
    //   color="white"
    //   sx={{ cursor: "pointer" }}
    //   onClick={handleConfiguratorOpen}
    // >
    //   <Icon fontSize="default" color="inherit">
    //     settings
    //   </Icon>
    // </VuiBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        <UserRoleProvider>  {/* Wrap the app in UserRoleProvider */}
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand=""
                brandName="VISION UI FREE"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </UserRoleProvider>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserRoleProvider>  {/* Wrap the app in UserRoleProvider */}
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand=""
              brandName="VISION UI FREE"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {getRoutes(routes)}
          
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </UserRoleProvider>
    </ThemeProvider>
  );
}
