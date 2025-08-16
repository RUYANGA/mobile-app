import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

const categories = [
  { id: 1, name: "Electronics", icon: "📱" },
  { id: 2, name: "Fashion", icon: "👗" },
  { id: 3, name: "Dish", icon: "🍽️" },
  { id: 4, name: "Food", icon: "🍎" },
  { id: 5, name: "Books", icon: "📚" },
  { id: 6, name: "Sports", icon: "⚽" },
];

// Product templates for each category - Reduced to essential items
const productTemplates = {
  Electronics: [
    "iPhone 15 Pro", "Samsung Galaxy S24", "MacBook Pro", "iPad Air", "AirPods Pro", "Sony Headphones",
    "Apple Watch", "Dell Laptop", "Nintendo Switch", "PlayStation 5"
  ],
  Fashion: [
    "Nike Air Max", "Adidas Ultraboost", "Designer Jeans", "Leather Jacket", "Summer Dress", "Winter Coat",
    "Luxury Watch", "Designer Handbag", "Sunglasses", "Perfume"
  ],
  Dish: [
    "Dinner Set", "Cookware Set", "Non-stick Pan", "Glass Bowls", "Chef Knife", "Cutting Board"
  ],
  Food: [
    "Organic Fruits", "Fresh Vegetables", "Premium Coffee", "Organic Rice", "Olive Oil", "Honey"
  ],
  Books: [
    "Programming Guide", "Business Book", "Self-Help", "Cook Book", "Travel Guide", "Art Book"
  ],
  Sports: [
    "Football", "Basketball", "Tennis Racket", "Yoga Mat", "Dumbbells", "Running Shoes"
  ]
};

// Optimized function to generate smaller dataset
const generateProducts = () => {
  const products = [];
  const categoryNames = Object.keys(productTemplates) as (keyof typeof productTemplates)[];
  
  // Reduced to 50 products for better performance
  for (let i = 1; i <= 50; i++) {
    const categoryIndex = (i - 1) % categoryNames.length;
    const category = categoryNames[categoryIndex];
    const categoryProducts = productTemplates[category];
    const productIndex = Math.floor((i - 1) / categoryNames.length) % categoryProducts.length;
    const productName = categoryProducts[productIndex];
    
    // Use deterministic values based on ID for consistency
    const basePrice = 50000 + (i * 15000) + (i % 7) * 10000; // Deterministic pricing
    const hasDiscount = i % 4 === 0; // Every 4th item has discount
    const originalPrice = hasDiscount ? Math.floor(basePrice * 1.25) : null;
    
    // Deterministic rating and sales
    const rating = +(3.5 + (i % 15) * 0.1).toFixed(1);
    const sales = 10 + (i * 8) + (i % 13) * 5;
    
    products.push({
      id: i,
      name: `${productName}`,
      price: `${basePrice.toLocaleString()} RWF`,
      originalPrice: originalPrice ? `${originalPrice.toLocaleString()} RWF` : null,
      img: `https://picsum.photos/200/300?random=${i}`,
      rating: rating,
      sales: sales,
      category: category
    });
  }
  
  return products;
};

// Generate products once and cache them
const products = generateProducts();

const SellerProductPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Memoize filtered products to avoid recalculation on every render
  const filteredProducts = useMemo(() => {
    return selectedCategory === "All" 
      ? products 
      : products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  // Memoize navigation function
  const handleAddProduct = useCallback(() => {
    router.push("/(main)/(product)/create" as any);
  }, [router]);

  // Memoize category selection
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Memoize product actions
  const handleProductEdit = useCallback((productName: string) => {
    console.log(`Edit ${productName}`);
  }, []);

  const handleProductView = useCallback((product: any) => {
    router.push({
      pathname: "/(main)/(product)/view",
      params: { 
        productData: JSON.stringify(product)
      }
    } as any);
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Professional Header */}
        <View
          style={{
            backgroundColor: "#ffffff",
            paddingTop: 50,
            paddingHorizontal: 20,
            paddingBottom: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            zIndex: 10,
          }}
        >
          {/* Top Header */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
            <View>
              <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: 4,
              }}>
                Seller Dashboard
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#6b7280",
              }}>
                Manage your products and sales
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={handleAddProduct}
              style={{
                backgroundColor: "#3b82f6",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{
                color: "white",
                fontWeight: "600",
                fontSize: 14,
              }}>
                + Add Product
              </Text>
            </TouchableOpacity>
          </View>

          {/* Categories Section */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 12,
            }}>
              Categories
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              <TouchableOpacity
                onPress={() => handleCategorySelect("All")}
                style={{
                  backgroundColor: selectedCategory === "All" ? "#3b82f6" : "#f1f5f9",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginRight: 12,
                  borderWidth: 1,
                  borderColor: selectedCategory === "All" ? "#3b82f6" : "#e2e8f0",
                }}
              >
                <Text style={{
                  color: selectedCategory === "All" ? "white" : "#475569",
                  fontWeight: "500",
                  fontSize: 14,
                }}>
                  All Products
                </Text>
              </TouchableOpacity>
              
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleCategorySelect(cat.name)}
                  style={{
                    backgroundColor: selectedCategory === cat.name ? "#3b82f6" : "#f1f5f9",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: selectedCategory === cat.name ? "#3b82f6" : "#e2e8f0",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ marginRight: 6, fontSize: 16 }}>{cat.icon}</Text>
                  <Text style={{
                    color: selectedCategory === cat.name ? "white" : "#475569",
                    fontWeight: "500",
                    fontSize: 14,
                  }}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Products Header */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
            }}>
              Products ({filteredProducts.length})
            </Text>
            <TouchableOpacity>
              <Text style={{
                color: "#3b82f6",
                fontWeight: "500",
                fontSize: 14,
              }}>
                Sort by
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Professional Products Grid */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}>
            {filteredProducts.map((product) => (
              <View
                key={product.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 20,
                  width: "48%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                {/* Product Image */}
                <View style={{ position: "relative", marginBottom: 12 }}>
                  <Image
                    source={{ uri: product.img }}
                    style={{ 
                      height: 140, 
                      borderRadius: 12,
                      backgroundColor: "#f1f5f9",
                    }}
                    contentFit="cover"
                  />
                  {product.originalPrice && (
                    <View style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor: "#dc2626",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                    }}>
                      <Text style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "600",
                      }}>
                        SALE
                      </Text>
                    </View>
                  )}
                </View>

                {/* Product Info */}
                <Text style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: 6,
                  lineHeight: 20,
                }} numberOfLines={2}>
                  {product.name}
                </Text>

                {/* Rating and Sales */}
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}>
                  <Text style={{ color: "#fbbf24", marginRight: 4 }}>⭐</Text>
                  <Text style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginRight: 8,
                  }}>
                    {product.rating}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: "#6b7280",
                  }}>
                    {product.sales} sold
                  </Text>
                </View>

                {/* Price */}
                <View style={{ marginBottom: 12 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: 2,
                  }}>
                    {product.price}
                  </Text>
                  {product.originalPrice && (
                    <Text style={{
                      fontSize: 12,
                      color: "#9ca3af",
                      textDecorationLine: "line-through",
                    }}>
                      {product.originalPrice}
                    </Text>
                  )}
                </View>

                {/* Action Buttons */}
                <View style={{
                  flexDirection: "row",
                  gap: 8,
                }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: "#3b82f6",
                      paddingVertical: 10,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                    onPress={() => handleProductEdit(product.name)}
                  >
                    <Text style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 12,
                    }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: "#f1f5f9",
                      paddingVertical: 10,
                      borderRadius: 8,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "#e2e8f0",
                    }}
                    onPress={() => handleProductView(product)}
                  >
                    <Text style={{
                      color: "#475569",
                      fontWeight: "600",
                      fontSize: 12,
                    }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <View style={{
              alignItems: "center",
              paddingVertical: 60,
            }}>
              <Text style={{
                fontSize: 48,
                marginBottom: 16,
              }}>
                📦
              </Text>
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: 8,
              }}>
                No products found
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#6b7280",
                textAlign: "center",
                marginBottom: 24,
              }}>
                No products match the selected category.{'\n'}Try selecting a different category.
              </Text>
              <TouchableOpacity
                onPress={() => handleCategorySelect("All")}
                style={{
                  backgroundColor: "#3b82f6",
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}
              >
                <Text style={{
                  color: "white",
                  fontWeight: "600",
                }}>
                  View All Products
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SellerProductPage;
