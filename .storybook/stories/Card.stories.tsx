import React from 'react';
import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import Card from '../../components/Card';

const CardMeta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  args: {
    title: 'Default Title',
    description: 'This is a default description.',
    imageUrl: 'https://example.com/default-image.jpg',
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

export default CardMeta;

export const Basic: StoryObj<typeof Card> = {};

export const WithCustomContent: StoryObj<typeof Card> = {
  args: {
    title: 'Custom Title',
    description: 'This is a custom description for the Card component.',
    imageUrl: 'https://example.com/custom-image.jpg',
  },
};
