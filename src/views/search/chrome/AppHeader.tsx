import ReactGA from "react-ga4";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";
import { useConfigContext } from "../../../contexts/ConfigurationContext";
import { VuiFlexContainer, VuiFlexItem, VuiTitle, VuiTextColor, VuiButtonEmpty, VuiButton, VuiText } from "../../../ui";
import "./appHeader.scss";

export const AppHeader = () => {
  const { appHeader } = useConfigContext();

  const { isAuthEnabled, logOut, user } = useAuthenticationContext();

  return (
    <div className="appHeader">
      <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
        <VuiFlexItem grow={1}>
          <VuiFlexContainer alignItems="center" wrap={true} spacing="xxs">
            <VuiFlexItem>
              <a href={appHeader.logo.link ?? "https://vectara.com/"} target="_blank" className="appHeaderLogo">
                <img
                  src={appHeader.logo.src ?? "images/vectara_logo.png"}
                  alt={appHeader.logo.alt ?? "Vectara logo"}
                  height={appHeader.logo.height ?? "20"}
                  style={{ marginTop: "1px" }}
                />
              </a>
            </VuiFlexItem>

            <VuiFlexItem grow={1}>
              <VuiTitle size="xs" align="left">
                <VuiTextColor color="subdued">
                  <h1>Conversational search demo</h1>
                </VuiTextColor>
              </VuiTitle>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
            {isAuthEnabled && (
              <>
                <VuiFlexItem grow={false}>
                  <VuiText size="s">
                    <p>Logged in as {user?.email}</p>
                  </VuiText>
                </VuiFlexItem>
                <VuiFlexItem>
                  <VuiButtonEmpty color="normal" size="m" onClick={logOut}>
                    Log out
                  </VuiButtonEmpty>
                </VuiFlexItem>
              </>
            )}

            <VuiFlexItem>
              <VuiButton
                color="accent"
                size="m"
                href="https://console.vectara.com/"
                target="_blank"
                onClick={() => {
                  ReactGA.event({
                    category: "Outbound link",
                    action: "click",
                    label: "Try Vectara"
                  });
                }}
              >
                Try Vectara now
              </VuiButton>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>
      </VuiFlexContainer>
    </div>
  );
};
