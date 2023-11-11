import React, { useEffect, useRef, useState } from "react";
import { BiChat, BiExpand, BiExpandVertical, BiPaperPlane, BiX } from "react-icons/bi";
import classNames from "classnames";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIcon } from "../icon/Icon";
import { VuiIconButton } from "../button/IconButton";
import { VuiTextInput } from "../form";
import { ChatStyle, ChatTurn, CHAT_STYLE_ORDER } from "./types";
import { VuiButtonSecondary } from "../button/ButtonSecondary";
import { VuiChatInspector } from "./ChatInspector";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiButtonTertiary } from "../button/ButtonTertiary";
import { VuiChatTurn } from "./ChatTurn";
import { VuiChatPanel } from "./ChatPanel";

type Props = {
  openPrompt: string;
  chatStyle: ChatStyle;
  setChatStyle: (chatStyle: ChatStyle) => void;
  introduction?: string;
  suggestions?: string[];
  onInput: (input: string) => void;
  onRetry: (trun: ChatTurn) => void;
  onReset: () => void;
  conversation: ChatTurn[];
  settings?: React.ReactNode;
  isInspectionEnabled?: boolean;
};

const chatStyleToIconMap = {
  closed: <BiX />,
  condensed: <BiExpandVertical />,
  tall: <BiExpand />,
  fullScreen: <BiX />
} as const;

