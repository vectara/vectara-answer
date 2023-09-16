import { BiError, BiListUl } from "react-icons/bi";
import classNames from "classnames";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiSpinner } from "../spinner/Spinner";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { VuiIcon } from "../icon/Icon";
import { VuiIconButton } from "../button/IconButton";
import { VuiButtonSecondary } from "../button/ButtonSecondary";
import { VuiSpacer } from "../spacer/Spacer";
import { ChatTurn } from "./types";

type Props = {
  turn: ChatTurn;
  isInspectionEnabled?: boolean;
  setInspectedTurn: (turn: ChatTurn) => void;
  onRetry: (turn: ChatTurn) => void;
};

export const VuiChatTurn = ({ turn, isInspectionEnabled, setInspectedTurn, onRetry }: Props) => {
  const turnClasses = classNames("vuiChatQuestion", {
    "vuiChatQuestion--error": !turn.isLoading && turn.error
  });

  return (
    <div className="vuiChatTurn">
      <VuiFlexContainer alignItems="start" justifyContent="spaceBetween" spacing="xs">
        <VuiFlexItem grow={1}>
          <div className={turnClasses}>
            <h3>{turn.question}</h3>
          </div>
        </VuiFlexItem>

        {isInspectionEnabled && (
          <VuiFlexItem grow={false} shrink={false}>
            <VuiIconButton
              size="xs"
              className="vuiChat__inspectButton"
              color="neutral"
              icon={
                <VuiIcon size="s">
                  <BiListUl />
                </VuiIcon>
              }
              onClick={() => setInspectedTurn(turn)}
            />
          </VuiFlexItem>
        )}
      </VuiFlexContainer>

      <div className="vuiChatAnswer">
        {turn.isLoading ? (
          <VuiFlexContainer alignItems="center" spacing="xs">
            <VuiFlexItem grow={false}>
              <VuiSpinner size="xs" />
            </VuiFlexItem>

            <VuiFlexItem grow={false}>
              <VuiText>
                <p>
                  <VuiTextColor color="subdued">Thinking…</VuiTextColor>
                </p>
              </VuiText>
            </VuiFlexItem>
          </VuiFlexContainer>
        ) : turn.error ? (
          <>
            <VuiFlexContainer alignItems="center" spacing="xs">
              <VuiFlexItem grow={false}>
                <VuiIcon color="subdued">
                  <BiError />
                </VuiIcon>
              </VuiFlexItem>

              <VuiFlexItem grow={false}>
                <VuiText>
                  <p>
                    <VuiTextColor color="subdued">{turn.error?.message}</VuiTextColor>
                  </p>
                </VuiText>
              </VuiFlexItem>
            </VuiFlexContainer>

            <VuiSpacer size="s" />

            <VuiButtonSecondary size="xs" color="neutral" onClick={() => onRetry(turn)}>
              Ask again
            </VuiButtonSecondary>
          </>
        ) : (
          turn.answer
        )}
      </div>
    </div>
  );
};
