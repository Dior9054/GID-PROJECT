
import { IntlProvider } from "react-intl";
import Route from "./routes";
import English from "./languages/en_US.json";
import Russion from "./languages/ru_RU.json";
import Uzbek from "./languages/uz_UZ.json";
import Kurguz from "./languages/kg_KG.json";
import { createContext, useEffect, useState } from "react";

export const LanguageChange: any = createContext("")

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("language") || "ru")

  let language;

  if (lang == "ru") {
    language = Russion
  } else if (lang == "en") {
    language = English
  } else if (lang == "uz") {
    language = Uzbek
  } else if (lang == "kg") {
    language = Kurguz
  }

  useEffect(() => {
    localStorage.setItem("language", lang)
  }, [lang])

  return (
    <IntlProvider locale={lang} messages={language}>
      <LanguageChange.Provider value={[lang, setLang]}>
        <Route />
      </LanguageChange.Provider>
    </IntlProvider>
  )
}
