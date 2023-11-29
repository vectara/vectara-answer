import { BiCompass } from "react-icons/bi";
import {
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiIcon,
  VuiInfoTable,
  VuiLink,
  VuiSpacer,
  VuiText,
  VuiTitle,
} from "../../../ui";
import { ConfidenceBadge } from "./ConfidenceBadge";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HemDrawer = ({ isOpen, onClose }: Props) => {
  const columns = [
    {
      name: "score",
      width: "180px",
    },
    {
      name: "description",
    },
  ];

  const rows = [
    {
      values: {
        score: {
          render: <ConfidenceBadge confidenceLevel="low" />,
        },
        description: {
          render: (
            <VuiText>
              <p>
                <strong>0–0.33.</strong> The answer is not grounded in the
                retrieved results. It's largely hallucinated.
              </p>
            </VuiText>
          ),
        },
      },
    },
    {
      values: {
        score: {
          render: <ConfidenceBadge confidenceLevel="medium" />,
        },
        description: {
          render: (
            <VuiText>
              <p>
                <strong>0.33–0.66.</strong> The answer is partially grounded in
                the retrieved results, but probably contains some
                hallucinations.
              </p>
            </VuiText>
          ),
        },
      },
    },
    {
      values: {
        score: {
          render: <ConfidenceBadge confidenceLevel="high" />,
        },
        description: {
          render: (
            <VuiText>
              <p>
                <strong>0.66–1.</strong> The answer is grounded in the retrieved
                results and contains few if any hallucinations.
              </p>
            </VuiText>
          ),
        },
      },
    },
    {
      values: {
        score: {
          render: <ConfidenceBadge confidenceLevel="unavailable" />,
        },
        description: {
          render: (
            <VuiText>
              <p>
                We couldn't evaluate the answer's confidence. This is typically
                due to an API error.
              </p>
            </VuiText>
          ),
        },
      },
    },
  ];

  return (
    <VuiDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VuiFlexContainer
          justifyContent="spaceBetween"
          alignItems="center"
          spacing="xs"
        >
          <VuiFlexItem>
            <VuiIcon size="s">
              <BiCompass />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem>
            <VuiTitle size="s">
              <h2>Confidence scoring</h2>
            </VuiTitle>
          </VuiFlexItem>
        </VuiFlexContainer>
      }
    >
      <VuiTitle size="s">
        <h3>How we generate these scores</h3>
      </VuiTitle>

      <VuiSpacer size="s" />

      <VuiText>
        <p>
          Vectara will evaluate generated answers for how well-grounded they are
          in the retrieved results, using our open-source{" "}
          <VuiLink
            target="_blank"
            href="https://huggingface.co/vectara/hallucination_evaluation_model/tree/main"
          >
            Hughes Hallucination Evaluation Model (HEM)
          </VuiLink>
          . This evaluation is reported as a confidence score. Learn more about
          this process in our{" "}
          <VuiLink
            target="_blank"
            href="https://vectara.com/cut-the-bull-detecting-hallucinations-in-large-language-models/"
          >
            blog post
          </VuiLink>
          .
        </p>
      </VuiText>

      <VuiSpacer size="l" />

      <VuiTitle size="s">
        <h3>Using confidence scoring</h3>
      </VuiTitle>

      <VuiSpacer size="s" />

      <VuiText>
        <p>
          You can use this score to filter out low-quality answers or to inform
          your users about the quality of the answer.
        </p>
      </VuiText>

      <VuiSpacer size="s" />

      <VuiText>
        <p>
          Scores are reported as a value between 0 and 1. In this UI, we
          translate this value into one of four confidence levels:
        </p>
      </VuiText>

      <VuiSpacer size="s" />

      <VuiInfoTable
        columns={columns}
        rows={rows}
        padding="s"
        isHeaderVisible={false}
      />
    </VuiDrawer>
  );
};
