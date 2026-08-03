import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FadeInView from '../components/FadeInView';

const COLORS = {
  bg: '#FFF9F6',
  green: '#0F4C2A', // Dark green
  red: '#A31919',   // Dark red
  white: '#FFFFFF',
  textLight: '#666666',
};

export default function Home() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width > 768;
  const router = useRouter();

  const logoImg = require('../../assets/images/logo.png');
  const heroBg = require('../../assets/images/hero_bg.png');
  const aboutImg = require('../../assets/images/about.png');
  const rosesImg = require('../../assets/images/roses.png');
  const sprayImg = require('../../assets/images/spray.png');
  const fillersImg = require('../../assets/images/product.png');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Shared NavBar */}
      <NavBar activeRoute="home" />
      <View style={{ height: 120 }} />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <ImageBackground source={heroBg} style={styles.heroBg} contentFit="cover">
          <View style={styles.heroOverlay}>
            {/* Hero Content */}
            <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>FRESH FLOWERS, GLOBAL DELIVERY</Text>
              </View>
              
              <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
                Your Trusted Partner in Premium Fresh Cut Flower Exports
              </Text>
              
              <Text style={styles.heroSubtitle}>
                We bring the beauty of Kenya's finest blooms directly to your port of entry anywhere in the world. Farm fresh quality, carefully packed and shipped within hours.
              </Text>
              
              <View style={styles.buttonGroup}>
                <Pressable 
                  style={({ hovered }) => [styles.button, styles.buttonGreen, hovered && styles.buttonGreenHover]}
                  onPress={() => router.push('/flowers')}
                >
                  <FontAwesome5 name="seedling" size={16} color={COLORS.white} />
                  <Text style={styles.buttonText}>Explore Flowers</Text>
                </Pressable>
                <Pressable 
                  style={({ hovered }) => [styles.button, styles.buttonRed, hovered && styles.buttonRedHover]}
                  onPress={() => router.push('/contact')}
                >
                  <FontAwesome5 name="handshake" size={16} color={COLORS.white} />
                  <Text style={styles.buttonText}>Partner With Us</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* About Section */}
      <FadeInView style={[styles.section, isDesktop && styles.aboutDesktop]}>
        <View style={styles.aboutTextContainer}>
          <Text style={styles.sectionTitle}>Cultivating Elegance from the Heart of Kenya</Text>
          <Text style={styles.paragraph}>
            At Hala Flora, we believe that every stem tells a story. From our own farms and trusted partner growers in the high altitudes of Kenya, we cultivate blooms of unparalleled vibrancy and longevity.
          </Text>
          <Text style={styles.paragraph}>
            Our meticulous process ensures that from the moment a flower is hand-picked, to the time it arrives at your global destination, its freshness is perfectly preserved. We don't just export flowers; we deliver an experience of natural luxury.
          </Text>
          <Pressable 
            style={({ hovered }) => [styles.linkButton, hovered && styles.linkButtonHover]}
            onPress={() => router.push('/about')}
          >
            <Text style={[styles.linkButtonText, { color: '#B72929' }]}>Learn More About Us →</Text>
          </Pressable>
        </View>
        
        <Image source={aboutImg} style={[styles.aboutImage, isDesktop && styles.aboutImageDesktop]} contentFit="cover" />
      </FadeInView>

      {/* Collections Section */}
      <FadeInView style={[styles.section, styles.collectionsSection]} delay={200}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.preTitle}>OUR EXPERTISE</Text>
          <Text style={styles.sectionTitleCentered}>Premium Collections</Text>
        </View>
        
        {/* Collection Nav (fake) */}
        <View style={styles.collectionNav}>
          <Text style={styles.collectionNavTextActive}>Roses</Text>
          <Text style={styles.collectionNavText}>Spray Roses</Text>
          <Text style={styles.collectionNavText}>Summer & Fillers</Text>
        </View>

        <View style={[styles.collectionGrid, isDesktop && styles.collectionGridDesktop]}>
          <View style={[styles.collectionMainCard, isDesktop && styles.collectionMainDesktop]}>
            <ImageBackground source={rosesImg} style={styles.collectionCardBg} contentFit="cover">
               <View style={styles.cardGradientOverlay}>
                 <Text style={styles.cardTag}>Premium</Text>
                 <Text style={styles.cardTitle}>Premium Roses</Text>
                 <Text style={styles.cardDesc}>Lengths 50-80cm, Unmatched quality and vase life.</Text>
               </View>
            </ImageBackground>
          </View>
          
          <View style={[styles.collectionSideCards, isDesktop && styles.collectionSideDesktop]}>
            <View style={styles.collectionSmallCard}>
              <ImageBackground source={sprayImg} style={styles.collectionCardBg} contentFit="cover">
                <View style={styles.cardGradientOverlay}>
                  <Text style={styles.cardTitle}>Premium Spray Roses</Text>
                  <Text style={styles.cardDesc}>Sizes 4+, Lengths 40-70cm.</Text>
                </View>
              </ImageBackground>
            </View>
            
            <View style={styles.collectionSmallCard}>
              <ImageBackground source={fillersImg} style={styles.collectionCardBg} contentFit="cover">
                <View style={styles.cardGradientOverlay}>
                  <Text style={styles.cardTitle}>Summer & Fillers</Text>
                  <Text style={styles.cardDesc}>The perfect complement to any arrangement.</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
        
        <View style={styles.centerButtonContainer}>
          <Pressable 
            style={({ hovered }) => [styles.outlineButton, hovered && styles.outlineButtonHover]}
            onPress={() => router.push('/flowers')}
          >
            <Text style={styles.outlineButtonText}>See All Categories</Text>
          </Pressable>
        </View>
      </FadeInView>

      {/* Why Choose Us Section */}
      <FadeInView style={styles.section} delay={200}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.sectionTitleCentered}>Why Choose Hala Flora?</Text>
          <Text style={styles.sectionSubtitleCentered}>
            We streamline the global supply chain, ensuring that the distance between our farms and your market is bridged with absolute precision.
          </Text>
        </View>
        
        <View style={[styles.featuresGrid, isDesktop && styles.featuresGridDesktop]}>
          {[
            { icon: 'globe-africa', title: 'Global Reach', desc: 'Exporting to Europe, Australia, the Middle East, North America, and Asia with efficient weekly airfreight schedules.' },
            { icon: 'leaf', title: 'Farm Fresh Quality', desc: 'Hand-picked, meticulously inspected, and carefully packed within hours to preserve peak vibrance.' },
            { icon: 'clipboard-list', title: 'Custom Orders', desc: 'From bulk standing orders to highly specific custom floral assortments tailored to your market.' },
            { icon: 'handshake', title: 'Trusted Network', desc: 'Strong partnerships and professional logistics coordination to guarantee consistency and timely delivery.' }
          ].map((feature, i) => (
            <View key={i} style={[styles.featureCard, isDesktop && styles.featureCardDesktop]}>
              <View style={styles.featureIconContainer}>
                <FontAwesome5 name={feature.icon} size={24} color={COLORS.green} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          ))}
        </View>
      </FadeInView>

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
  heroSection: {
    width: '100%',
    height: 700,
  },
  heroBg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Slight dark overlay to make text readable
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
  },
  navInnerDesktop: {
    maxWidth: 1200,
    paddingHorizontal: 40,
  },
  navLogo: {
    width: 150,
    height: 60,
  },
  logoRed: {
    color: COLORS.red,
    fontSize: 20,
    fontWeight: 'bold',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 48,
  },
  navText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  navActive: {
    color: COLORS.red,
    textDecorationLine: 'underline',
  },
  navButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    transform: [{ scale: 1 }],
  },
  linkButtonHover: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.3,
    backgroundColor: '#FFE8E8',
  },
  linkButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 24,
  },
  heroContentDesktop: {
    maxWidth: 900,
  },
  heroPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  heroPillText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 40,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: serifFamily,
    fontWeight: 'bold',
    lineHeight: 48,
  },
  heroTitleDesktop: {
    fontSize: 64,
    lineHeight: 72,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    transform: [{ scale: 1 }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonHover: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.4,
  },
  buttonGreen: {
    backgroundColor: COLORS.green,
  },
  buttonGreenHover: {
    transform: [{ scale: 1.05 }],
    backgroundColor: '#1E824C',
    shadowOpacity: 0.4,
  },
  buttonRed: {
    backgroundColor: COLORS.red,
  },
  buttonRedHover: {
    transform: [{ scale: 1.05 }],
    backgroundColor: '#C83232',
    shadowOpacity: 0.4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 24,
    paddingVertical: 12,
    transform: [{ scale: 1 }],
  },
  aboutDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
    paddingHorizontal: 80,
  },
  aboutTextContainer: {
    flex: 1,
    maxWidth: 500,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 36,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 26,
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: COLORS.red,
    fontSize: 16,
    fontWeight: '600',
  },
  aboutImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginTop: 40,
  },
  aboutImageDesktop: {
    width: 400,
    height: 500,
    marginTop: 0,
  },
  collectionsSection: {
    backgroundColor: '#FFF2E9', // Slightly warmer bg for collections
  },
  sectionHeaderCentered: {
    alignItems: 'center',
    marginBottom: 40,
  },
  preTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitleCentered: {
    fontSize: 36,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionSubtitleCentered: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    maxWidth: 600,
    marginTop: 16,
    lineHeight: 24,
  },
  collectionNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 30,
  },
  collectionNavText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  collectionNavTextActive: {
    fontSize: 14,
    color: COLORS.red,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  collectionGrid: {
    flexDirection: 'column',
    gap: 20,
  },
  collectionGridDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
    height: 500,
  },
  collectionMainCard: {
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  collectionMainDesktop: {
    flex: 2,
    height: '100%',
  },
  collectionSideCards: {
    gap: 20,
  },
  collectionSideDesktop: {
    flex: 1,
    height: '100%',
  },
  collectionSmallCard: {
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
  },
  collectionCardBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardGradientOverlay: {
    padding: 24,
    backgroundColor: 'rgba(15, 76, 42, 0.8)', // Green gradient approximation
  },
  cardTag: {
    backgroundColor: COLORS.red,
    color: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  centerButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  outlineButtonText: {
    color: COLORS.textLight,
    fontWeight: '600',
    fontSize: 16,
  },
  featuresGrid: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
  },
  featuresGridDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  featureCard: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    flex: 1,
    alignItems: 'center',
  },
  featureCardDesktop: {
    minWidth: 250,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F6EFEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#F5EBE6',
    borderRadius: 20,
    marginBottom: 20,
  },
  footerLogoImg: {
    width: 150,
    height: 60,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.green,
    marginBottom: 12,
  },
  featureDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  footer: {
    backgroundColor: COLORS.green,
    padding: 40,
    alignItems: 'center',
    gap: 20,
  },
  footerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
  },
  footerLogo: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    overflow: 'hidden',
    // In design it's a white square with red text "HalaFlora", let's fake it:
    color: COLORS.red,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 30,
  },
  footerLinkText: {
    color: COLORS.white,
    fontSize: 14,
  },
  copyright: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});
