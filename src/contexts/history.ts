import { SummaryLanguage } from "../views/search/types";

export type HistoryItem = {
  query: string;
  filter: string;
  language: SummaryLanguage;
  mode: string;
  date: string;
};

// eslint-disable-next-line
const HISTORY_KEY = `${location.hostname}:searchHistory`;

export const addHistoryItem = (
  {
    query,
    filter,
    language,
    mode,
  }: { query: string; filter: string; language: SummaryLanguage; mode: string },
  history: HistoryItem[]
) => {
  const date = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());
  const newHistoryItem = { query, filter, language, mode, date };
  const newHistory = [
    newHistoryItem,
    ...history.filter((item) => item.query !== query),
  ];
  persistHistory(newHistory);
  return newHistory;
};

export const deleteHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const retrieveHistory = () => {
  const serializedHistory = localStorage.getItem(HISTORY_KEY);
  if (!serializedHistory) return [];
  return JSON.parse(serializedHistory);
};

export const persistHistory = (history: HistoryItem[]) => {
  const serializedHistory = JSON.stringify(history);
  localStorage.setItem(HISTORY_KEY, serializedHistory);
};
