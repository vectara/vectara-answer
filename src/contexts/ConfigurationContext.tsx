import {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";
import axios from "axios";

import { SummaryLanguage, SUMMARY_LANGUAGES } from "../views/search/types";

interface Config {
  // Search
  config_endpoint?: string;
  config_corpus_id?: string;
  config_customer_id?: string;
  config_api_key?: string;

  // App
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

  // Summary
  config_enable_summary?: string;
  config_summary_default_language?: string;
  config_summary_num_results?: number;
  config_summary_num_sentences?: number;

  // rerank
  config_rerank?: string;
  config_rerank_num_results?: number;
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
  sourceValueToLabelMap?: Record<string, string>;
};

type Summary = {
  isEnabled: boolean;
  defaultLanguage: string;
  summaryNumResults: number;
  summaryNumSentences: number;
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
};
type Rerank = { isEnabled: boolean; numResults?: number };

interface ConfigContextType {
  isConfigLoaded: boolean;
  missingConfigProps: string[];
  search: Search;
  app: App;
  appHeader: AppHeader;
  filters: Filters;
  summary: Summary;
  rerank: Rerank;
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

const isTrue = (value: string | undefined) => value === "True";

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
    numResults: 100,
  });

  const [summary, setSummary] = useState<Summary>({
    isEnabled: true,
    defaultLanguage: "auto",
    summaryNumResults: 7,
    summaryNumSentences: 3,
  });

  useEffect(() => {
    const loadConfig = async () => {
      let config: Config;
      if (isProduction) {
        const result = await fetchConfig();
        config = prefixConfig(result.data);

        const queriesResponse = await fetchQueries();
        if (queriesResponse) {
          const questions = queriesResponse.questions;
          if (questions) {
            setExampleQuestions(questions);
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

        // App
        config_app_title,
        config_enable_app_header,
        config_enable_app_footer,

        // Filters
        config_enable_source_filters,
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

        // rerank
        config_rerank,
        config_rerank_num_results,

        // Summary
        config_enable_summary,
        config_summary_default_language,
        config_summary_num_results,
        config_summary_num_sentences,
      } = config;

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
        sources,
        sourceValueToLabelMap,
      });

      setSummary({
        isEnabled: isTrue(config_enable_summary ?? "True"),
        defaultLanguage: validateLanguage(
          config_summary_default_language as SummaryLanguage,
          "auto"
        ),
        summaryNumResults: config_summary_num_results ?? 7,
        summaryNumSentences: config_summary_num_sentences ?? 3,
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
      });

      setRerank({
        isEnabled: isTrue(config_rerank),
        numResults: config_rerank_num_results ?? rerank.numResults,
      });
      console.log("Effect running");
    };
    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        isConfigLoaded,
        missingConfigProps,
        search,
        app,
        appHeader,
        filters,
        summary,
        rerank,
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
