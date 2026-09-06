# `LocalizedHomepage`

`LocalizedHomepage` reuses the English homepage composition and local assets while consuming a locale-projected view model for Ukrainian, Polish, and Czech. It owns no translations or route detection; the locale registry and authored content adapters remain the single source of those concerns.

The composition preserves server-rendered source order, no-JavaScript navigation, the immutable logo, and the same responsive behavior as the English and German homepages. Focused localization tests cover document language, same-route locale links, representative engineering terminology, and compact/wide containment.
