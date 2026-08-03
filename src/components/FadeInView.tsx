import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, ViewStyle, StyleProp } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

export default function FadeInView({ children, delay = 0, style }: FadeInViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;
  const viewRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      // In react-native-web, viewRef.current points to the DOM node
      if (viewRef.current) {
        observer.observe(viewRef.current as any);
      }
      return () => observer.disconnect();
    } else {
      // Fallback for native iOS/Android (animates on mount)
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          delay: delay,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, delay, fadeAnim, translateY]);

  return (
    <Animated.View
      ref={viewRef}
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
