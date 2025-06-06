import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/components/Colors';

interface ProgressBarProps {
  progress: number;
  color?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = colors.primary,
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.progress, 
          { 
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            backgroundColor: color 
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  },
});