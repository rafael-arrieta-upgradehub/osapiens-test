import { Tabs } from 'expo-router';
import React, {useEffect} from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {fetchForecast, setLocation} from "@/store/slices/weatherProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedApi, latitude, longitude } = useSelector((state: RootState) => state.weatherProvider);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            dispatch(setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude }));
        })();
    }, [dispatch]);

    useEffect(() => {
        if (latitude && longitude) {
            dispatch(fetchForecast({ api: selectedApi, params: { latitude, longitude } }));
        }
    }, [dispatch, selectedApi, latitude, longitude]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
