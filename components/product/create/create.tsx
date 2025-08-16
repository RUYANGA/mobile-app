import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateProduct = () => {
    let newErrors: { [key: string]: string } = {};
    if (!productName.trim()) newErrors.productName = "Product name is required.";
    if (!price.trim()) newErrors.price = "Price is required.";
    if (!unit.trim()) newErrors.unit = "Unit is required.";
    if (!quantity.trim()) newErrors.quantity = "Quantity is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!image) newErrors.image = "Product image is required.";
    setErrors(newErrors);
    
    // Only proceed if there are no errors
    if (Object.keys(newErrors).length === 0) {
      console.log({ productName, price, unit, quantity, description, image });
      Alert.alert("Success", "Product created successfully!");
      setProductName("");
      setPrice("");
      setUnit("");
      setQuantity("");
      setDescription("");
      setImage(null);
      setErrors({});
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f4f6fb",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: "#222",
          }}
        >
          Create Product
        </Text>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          {/* Product Name */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Product Name</Text>
          <TextInput
            placeholder="e.g. Banana"
            value={productName}
            onChangeText={setProductName}
            style={{
              borderWidth: 1,
              borderColor: errors.productName ? "#ff4d4f" : "#d1d5db",
              borderRadius: 8,
              padding: 12,
              marginBottom: errors.productName ? 2 : 12,
              backgroundColor: "#f8fafc",
            }}
          />
          {errors.productName ? (
            <Text style={{ color: "#ff4d4f", marginBottom: 10 }}>{errors.productName}</Text>
          ) : null}
          {/* Price */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Price</Text>
          <TextInput
            placeholder="e.g. 7000 frw"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={{
              borderWidth: 1,
              borderColor: errors.price ? "#ff4d4f" : "#d1d5db",
              borderRadius: 8,
              padding: 12,
              marginBottom: errors.price ? 2 : 12,
              backgroundColor: "#f8fafc",
            }}
          />
          {errors.price ? (
            <Text style={{ color: "#ff4d4f", marginBottom: 10 }}>{errors.price}</Text>
          ) : null}
          {/* Unit */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Unit</Text>
          <TextInput
            placeholder="e.g. 6"
            keyboardType="numeric"
            value={unit}
            onChangeText={setUnit}
            style={{
              borderWidth: 1,
              borderColor: errors.unit ? "#ff4d4f" : "#d1d5db",
              borderRadius: 8,
              padding: 12,
              marginBottom: errors.unit ? 2 : 12,
              backgroundColor: "#f8fafc",
            }}
          />
          {errors.unit ? (
            <Text style={{ color: "#ff4d4f", marginBottom: 10 }}>{errors.unit}</Text>
          ) : null}
          {/* Quantity */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Quantity</Text>
          <TextInput
            placeholder="e.g. 45kg"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            style={{
              borderWidth: 1,
              borderColor: errors.quantity ? "#ff4d4f" : "#d1d5db",
              borderRadius: 8,
              padding: 12,
              marginBottom: errors.quantity ? 2 : 12,
              backgroundColor: "#f8fafc",
            }}
          />
          {errors.quantity ? (
            <Text style={{ color: "#ff4d4f", marginBottom: 10 }}>{errors.quantity}</Text>
          ) : null}
          {/* Description */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Description</Text>
          <TextInput
            placeholder="Describe your product here..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            style={{
              borderWidth: 1,
              borderColor: errors.description ? "#ff4d4f" : "#d1d5db",
              borderRadius: 8,
              padding: 12,
              marginBottom: errors.description ? 2 : 16,
              backgroundColor: "#f8fafc",
              minHeight: 60,
            }}
          />
          {errors.description ? (
            <Text style={{ color: "#ff4d4f", marginBottom: 10 }}>{errors.description}</Text>
          ) : null}
          {/* Image Picker */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Product Image</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={{ alignItems: "center", marginBottom: 16 }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 160, height: 180, borderRadius: 12, marginBottom: 6 }}
              />
            ) : (
              <View
                style={{
                  width: 160,
                  height: 40,
                  backgroundColor: errors.image ? "#ffeaea" : "#e5e7eb",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text style={{ color: "#555" }}>Tap to Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.image ? (
            <Text style={{ color: "#ff4d4f", marginBottom: 10 }}>{errors.image}</Text>
          ) : null}
          <TouchableOpacity
            onPress={handleCreateProduct}
            style={{
              backgroundColor: "#007BFF",
              padding: 14,
              borderRadius: 8,
              marginTop: 10,
              shadowColor: "#007BFF",
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              Create Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
