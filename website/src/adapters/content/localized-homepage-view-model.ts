import type { HomepageViewModel } from "./homepage-view-model";
import { homepageViewModel } from "./homepage-view-model";
import { localizeViewModel } from "./localized-view-model";
import type { SiteLocale } from "./site-shell-view-model";

export function localizedHomepageViewModel(
  locale: Exclude<SiteLocale, "en">,
): HomepageViewModel {
  return localizeViewModel(homepageViewModel, locale);
}
