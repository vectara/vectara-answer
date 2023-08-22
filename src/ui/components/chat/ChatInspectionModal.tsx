import { VuiLabel } from "../form";
import { VuiModal } from "../modal/Modal";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiChatSearchResult } from "./ChatSearchResult";
import { ChatTurn } from "./types";

type Props = {
  turn?: ChatTurn;
  isOpen: boolean;
  onClose: () => void;
};

export const VuiChatInspectionModal = ({ turn, isOpen, onClose }: Props) => {
  return (
    <VuiModal title="Chat details" color="primary" isOpen={isOpen} onClose={onClose}>
      <VuiLabel>Question</VuiLabel>
      <VuiSpacer size="xs" />
      <VuiText>
        <p>{turn?.question}</p>
      </VuiText>

      <VuiSpacer size="m" />

      <VuiLabel>Query</VuiLabel>
      <VuiSpacer size="xs" />
      <VuiText>
        <p>{turn?.query}</p>
      </VuiText>

      <VuiSpacer size="m" />

      <VuiLabel>Answer</VuiLabel>
      <VuiSpacer size="xs" />
      <VuiText>
        <p>{turn?.answer}</p>
      </VuiText>

      <VuiSpacer size="m" />

      <VuiLabel>References</VuiLabel>
      <VuiSpacer size="xs" />
      {turn?.results?.map((result, index) => (
        <>
          <VuiChatSearchResult result={result} />
          {index < (turn.results?.length ?? 0) - 1 && <VuiSpacer size="s" />}
        </>
      ))}
    </VuiModal>
  );
};
