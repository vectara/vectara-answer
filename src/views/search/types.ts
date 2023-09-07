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
  "spa",
  "hin",
  "ara",
  "rus",
  "por",
  "ben",
  "jpn",
  "pun",
  "jav",
  "ita",
  "urd",
  "ind",
  "swa",
  "mar",
  "tel",
  "vie",
  "kor",
  "tam",
  "tur",
  "ukr",
  "guj",
  "pol",
  "fas",
  "msa",
  "tha",
  "kan",
  "ori",
  "mya",
  "ron",
  "nld",
  "ell",
  "ces",
  "swe",
  "srp",
  "hun",
  "uzb",
  "nor",
  "tgl",
  "aze",
  "fin",
  "slk",
] as const;

export type SummaryLanguage = (typeof SUMMARY_LANGUAGES)[number];

const codeToLanguageMap: Record<SummaryLanguage, string> = {
  auto: "Same as query",
  eng: "English",
  deu: "German",
  fra: "French",
  zho: "Chinese",
  spa: "Spanish",
  hin: "Hindi",
  ara: "Arabic",
  rus: "Russian",
  por: "Portuguese",
  ben: "Bengali",
  jpn: "Japanese",
  pun: "Punjabi",
  jav: "Javanese",
  ita: "Italian",
  urd: "Urdu",
  ind: "Indonesian",
  swa: "Swahili",
  mar: "Marathi",
  tel: "Telugu",
  vie: "Vietnamese",
  kor: "Korean",
  tam: "Tamil",
  tur: "Turkish",
  ukr: "Ukrainian",
  guj: "Gujarati",
  pol: "Polish",
  fas: "Persian",
  msa: "Malay",
  tha: "Thai",
  kan: "Kannada",
  ori: "Oriya",
  mya: "Burmese",
  ron: "Romanian",
  nld: "Dutch",
  ell: "Greek",
  ces: "Czech",
  swe: "Swedish",
  srp: "Serbian",
  hun: "Hungarian",
  uzb: "Uzbek",
  nor: "Norwegian",
  tgl: "Tagalog",
  aze: "Azerbaijani",
  fin: "Finnish",
  slk: "Slovak",
} as const;

export const humanizeLanguage = (language: SummaryLanguage): string => {
  return codeToLanguageMap[language];
};

export type UxMode = "search" | "summary";