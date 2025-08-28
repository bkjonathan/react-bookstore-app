import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '@/assets/styles/signup.styles';
import InputGroup from '@/components/common/InputGroup';
import { useRouter } from 'expo-router';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const handleSignUp = () => {
    // TODO: integrate with backend/auth
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm🐛</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>
          <View style={styles.formContainer}>
            <InputGroup
              label="Full Name"
              iconName="person-outline"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
              textContentType="name"
              returnKeyType="next"
            />
            <InputGroup
              label="Email"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              returnKeyType="next"
            />
            <InputGroup
              label="Password"
              iconName="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secure
              autoCapitalize="none"
              textContentType="newPassword"
              returnKeyType="next"
            />
            <InputGroup
              label="Confirm Password"
              iconName="lock-closed-outline"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secure
              autoCapitalize="none"
              textContentType="newPassword"
              returnKeyType="done"
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
