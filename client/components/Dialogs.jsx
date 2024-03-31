import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FaQuestion } from 'react-icons/fa';

const ConfirmationDialog = ({ open, setOpen, msg, onClick = () => {}, type = 'delete' }) => {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Modal visible={open} animationType="fade" transparent={true} onRequestClose={closeDialog}>
      <View style={styles.container}>
        <View style={styles.dialog}>
          <FaQuestion size={60} style={styles.icon} />

          <Text style={styles.text}>{msg ?? 'Are you sure you want to delete the selected record?'}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: type === 'restore' ? '#FFD700' : '#FF4500' }]}
              onPress={onClick}
            >
              <Text style={styles.buttonText}>{type === 'restore' ? 'Restore' : 'Delete'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={closeDialog}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const UserAction = ({ open, setOpen, onClick = () => {} }) => {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Modal visible={open} animationType="fade" transparent={true} onRequestClose={closeDialog}>
      <View style={styles.container}>
        <View style={styles.dialog}>
          <FaQuestion size={60} style={styles.icon} />

          <Text style={styles.text}>Are you sure you want to activate or deactivate this account?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4500' }]} onPress={onClick}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={closeDialog}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    color: 'red', // Or any color you want
  },
  text: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export { ConfirmationDialog, UserAction };
