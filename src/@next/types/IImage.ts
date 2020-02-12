import React from "react";

export interface IImage {
  url?: string;
  url2x?: string;
  alt?: string;
  children?: React.ReactElement;
  defaultImage?: string;
}
