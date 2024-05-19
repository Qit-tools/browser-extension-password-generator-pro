export interface HistoryItem {
  password: string;
  ISODate: string;
  score: number;
}

export interface HistoryData {
  historyList: HistoryItem[];
}
