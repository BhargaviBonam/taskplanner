import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FaUser, FaUserLock } from 'react-icons/fa'; // You may need to find alternatives for these icons in React Native
import { IoLogOutOutline } from 'react-icons/io5'; // You may need to find alternatives for these icons in React Native
import { useSelector } from 'react-redux'; // Assuming auth state is managed through Redux
import { useNavigation } from '@react-navigation/native'; // Assuming navigation is managed through React Navigation
import { getInitials } from '../utils';

const UserAvatar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation(); // React Navigation hook for navigation

  const logoutHandler = () => {
    console.log('logout');
    // Implement logout logic here, e.g., dispatch an action to clear user state
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignItems: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{getInitials(user?.name)}</Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 200, borderRadius: 8, backgroundColor: 'white', padding: 16 }}>
            <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Profile'); }} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <FaUser size={20} color="black" style={{ marginRight: 8 }} />
              <Text style={{ color: 'black', fontSize: 16 }}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setModalVisible(false); setChangePasswordModalVisible(true); }} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <FaUserLock size={20} color="black" style={{ marginRight: 8 }} />
              <Text style={{ color: 'black', fontSize: 16 }}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setModalVisible(false); logoutHandler(); }} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IoLogOutOutline size={20} color="red" style={{ marginRight: 8 }} />
              <Text style={{ color: 'red', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserAvatar;
