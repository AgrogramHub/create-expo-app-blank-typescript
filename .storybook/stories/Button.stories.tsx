import React from 'react';
import { Text, View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/Button';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
    onPress: { action: 'pressed the button' },
  },
  args: {
    color: 'blue',
  },
  decorators: [
    (Story) => (
      <View
        style={{ padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <Story />
      </View>
    ),
  ],
};

export default ButtonMeta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: <Text>Click Me</Text>,
  },
};

export const CustomColor: StoryObj<typeof Button> = {
  args: {
    children: <Text>Custom Color</Text>,
    color: 'red',
  },
};

export const WithObject: StoryObj<typeof Button> = {
  args: {
    children: <Text>With Object</Text>,
    color: 'green',
    obj: { a: 10, b: 'example' },
  },
};

export const WithoutOnPress: StoryObj<typeof Button> = {
  args: {
    children: <Text>Without onPress</Text>,
    color: 'purple',
  },
};
