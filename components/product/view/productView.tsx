import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
    Alert,
    Dimensions,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  img: string;
  rating: number;
  sales: number;
  category: string;
  description?: string;
  specifications?: { [key: string]: string };
  inStock?: boolean;
  seller?: {
    name: string;
    rating: number;
    location: string;
  };
}

interface ProductViewProps {
  product?: Product;
  productId?: number;
}

// Optimized constant data - moved outside component to prevent recreation
const CATEGORY_DESCRIPTIONS = {
  Electronics: "Cutting-edge technology with premium build quality and advanced features. This product combines innovation with reliability to deliver exceptional performance for both professional and personal use.",
  Fashion: "Premium fashion item crafted with attention to detail and quality materials. Designed to complement your style while providing comfort and durability for everyday wear.",
  Dish: "High-quality kitchenware designed for both functionality and aesthetic appeal. Perfect for everyday cooking and special occasions, built to last with professional-grade materials.",
  Food: "Fresh, premium quality product sourced from trusted suppliers. Rich in nutrients and flavor, perfect for healthy cooking and gourmet preparations.",
  Books: "Comprehensive and well-researched content from expert authors. Essential reading for learning and professional development in the field.",
  Sports: "Professional-grade sports equipment designed for optimal performance and safety. Suitable for both beginners and advanced athletes."
};

const CATEGORY_SPECS = {
  Electronics: {
    "Brand": "Premium Brand",
    "Warranty": "2 Years International",
    "Connectivity": "Bluetooth, WiFi, USB-C",
    "Battery Life": "All-day usage",
    "Material": "Premium aluminum and glass",
    "Compatibility": "Universal",
    "Weight": "Lightweight design"
  },
  Fashion: {
    "Material": "Premium cotton blend",
    "Size Range": "XS - XXL available",
    "Care Instructions": "Machine washable",
    "Origin": "Imported",
    "Season": "All seasons",
    "Style": "Contemporary",
    "Fit": "Regular fit"
  },
  Dish: {
    "Material": "Food-grade stainless steel",
    "Dishwasher Safe": "Yes",
    "Heat Resistance": "Up to 300°C",
    "Coating": "Non-stick ceramic",
    "Handle": "Ergonomic design",
    "Set Includes": "Multiple pieces",
    "Origin": "Premium manufacturer"
  },
  Food: {
    "Origin": "Locally sourced",
    "Organic": "Yes",
    "Shelf Life": "Fresh for 7 days",
    "Storage": "Keep refrigerated",
    "Nutrition": "High in vitamins",
    "Packaging": "Eco-friendly",
    "Certification": "Organic certified"
  },
  Books: {
    "Pages": "300+ pages",
    "Language": "English",
    "Publisher": "Premium Publisher",
    "Edition": "Latest edition",
    "Format": "Paperback/Hardcover",
    "ISBN": "978-XXXXXXXXX",
    "Publication Year": "2024"
  },
  Sports: {
    "Material": "Professional grade",
    "Size": "Standard/Multiple sizes",
    "Weight": "Official specifications",
    "Durability": "Professional quality",
    "Certification": "Official standards",
    "Usage": "Indoor/Outdoor",
    "Maintenance": "Easy to clean"
  }
};

const DEFAULT_SPECS = {
  "Quality": "Premium",
  "Warranty": "1 Year",
  "Origin": "Imported",
  "Material": "High-grade materials"
};
const sampleProduct: Product = {
  id: 1,
  name: "iPhone 15 Pro Max",
  price: "1,200,000 RWF",
  originalPrice: "1,400,000 RWF",
  img: "https://picsum.photos/400/500?random=1",
  rating: 4.8,
  sales: 156,
  category: "Electronics",
  description: "The iPhone 15 Pro Max features the powerful A17 Pro chip, advanced camera system with 5x optical zoom, and a stunning Super Retina XDR display. Built with titanium for exceptional durability and lighter weight.",
  specifications: {
    "Display": "6.7-inch Super Retina XDR",
    "Chip": "A17 Pro",
    "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    "Storage": "256GB",
    "Battery": "Up to 29 hours video playback",
    "Material": "Titanium",
    "Colors": "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
  },
  inStock: true,
  seller: {
    name: "TechStore Rwanda",
    rating: 4.9,
    location: "Kigali, Rwanda"
  }
};

