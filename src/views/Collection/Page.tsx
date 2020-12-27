import classNames from "classnames";
import "./scss/index.scss";

import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

import * as React from "react";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import { useIntl } from "react-intl";

import { RichTextContent } from "@components/atoms";

import { commonMessages } from "@temp/intl";
import { IFilterAttributes, IFilters } from "@types";
import { usePreferences } from "@hooks";
import {
  ProductListHeader,
  ProductListHeaderStories,
  ProductListHeaderProjects,
} from "../../@next/components/molecules";
import {
  ProductList,
  ProductListStories,
  ProductListProjects,
} from "../../@next/components/organisms";
import { ProductsFeatured } from "../../components";
import { maybe } from "../../core/utils";

import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { Collection_collection } from "./gqlTypes/Collection";
import { CollectionProducts_collection_products } from "./gqlTypes/CollectionProducts";

import ArtisanVideo from "./Video";
import * as S from "./styles";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: Collection_collection;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: CollectionProducts_collection_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  collection,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const intl = useIntl();

  const {
    preferences: { locale },
  } = usePreferences();

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  const activeFiltersAttributesStories =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  const MetaBackground = collection.metadata.find(
    element => element.key === "back_img"
  );

  const VertImg_1 = collection.metadata.find(
    element => element.key.split(": ")[0] === "vert_img_1"
  );
  const VertImg_1Alt = VertImg_1 ? VertImg_1.key.split(": ")[1] : null;

  const VertImg_2 = collection.metadata.find(
    element => element.key.split(": ")[0] === "vert_img_2"
  );
  const VertImg_2Alt = VertImg_2 ? VertImg_2.key.split(": ")[1] : null;

  const HorImg = collection.metadata.find(
    element => element.key.split(": ")[0] === "hor_img"
  );
  const HorImg_Alt = HorImg ? HorImg.key.split(": ")[1] : null;

  const MetaVideo = collection.metadata.find(
    element => element.key === "vimeo_id"
  );
  const srcVideo = MetaVideo
    ? `https://player.vimeo.com/video/${MetaVideo.value}?title=0&byline=0&portrait=0&loop=1&autopause=0`
    : "";

  return (
    <div className="collection">
      {MetaBackground && (
        <div
          className="article-page__header"
          style={
            MetaBackground.value
              ? { backgroundImage: `url(${MetaBackground.value})` }
              : null
          }
        >
          <span className="article-page__header__title">
            <h1>
              {locale === "en" && collection.translation?.name
                ? collection.translation.name
                : collection.name}
            </h1>
          </span>
        </div>
      )}
      <div className="container">
        {canDisplayProducts &&
        !MetaBackground &&
        collection.id !== "Q29sbGVjdGlvbjo0OQ==" &&
        collection.id !== "Q29sbGVjdGlvbjo1NA==" ? (
          <div className="collection__container">
            <div className="collection__image">
              <img src={collection.backgroundImage.url} alt={collection.slug} />
            </div>
            <div className="collection__content">
              <S.SocialShareSelection>
                <S.SocialButton>
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon
                      path="/"
                      size={32}
                      bgStyle={{ fill: "#0D233F" }}
                    />
                  </FacebookShareButton>
                </S.SocialButton>
                <S.SocialButton>
                  <PinterestShareButton
                    url={window.location.href}
                    media="/images/favicons/favicon-16x16.png"
                  >
                    <PinterestIcon
                      path="/"
                      size={32}
                      bgStyle={{ fill: "#0D233F" }}
                    />
                  </PinterestShareButton>
                </S.SocialButton>
                <S.SocialButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon
                      path="/"
                      size={32}
                      bgStyle={{ fill: "#0D233F" }}
                    />
                  </TwitterShareButton>
                </S.SocialButton>
                <S.SocialButton>
                  <EmailShareButton url={window.location.href}>
                    <EmailIcon
                      path="/"
                      size={32}
                      bgStyle={{ fill: "#0D233F" }}
                    />
                  </EmailShareButton>
                </S.SocialButton>
              </S.SocialShareSelection>

              <h3>
                {locale === "en" && collection.translation?.name
                  ? collection.translation.name
                  : collection.name}
              </h3>
              <RichTextContent
                descriptionJson={
                  locale === "en" && collection.translation?.descriptionJson
                    ? collection.translation.descriptionJson
                    : collection.descriptionJson
                }
              />
            </div>
          </div>
        ) : (
          <div className="collection-blog">
            {collection.id !== "Q29sbGVjdGlvbjo0OQ==" &&
              collection.id !== "Q29sbGVjdGlvbjo1NA==" && (
                <RichTextContent
                  descriptionJson={
                    locale === "en" && collection.translation?.descriptionJson
                      ? collection.translation.descriptionJson
                      : collection.descriptionJson
                  }
                />
              )}
            <div className="home-page__collections">
              <div className="home-page__collections__list">
                {VertImg_1 && (
                  <div key={VertImg_1.key}>
                    <div
                      className={classNames(
                        "home-page__collections__list__image"
                      )}
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
                      className={classNames(
                        "home-page__collections__list__image"
                      )}
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
                      className={classNames(
                        "home-page__collections__list__image"
                      )}
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
        )}
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        {canDisplayProducts &&
        collection.id !== "Q29sbGVjdGlvbjo0OQ==" &&
        collection.id !== "Q29sbGVjdGlvbjo1NA==" ? (
          <ProductListHeader
            activeSortOption={activeSortOption}
            openFiltersMenu={() => setShowFilters(true)}
            numberOfProducts={products ? products.totalCount : 0}
            activeFilters={activeFilters}
            activeFiltersAttributes={activeFiltersAttributes}
            clearFilters={clearFilters}
            sortOptions={sortOptions}
            onChange={onOrder}
            onCloseFilterAttribute={onAttributeFiltersChange}
          />
        ) : collection.id === "Q29sbGVjdGlvbjo0OQ==" ? (
          <ProductListHeaderStories
            activeSortOption={activeSortOption}
            openFiltersMenu={() => setShowFilters(true)}
            numberOfProducts={products ? products.totalCount : 0}
            activeFilters={activeFilters}
            activeFiltersAttributes={activeFiltersAttributesStories}
            clearFilters={clearFilters}
            sortOptions={sortOptions}
            onChange={onOrder}
            onCloseFilterAttribute={onAttributeFiltersChange}
          />
        ) : (
          <ProductListHeaderProjects
            activeSortOption={activeSortOption}
            openFiltersMenu={() => setShowFilters(true)}
            numberOfProducts={products ? products.totalCount : 0}
            activeFilters={activeFilters}
            activeFiltersAttributes={activeFiltersAttributesStories}
            clearFilters={clearFilters}
            sortOptions={sortOptions}
            onChange={onOrder}
            onCloseFilterAttribute={onAttributeFiltersChange}
          />
        )}
        {MetaVideo ? <ArtisanVideo srcVideo={srcVideo} /> : ""}
        {canDisplayProducts &&
        collection.id !== "Q29sbGVjdGlvbjo0OQ==" &&
        collection.id !== "Q29sbGVjdGlvbjo1NA==" ? (
          <ProductList
            products={products.edges.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        ) : collection.id === "Q29sbGVjdGlvbjo0OQ==" ? (
          <ProductListStories
            products={products.edges.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        ) : (
          <ProductListProjects
            products={products.edges.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        )}
      </div>

      {!hasProducts && (
        <ProductsFeatured
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      )}
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
