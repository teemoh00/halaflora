import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Platform, Animated, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const widthAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
      tension: 80,
    }).start();
  }, [isActive]);

  const underlineWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const underlineOpacity = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Link href={href as any} style={styles.linkWrapper}>
      <Text style={[styles.navText, isActive && styles.navActiveText]}>{label}</Text>
      <Animated.View
        style={[
          styles.activeIndicator,
          { width: underlineWidth, opacity: underlineOpacity },
        ]}
      />
    </Link>
  );
}

export default function NavBar({ activeRoute }: { activeRoute: string }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width > 768;
  const logoImg = require('../../assets/images/logo.png');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      Animated.timing(animValue, {
        toValue: isScrolled ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated interpolations
  const containerPaddingTop = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [insets.top + 20, insets.top + 8],
  });

  const innerPaddingV = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 6],
  });

  const logoWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 120],
  });

  const logoHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [55, 40],
  });

  const shadowOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.15],
  });

  return (
    <Animated.View style={[
      styles.navbarContainer,
      { paddingTop: containerPaddingTop },
    ]}>
      <Animated.View style={[
        styles.navInner,
        isDesktop && styles.navInnerDesktop,
        {
          paddingVertical: innerPaddingV,
          shadowOpacity: shadowOpacity,
        },
      ]}>
        
        {/* Left Side Swoosh Background Simulation */}
        <View style={styles.swooshBg} />

        {/* Logo */}
        <Animated.View style={{ width: logoWidth, height: logoHeight, marginLeft: 10 }}>
          <Image source={logoImg} style={{ width: '100%', height: '100%' }} contentFit="contain" />
        </Animated.View>
        
        {/* Links Container (Inner Pill) */}
        {isDesktop && (
          <View style={styles.linksPill}>
            <NavLink href="/" label="Home" isActive={activeRoute === 'home'} />
            <NavLink href="/about" label="About" isActive={activeRoute === 'about'} />
            <NavLink href="/flowers" label="Flowers" isActive={activeRoute === 'flowers'} />
            <NavLink href="/contact" label="Contact" isActive={activeRoute === 'contact'} />
          </View>
        )}
        
        {/* Right Actions */}
        <View style={styles.rightActions}>
          <Pressable 
            style={({ hovered }) => [styles.navButton, hovered && styles.navButtonHover]}
            onPress={() => Linking.openURL('https://wa.me/254700123456')}
          >
            <FontAwesome5 name="whatsapp" size={16} color={COLORS.white} />
            {isDesktop && <Text style={styles.navButtonText}>WhatsApp Us</Text>}
          </Pressable>
          {!isDesktop && (
            <Pressable onPress={() => setIsMenuOpen(!isMenuOpen)} style={{ padding: 8 }}>
              <FontAwesome5 name={isMenuOpen ? "times" : "bars"} size={20} color={COLORS.red} />
            </Pressable>
          )}
        </View>

      </Animated.View>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && !isDesktop && (
        <View style={styles.mobileMenu}>
          <Link href="/" style={styles.mobileMenuItem} onPress={() => setIsMenuOpen(false)}>
            <Text style={[styles.mobileMenuText, activeRoute === 'home' && styles.mobileMenuTextActive]}>Home</Text>
          </Link>
          <Link href="/about" style={styles.mobileMenuItem} onPress={() => setIsMenuOpen(false)}>
            <Text style={[styles.mobileMenuText, activeRoute === 'about' && styles.mobileMenuTextActive]}>About</Text>
          </Link>
          <Link href="/flowers" style={styles.mobileMenuItem} onPress={() => setIsMenuOpen(false)}>
            <Text style={[styles.mobileMenuText, activeRoute === 'flowers' && styles.mobileMenuTextActive]}>Flowers</Text>
          </Link>
          <Link href="/contact" style={styles.mobileMenuItem} onPress={() => setIsMenuOpen(false)}>
            <Text style={[styles.mobileMenuText, activeRoute === 'contact' && styles.mobileMenuTextActive]}>Contact</Text>
          </Link>
        </View>
      )}
    </Animated.View>
  );
}

const COLORS = {
  green: '#0C4A2A',
  greenLight: '#26A65B',
  red: '#B72929',
  bgSwoosh: '#E7F0EB',
  pillBg: '#F8F9FA',
  textLight: '#4A4A4A',
  activeText: '#0C4A2A',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  navbarContainer: {
    ...Platform.select({
      web: { position: 'fixed' as any, transition: 'all 0.25s ease' as any },
      default: { position: 'absolute' },
    }),
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 60,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 12,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      } as any,
      default: {},
    }),
  },
  navInnerDesktop: {
    maxWidth: 1200,
  },
  swooshBg: {
    position: 'absolute',
    top: -50,
    bottom: -50,
    left: -20,
    width: '25%',
    backgroundColor: COLORS.bgSwoosh,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    zIndex: -1,
  },
  linksPill: {
    flexDirection: 'row',
    backgroundColor: COLORS.pillBg,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 10,
  },
  linkWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  navActiveText: {
    color: COLORS.activeText,
    fontWeight: '600',
  },
  activeIndicator: {
    height: 3,
    backgroundColor: COLORS.red,
    marginTop: 6,
    borderRadius: 2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginRight: 10,
  },
  navButton: {
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: COLORS.greenLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1 }],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButtonHover: {
    backgroundColor: '#1E824C',
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.4,
  },
  navButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuDots: {
    fontSize: 20,
    color: '#888',
    letterSpacing: -2,
    transform: [{ rotate: '90deg' }],
  },
  mobileMenu: {
    backgroundColor: COLORS.white,
    marginTop: 8,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  mobileMenuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  mobileMenuText: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  mobileMenuTextActive: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
});
