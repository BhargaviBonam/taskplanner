import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { getInitials } from '../utils';

const UserInfo = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignItems: 'center' }}>
        <Text>{getInitials(user?.name)}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 280, borderRadius: 8, backgroundColor: 'white', padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ width: 80, height: 80, backgroundColor: 'blue', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{getInitials(user?.name)}</Text>
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{user?.name}</Text>
                <Text style={{ color: 'gray', fontSize: 16 }}>{user?.title}</Text>
                <Text style={{ color: 'blue', fontSize: 16 }}>{user?.email ?? 'email@example.com'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 16, padding: 8, backgroundColor: 'blue', borderRadius: 4, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserInfo;
