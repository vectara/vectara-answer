import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiChatPanel } from "./ChatPanel";
import { VuiChatSearchResult } from "./ChatSearchResult";
import { ChatTurn } from "./types";

type Props = {
  turn?: ChatTurn;
  onClose: () => void;
};

export const VuiChatInspector = ({ turn, onClose }: Props) => {
  return (
    <VuiChatPanel title="Chat inspector" onClose={onClose}>
      <VuiText>
        <p>
          <strong>You asked,</strong> "{turn?.question}"
        </p>
      </VuiText>

      <VuiSpacer size="xs" />

      <VuiText>
        <p>
          <strong>This was interpreted as:</strong> "{turn?.query}"
        </p>
      </VuiText>

      <VuiSpacer size="xs" />

      <VuiText>
        <p>
          <strong>This was the response:</strong> "{turn?.answer}"
        </p>
      </VuiText>

      <VuiSpacer size="xs" />

      <VuiText>
        <p>
          <strong>We created this response based on the preceding conversation and this information:</strong>
        </p>
      </VuiText>

      <VuiSpacer size="xs" />

      {turn?.results?.map((result, index) => (
        <>
          <VuiChatSearchResult result={result} />
          {index < (turn.results?.length ?? 0) - 1 && <VuiSpacer size="s" />}
        </>
      ))}
    </VuiChatPanel>
  );
};
