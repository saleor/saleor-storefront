import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { Button, Loader, ProductsFeatured } from "../../components";
import { generateCollectionUrl } from "../../core/utils";
import ArtisanVideo from "./Video";

import {
  ProductsList_categories,
  ProductsList_collections,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";

const srcVideo = `https://player.vimeo.com/video/441781948?title=0&byline=0&portrait=0&loop=1&autopause=0`;

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  collections: ProductsList_collections;
  projects: ProductsList_collections;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({
  loading,
  categories,
  collections,
  projects,
  backgroundImage,
  shop,
}) => {
  const collectionsExist = () => {
    return collections && collections.edges && collections.edges.length > 0;
  };
  const ProjectsExist = () => {
    return projects && projects.edges && projects.edges.length > 0;
  };
  const intl = useIntl();

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
        <div className="home-page__hero-text">
          <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="Unique Italian" />
              </h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <h1>
                <FormattedMessage defaultMessage="Design & Home Décor" />
              </h1>
            </span>
          </div>
        </div>
        <div className="home-page__hero-action">
          {loading && !collections ? (
            <Loader />
          ) : (
            collectionsExist() && (
              <Link
                to={generateCollectionUrl(
                  shop.homepageCollection.id,
                  shop.homepageCollection.name
                )}
              >
                <Button testingContext="homepageHeroActionButton">
                  <FormattedMessage defaultMessage="Explore Now" />
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
      <ProductsFeatured
        title={intl.formatMessage({ defaultMessage: "All Categories" })}
      />
      {collectionsExist() && (
        <div className="home-page__collections">
          <div className="container">
            <h3>
              <FormattedMessage defaultMessage="Latest Stories" />
            </h3>
            <div className="home-page__collections__list">
              {collections.edges.map(({ node: collection }) => (
                <div key={collection.id}>
                  <Link
                    to={generateCollectionUrl(collection.id, collection.name)}
                    key={collection.id}
                  >
                    <div
                      className={classNames(
                        "home-page__collections__list__image",
                        {
                          "home-page__collections__list__image--no-photo": !collection.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          collection.backgroundImage
                            ? collection.backgroundImage.url
                            : noPhotoImg
                        })`,
                      }}
                    />
                    <h3>{collection.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ArtisanVideo srcVideo={srcVideo} />
      {ProjectsExist() && (
        <div className="home-page__collections">
          <div className="container">
            <h3>
              <FormattedMessage defaultMessage="Ultimi Progetti" />
            </h3>
            <div className="home-page__collections__list">
              {projects.edges.map(({ node: project }) => (
                <div key={project.id}>
                  <Link
                    to={generateCollectionUrl(project.id, project.name)}
                    key={project.id}
                  >
                    <div
                      className={classNames(
                        "home-page__collections__list__image",
                        {
                          "home-page__collections__list__image--no-photo": !project.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          project.backgroundImage
                            ? project.backgroundImage.url
                            : noPhotoImg
                        })`,
                      }}
                    />
                    <h3>{project.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
