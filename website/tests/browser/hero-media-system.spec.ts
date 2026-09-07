import { expect, test } from "@playwright/test";

type HeroMediaSurface = {
  backgroundColor: string;
  backgroundImage: string;
  borderBottomColor: string;
  borderBottomStyle: string;
  borderBottomWidth: string;
  borderLeftColor: string;
  borderLeftStyle: string;
  borderLeftWidth: string;
  borderRightColor: string;
  borderRightStyle: string;
  borderRightWidth: string;
  borderTopColor: string;
  borderTopStyle: string;
  borderTopWidth: string;
  overflow: string;
};

async function heroMediaSurface(
  page: import("@playwright/test").Page,
  route: string,
  selector: string,
): Promise<HeroMediaSurface> {
  await page.goto(route);
  return page
    .locator(selector)
    .first()
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        borderBottomColor: style.borderBottomColor,
        borderBottomStyle: style.borderBottomStyle,
        borderBottomWidth: style.borderBottomWidth,
        borderLeftColor: style.borderLeftColor,
        borderLeftStyle: style.borderLeftStyle,
        borderLeftWidth: style.borderLeftWidth,
        borderRightColor: style.borderRightColor,
        borderRightStyle: style.borderRightStyle,
        borderRightWidth: style.borderRightWidth,
        borderTopColor: style.borderTopColor,
        borderTopStyle: style.borderTopStyle,
        borderTopWidth: style.borderTopWidth,
        overflow: style.overflow,
      };
    });
}

test("@component HomeHero, PageHero, and ProductHero share one light image-stage surface", async ({
  page,
}) => {
  const home = await heroMediaSurface(
    page,
    "/fixtures/home-hero/",
    "[data-home-hero-media]",
  );
  const pageHero = await heroMediaSurface(
    page,
    "/fixtures/page-hero/",
    "[data-page-hero] [data-page-hero-media]",
  );
  const product = await heroMediaSurface(
    page,
    "/fixtures/product-hero/",
    "[data-product-hero-media]",
  );

  expect(home).toEqual(pageHero);
  expect(product).toEqual(pageHero);
  expect(pageHero).toMatchObject({
    backgroundImage: "none",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    overflow: "hidden",
  });
});
