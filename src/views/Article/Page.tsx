import classNames from "classnames";
import * as React from "react";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import { usePreferences } from "@hooks";

import { RichTextContent } from "@components/atoms";
import { Breadcrumb, Breadcrumbs } from "../../components";

import { Article_page } from "./gqlTypes/Article";

import ArtisanVideo from "./Video";

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface PageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation: PageNavigationElement[];
  page: Article_page;
}
export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  headerImage,
  navigation,
  page,
}) => {
  const {
    preferences: { locale },
  } = usePreferences();

  const MetaBackground = page.metadata.find(
    element => element.key === "back_img"
  );

  const VertImg_1 = page.metadata.find(
    element => element.key.split(": ")[0] === "vert_img_1"
  );
  const VertImg_1Alt = VertImg_1 ? VertImg_1.key.split(": ")[1] : null;

  const VertImg_2 = page.metadata.find(
    element => element.key.split(": ")[0] === "vert_img_2"
  );
  const VertImg_2Alt = VertImg_2 ? VertImg_2.key.split(": ")[1] : null;

  const HorImg = page.metadata.find(
    element => element.key.split(": ")[0] === "hor_img"
  );
  const HorImg_Alt = HorImg ? HorImg.key.split(": ")[1] : null;

  const MetaVideo = page.metadata.find(element => element.key === "vimeo_id");
  const srcVideo = MetaVideo
    ? `https://player.vimeo.com/video/${MetaVideo.value}?title=0&byline=0&portrait=0&loop=1&autopause=0`
    : "";

  return (
    <div className="article-page">
      <div
        className="article-page__header"
        style={
          MetaBackground
            ? { backgroundImage: `url(${MetaBackground.value})` }
            : null
        }
      >
        <span className="article-page__header__title">
          <h1>
            {locale === "en" && page.translation?.title
              ? page.translation.title
              : page.title}
          </h1>
        </span>
      </div>
      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="article-page__container">
          <div className="article-page__navigation" />
          <div className="article-page__content">
            <RichTextContent
              descriptionJson={
                locale === "en" && page.translation?.contentJson
                  ? page.translation.contentJson
                  : page.contentJson
              }
            />
          </div>
        </div>
      </div>
      {MetaVideo ? <ArtisanVideo srcVideo={srcVideo} /> : ""}
      <div className="home-page__collections">
        <div className="container">
          <div className="home-page__collections__list">
            {VertImg_1 && (
              <div key={VertImg_1.key}>
                <div
                  className={classNames("home-page__collections__list__image")}
                  style={{
                    backgroundImage: `url(${VertImg_1.value})`,
                  }}
                />
                <b>{VertImg_1Alt}</b>
              </div>
            )}
            {VertImg_2 && (
              <div key={VertImg_2.key}>
                <div
                  className={classNames("home-page__collections__list__image")}
                  style={{
                    backgroundImage: `url(${VertImg_2.value})`,
                  }}
                />
                <b>{VertImg_2Alt}</b>
              </div>
            )}
            {HorImg && (
              <div key={HorImg.key}>
                <div
                  className={classNames("home-page__collections__list__image")}
                  style={{
                    backgroundImage: `url(${HorImg.value})`,
                  }}
                />
                <b>{HorImg_Alt}</b>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollUpButton
        style={{
          width: 30,
          backgroundColor: "#ffffff00",
          fill: "#c4c4c4",
          outline: 0,
        }}
        ToggledStyle={{ right: 50, bottom: 50 }}
      />
    </div>
  );
};
export default Page;
