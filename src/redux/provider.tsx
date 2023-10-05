"use client";

import store from "../redux/store.js";

import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}> {children}</Provider>;
}
