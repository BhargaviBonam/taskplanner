import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AddTask from './AddTask';
import AddSubTask from './AddSubTask';

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const duplicateHandler = () => {};
  const deleteHandler = () => {};
  const items = [
    { label: 'Open Task', icon: 'folder-open', onClick: () => console.log('Open Task') },
    { label: 'Edit', icon: 'edit', onClick: () => setOpenEdit(true) },
    { label: 'Add Sub-Task', icon: 'add', onClick: () => setOpen(true) },
    { label: 'Duplicate', icon: 'duplicate', onClick: () => duplicateHandler() },
  ];

  return (
    <View style={styles.container}>
      <Modal visible={openDialog} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Confirmation Dialog</Text>
          <TouchableOpacity onPress={deleteHandler} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpenDialog(false)} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.menu}>
        {items.map((el, index) => (
          <TouchableOpacity
            key={index}
            onPress={el.onClick}
            style={styles.menuItem}
          >
            <MaterialIcons name={el.icon} size={24} color="#333" />
            <Text>{el.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setOpenDialog(true)} style={styles.menuItem}>
          <MaterialIcons name="delete" size={24} color="red" />
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>

      <AddTask open={openEdit} setOpen={setOpenEdit} task={task} />
      <AddSubTask open={open} setOpen={setOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TaskDialog;
