import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  color: string;
  func?: () => void;
  obj?: {
    a: number;
    b: string;
  };
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  onPress,
  obj,
}): React.ReactNode => {
  const handlePress = (): void => {
    console.log('Button pressed', obj?.a);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress ? onPress() : handlePress();
      }}
    >
      <Text style={{ color }}>Button</Text>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
