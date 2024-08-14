import { HistoryCombo } from "../model/HistoryCombo";

export function getCookie(): HistoryCombo[] {
  let histo = localStorage.getItem("history");
  if (histo !== null) {
    return JSON.parse(histo);
  } else {
    let histoNull: HistoryCombo[] = [];
    console.log("History unfound");
    return histoNull;
  }
}
export function addToCookie(history: HistoryCombo) {
  let cookie = getCookie();
  if (cookie.length !== 0 || cookie.length !== undefined) {
    cookie.push(history);
    localStorage.setItem("history", JSON.stringify(cookie));
  }
}

export function deleteToCookie(historyName: string) {
  let cookie = getCookie();
  if (cookie.length !== 0 || cookie.length !== undefined) {
    cookie = cookie.filter((history) => history.name !== historyName);
    localStorage.setItem("history", JSON.stringify(cookie));
  }
}
