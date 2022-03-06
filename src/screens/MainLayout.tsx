import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";
import HomeScreen from "./HomeScreen/HomeScreen";
import ListingScreen from "./ListingScreen/ListingScreen";
import { TabEnum } from "../enums/tab-enum";
const Tab = createBottomTabNavigator();

const MainLayout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={TabEnum.HOME_TAB}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;
            if (routeName === TabEnum.HOME_TAB) {
              iconName = focused ? "home" : "home-outline";
            } else if(routeName === TabEnum.LISTING_TAB) {
              iconName = focused ? 'list' : 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={TabEnum.HOME_TAB} component={HomeScreen} />
        <Tab.Screen name={TabEnum.LISTING_TAB} component={ListingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainLayout;
