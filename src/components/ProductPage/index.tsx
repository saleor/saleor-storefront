import * as React from 'react';
import { RouteComponentProps } from 'react-router' 

import './scss/index.scss';


const ProductPage: React.SFC<RouteComponentProps<any>> = ({match: {params: {slug=''}}}) => (
  <div>{ slug } page</div>
)

export default ProductPage;