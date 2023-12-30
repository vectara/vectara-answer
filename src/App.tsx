import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga4";
import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";
import { SearchView } from "./views/search/SearchView";
import { LoggedOutView } from "./views/loggedOut/LoggedOutView";
import { useConfigContext } from "./contexts/ConfigurationContext";
import { SearchContextProvider } from "./contexts/SearchContext";
import {
  AuthenticationContextProvider,
  useAuthenticationContext,
} from "./contexts/AuthenticationContext";
import { ConfigContextProvider } from "./contexts/ConfigurationContext";
import * as FullStory from "@fullstory/browser";
import "./App.scss";

const AppRoutes = () => {
  const { isConfigLoaded, missingConfigProps, app, analytics } =
    useConfigContext();

  const { isAuthEnabled, isAuthenticated, logIn } = useAuthenticationContext();

  useEffect(() => {
    if (isAuthEnabled) {
      const authToken = localStorage.getItem("AuthToken");
      logIn(authToken);
    }

    if (analytics.googleAnalyticsTrackingCode) {
      ReactGA.initialize(analytics.googleAnalyticsTrackingCode);
    }

    if (analytics.gtmContainerId) {
      Analytics({
        plugins: [
          googleTagManager({
            containerId: analytics.gtmContainerId,
          }),
        ],
      });
    }

    if (analytics.fullStoryOrgId) {
      FullStory.init({
        orgId: analytics.fullStoryOrgId,
        devMode: process.env.NODE_ENV !== "production",
      });
    }

    if (app.title) document.title = app.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigLoaded]);

  if (missingConfigProps.length) {
    return (
      <div>
        These environment variables are missing: {missingConfigProps.join(", ")}
        . They need to be defined for the app to function.
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoggedOutView />;
  }

  return (
    <Router>
      <SearchContextProvider>
        <SearchView />
      </SearchContextProvider>
    </Router>
  );
};

export const App = () => (
  <ConfigContextProvider>
    <AuthenticationContextProvider>
      <AppRoutes />
    </AuthenticationContextProvider>
  </ConfigContextProvider>
);
