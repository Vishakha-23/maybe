import React, { useState } from 'react';  
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import { login as firebaseLogin, signup as firebaseSignup } from '../authFunctions';

const { width: screenWidth } = Dimensions.get('window');

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      let user;
      if (isSignup) {
        user = await firebaseSignup(email, password);
        Alert.alert('Account Created 🎉', `Welcome, ${user.email}!`, [
          { text: 'Continue', onPress: () => router.replace('/(tabs)') },
        ]);
      } else {
        user = await firebaseLogin(email, password);
        Alert.alert('Welcome Back!', `Login successful, ${user.email}`, [
          { text: 'Continue', onPress: () => router.replace('/(tabs)') },
        ]);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      let message = 'Something went wrong!';
      if (error.code === 'auth/user-not-found') message = 'No user found with this email.';
      else if (error.code === 'auth/wrong-password') message = 'Incorrect password.';
      else if (error.code === 'auth/invalid-email') message = 'Invalid email address.';
      else if (error.code === 'auth/email-already-in-use') message = 'Email already registered.';
      else if (error.code === 'auth/weak-password') message = 'Password should be at least 6 characters.';
      Alert.alert(isSignup ? 'Signup Error' : 'Login Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}><Zap size={32} color="#FFFFFF" /></View>
              <Text style={styles.logoText}>BOLT</Text>
            </View>
            <Text style={styles.heroTitle}>UNLOCK YOUR{'\n'}POTENTIAL</Text>
            <Text style={styles.heroSubtitle}>
              Join the elite athletes tracking their performance with AI-powered insights
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>{isSignup ? 'Create Account' : 'Welcome Back'}</Text>
              <Text style={styles.formSubtitle}>
                {isSignup ? 'Sign up to start your journey' : 'Sign in to continue your journey'}
              </Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}><Mail size={20} color="#666666" /></View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email address"
                  placeholderTextColor="#999999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}><Lock size={20} color="#666666" /></View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#999999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} color="#666666" /> : <Eye size={20} color="#666666" />}
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              {!isSignup && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Login / Signup Button */}
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleAuth}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? (isSignup ? 'CREATING ACCOUNT...' : 'SIGNING IN...') : (isSignup ? 'SIGN UP' : 'SIGN IN')}
                </Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Toggle Login/Signup */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                </Text>
                <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
                  <Text style={styles.signUpLink}>{isSignup ? 'Sign In' : 'Sign Up'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Keep your existing styles here
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardView: { flex: 1 },
  scrollContainer: { flex: 1 },
  heroSection: { paddingHorizontal: 24, paddingVertical: 60, backgroundColor: '#000000', alignItems: 'center' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  logoIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  logoText: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', letterSpacing: 2 },
  heroTitle: { fontSize: 42, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', lineHeight: 48, marginBottom: 16, letterSpacing: -1 },
  heroSubtitle: { fontSize: 16, color: '#CCCCCC', textAlign: 'center', lineHeight: 24, maxWidth: '90%' },
  formSection: { paddingHorizontal: 24, paddingVertical: 40, backgroundColor: '#FFFFFF' },
  formContainer: { backgroundColor: '#F8F9FA', borderRadius: 20, padding: 32 },
  formTitle: { fontSize: 28, fontWeight: '900', color: '#000000', textAlign: 'center', marginBottom: 8, letterSpacing: -0.5 },
  formSubtitle: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 32 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  inputIcon: { paddingHorizontal: 16 },
  textInput: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#000000' },
  eyeIcon: { paddingHorizontal: 16 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { fontSize: 14, color: '#1E40AF', fontWeight: '600' },
  loginButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000', paddingVertical: 16, borderRadius: 12, marginBottom: 24, gap: 8 },
  loginButtonDisabled: { backgroundColor: '#666666' },
  loginButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { paddingHorizontal: 16, fontSize: 14, color: '#666666', fontWeight: '500' },
  socialButton: { backgroundColor: '#FFFFFF', paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', marginBottom: 12 },
  socialButtonText: { fontSize: 16, fontWeight: '600', color: '#000000' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  signUpText: { fontSize: 14, color: '#666666' },
  signUpLink: { fontSize: 14, color: '#1E40AF', fontWeight: '600' },
  featuresSection: { paddingHorizontal: 24, paddingVertical: 40, backgroundColor: '#F8F9FA' },
  featuresTitle: { fontSize: 20, fontWeight: '900', color: '#000000', textAlign: 'center', marginBottom: 24, letterSpacing: -0.5 },
  featuresGrid: { flexDirection: 'row', gap: 16 },
  featureCard: { flex: 1, backgroundColor: '#000000', borderRadius: 16, padding: 20, alignItems: 'center' },
  featureIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  featureTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  featureDescription: { fontSize: 12, color: '#CCCCCC', textAlign: 'center', lineHeight: 16 },
});
