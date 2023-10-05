export type DocMetadata = {
  name: string;
  value: string;
};

export type SearchError = {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type SearchResponseDoc = {
  id: string;
  metadata: DocMetadata[];
};

export type SearchResponseResult = {
  corpusKey: {
    corpusId: string;
    customerId: string;
    dim: string[];
  };
  documentIndex: string;
  resultLength: number;
  resultOffset: number;
  score: number;
  text: string;
};

export type SearchResponseSummary = {
  text?: string;
  status?: string;
};

export type SearchResponse = {
  document: SearchResponseDoc[];
  response: SearchResponseResult[];
  summary: SearchResponseSummary[];
};

export type CombinedResult = {
  document: SearchResponseDoc;
  response: SearchResponseResult;
  summary: SearchResponseSummary[];
};

export type CombinedResults = CombinedResult[];

export type DeserializedSearchResult = {
  id: string;
  snippet: {
    pre: string;
    text: string;
    post: string;
  };
  source: string;
  url: string;
  title: string;
  metadata: Record<string, unknown>;
};

export const SUMMARY_LANGUAGES = [
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
  "heb",
  "vie",
  "ind",
  "ces",
  "ukr",
  "ell",
  "fas",
  "hin",
  "urd",
  "swe",
  "ben",
  "msa",
  "ron",
] as const;

export type SummaryLanguage = (typeof SUMMARY_LANGUAGES)[number];

const codeToLanguageMap: Record<SummaryLanguage, string> = {
  auto: "Same as query",
  eng: "English",
  deu: "German",
  fra: "French",
  zho: "Chinese",
  kor: "Korean",
  ara: "Arabic",
  rus: "Russian",
  tha: "Thai",
  nld: "Dutch",
  ita: "Italian",
  por: "Portugese",
  spa: "Spanish",
  jpn: "Japanese",
  pol: "Polish",
  tur: "Turkish",
  heb: "Hebrew",
  vie: "Vietnamese",
  ind: "Indonesian",
  ces: "Czech",
  ukr: "Ukrainian",
  ell: "Greek",
  fas: "Farsi",
  hin: "Hindi",
  urd: "Urdu",
  swe: "Swedish",
  ben: "Bengali",
  msa: "Malay",
  ron: "Romanian",
} as const;

export const humanizeLanguage = (language: SummaryLanguage): string => {
  return codeToLanguageMap[language];
};

export const normal_reranker_id = 272725717
export const mmr_reranker_id = 272725718

export type UxMode = "search" | "summary";
