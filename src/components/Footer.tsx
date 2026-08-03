import { View, Text, StyleSheet, useWindowDimensions, Platform, Pressable, Linking } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Footer() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;
  const logoImg = require('../../assets/images/logo.png');

  return (
    <View style={styles.footerWrapper}>
      <View style={[styles.footer, isDesktop && styles.footerDesktop]}>
        
        {/* Column 1: Logo & Tagline */}
        <View style={[styles.footerCol, isDesktop && { flex: 1.5 }]}>
          <View style={styles.logoContainer}>
            <Image source={logoImg} style={styles.footerLogoImg} contentFit="contain" />
          </View>
          <Text style={styles.footerTagline}>
            Exporting fresh cut flowers globally with care. From the heart of Kenya directly to your port of entry.
          </Text>
          
          {/* Social Media Icons */}
          <View style={styles.socialRow}>
            <Pressable 
              style={({ hovered }) => [styles.socialIcon, hovered && styles.socialIconHover]}
              onPress={() => Linking.openURL('https://facebook.com')}
            >
              <FontAwesome5 name="facebook-f" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable 
              style={({ hovered }) => [styles.socialIcon, hovered && styles.socialIconHover]}
              onPress={() => Linking.openURL('https://twitter.com')}
            >
              <FontAwesome5 name="twitter" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable 
              style={({ hovered }) => [styles.socialIcon, hovered && styles.socialIconHover]}
              onPress={() => Linking.openURL('https://linkedin.com')}
            >
              <FontAwesome5 name="linkedin-in" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable 
              style={({ hovered }) => [styles.socialIcon, hovered && styles.socialIconHover]}
              onPress={() => Linking.openURL('https://instagram.com')}
            >
              <FontAwesome5 name="instagram" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
        
        {/* Column 2: Quick Links */}
        <View style={styles.footerCol}>
          <Text style={styles.colTitle}>Quick Links</Text>
          <Link href="/" style={styles.linkWrapper}><Text style={styles.footerLinkText}>Home</Text></Link>
          <Link href="/about" style={styles.linkWrapper}><Text style={styles.footerLinkText}>Our Story</Text></Link>
          <Link href="/flowers" style={styles.linkWrapper}><Text style={styles.footerLinkText}>Floral Collection</Text></Link>
          <Link href="/contact" style={styles.linkWrapper}><Text style={styles.footerLinkText}>Contact Us</Text></Link>
        </View>

        {/* Column 3: Legal & Support */}
        <View style={styles.footerCol}>
          <Text style={styles.colTitle}>Legal & Support</Text>
          <Pressable style={styles.linkWrapper}><Text style={styles.footerLinkText}>Sustainability</Text></Pressable>
          <Pressable style={styles.linkWrapper}><Text style={styles.footerLinkText}>Shipping Policy</Text></Pressable>
          <Pressable style={styles.linkWrapper}><Text style={styles.footerLinkText}>Terms of Service</Text></Pressable>
          <Pressable style={styles.linkWrapper}><Text style={styles.footerLinkText}>Privacy Policy</Text></Pressable>
        </View>

        {/* Column 4: Contact Details */}
        <View style={[styles.footerCol, isDesktop && { flex: 1.2 }]}>
          <Text style={styles.colTitle}>Contact Us</Text>
          <View style={styles.contactItem}>
            <View style={{ width: 20, alignItems: 'center' }}>
              <FontAwesome5 name="envelope" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.footerLinkText}>
              info@halaflora.co.ke{'\n'}sales@halaflora.co.ke
            </Text>
          </View>
          <View style={styles.contactItem}>
            <View style={{ width: 20, alignItems: 'center' }}>
              <FontAwesome5 name="phone-alt" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.footerLinkText}>+254 700 123 456</Text>
          </View>
          <View style={styles.contactItem}>
            <View style={{ width: 20, alignItems: 'center' }}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.footerLinkText}>Nairobi, Kenya{'\n'}JKIA Export Zone</Text>
          </View>
        </View>
        
      </View>
      
      {/* Copyright */}
      <View style={styles.copyrightContainer}>
        <View style={styles.divider} />
        <Text style={styles.copyright}>
          © 2024 Hala Flora. Powered by <Text style={styles.poweredLink} onPress={() => Linking.openURL('https://royalsoftwares.co.ke/')}>Royal Software Solutions</Text>. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const COLORS = {
  white: '#FFFFFF',
  green: '#0F4C2A',
  greenLight: '#1B6C3C',
};

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: COLORS.green,
    width: '100%',
  },
  footer: {
    padding: 40,
    gap: 40,
  },
  footerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingTop: 60,
    gap: 30,
  },
  footerCol: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
  },
  logoContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 24px rgba(0,0,0,0.15)'
      } as any,
      default: {}
    })
  },
  footerLogoImg: {
    width: 130,
    height: 45,
  },
  footerTagline: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    maxWidth: 280,
    lineHeight: 22,
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
  },
  socialIconHover: {
    backgroundColor: '#26A65B',
    transform: [{ scale: 1.15 }],
  },
  socialIconText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  colTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  linkWrapper: {
    paddingVertical: 6,
  },
  footerLinkText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  contactIcon: {
    color: COLORS.white,
    fontSize: 16,
  },
  copyrightContainer: {
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 32,
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
    maxWidth: 1200,
  },
  copyright: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
  },
  poweredLink: {
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'underline',
  },
});
