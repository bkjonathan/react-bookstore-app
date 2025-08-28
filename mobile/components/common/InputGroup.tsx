import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colors';
import styles from '@/assets/styles/login.styles';

export type InputGroupProps = {
  label: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secure?: boolean;
  containerStyle?: ViewStyle;
} & Pick<
  TextInputProps,
  'keyboardType' | 'autoCapitalize' | 'autoCorrect' | 'autoComplete' | 'textContentType' | 'returnKeyType'
>;

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  secure,
  containerStyle,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  autoComplete,
  textContentType,
  returnKeyType,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const isSecure = !!secure;

  return (
    <View style={[styles.inputGroup, containerStyle]}> 
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={iconName} size={20} color={COLORS.primary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholderText}
          secureTextEntry={isSecure && !show}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
        />
        {isSecure && (
          <TouchableOpacity onPress={() => setShow((s) => !s)} style={styles.eyeIcon}>
            <Ionicons name={show ? 'eye-outline' : 'eye-off-outline'} size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputGroup;
