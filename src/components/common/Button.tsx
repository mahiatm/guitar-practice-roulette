import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONT_SIZES, BORDER_RADIUS, SPACING } from '../../config/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const variantStyles: Record<string, { bg: string; text: string; border?: string }> = {
  primary: { bg: COLORS.accent, text: COLORS.background },
  secondary: { bg: COLORS.burgundy, text: COLORS.text },
  ghost: { bg: 'transparent', text: COLORS.accent, border: COLORS.accent },
  danger: { bg: COLORS.failure, text: COLORS.text },
  success: { bg: COLORS.success, text: COLORS.text },
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  labelStyle,
}: ButtonProps) {
  const vs = variantStyles[variant];

  const sizeStyle = {
    sm: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md },
    md: { paddingVertical: SPACING.sm + 4, paddingHorizontal: SPACING.lg },
    lg: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl },
  }[size];

  const fontSizeStyle = {
    sm: FONT_SIZES.sm,
    md: FONT_SIZES.body,
    lg: FONT_SIZES.lg,
  }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        sizeStyle,
        {
          backgroundColor: vs.bg,
          borderColor: vs.border || 'transparent',
          borderWidth: vs.border ? 1.5 : 0,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={vs.text} size="small" />
      ) : (
        <Text
          style={[
            styles.label,
            { color: vs.text, fontSize: fontSizeStyle },
            labelStyle,
          ]}
        >
          {label.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
