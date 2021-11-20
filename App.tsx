import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import WelcomeScreen from './screens/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainController } from './controllers/MainController';

const queryClient = new QueryClient();

export default function App() {
  const [seenWelcomeScreen, setSeenWelcomeScreen] = useState(true);
  AsyncStorage.getItem('seenWelcomeScreen').then(d => {
    if (!d) {
      setSeenWelcomeScreen(false);
    }
  });

  //Welcome screen to show the faults with the API.
  if (!seenWelcomeScreen) {
    return <WelcomeScreen setSeen={() => {
      AsyncStorage.setItem('seenWelcomeScreen', 'yes').then(() => setSeenWelcomeScreen(true));
    }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainController />
    </QueryClientProvider>
  );
}

