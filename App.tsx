import React from 'react';

import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

import Button from '@/Button';

import ExpoLogo from './assets/expo.svg';

/**
 * App bileşeni, uygulamanın ana bileşenini temsil eder.
 * @returns JSX.Element - Uygulamanın render edilen ana bileşeni.
 * @see https://reactnative.dev/docs/statusbar
 * @see https://styled-components.com/docs/api#styled
 *
 * @example
 * ```tsx
 * <App />
 * ```
 * @example
 * ```tsx
 * import App from '@/App';
 * export default App;
 * ```
 * @example
 * ```tsx
 * import { App } from '@/App';
 * ```
 */
export default function App(): JSX.Element {
  return (
    <Container>
      <StatusBar style="auto" backgroundColor="red" />
      <Title color="red">Open up App.tsx to start working on your app!</Title>
      <Button2 color="blue">
        <Title color="white">Learn React Native</Title>
      </Button2>
      <ExpoLogo width={120} height={120} fill="black" />
      <Button children={<></>} color="red" />
    </Container>
  );
}

const Container = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
});

const Title = styled.Text<{ color: string; fontSize?: number }>(
  ({ color, fontSize }) => ({
    fontSize,
    color,
  })
);

const Button2 = styled.TouchableOpacity<{ color: string }>(({ color }) => ({
  backgroundColor: color,
  padding: 10,
  borderRadius: 5,
}));
