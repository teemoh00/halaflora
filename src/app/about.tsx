import { Image, ImageBackground } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FadeInView from '../components/FadeInView';

const COLORS = {
  bg: '#FFFBF9', // Slightly warmer off-white for About page
  green: '#0F4C2A', // Dark green
  greenLight: '#26A65B', // Bright green for buttons
  greenText: '#1E824C',
  white: '#FFFFFF',
  textLight: '#666666',
  cardPink: '#FFF0F5',
  cardPurple: '#F4F0FB',
  cardGray: '#F0F2F0',
};

export default function About() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width > 768;
  const router = useRouter();

  const logoImg = require('../../assets/images/logo.png');
  const heroBg = require('../../assets/images/hero_bg.png'); // Reusing hero for now
  const aboutImg = require('../../assets/images/about.png');
  const warehouseImg = require('../../assets/images/warehouse.png');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Shared NavBar */}
      <NavBar activeRoute="about" />
      <View style={{ height: 120 }} />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <ImageBackground source={heroBg} style={styles.heroBg} contentFit="cover">
          <View style={styles.heroOverlay}>
            <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
              <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
                Our Story Roots in Kenyan Soil
              </Text>
              <Text style={styles.heroSubtitle}>
                From our dedicated farms to your port, discover the passion and precision behind every premium bloom we export.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Main Content Area */}
      <FadeInView style={[styles.mainSection, isDesktop && styles.mainSectionDesktop]}>
        
        {/* About Block */}
        <View style={[styles.aboutBlock, isDesktop && styles.aboutBlockDesktop]}>
          <View style={styles.aboutTextContainer}>
            <Text style={styles.sectionTitle}>Your Trusted Partner in Premium Fresh Cut Flower Exports</Text>
            <Text style={styles.paragraph}>
              At Hala Flora, we bring the beauty of Kenya's finest blooms directly to your port of entry anywhere in the world. From our own farms and trusted partner growers, we ensure high quality flowers and seamless global deliveries tailored to your needs.
            </Text>
            <Text style={styles.paragraph}>
              Our flowers are hand-picked, carefully packed, and shipped within hours to preserve freshness and vibrance, guaranteeing that every delivery meets the highest international standards.
            </Text>
          </View>
          <Image source={aboutImg} style={[styles.aboutImage, isDesktop && styles.aboutImageDesktop]} contentFit="cover" />
        </View>

        {/* Info Cards */}
        <View style={[styles.cardsGrid, isDesktop && styles.cardsGridDesktop]}>
          <View style={[styles.infoCard, { backgroundColor: COLORS.cardPink }]}>
            <View style={[styles.iconCircle, { justifyContent: 'center', alignItems: 'center' }]}>
              <FontAwesome5 name="globe-africa" size={20} color={COLORS.green} />
            </View>
            <Text style={styles.cardTitle}>GLOBAL REACH</Text>
            <Text style={styles.cardDesc}>Efficient weekly airfreight schedules to Europe, Australia, Middle East, North America, and Asia.</Text>
          </View>
          
          <View style={[styles.infoCard, { backgroundColor: COLORS.cardPurple }]}>
            <View style={[styles.iconCircle, { justifyContent: 'center', alignItems: 'center' }]}>
              <FontAwesome5 name="leaf" size={20} color={COLORS.green} />
            </View>
            <Text style={styles.cardTitle}>FARM FRESH QUALITY</Text>
            <Text style={styles.cardDesc}>Hand-picked, meticulously packed, and shipped within hours to preserve vibrance.</Text>
          </View>
          
          <View style={[styles.infoCard, { backgroundColor: COLORS.cardGray }]}>
            <View style={[styles.iconCircle, { justifyContent: 'center', alignItems: 'center' }]}>
              <FontAwesome5 name="handshake" size={20} color={COLORS.green} />
            </View>
            <Text style={styles.cardTitle}>TRUSTED NETWORK</Text>
            <Text style={styles.cardDesc}>Strong partnerships and professional logistics ensure consistency and timely delivery.</Text>
          </View>
        </View>

      </FadeInView>

      {/* Process Section */}
      <FadeInView style={styles.processSection} delay={150}>
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.preTitle}>OUR PROCESS</Text>
          <Text style={styles.sectionTitleCentered}>Farm to Port Logistics</Text>
          <Text style={styles.sectionSubtitleCentered}>
            A seamless journey ensuring your premium blooms arrive fresh, vibrant, and on time, every time.
          </Text>
        </View>

        <View style={[styles.timeline, isDesktop && styles.timelineDesktop]}>
          {isDesktop && <View style={styles.timelineLine} />}
          
          {[
            { step: '1. Browse & Select', desc: 'Choose from our premium flower selection at affordable prices.', icon: 'search' },
            { step: '2. Place Order', desc: 'Book with us through our seamless, intuitive ordering system.', icon: 'shopping-cart' },
            { step: '3. Logistics', desc: 'We handle custom clearance and logistics completely.', icon: 'plane' },
            { step: '4. Fresh Delivery', desc: 'Your flowers arrive fresh and on time, ready for market.', icon: 'check-circle' }
          ].map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={[styles.timelineCircle, { justifyContent: 'center', alignItems: 'center' }]}>
                <FontAwesome5 name={item.icon} size={30} color={COLORS.green} />
              </View>
              <Text style={styles.timelineTitle}>{item.step}</Text>
              <Text style={styles.timelineDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </FadeInView>

      {/* CTA Banner */}
      <FadeInView style={styles.ctaContainerWrapper} delay={150}>
        <View style={[styles.ctaBanner, isDesktop && styles.ctaBannerDesktop]}>
          <View style={[styles.ctaTextContainer, isDesktop && styles.ctaTextDesktop]}>
            <Text style={styles.ctaTitle}>Ready to Partner with Us?</Text>
            <Text style={styles.ctaDesc}>
              Contact us today to discuss bulk standing orders or custom floral assortments for your market.
            </Text>
            <Pressable 
              style={({ hovered }) => [styles.ctaButton, hovered && styles.ctaButtonHover]}
              onPress={() => router.push('/contact')}
            >
              <Text style={styles.ctaButtonText}>Submit Inquiry</Text>
            </Pressable>
          </View>
          <Image source={warehouseImg} style={[styles.ctaImage, isDesktop && styles.ctaImageDesktop]} contentFit="cover" />
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
  navbar: {
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
    color: COLORS.green,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.greenText,
  },
  navButton: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  navButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroSection: {
    width: '100%',
    height: 400,
  },
  heroBg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  heroContentDesktop: {
    maxWidth: 800,
  },
  heroTitle: {
    fontSize: 40,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: serifFamily,
    fontWeight: 'bold',
  },
  heroTitleDesktop: {
    fontSize: 64,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 26,
  },
  mainSection: {
    padding: 24,
    paddingTop: 60,
    gap: 60,
  },
  mainSectionDesktop: {
    paddingHorizontal: 80,
    maxWidth: 1400,
    alignSelf: 'center',
  },
  aboutBlock: {
    flexDirection: 'column',
    gap: 40,
    backgroundColor: COLORS.white,
    padding: 40,
    borderRadius: 20,
  },
  aboutBlockDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aboutTextContainer: {
    flex: 1,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 32,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  paragraph: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 26,
  },
  aboutImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  aboutImageDesktop: {
    width: 400,
    height: 400,
  },
  cardsGrid: {
    flexDirection: 'column',
    gap: 24,
  },
  cardsGridDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: COLORS.green,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  processSection: {
    backgroundColor: '#F8F9F8',
    padding: 40,
    paddingVertical: 80,
  },
  sectionHeaderCentered: {
    alignItems: 'center',
    marginBottom: 60,
  },
  preTitle: {
    fontSize: 12,
    color: COLORS.greenText,
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
  timeline: {
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center',
  },
  timelineDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 0,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  timelineLine: {
    position: 'absolute',
    top: 40,
    left: '10%',
    right: '10%',
    height: 1,
    backgroundColor: '#DDDDDD',
    zIndex: 0,
  },
  timelineItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
    zIndex: 1,
  },
  timelineCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  timelineTitle: {
    fontSize: 16,
    color: COLORS.green,
    fontWeight: 'bold',
  },
  timelineDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaContainerWrapper: {
    padding: 24,
    paddingBottom: 80,
    backgroundColor: '#F8F9F8',
  },
  ctaBanner: {
    flexDirection: 'column',
    backgroundColor: COLORS.green,
    borderRadius: 24,
    overflow: 'hidden',
  },
  ctaBannerDesktop: {
    flexDirection: 'row',
    maxWidth: 1200,
    alignSelf: 'center',
    alignItems: 'stretch',
  },
  ctaTextContainer: {
    padding: 40,
    gap: 20,
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  ctaTextDesktop: {
    padding: 80,
  },
  ctaTitle: {
    fontSize: 32,
    color: COLORS.white,
    fontFamily: serifFamily,
    fontWeight: 'bold',
  },
  ctaDesc: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    transform: [{ scale: 1 }],
  },
  ctaButtonHover: {
    transform: [{ scale: 1.05 }],
    backgroundColor: '#30C46B', // slightly brighter green
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaImage: {
    width: '100%',
    height: 300,
  },
  ctaImageDesktop: {
    width: '50%',
    height: '100%',
  },
  footer: {
    backgroundColor: '#0A3A20',
    padding: 40,
    alignItems: 'center',
    gap: 20,
  },
  footerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
  },
  footerLogoImg: {
    width: 150,
    height: 60,
    marginBottom: 8,
  },
  footerTagline: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 8,
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
