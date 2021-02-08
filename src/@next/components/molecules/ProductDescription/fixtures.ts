export const attributes = [
  {
    attribute: { name: "Author" },
    values: [
      {
        name: "John Doe",
      },
    ],
  },
  {
    attribute: { name: "Country of Manufacture" },
    values: [
      {
        name: "Poland",
      },
      {
        name: "China",
      },
    ],
  },
  {
    attribute: { name: "Size" },
    values: [
      {
        name: "40x40cm",
      },
    ],
  },
  {
    attribute: { name: "Material" },
    values: [
      {
        name: "Polystyrene",
      },
    ],
  },
  {
    attribute: { name: "Manufacture time" },
    values: [
      {
        name: "2 to 4 weeks",
      },
    ],
  },
  {
    attribute: { name: "SKU" },
    values: [
      {
        name: "1244-SGG",
      },
    ],
  },
];

export const description =
  "Tonight, my love, let us take fat brushes and paint the skies with the shades of nebula tides. Get the dark, moody shades of the ether.";

export const descriptionJSON = JSON.stringify({
  blocks: [
    {
      data: {
        text: description,
      },
      type: "paragraph",
    },
  ],
});
