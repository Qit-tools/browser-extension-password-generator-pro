import "~/global.css";

import { createElement, render } from "preact";

import { GenerateOptionsProvider } from "~/context/generate-options";
import { LocaleProvider } from "~/context/locale";
import Popup from "~/popup/popup";

render(
  createElement(
    LocaleProvider,
    null,
    createElement(GenerateOptionsProvider, null, createElement(Popup, null)),
  ),
  document.getElementById("app") as HTMLElement,
);
