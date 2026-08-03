import { useState } from 'react';
import { Image, ImageBackground } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable, Platform, TextInput, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const COLORS = {
  bg: '#FFF8F5',
  green: '#0C4A2A', 
  greenLight: '#1B7445', // For the circle icons
  red: '#B72929',
  white: '#FFFFFF',
  textLight: '#555555',
  cardBg: '#F9F1ED',
  inputBg: '#F5E8DF',
};

export default function Contact() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width > 768;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!email || !message) {
      if (Platform.OS === 'web') window.alert('Please fill out all required fields.');
      return;
    }
    const subject = `Inquiry from ${name || 'Website Visitor'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    Linking.openURL(`mailto:info@halaflora.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const logoImg = require('../../assets/images/logo.png');
  const mapImg = require('../../assets/images/about.png'); // Placeholder for map

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Shared NavBar */}
      <NavBar activeRoute="contact" />
      <View style={{ height: 120 }} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Get in Touch</Text>
        <Text style={styles.pageSubtitle}>
          Contact us for inquiries about exporting fresh cut flowers and our logistics services.
          Our team is ready to assist you.
        </Text>
      </View>

      {/* Main Grid */}
      <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
        
        {/* Left Column */}
        <View style={styles.leftCol}>
          
          {/* Sales Team Card */}
          <View style={styles.cardTan}>
            <Text style={styles.cardTitle}>Global Sales Team</Text>
            
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>✉</Text>
              </View>
              <View>
                <Text style={styles.contactLabel}>Email Us</Text>
                <Text style={styles.contactValue}>info@halaflora.co.ke</Text>
                <Text style={styles.contactValue}>sales@halaflora.co.ke</Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>✆</Text>
              </View>
              <View>
                <Text style={styles.contactLabel}>Call Us</Text>
                <Text style={styles.contactValue}>+254 783 900 674</Text>
                <Text style={styles.contactValue}>+254 741 322 254</Text>
              </View>
            </View>
            
            <Pressable 
              style={({ hovered }) => [styles.whatsappButton, hovered && styles.whatsappButtonHover]}
              onPress={() => Linking.openURL('https://wa.me/254700123456')}
            >
              <FontAwesome5 name="whatsapp" size={18} color="#FFFFFF" />
              <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
            </Pressable>
          </View>
          
          {/* Map Card */}
          <View style={styles.cardTanMap}>
            <ImageBackground source={mapImg} style={styles.mapImage} contentFit="cover">
              <View style={styles.mapOverlay}>
                <Text style={styles.mapPin}>📍 Nairobi, Kenya</Text>
              </View>
            </ImageBackground>
            <View style={styles.mapTextContainer}>
              <Text style={styles.mapDesc}>
                We export to Europe, Australia, the Middle East, North America, and Asia with efficient weekly airfreight schedules.
              </Text>
            </View>
          </View>

        </View>

        {/* Right Column (Form) */}
        <View style={styles.rightCol}>
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Send an Inquiry</Text>
            <Text style={styles.formSubtitle}>Fill out the form below and our team will get back to you shortly.</Text>
            
            <View style={[styles.formRow, isDesktop && styles.formRowDesktop]}>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>FIRST NAME</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Your First Name" 
                  placeholderTextColor="#A09085" 
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>EMAIL ADDRESS *</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Your Email Address" 
                  placeholderTextColor="#A09085" 
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>MESSAGE *</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="How can we help you?" 
                placeholderTextColor="#A09085"
                multiline
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
              />
            </View>
            
            <Pressable 
              style={({ hovered }) => [styles.submitButton, hovered && styles.submitButtonHover]}
              onPress={handleSubmit}
            >
              <FontAwesome5 name="paper-plane" size={16} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Send Message</Text>
            </Pressable>
          </View>
        </View>

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
  navbar: {
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 40,
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
    width: 120,
    height: 40,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  navText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  navActive: {
    color: COLORS.red,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    transform: [{ scale: 1 }],
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  footerLogoImg: {
    width: 150,
    height: 60,
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 40,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 24,
  },
  grid: {
    paddingHorizontal: 24,
    paddingBottom: 80,
    gap: 30,
    flexDirection: 'column',
  },
  gridDesktop: {
    flexDirection: 'row',
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'flex-start',
  },
  leftCol: {
    flex: 1,
    gap: 30,
  },
  rightCol: {
    flex: 1.5,
  },
  cardTan: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  cardTitle: {
    fontSize: 24,
    color: COLORS.green,
    fontFamily: serifFamily,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: COLORS.white,
    fontSize: 18,
  },
  contactLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 15,
    color: COLORS.green,
    fontWeight: '600',
    marginBottom: 2,
  },
  whatsappButton: {
    backgroundColor: COLORS.red,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    transform: [{ scale: 1 }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  whatsappButtonHover: {
    transform: [{ scale: 1.05 }],
    backgroundColor: '#30C46B',
  },
  whatsappButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardTanMap: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  mapOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.2)', // Slight gradient for text visibility
  },
  mapPin: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapTextContainer: {
    padding: 24,
  },
  mapDesc: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  formSubtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 30,
  },
  formRow: {
    flexDirection: 'column',
    gap: 20,
    marginBottom: 20,
  },
  formRowDesktop: {
    flexDirection: 'row',
  },
  formGroup: {
    flex: 1,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.green,
    marginBottom: 10,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.green,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.red,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 32,
    marginTop: 10,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
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
    fontFamily: serifFamily,
    fontWeight: 'bold',
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
