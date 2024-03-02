import {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";
import axios from "axios";

import {
  SummaryLanguage,
  SUMMARY_LANGUAGES,
  UxMode,
  normal_reranker_id,
  mmr_reranker_id,
} from "../views/search/types";

interface Config {
  // Search
  config_endpoint?: string;
  config_corpus_id?: string;
  config_customer_id?: string;
  config_api_key?: string;
  config_hf_token?: string;

  // App
  config_ux?: UxMode;
  config_app_title?: string;
  config_enable_app_header?: string;
  config_enable_app_footer?: string;

  // App header
  config_app_header_logo_link?: string;
  config_app_header_logo_src?: string;
  config_app_header_logo_alt?: string;
  config_app_header_logo_height?: string;
  config_app_header_learn_more_link?: string;
  config_app_header_learn_more_text?: string;

  // Filters
  config_enable_source_filters?: string;
  config_all_sources?: string;
  config_sources?: string;

  // Search header
  config_search_logo_link?: string;
  config_search_logo_src?: string;
  config_search_logo_alt?: string;
  config_search_logo_height?: string;
  config_search_title?: string;
  config_search_description?: string;
  config_search_placeholder?: string;

  // Auth
  config_authenticate?: string;
  config_google_client_id?: string;

  // Analytics
  config_google_analytics_tracking_code?: string;
  config_full_story_org_id?: string;
  config_gtm_container_id?: string;

  // Summary
  config_summary_default_language?: string;
  config_summary_num_results?: number;
  config_summary_num_sentences?: number;
  config_summary_prompt_name?: string;
  config_summary_prompt_text?: string;
  config_summary_enable_hem?: string;

  // hybrid search
  config_hybrid_search_num_words?: number;
  config_hybrid_search_lambda_long?: number;
  config_hybrid_search_lambda_short?: number;

  // rerank
  config_rerank?: string;
  config_rerank_num_results?: number;

  // MMR
  config_mmr?: string;
  config_mmr_num_results?: number;
  config_mmr_diversity_bias?: number;

  // questions
  config_questions?: string;
}

type ConfigProp = keyof Config;

const requiredConfigVars = ["corpus_id", "customer_id", "api_key", "endpoint"];

type Search = {
  endpoint?: string;
  corpusId?: string;
  customerId?: string;
  apiKey?: string;
};

type App = {
  isHeaderEnabled: boolean;
  isFooterEnabled: boolean;
  title: string;
};

type AppHeader = {
  logo: {
    link?: string;
    src?: string;
    alt?: string;
    height?: string;
  };
  learnMore: {
    link?: string;
    text?: string;
  };
};

type Source = { value: string; label: string };
type Filters = {
  isEnabled: boolean;
  sources: Source[];
  allSources: boolean;
  sourceValueToLabelMap?: Record<string, string>;
};

type Summary = {
  defaultLanguage: string;
  summaryNumResults: number;
  summaryNumSentences: number;
  summaryPromptName: string;
  summaryPromptText: string;
  hfToken: string;
  summaryEnableHem: boolean;
};

type SearchHeader = {
  logo: {
    link?: string;
    src?: string;
    alt?: string;
    height?: string;
  };
  title?: string;
  description?: string;
  placeholder?: string;
};

type ExampleQuestions = string[];
type Auth = { isEnabled: boolean; googleClientId?: string };
type Analytics = {
  googleAnalyticsTrackingCode?: string;
  fullStoryOrgId?: string;
  gtmContainerId?: string;
};
type Rerank = {
  isEnabled: boolean;
  numResults?: number;
  id?: number;
  diversityBias?: number;
};
type Hybrid = { numWords: number; lambdaLong: number; lambdaShort: number };

interface ConfigContextType {
  isConfigLoaded: boolean;
  missingConfigProps: string[];
  uxMode: UxMode;
  setUxMode: (uxMode: UxMode) => void;
  search: Search;
  app: App;
  appHeader: AppHeader;
  filters: Filters;
  summary: Summary;
  rerank: Rerank;
  hybrid: Hybrid;
  searchHeader: SearchHeader;
  exampleQuestions: ExampleQuestions;
  auth: Auth;
  analytics: Analytics;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === "production";

const fetchQueries = async () => {
  try {
    const result = await fetch("queries.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("Could not load queries.json Detail: " + e);
  }
};

const fetchConfig = async () => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const result = await axios.post("/config", undefined, headers);
  return result;
};

const isTrue = (value: string | undefined) => {
  if (typeof value !== "string") {
    return false;
  }

  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue === "true";
};

// Prefix config vars to avoid collision with other variables.
const prefixConfig = (
  config: Record<string, string | undefined>,
  existingPrefix = ""
) => {
  const prefixedConfig = Object.keys(config).reduce((accum, key) => {
    if (key.startsWith(existingPrefix)) {
      const unprefixedKey = key.replace(existingPrefix, "config_");
      accum[unprefixedKey] = config[key];
    } else {
      const unprefixedKey = `config_${key}`;
      accum[unprefixedKey] = config[key];
    }
    return accum;
  }, {} as Record<string, string | undefined>);
  return prefixedConfig;
};

const validateLanguage = (
  lang: string,
  defaultLanguage: SummaryLanguage
): SummaryLanguage => {
  if ((SUMMARY_LANGUAGES as readonly string[]).includes(lang)) {
    return lang as SummaryLanguage;
  }
  return defaultLanguage;
};

export const ConfigContextProvider = ({ children }: Props) => {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [missingConfigProps, setMissingConfigProps] = useState<string[]>([]);
  const [uxMode, setUxMode] = useState<UxMode>("summary");
  const [search, setSearch] = useState<Search>({});
  const [app, setApp] = useState<App>({
    isHeaderEnabled: false,
    isFooterEnabled: false,
    title: "",
  });
  const [appHeader, setAppHeader] = useState<AppHeader>({
    logo: {},
    learnMore: {},
  });
  const [filters, setFilters] = useState<Filters>({
    isEnabled: false,
    sources: [],
    allSources: true,
    sourceValueToLabelMap: {},
  });
  const [searchHeader, setSearchHeader] = useState<SearchHeader>({ logo: {} });
  const [exampleQuestions, setExampleQuestions] = useState<ExampleQuestions>(
    []
  );
  const [auth, setAuth] = useState<Auth>({ isEnabled: false });
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [rerank, setRerank] = useState<Rerank>({
    isEnabled: false,
    numResults: 50,
    id: 272725718,
    diversityBias: 0.3,
  });
  const [hybrid, setHybrid] = useState<Hybrid>({
    numWords: 2,
    lambdaLong: 0.0,
    lambdaShort: 0.1,
  });

  const [summary, setSummary] = useState<Summary>({
    defaultLanguage: "auto",
    summaryNumResults: 7,
    summaryNumSentences: 3,
    summaryPromptName: "vectara-summary-ext-v1.2.0",
    summaryPromptText: "",
    hfToken: "",
    summaryEnableHem: false,
  });

  useEffect(() => {
    const loadConfig = async () => {
      let config: Config;
      if (isProduction) {
        const result = await fetchConfig();
        config = prefixConfig(result.data);

        if (config.config_questions) {
          setExampleQuestions(JSON.parse(config.config_questions));
        } else {
          const queriesResponse = await fetchQueries();
          if (queriesResponse) {
            const questions = queriesResponse.questions;
            if (questions) {
              setExampleQuestions(questions);
            }
          }
        }
      } else {
        config = prefixConfig(process.env, "REACT_APP_");
        const questions = process.env.REACT_APP_questions;
        if (questions) {
          setExampleQuestions(JSON.parse(questions));
        }
      }

      setIsConfigLoaded(true);

      const missingConfigProps = requiredConfigVars.reduce(
        (accum, configVarName) => {
          if (config[`config_${configVarName}` as ConfigProp] === undefined)
            accum.push(configVarName);
          return accum;
        },
        [] as string[]
      );
      setMissingConfigProps(missingConfigProps);

      const {
        // Search
        config_endpoint,
        config_corpus_id,
        config_customer_id,
        config_api_key,
        config_hf_token,

        // App
        config_ux,
        config_app_title,
        config_enable_app_header,
        config_enable_app_footer,

        // Filters
        config_enable_source_filters,
        config_all_sources,
        config_sources,

        // App header
        config_app_header_logo_link,
        config_app_header_logo_src,
        config_app_header_logo_alt,
        config_app_header_logo_height,
        config_app_header_learn_more_link,
        config_app_header_learn_more_text,

        // Search header
        config_search_logo_link,
        config_search_logo_src,
        config_search_logo_alt,
        config_search_logo_height,
        config_search_title,
        config_search_description,
        config_search_placeholder,

        // Auth
        config_authenticate,
        config_google_client_id,

        // Analytics
        config_google_analytics_tracking_code,
        config_full_story_org_id,
        config_gtm_container_id,

        // rerank
        config_rerank,
        config_rerank_num_results,

        // MMR
        config_mmr,
        config_mmr_diversity_bias,
        config_mmr_num_results,

        // hybrid search
        config_hybrid_search_num_words,
        config_hybrid_search_lambda_long,
        config_hybrid_search_lambda_short,

        // Summary
        config_summary_default_language,
        config_summary_num_results,
        config_summary_num_sentences,
        config_summary_prompt_name,
        config_summary_prompt_text,
        config_summary_enable_hem,
      } = config;

      setUxMode(config_ux ?? "summary");

      setSearch({
        endpoint: config_endpoint,
        corpusId: config_corpus_id,
        customerId: config_customer_id,
        apiKey: config_api_key,
      });

      setApp({
        title: config_app_title ?? "",
        isHeaderEnabled: isTrue(config_enable_app_header ?? "True"),
        isFooterEnabled: isTrue(config_enable_app_footer ?? "True"),
      });

      setAppHeader({
        logo: {
          link: config_app_header_logo_link,
          src: config_app_header_logo_src,
          alt: config_app_header_logo_alt,
          height: config_app_header_logo_height,
        },
        learnMore: {
          link: config_app_header_learn_more_link,
          text: config_app_header_learn_more_text,
        },
      });

      const isFilteringEnabled = isTrue(config_enable_source_filters);
      const allSources =
        config_all_sources === undefined ? true : isTrue(config_all_sources);

      const sources =
        config_sources?.split(",").map((source) => ({
          value: source.toLowerCase(),
          label: source,
        })) ?? [];

      const sourceValueToLabelMap = sources.length
        ? sources.reduce((accum, { label, value }) => {
            accum[value] = label;
            return accum;
          }, {} as Record<string, string>)
        : undefined;

      if (isFilteringEnabled && sources.length === 0) {
        console.error(
          'enable_source_filters is set to "True" but sources is empty. Define some sources for filtering or set enable_source_filters to "False"'
        );
      }

      setFilters({
        isEnabled: isFilteringEnabled,
        allSources: allSources,
        sources: sources,
        sourceValueToLabelMap: sourceValueToLabelMap,
      });

      setSummary({
        defaultLanguage: validateLanguage(
          config_summary_default_language as SummaryLanguage,
          "auto"
        ),
        summaryNumResults: config_summary_num_results ?? 7,
        summaryNumSentences: config_summary_num_sentences ?? 3,
        summaryPromptName:
          config_summary_prompt_name ?? "vectara-summary-ext-v1.2.0",
        summaryPromptText:
          config_summary_prompt_text ?? "",
        hfToken: config_hf_token ?? "",
        summaryEnableHem: isTrue(config_summary_enable_hem) ?? false,
      });

      setSearchHeader({
        logo: {
          link: config_search_logo_link,
          src: config_search_logo_src,
          alt: config_search_logo_alt,
          height: config_search_logo_height,
        },
        title: config_search_title,
        description: config_search_description,
        placeholder: config_search_placeholder,
      });

      setAuth({
        isEnabled: isTrue(config_authenticate),
        googleClientId: config_google_client_id,
      });

      setAnalytics({
        googleAnalyticsTrackingCode: config_google_analytics_tracking_code,
        fullStoryOrgId: config_full_story_org_id,
        gtmContainerId: config_gtm_container_id,
      });

      setRerank({
        isEnabled: isTrue(config_mmr) || isTrue(config_rerank),
        numResults: isTrue(config_mmr)
          ? (config_mmr_num_results ?? 50)
          : config_rerank_num_results ?? rerank.numResults,
        id: isTrue(config_mmr) ? mmr_reranker_id : normal_reranker_id,
        diversityBias: config_mmr_diversity_bias ?? rerank.diversityBias ?? 0.3,
      });

      setHybrid({
        numWords: config_hybrid_search_num_words ?? hybrid.numWords,
        lambdaLong: config_hybrid_search_lambda_long ?? hybrid.lambdaLong,
        lambdaShort: config_hybrid_search_lambda_short ?? hybrid.lambdaShort,
      });
    };
    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        isConfigLoaded,
        missingConfigProps,
        uxMode,
        setUxMode,
        search,
        app,
        appHeader,
        filters,
        summary,
        rerank,
        hybrid,
        searchHeader,
        exampleQuestions,
        auth,
        analytics,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error(
      "useConfigContext must be used within a ConfigContextProvider"
    );
  }
  return context;
};
