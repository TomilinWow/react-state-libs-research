
import React from "react";
import Store from "./MobXPixelApp.vm";

export const stores = Object.freeze({
  store: new Store()
});

export const storesContext = React.createContext(stores);
export const StoresProvider = storesContext.Provider;