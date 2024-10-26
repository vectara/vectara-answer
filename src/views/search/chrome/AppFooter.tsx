import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiTitle,
  VuiText,
  VuiLink,
  VuiSpacer,
  VuiButtonPrimary,
} from "../../../ui";
import "./appFooter.scss";

export const AppFooter = () => {
  return (
    <div className="appFooter">
      <div className="appFooterContent">
        <VuiFlexContainer
          alignItems="start"
          spacing="l"
          className="appFooterContent__layout"
        >
          <VuiFlexItem grow={5}>
            <VuiTitle size="s">
              <h3>Just an example of what's possible</h3>
            </VuiTitle>

            <VuiSpacer size="m" />

            <VuiText>
              <p>
                We made this to show off Vectara's conversational search
                capabilities. But you can use Vectara to ask your own data
                questions, too. Vectara is free to use so it's easy to get
                started.
              </p>
            </VuiText>

            <VuiSpacer size="m" />

            <div>
              <VuiButtonPrimary
                color="accent"
                size="m"
                href="https://console.vectara.com/"
                target="_blank"
              >
                Try Vectara now
              </VuiButtonPrimary>
            </div>
          </VuiFlexItem>

          <VuiFlexItem grow={5}>
            <VuiTitle size="s">
              <h3>A conversational search API platform</h3>
            </VuiTitle>

            <VuiSpacer size="m" />

            <VuiText>
              <p>
                Vectara is an API platform for developers. It features
                best-in-class retrieval and summarization. The best part is we
                built in grounded generation which all but eliminates
                hallucinations.
              </p>
            </VuiText>

            <VuiSpacer size="s" />

            <VuiFlexContainer>
              <VuiFlexItem grow={5}>
                <VuiText>
                  <p>
                    <VuiLink href="https://vectara.com/" target="_blank">
                      Vectara
                    </VuiLink>
                  </p>
                  <p>
                    <VuiLink
                      href="https://discord.gg/GFb8gMz6UH"
                      target="_blank"
                    >
                      Discord
                    </VuiLink>
                  </p>
                </VuiText>
              </VuiFlexItem>

              <VuiFlexItem grow={5}>
                <VuiText>
                  <p>
                    <VuiLink href="https://docs.vectara.com/" target="_blank">
                      Docs
                    </VuiLink>
                  </p>

                  <p>
                    <VuiLink
                      href="https://discuss.vectara.com/"
                      target="_blank"
                    >
                      Forums
                    </VuiLink>
                  </p>
                </VuiText>
              </VuiFlexItem>
            </VuiFlexContainer>
          </VuiFlexItem>
        </VuiFlexContainer>
      </div>
    </div>
  );
};
