import { sizes } from "@/src/theme/size";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  images: string[];
}

interface PaginationDotProps {
  active: boolean;
}

function PaginationDot({ active }: PaginationDotProps) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [active, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 18],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <View style={styles.dotContainer}>
      <Animated.View
        style={[
          styles.dot,
          {
            width,
            opacity,
          },
        ]}
      />
    </View>
  );
}

export default function ImageCarousel({ images }: Props) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);

          setCurrentIndex(index);
        }}
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

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <PaginationDot key={index} active={index === currentIndex} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  image: {
    height: 420,
  },

  pagination: {
    position: "absolute",
    bottom: sizes["6xl"],
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    elevation: 10,
  },

  dotContainer: {
    width: 18,
    height: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
});
