import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../Button';

const AddSubTask = ({ open, setOpen, id }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [tag, setTag] = useState('');

  const handleOnSubmit = () => {
    // Your submit logic here
    console.log('Sub-task submitted');
    setOpen(false);
  };

  return (
    <>
      <Modal visible={open} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>ADD SUB-TASK</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder='Sub-Task title'
              onChangeText={setTitle}
              value={title}
            />

            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder='Date'
                onChangeText={setDate}
                value={date}
              />

              <TextInput
                style={styles.input}
                placeholder='Tag'
                onChangeText={setTag}
                value={tag}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label='Add Task'
              onPress={handleOnSubmit}
              style={styles.addButton}
            />

            <Button
              label='Cancel'
              onPress={() => setOpen(false)}
              style={styles.cancelButton}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
};

export default AddSubTask;
