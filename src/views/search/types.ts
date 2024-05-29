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
  "eng", "en",
  "deu", "de",
  "fra", "fr",
  "zho", "zh",
  "kor", "ko",
  "ara", "ar",
  "rus", "ru",
  "tha", "th",
  "nld", "nl",
  "ita", "it",
  "por", "pt",
  "spa", "es",
  "jpn", "ja",
  "pol", "pl",
  "tur", "tr",
  "heb", "he",
  "vie", "vi",
  "ind", "id",
  "ces", "cs",
  "ukr", "uk",
  "ell", "el",
  "fas", "fa",
  "hin", "hi",
  "urd", "ur",
  "swe", "sv",
  "ben", "bn",
  "msa", "ms",
  "ron", "ro"
] as const;

export type SummaryLanguage = (typeof SUMMARY_LANGUAGES)[number];

const languageCodes: { [key: string]: string[]  } = {
  "Same as query": ["auto"],
  English: ["en", "eng"],
  Spanish: ["es", "spa"],
  French: ["fr", "fra"],
  German: ["de", "deu"],
  Chinese: ["zh", "zho"],
  Japanese: ["ja", "jpn"],
  Russian: ["ru", "rus"],
  Portuguese: ["pt", "por"],
  Italian: ["it", "ita"],
  Korean: ["ko", "kor"],
  Arabic: ["ar", "ara"],
  Dutch: ["nl", "nld"],
  Swedish: ["sv", "swe"],
  Norwegian: ["no", "nor"],
  Danish: ["da", "dan"],
  Finnish: ["fi", "fin"],
  Polish: ["pl", "pol"],
  Czech: ["cs", "ces"],
  Hungarian: ["hu", "hun"],
  Romanian: ["ro", "ron"],
  Turkish: ["tr", "tur"],
  Bulgarian: ["bg", "bul"],
  Greek: ["el", "ell"],
  Hebrew: ["he", "heb"],
  Thai: ["th", "tha"],
  Ukrainian: ["uk", "ukr"],
  Indonesian: ["id", "ind"],
  Malay: ["ms", "msa"],
  Vietnamese: ["vi", "vie"],
  Hindi: ["hi", "hin"],
  Bengali: ["bn", "ben"],
  Tamil: ["ta", "tam"],
  Telugu: ["te", "tel"],
  Marathi: ["mr", "mar"],
  Urdu: ["ur", "urd"],
  Persian: ["fa", "fas"],
};
const summaryLanguages: string[] = [];

Object.values(languageCodes).flat().forEach(code => {
  summaryLanguages.push(code);
});

const codeToLanguageMap = Object.entries(languageCodes).reduce(
  (langCodes, [language, codes]) => {
    codes.forEach((code) => {
      langCodes[code as SummaryLanguage] = language;
    });
    return langCodes;
  },
  {} as Record<SummaryLanguage, string>
);

export const humanizeLanguage = (language: SummaryLanguage): string => {
  return codeToLanguageMap[language];
};

export const FCS_MODE = [
  "disable",
  "score",
  "badge"
] as const;

export type FcsMode = (typeof FCS_MODE)[number];

const codeToUiText: Record<FcsMode, string> = {
  disable: "Disable",
  score: "Score",
  badge: "Badge",
} as const;

export const UiText = (mode: FcsMode): string => {
  return codeToUiText[mode];
};



export const normal_reranker_id = 272725717

export const slingshot_reranker_id = 272725719
export const mmr_reranker_id = 272725718

export type UxMode = "search" | "summary";
