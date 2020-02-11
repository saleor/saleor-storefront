import productPhoto from "./static.png";

export const oneImage = [
  {
    alt: "product",
    url: productPhoto,
    url2x: productPhoto,
  },
];

export const threeImages = [...oneImage, ...oneImage, ...oneImage];

export const eightImages = [
  ...oneImage,
  ...oneImage,
  ...oneImage,
  ...oneImage,
  ...oneImage,
  ...oneImage,
  ...oneImage,
  ...oneImage,
];
