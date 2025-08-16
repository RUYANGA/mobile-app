import { useLocalSearchParams } from "expo-router";
import React from "react";
import ProductView from "../../../../components/product/view/productView";

export default function ProductViewPage() {
  const { productData } = useLocalSearchParams();
  
  let product = null;
  if (productData && typeof productData === 'string') {
    try {
      product = JSON.parse(productData);
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }
  
  return <ProductView product={product} />;
}
