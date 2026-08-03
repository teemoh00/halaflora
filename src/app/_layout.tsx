import { Slot } from 'expo-router';
import { View, StyleSheet, Animated, ActivityIndicator, Text } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Image } from 'expo-image';
import { FontAwesome5 } from '@expo/vector-icons';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const logoImg = require('../../assets/images/logo.png');

  useEffect(() => {
    // Simulate initial loading sequence for assets/fonts (or just for a premium feel)
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true, // Use native driver where possible
      }).start(() => {
        setIsLoading(false);
      });
    }, 1200); // 1.2s minimum loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* The main app content behind the loader */}
      <Slot />

      {/* The Loading Overlay */}
      {isLoading && (
        <Animated.View style={[styles.loadingOverlay, { opacity: fadeAnim }]}>
          <Image source={logoImg} style={styles.loadingLogo} contentFit="contain" />
          <ActivityIndicator size="large" color="#0F4C2A" style={{ marginTop: 30 }} />
          <Text style={styles.loadingText}>Preparing premium blooms...</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFBF9', // Warm white
    zIndex: 9999, // Ensure it covers everything
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 200,
    height: 80,
  },
  loadingText: {
    marginTop: 20,
    color: '#0F4C2A',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
