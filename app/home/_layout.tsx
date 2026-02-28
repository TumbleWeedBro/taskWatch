// app/home/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: 'TaskWatch' }} />
    </Stack>
  );
}