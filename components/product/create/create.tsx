import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos."
      );
      return;
    }

    // Launch image library (new syntax for mediaTypes)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // ✅ Updated to avoid deprecated MediaTypeOptions
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateProduct = () => {
    if (!productName || !price) {
      Alert.alert("Error", "Product name and price are required!");
      return;
    }
    console.log({ name: productName, price, description, image });
    Alert.alert("Success", "Product created successfully!");
    setProductName("");
    setPrice("");
    setDescription("");
    setImage(null);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
      }}
    >
    
<View className="flex-1 justify-center ">

      {/* Title */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        Create Product
      </Text>

      {/* Form */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 15,
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 6,
        }}
      >
        <Text className="mb-3">Name Product</Text>
        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        />
        <Text className="mb-3">Price</Text>
        <TextInput
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        />
        <Text className="mb-3">Descriptions</Text>
        <TextInput
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
            height: 80,
          }}
        />

          {/* Image Picker */}
        
      <TouchableOpacity
        onPress={pickImage}
        style={{ alignItems: "center", marginBottom: 20 }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 160, height: 100, borderRadius: 10 }}
          />
        ) : (
          <View
            style={{
              width: 180,
              height: 30,
              backgroundColor: "#ddd",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#555" }}>Tap to Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCreateProduct}
          style={{ backgroundColor: "#007BFF", padding: 12, borderRadius: 8 }}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
          >
            Create Product
          </Text>
        </TouchableOpacity>
      </View>
</View>
    </ScrollView>
  );
}
