import { Image, ImageBackground } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FadeInView from '../components/FadeInView';
import { FontAwesome5 } from '@expo/vector-icons';

const COLORS = {
  bg: '#FFFFFF', 
  green: '#0C4A2A', 
  red: '#B72929',   
  textLight: '#555555',
  tan: '#F6EFEB',   
  greenLightBg: '#E7EFE9', 
  white: '#FFFFFF',
};

const FLOWER_DATA = [
  {
    id: 1,
    title: 'Premium Roses',
    subtitle: 'Headsize 5+, Length 50-80CM. The epitome of elegance.',
    category: 'Premium Roses',
    image: require('../../assets/images/roses.png'),
    tag: 'Best Seller',
  },
  {
    id: 2,
    title: 'Intermediate Roses',
    subtitle: 'Headsize 4+, Length 40-70CM. Versatile and beautiful.',
    category: 'Premium Roses',
    image: require('../../assets/images/about.png'),
  },
  {
    id: 3,
    title: 'Regular Spray Roses',
    subtitle: 'Buds 5+, Length 40-70CM. Perfect for vibrant, textured arrangements.',
    category: 'Spray Roses',
    image: require('../../assets/images/spray.png'),
    tag: 'Popular',
  },
  {
    id: 4,
    title: 'Gypsophila (Baby\'s Breath)',
    subtitle: 'Delicate, tiny white blooms. The perfect filler for any arrangement.',
    category: 'Fillers',
    image: require('../../assets/images/gypsophila.png'),
  },
  {
    id: 5,
    title: 'Hypericum Berries',
    subtitle: 'Fresh red berries to add contrast and texture to bouquets.',
    category: 'Fillers',
    image: require('../../assets/images/hypericum.png'),
  },
  {
    id: 6,
    title: 'Premium Carnations',
    subtitle: 'Dense, ruffled pink petals. Long-lasting and beautiful.',
    category: 'Carnations',
    image: require('../../assets/images/carnations.png'),
  },
  {
    id: 7,
    title: 'Seasonal Fillers',
    subtitle: 'Complete your arrangements with our fresh, seasonal selection of foliage.',
    category: 'Fillers',
    image: require('../../assets/images/product.png'),
  }
];

const CATEGORIES = ['All Categories', 'Premium Roses', 'Spray Roses', 'Carnations', 'Fillers'];

export default function Flowers() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width > 768;
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All Categories');

  const filteredData = FLOWER_DATA.filter(
    (item) => activeFilter === 'All Categories' || item.category === activeFilter
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Shared NavBar */}
      <NavBar activeRoute="flowers" />
      <View style={{ height: 120 }} />

      {/* Header */}
      <FadeInView style={[styles.headerSection, isDesktop && styles.headerSectionDesktop]}>
        <Text style={styles.pageTitle}>Our Floral Collection</Text>
        <Text style={styles.pageSubtitle}>
          Explore our curated selection of premium blooms, handpicked for quality and vibrance.
          Perfect for any occasion or global export.
        </Text>
      </FadeInView>

      {/* Filters */}
      <FadeInView style={styles.filterSection} delay={100}>
        <View style={styles.filterInner}>
          <Text style={styles.filterLabel}>≡ Filter By:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <Pressable
                  key={cat}
                  style={({ hovered }) => [
                    styles.filterPill,
                    isActive && styles.filterPillActive,
                    hovered && !isActive && styles.filterPillHover
                  ]}
                  onPress={() => setActiveFilter(cat)}
                >
                  <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </FadeInView>

      {/* Grid */}
      <View style={[styles.gridContainer, isDesktop && styles.gridContainerDesktop]}>
        {filteredData.length > 0 ? (
          filteredData.map((item, i) => (
            <FadeInView key={item.id} delay={150 + (i % 3) * 100} style={[styles.card, isDesktop && styles.cardDesktop]}>
              <View style={styles.cardImageContainer}>
                <Image source={item.image} style={styles.cardImage} contentFit="cover" />
                {item.tag && (
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{item.tag}</Text>
                  </View>
                )}
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Pressable 
                  style={({ hovered }) => [styles.detailsButton, hovered && styles.detailsButtonHover]}
                  onPress={() => router.push('/contact')}
                >
                  <Text style={styles.detailsButtonText}>Inquire</Text>
                  <FontAwesome5 name="arrow-right" size={14} color={COLORS.white} />
                </Pressable>
              </View>
            </FadeInView>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No flowers found for this category.</Text>
          </View>
        )}
      </View>

      {/* Shared Footer */}
      <Footer />
    </ScrollView>
  );
}

const serifFamily = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flexGrow: 1,
  },
  headerSection: {
    alignItems: 'center',
    padding: 24,
    marginTop: 40,
    marginBottom: 20,
  },
  headerSectionDesktop: {
    paddingHorizontal: 80,
  },
  pageTitle: {
    fontSize: 40,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 26,
  },
  filterSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  filterInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  filterLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  filterScroll: {
    gap: 12,
    alignItems: 'center',
  },
  filterPill: {
    backgroundColor: COLORS.tan,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    transform: [{ scale: 1 }],
  },
  filterPillHover: {
    backgroundColor: '#E7EFE9', // hover color
  },
  filterPillActive: {
    backgroundColor: COLORS.greenLightBg,
  },
  filterPillText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  gridContainer: {
    paddingHorizontal: 24,
    paddingBottom: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridContainerDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.tan,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 20,
  },
  cardDesktop: {
    width: '30%',
    minWidth: 300,
    marginBottom: 0,
  },
  cardImageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: COLORS.red,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 24,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: 20,
  },
  detailsButton: {
    backgroundColor: '#EBE1D8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    transform: [{ scale: 1 }],
  },
  detailsButtonHover: {
    transform: [{ scale: 1.05 }],
    backgroundColor: '#DFD2C5',
  },
  detailsButtonText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
  }
});
