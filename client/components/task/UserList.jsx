import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { summary } from '../../assets/data';
import { getInitials } from '../../utils';
import { MaterialIcons } from '@expo/vector-icons';

const UserList = ({ setTeam, team }) => {
  const data = summary.users;
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (user) => {
    const updatedSelectedUsers = selectedUsers.includes(user)
      ? selectedUsers.filter((selectedUser) => selectedUser !== user)
      : [...selectedUsers, user];
    setSelectedUsers(updatedSelectedUsers);
    setTeam(updatedSelectedUsers.map((u) => u._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Assign Task To:</Text>
      <View style={styles.listBox}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleChange(item)}
            >
              <View style={styles.userAvatar}>
                <Text style={styles.avatarText}>
                  {getInitials(item.name)}
                </Text>
              </View>
              <Text style={styles.userName}>{item.name}</Text>
              {selectedUsers.includes(item) && (
                <MaterialIcons name="check" size={24} color="green" />
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  listBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    color: '#fff',
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default UserList;
