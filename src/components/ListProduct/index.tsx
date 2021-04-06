import React from "react";

import ListProductItem from "../ListProductItem";
import * as S from "./styles";

const productList = [
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://hoaquafuji.com/storage/app/media/cam-ruot-do-my-fuji-0-3.jpg",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNAzmcA6VLz0f1n-6kRqTbVAfTTBvsTXkJOA&usqp=CAU",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3XooVOt9WHhCRqmvR8hhqIUlgBozqSDOYPg&usqp=CAU",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMHQYLRAVGxYmNDsxGuQ01EVEnFenRL-CIw&usqp=CAU",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4lz3yd7l3umbnrm1XYONwh_IgUxRWzloqA&usqp=CAU",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3XooVOt9WHhCRqmvR8hhqIUlgBozqSDOYPg&usqp=CAU",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMHQYLRAVGxYmNDsxGuQ01EVEnFenRL-CIw&usqp=CAU",
  },
  {
    name: "Lorem Ipsum is simply dummy text",
    price: "$100-$450",
    category: "category",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4lz3yd7l3umbnrm1XYONwh_IgUxRWzloqA&usqp=CAU",
  },
];

function ListProduct(props) {
  return (
    <S.Wrapper>
      <S.ListProduct>
        {productList.map((item, index) => {
          return (
            <S.FlexItem>
              <ListProductItem item={item} />
            </S.FlexItem>
          );
        })}
      </S.ListProduct>
    </S.Wrapper>
  );
}

export default ListProduct;
