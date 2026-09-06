import type { HomepageViewModel } from "./homepage-view-model";
import { homepageViewModel } from "./homepage-view-model";
import { translateLocalizedContent } from "./localized-view-model";
import { createSiteLayout, type SiteLocale } from "./site-shell-view-model";

export function localizedHomepageViewModel(
  locale: Exclude<SiteLocale, "en">,
): HomepageViewModel {
  const translated = translateLocalizedContent(homepageViewModel, locale);
  return {
    ...translated,
    layout: createSiteLayout(
      translated.layout.title,
      translated.layout.description,
      "/",
      locale,
    ),
  };
}
