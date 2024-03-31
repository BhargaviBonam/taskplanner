import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

export default function Tabs({ tabs, children }) {
  const [index, setIndex] = useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#3182CE' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {tabs[route.key].icon}
          <Text style={{ color: focused ? '#3182CE' : '#4B5563', marginLeft: 4 }}>{route.title}</Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes: tabs.map((tab, index) => ({ key: index.toString(), title: tab.title })) }}
      renderScene={({ route }) => children[parseInt(route.key, 10)]}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      style={{ flex: 1 }}
    />
  );
}
