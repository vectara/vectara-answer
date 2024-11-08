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

export type ApiV1SearchResponse = {
  document: SearchResponseDoc[];
  response: SearchResponseResult[];
  summary: SearchResponseSummary[];
};

export type SearchResult = {
  document_id: string;
  text: string;
  score: number;
  part_metadata: {
    lang: string;
    section: number;
    offset: number;
    len: number;
  };
  document_metadata: Record<string, any>;
};

export type SearchResponse = ApiV1SearchResponse & SearchResult[]

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

export type NoneReranker = { type: "none" };

export type CustomerSpecificReranker = {
  type: "customer_reranker";
  reranker_id: string;
};

export type UserFunctionReranker = {
  type: "userfn";
  user_function: string;
}

export type MmrReranker = {
  type: "mmr";
  diversity_bias: number;
};

export type ChainReranker = {
  type: string;
  rerankers: (CustomerSpecificReranker | UserFunctionReranker | MmrReranker | NoneReranker)[];
};

export type SearchConfiguration = {
  corpora: {
    corpus_key: string;
    metadata_filter?: string;
    lexical_interpolation?: number;
    custom_dimensions?: Record<string, number>;
    semantics?: "default" | "query" | "response";
  }[];
  offset: number;
  limit?: number;
  context_configuration?: {
    characters_before?: number;
    characters_after?: number;
    sentences_before?: number;
    sentences_after?: number;
    start_tag?: string;
    end_tag?: string;
  };
  reranker?: NoneReranker | CustomerSpecificReranker | MmrReranker | UserFunctionReranker | ChainReranker;
};

export type NoneCitations = {
  style: "none";
};

export type NumericCitations = {
  style: "numeric";
};

export type HtmlCitations = {
  style: "html";
  url_pattern: string;
  text_pattern: string;
};

export type MarkdownCitations = {
  style: "markdown";
  url_pattern: string;
  text_pattern: string;
};

export type GenerationConfiguration = {
  prompt_name?: string;
  max_used_search_results?: number;
  prompt_text?: string;
  max_response_characters?: number;
  response_language?: SummaryLanguage;
  model_parameters?: {
    max_tokens: number;
    temperature: number;
    frequency_penalty: number;
    presence_penalty: number;
  };
  citations?: NoneCitations | NumericCitations | HtmlCitations | MarkdownCitations;
  enable_factual_consistency_score?: boolean;
};

export type QueryBody = {
  query: string;
  search: SearchConfiguration;
  stream_response?: boolean;
  generation?: GenerationConfiguration;
};

export type ApiV2SearchResponse = {
  search_results: SearchResult[];
  factual_consistency_score: number;
  response_language: string;
  summary: string;
  document: SearchResponseDoc[];
  response: SearchResponseResult[];
}

export const normal_reranker_id = 272725717
export const mmr_reranker_id = 272725718
export const slingshot_reranker_id = 272725719
export const user_function_reranker_id = 272725722


export type UxMode = "search" | "summary";

export const promptOptions = ["vectara-summary-ext-24-05-sml", "vectara-summary-ext-24-05-med-omni",
  "vectara-summary-ext-24-05-med", "vectara-summary-ext-24-05-large", "mockingbird-1.0-2024-07-16"]

export const FCS_SUPPORTED_LANGUAGES = ["eng","deu","fra","en","de","fr"]