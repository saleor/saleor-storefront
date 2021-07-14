import { createGlobalStyle } from "styled-components";

import { DefaultTheme, media } from ".";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    min-width: 320px;
    font-family: ${props => props.theme.typography.baseFontFamily};
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    color: ${props => props.theme.colors.baseFont};
  }

  input, textarea, button {
    font-family: inherit;
  }

  h1 {
    font-size: ${props => props.theme.typography.h1FontSize};
    line-height: ${props => props.theme.typography.h1LineHeight};

    ${props => media.smallScreen`
      font-size: ${props.theme.typography.h2FontSize};
    `}
  }

  h3 {
    font-size: ${props => props.theme.typography.h3FontSize};
    line-height: 1.7rem;
  }

  h4 {
    font-size: ${props => props.theme.typography.h4FontSize};
  }

  a {
    text-decoration: none;
    font-weight: normal;
    color: inherit;
  }

  p {
    line-height: 1.5rem;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  #root,
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    & > div:first-of-type {
      flex: 1;
    }
  }
  
  .image-gallery-slides{
    // overflow-x: visible !important;
    // overflow-y: visible !important;
    // overflow:visible !important;
  }
  img{
    max-width:100% !important;
    heigth:100% !important;
    object-fit:contain;
  }
  @media screen and (max-width: 1080px) {
    .customize-zoomimg{
      div{
        min-width:300px !important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .customize-zoomimg{
      div{
        min-width:200px !important;
      }
    }
  }
 
  .customize-zoomimg{
    position: absolute;
    top: 0;
    left: 0;
    div{
      width:fit-content;
      // z-index:1000;
      width:371px;
      img{
        width:100%;
        height:auto;
      }
    }
  }
  .js-image-zoom__zoomed-image{
    z-index:1000;
  }
  .wrapper{
    overflow:visible !important;
    min-height: 371px;
  }

  .product-page__product__info{
    width:50% !important;
  }

  .product-page__product__info--fixed {
    width:100% !important;
  }

  .product-page__product__gallery{
    // width:50% !important;
  }

  .carousel.carousel-slider .control-arrow {
    padding: 40px !important;
  }

  .carousel .slider-wrapper{
    max-height: 60vh !important;
  }

  .slider-slide > img {
    height:100%;
    // height:fit-content;
    object-fit: cover;
  }

  @media screen and (max-width: 540px){
    .product-page__product__gallery {
      width: 100% !important;
    }
    .product-page__product__info--fixed {
      width:100% !important;
    }
    .product-page__product__info {
      width:100% !important;
    }
  }
  @media and screen (max-width: 992px){
    .product-page__product__info--fixed {
      width:100% !important;
    }
  }
 
  @media and screen (min-width: 1140px){
    .product-page__product__info--fixed {
      width:100% !important;
    }
  }

 

`;
