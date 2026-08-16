import React from "react";
import { FlatList, Image, StyleSheet, useWindowDimensions } from "react-native";

interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Props) {
  const { width } = useWindowDimensions();

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => `${item}-${index}`}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          resizeMode="cover"
          style={[
            styles.image,
            {
              width,
            },
          ]}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 420,
  },
});
