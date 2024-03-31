import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskTitle = ({ label, style }) => {
  return (
    <View style={{ width: '100%', height: 48, paddingHorizontal: 16, borderRadius: 8, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...style }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'blue', marginRight: 8 }} />
        <Text style={{ fontSize: 14, color: '#4B5563' }}>{label}</Text>
      </View>

      <TouchableOpacity onPress={() => console.log('Add button pressed')} style={{ display: 'none', marginLeft: 16 }}>
        <Ionicons name="md-add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskTitle;
