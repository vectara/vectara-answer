import { SearchResult } from "../searchResult/SearchResult";

export type ChatTurn = {
  question: string;
  isLoading?: boolean;
  error?: {
    code?: string;
    message: string;
  };
  answer?: string;
  query?: string;
  language?: ChatLanguage;
  results?: SearchResult[];
};

export const CHAT_LANGUAGES = [
  "auto",
  "eng",
  "deu",
  "fra",
  "zho",
  "kor",
  "ara",
  "rus",
  "tha",
  "nld",
  "ita",
  "por",
  "spa",
  "jpn",
  "pol",
  "tur",
] as const;

export type ChatLanguage = (typeof CHAT_LANGUAGES)[number];

export const CHAT_STYLE_ORDER = ["closed", "condensed", "tall", "fullScreen"] as const;
export type ChatStyle = (typeof CHAT_STYLE_ORDER)[number];
