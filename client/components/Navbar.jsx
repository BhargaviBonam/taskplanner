import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvatar from './UserAvatar';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={styles.navbar}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => dispatch(setOpenSidebar(true))}>
          <Text style={styles.sidebarIcon}>{Platform.OS === 'ios' ? '☰' : 'Menu'}</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Search...."
            placeholderTextColor="gray"
            onChangeText={(text) => console.log(text)}
          />
        </View>
      </View>

      <View style={styles.rightSection}>
        <NotificationPanel />
        <UserAvatar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarIcon: {
    fontSize: 24,
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: 'gray',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Navbar;