export const VuiChat = ({
  openPrompt,
  chatStyle,
  setChatStyle,
  introduction,
  suggestions,
  onInput,
  onRetry,
  onReset,
  conversation,
  settings,
  isInspectionEnabled
}: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inspectedTurn, setInspectedTurn] = useState<ChatTurn>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isScrolledToBottomRef = useRef(true);
  const prevConversationRef = useRef({
    isBottomQuestionLoading: true,
    length: 0
  });

  const isOpen = chatStyle !== "closed";

  useEffect(() => {
    const onScrollChat = (e: Event) => {
      isScrolledToBottomRef.current = conversationRef.current
        ? Math.abs(
            conversationRef.current.scrollHeight -
              conversationRef.current.clientHeight -
              conversationRef.current.scrollTop
          ) < 1
        : true;
    };

    // We're going to track the scroll position, which will determine
    // or not the user is at the bottom of the chat.
    conversationRef.current?.addEventListener("scroll", onScrollChat);

    return () => {
      conversationRef.current?.removeEventListener("scroll", onScrollChat);
    };
  }, []);

  useEffect(() => {
    // Scrolling UX rules:
    // * Scroll down if the last recorded scroll position was already
    //   at the bottom of the list and if the last question has resolved
    //   to an answer.
    // * If the user has scrolled to another position, then don’t
    //   auto-scroll.
    // * If the question that has resolved is not the last question,
    //   don’t auto-scroll.
    //
    // This way if the user takes control of the scroll position, they
    // remain in control. If the user hasn’t taken control of the scroll
    // position, then the scroll feels stable (by staying at the
    // bottom) as opposed to scrolling unpredictably through the list
    // as questions resolve.

    const hasBottomQuestionJustChanged =
      // A new question has been added to the bottom of the list.
      prevConversationRef.current.length !== conversation.length ||
      // The last question has just resolved to an answer.
      prevConversationRef.current.isBottomQuestionLoading !== Boolean(conversation[conversation.length - 1]?.isLoading);

    // If the intro is really long, the chat can be in a state where
    // the user is at the top of the chat and their first question is
    // off-screen. In this case, we want to scroll to the bottom.
    const shouldStickToBottom =
      conversation.length === 1 || (isScrolledToBottomRef.current && hasBottomQuestionJustChanged);

    if (isOpen && shouldStickToBottom) {
      // Scroll to the bottom of the chat to keep the latest turn in view.
      conversationRef.current?.scrollTo({
        left: 0,
        top: conversationRef.current?.scrollHeight,
        behavior: "smooth"
      });
    }

    prevConversationRef.current = {
      length: conversation.length,
      isBottomQuestionLoading:
        conversation.length > 0 ? Boolean(conversation[conversation.length - 1].isLoading) : false
    };
  }, [conversation]);

  useEffect(() => {
    // Only autofocus if the user has interacted with the component.
    // This prevents the component stealing focus when it first mounts.
    if (isTouched) {
      if (isOpen) {
        inputRef.current?.focus();
      } else {
        buttonRef.current?.focus();
      }
    }
  }, [isOpen]);

  const onSubmit = () => {
    if (!input?.trim()) return;
    onInput(input);
    setInput("");
  };

  const cycleChatStyle = () => {
    setIsTouched(true);
    const currentIndex = CHAT_STYLE_ORDER.indexOf(chatStyle);
    setChatStyle(
      currentIndex === CHAT_STYLE_ORDER.length - 1 ? CHAT_STYLE_ORDER[0] : CHAT_STYLE_ORDER[currentIndex + 1]
    );
  };

  const buttonClasses = classNames("vuiChatButton", {
    "vuiChatButton-isHidden": isOpen
  });

  const classes = classNames("vuiChat", `vuiChat--${chatStyle}`);

  return (
    <>
      <button
        // @ts-expect-error React doesn't support inert yet
        inert={isOpen ? "" : null}
        className={buttonClasses}
        onClick={() => setChatStyle("condensed")}
        ref={buttonRef}
      >
        <VuiFlexContainer alignItems="center" spacing="s">
          <VuiFlexItem shrink={false} grow={false}>
            <VuiIcon size="s">
              <BiChat />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem grow={1}>
            <div className="vuiChatButton__prompt">{openPrompt}</div>
          </VuiFlexItem>
        </VuiFlexContainer>
      </button>

      <div
        // @ts-expect-error React doesn't support inert yet
        inert={!isOpen ? "" : null}
        className={classes}
        onKeyDown={(e) => {
          if (e.key === "Escape") setChatStyle("closed");
        }}
      >
        <div className="vuiChat__header">
          <VuiFlexContainer alignItems="center" justifyContent="spaceBetween">
            <VuiFlexItem grow={1}>
              <VuiFlexContainer alignItems="center" spacing="s">
                <VuiFlexItem shrink={false} grow={false}>
                  <VuiIcon size="s">
                    <BiChat />
                  </VuiIcon>
                </VuiFlexItem>

                <VuiFlexItem grow={1}>
                  <div className="vuiChatButton__prompt">
                    <h2>{openPrompt}</h2>
                  </div>
                </VuiFlexItem>
              </VuiFlexContainer>
            </VuiFlexItem>

            {settings && (
              <VuiFlexItem shrink={false} grow={false}>
                <VuiButtonSecondary color="neutral" size="xs" onClick={() => setIsSettingsOpen(true)}>
                  Settings
                </VuiButtonSecondary>
              </VuiFlexItem>
            )}
          </VuiFlexContainer>
        </div>

        <div className="vuiChat__conversation" ref={conversationRef}>
          {(introduction || suggestions) && (
            <div className="vuiChat__introduction">
              {introduction}

              {introduction && <VuiSpacer size="s" />}

              {suggestions?.map((suggestion) => (
                <div>
                  <VuiButtonTertiary
                    size="s"
                    color="primary"
                    key={suggestion}
                    onClick={() => onInput(suggestion)}
                    noPadding
                  >
                    {suggestion}
                  </VuiButtonTertiary>
                </div>
              ))}

              {suggestions && suggestions.length > 0 && <VuiSpacer size="s" />}
            </div>
          )}

          {conversation.length > 0 && (
            <div className="vuiChat__turns">
              {conversation.map((turn, index) => (
                <VuiChatTurn
                  turn={turn}
                  isInspectionEnabled={isInspectionEnabled}
                  setInspectedTurn={setInspectedTurn}
                  onRetry={onRetry}
                  key={index}
                />
              ))}
            </div>
          )}

          {conversation.length > 0 && (
            <div className="vuiChat__conversationActions">
              <VuiFlexContainer alignItems="center" justifyContent="center">
                <VuiFlexItem>
                  <VuiButtonSecondary color="neutral" size="xs" onClick={onReset}>
                    Start over
                  </VuiButtonSecondary>
                </VuiFlexItem>
              </VuiFlexContainer>
            </div>
          )}
        </div>

        <div className="vuiChat__input">
          <VuiFlexContainer alignItems="center" spacing="xxs">
            <VuiFlexItem grow={1}>
              <VuiTextInput
                value={input}
                onChange={(e) => {
                  setInput(e.currentTarget.value);
                }}
                onSubmit={onSubmit}
                fullWidth
                ref={inputRef}
              />
            </VuiFlexItem>

            <VuiFlexItem shrink={false} grow={false}>
              <VuiIconButton
                icon={
                  <VuiIcon>
                    <BiPaperPlane />
                  </VuiIcon>
                }
                color="primary"
                onClick={onSubmit}
              />
            </VuiFlexItem>

            <VuiFlexItem shrink={false} grow={false}>
              <VuiIconButton
                icon={<VuiIcon>{chatStyleToIconMap[chatStyle]}</VuiIcon>}
                color="neutral"
                onClick={cycleChatStyle}
              />
            </VuiFlexItem>
          </VuiFlexContainer>
        </div>

        {isSettingsOpen && (
          <VuiChatPanel title="Chat settings" onClose={() => setIsSettingsOpen(false)}>
            {settings}
          </VuiChatPanel>
        )}

        {Boolean(inspectedTurn) && (
          <VuiChatInspector turn={inspectedTurn} onClose={() => setInspectedTurn(undefined)} />
        )}
      </div>
    </>
  );
};