const ProductView: React.FC<ProductViewProps> = ({ product: passedProduct, productId }) => {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Memoized product details generation - only recalculates when product changes
  const product = useMemo(() => {
    const baseProduct = passedProduct || sampleProduct;
    
    // Use product ID as seed for consistent random values
    const seed = baseProduct.id || 1;
    const isInStock = (seed % 10) !== 0; // 90% chance of being in stock, but consistent
    const sellerRating = +(4.5 + (seed % 5) * 0.1).toFixed(1); // Consistent rating based on ID
    
    const category = baseProduct.category as keyof typeof CATEGORY_DESCRIPTIONS;
    
    return {
      ...baseProduct,
      description: CATEGORY_DESCRIPTIONS[category] || "High-quality product designed to meet your needs with excellent craftsmanship and attention to detail.",
      specifications: CATEGORY_SPECS[category] || DEFAULT_SPECS,
      inStock: isInStock,
      seller: {
        name: `${baseProduct.category} Store Rwanda`,
        rating: sellerRating,
        location: "Kigali, Rwanda"
      }
    };
  }, [passedProduct]);

  // Memoized product images - only recalculates when product ID changes
  const productImages = useMemo(() => [
    product.img,
    `https://picsum.photos/400/500?random=${product.id + 100}`,
    `https://picsum.photos/400/500?random=${product.id + 200}`,
    `https://picsum.photos/400/500?random=${product.id + 300}`,
  ], [product.id, product.img]);

  // Memoized discount calculation
  const discountInfo = useMemo(() => {
    if (!product.originalPrice) return null;
    
    const original = parseInt(product.originalPrice.replace(/[^\d]/g, ''));
    const current = parseInt(product.price.replace(/[^\d]/g, ''));
    const savings = Math.round(((original - current) / original) * 100);
    
    return { savings, isValid: savings > 0 };
  }, [product.originalPrice, product.price]);

  // Optimized callbacks
  const handleAddToCart = useCallback(() => {
    Alert.alert(
      "Added to Cart",
      `${product.name} (Qty: ${quantity}) has been added to your cart.`,
      [{ text: "OK" }]
    );
  }, [product.name, quantity]);

  const handleBuyNow = useCallback(() => {
    Alert.alert(
      "Purchase",
      `Proceed to checkout for ${product.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Proceed", onPress: () => console.log("Proceeding to checkout") }
      ]
    );
  }, [product.name]);

  const handleContactSeller = useCallback(() => {
    Alert.alert(
      "Contact Seller",
      `Contact ${product.seller?.name} about this product?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Contact", onPress: () => console.log("Contacting seller") }
      ]
    );
  }, [product.seller?.name]);

  const handleImageScroll = useCallback((event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setSelectedImageIndex(index);
  }, []);

  const incrementQuantity = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 20,
          backgroundColor: "#ffffff",
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#f1f5f9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          
          <Text style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1f2937",
          }}>
            Product Details
          </Text>
          
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#f1f5f9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Product Images */}
        <View style={{ backgroundColor: "#ffffff", paddingBottom: 20 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
          >
            {productImages.map((imageUri, index) => (
              <View key={index} style={{ width }}>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: width - 40,
                    height: 300,
                    marginHorizontal: 20,
                    borderRadius: 16,
                    backgroundColor: "#f1f5f9",
                  }}
                  contentFit="cover"
                />
              </View>
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 16,
          }}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: selectedImageIndex === index ? "#3b82f6" : "#d1d5db",
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={{
          backgroundColor: "#ffffff",
          marginTop: 8,
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}>
          {/* Category Badge */}
          <View style={{
            alignSelf: "flex-start",
            backgroundColor: "#eff6ff",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            marginBottom: 12,
          }}>
            <Text style={{
              color: "#3b82f6",
              fontSize: 12,
              fontWeight: "600",
            }}>
              {product.category}
            </Text>
          </View>

          {/* Product Name */}
          <Text style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: 8,
            lineHeight: 32,
          }}>
            {product.name}
          </Text>

          {/* Rating and Sales */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 16,
            }}>
              <Text style={{ color: "#fbbf24", marginRight: 4 }}>⭐</Text>
              <Text style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1f2937",
                marginRight: 4,
              }}>
                {product.rating}
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#6b7280",
              }}>
                (124 reviews)
              </Text>
            </View>
            <Text style={{
              fontSize: 14,
              color: "#6b7280",
            }}>
              {product.sales} sold
            </Text>
          </View>

          {/* Price */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: 4,
            }}>
              {product.price}
            </Text>
            {product.originalPrice && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{
                  fontSize: 16,
                  color: "#9ca3af",
                  textDecorationLine: "line-through",
                  marginRight: 8,
                }}>
                  {product.originalPrice}
                </Text>
                <View style={{
                  backgroundColor: "#dc2626",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 4,
                }}>
                  <Text style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "600",
                  }}>
                    SAVE {discountInfo?.isValid ? `${discountInfo.savings}%` : "14%"}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Stock Status */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: product.inStock ? "#10b981" : "#ef4444",
              marginRight: 8,
            }} />
            <Text style={{
              fontSize: 14,
              fontWeight: "600",
              color: product.inStock ? "#10b981" : "#ef4444",
            }}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={{
          backgroundColor: "#ffffff",
          marginTop: 8,
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: 12,
          }}>
            Description
          </Text>
          <Text style={{
            fontSize: 14,
            color: "#4b5563",
            lineHeight: 22,
          }}>
            {product.description}
          </Text>
        </View>

        {/* Specifications */}
        {product.specifications && (
          <View style={{
            backgroundColor: "#ffffff",
            marginTop: 8,
            paddingHorizontal: 20,
            paddingVertical: 24,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 16,
            }}>
              Specifications
            </Text>
            {Object.entries(product.specifications).map(([key, value], index) => (
              <View key={index} style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderBottomWidth: index < Object.entries(product.specifications!).length - 1 ? 1 : 0,
                borderBottomColor: "#f3f4f6",
              }}>
                <Text style={{
                  fontSize: 14,
                  color: "#6b7280",
                  flex: 1,
                }}>
                  {key}
                </Text>
                <Text style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#1f2937",
                  flex: 2,
                  textAlign: "right",
                }}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Seller Info */}
        {product.seller && (
          <View style={{
            backgroundColor: "#ffffff",
            marginTop: 8,
            paddingHorizontal: 20,
            paddingVertical: 24,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 16,
            }}>
              Seller Information
            </Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: 4,
                }}>
                  {product.seller.name}
                </Text>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}>
                  <Text style={{ color: "#fbbf24", marginRight: 4 }}>⭐</Text>
                  <Text style={{
                    fontSize: 14,
                    color: "#6b7280",
                  }}>
                    {product.seller.rating} seller rating
                  </Text>
                </View>
                <Text style={{
                  fontSize: 14,
                  color: "#6b7280",
                }}>
                  📍 {product.seller.location}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleContactSeller}
                style={{
                  backgroundColor: "#f1f5f9",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                }}
              >
                <Text style={{
                  color: "#475569",
                  fontWeight: "600",
                  fontSize: 14,
                }}>
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Spacing for bottom buttons */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: "#f3f4f6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
      }}>
        {/* Quantity Selector */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#1f2937",
            marginRight: 16,
          }}>
            Quantity:
          </Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#e2e8f0",
            borderRadius: 8,
          }}>
            <TouchableOpacity
              onPress={decrementQuantity}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#6b7280",
              }}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#1f2937",
              paddingHorizontal: 16,
              paddingVertical: 8,
              minWidth: 40,
              textAlign: "center",
            }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={incrementQuantity}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#6b7280",
              }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{
          flexDirection: "row",
          gap: 12,
        }}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              flex: 1,
              backgroundColor: "#f1f5f9",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <Text style={{
              color: "#475569",
              fontWeight: "600",
              fontSize: 16,
            }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleBuyNow}
            disabled={!product.inStock}
            style={{
              flex: 1,
              backgroundColor: product.inStock ? "#3b82f6" : "#9ca3af",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              shadowColor: product.inStock ? "#3b82f6" : "transparent",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{
              color: "white",
              fontWeight: "600",
              fontSize: 16,
            }}>
              {product.inStock ? "Buy Now" : "Out of Stock"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductView;
