import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import WelcomeScreen from './screens/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainController } from './controllers/MainController';

const queryClient = new QueryClient();

export default function App() {
  //Welcome screen to show the faults with the API.
  const [seenWelcomeScreen, setSeenWelcomeScreen] = useState(true);
  AsyncStorage.getItem('seenWelcomeScreen').then(d => {
    if (!d) {
      setSeenWelcomeScreen(false);
    }
  });

  if (!seenWelcomeScreen) {
    return <WelcomeScreen setSeen={() => setSeenWelcomeScreen(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainController />
    </QueryClientProvider>
  );
}

