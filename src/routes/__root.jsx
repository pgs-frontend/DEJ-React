import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import i18n from "../lang/i18n";
import { HeroUIProvider } from "@heroui/react";

export const Route = createRootRoute({
  component: Root,
  beforeLoad: ({ params }) => {
    const lang = params.lang;
    if (lang && i18n.language !== lang && i18n.languages.includes(lang)) {
      i18n.changeLanguage(lang);
    }
  },
});

function Root() {
  return (
    <HeroUIProvider>
      <Outlet />
    </HeroUIProvider>
  );
}
