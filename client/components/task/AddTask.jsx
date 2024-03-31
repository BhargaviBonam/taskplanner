import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import SelectList from '../SelectList';
import UserList from './UserList';
import { BiImages } from 'react-icons/bi';
import Button from '../Button';

const LISTS = ['TODO', 'IN PROGRESS', 'COMPLETED'];
const PRIORIRY = ['HIGH', 'MEDIUM', 'NORMAL', 'LOW'];

const AddTask = ({ open, setOpen }) => {
  const task = '';

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (files) => {
    setAssets(files);
  };

  return (
    <>
      <Modal visible={open} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>{task ? 'UPDATE TASK' : 'ADD TASK'}</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder='Task Title'
              onChangeText={(text) => console.log(text)}
            />

            <UserList setTeam={setTeam} team={team} />

            <View style={styles.row}>
              <SelectList
                label='Task Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <TextInput
                style={styles.input}
                placeholder='Date'
                onChangeText={(text) => console.log(text)}
              />
            </View>

            <View style={styles.row}>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => console.log('Upload')}
              >
                <BiImages />
                <Text>Add Assets</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {uploading ? (
              <Text style={styles.uploadingText}>Uploading assets</Text>
            ) : (
              <Button
                label='Submit'
                onPress={submitHandler}
                style={styles.submitButton}
              />
            )}

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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
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
  uploadingText: {
    fontSize: 16,
    color: 'red',
  },
};

export default AddTask;
