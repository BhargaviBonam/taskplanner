import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import moment from 'moment';

const data = [
  {
    _id: "65c5bbf3787832cf99f28e6d",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c27a0e18c0a1b750ad5cad",
      "65c30b96e639681a13def0b5",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T05:45:23.353Z",
    updatedAt: "2024-02-09T05:45:23.353Z",
    __v: 0,
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
    task: {
      _id: "65c5f12ab5204a81bde866a9",
      title: "Test task",
    },
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T09:32:26.810Z",
    updatedAt: "2024-02-09T09:32:26.810Z",
    __v: 0,
  },
];

const ICONS = {
  alert: "bell-alert",
  message: "message-rounded",
};

const NotificationPanel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const readHandler = () => {};
  const viewHandler = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const callsToAction = [
    { name: "Cancel", onPress: () => setModalVisible(false) },
    { name: "Mark All Read", onPress: readHandler },
  ];

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.notificationIcon}>
          <MaterialIcons name="notifications" size={24} color="black" />
          {data?.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data?.length}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={data.slice(0, 5)}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.notificationItem}
                  onPress={() => viewHandler(item)}
                >
                  <View style={styles.icon}>
                    <MaterialIcons name={ICONS[item.notiType]} size={24} color="gray" />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationType}>{item.notiType}</Text>
                    <Text style={styles.notificationDate}>{moment(item.createdAt).fromNow()}</Text>
                    <Text style={styles.notificationText} numberOfLines={2}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View style={styles.actionButtons}>
              {callsToAction.map(({ name, onPress }) => (
                <TouchableOpacity key={name} style={styles.button} onPress={onPress}>
                  <Text>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  notificationIcon: {
    position: 'relative',
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 20,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
  },
  notificationType: {
    fontWeight: 'bold',
  },
  notificationDate: {
    fontSize: 12,
    color: 'gray',
  },
  notificationText: {
    fontSize: 14,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
});

export default NotificationPanel;
