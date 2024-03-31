import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { BiMessageAltDetail } from 'react-icons/bi';
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { FaList } from 'react-icons/fa';
import clsx from 'clsx';
import { PRIOTITYSTYELS, TASK_TYPE, formatDate } from '../../utils';
import UserInfo from '../UserInfo';
import Button from '../Button';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  const TableRow = ({ task }) => (
    <View style={styles.rowContainer}>
      <View style={styles.rowItem}>
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <View style={styles.rowItem}>
        <View style={styles.priorityContainer}>
          <Text style={[styles.priorityIcon, PRIOTITYSTYELS[task.priority]]}>{ICONS[task.priority]}</Text>
          <Text style={styles.priorityText}>{task.priority} Priority</Text>
        </View>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.date}>{formatDate(new Date(task.date))}</Text>
      </View>
      <View style={styles.rowItem}>
        <View style={styles.assetContainer}>
          <View style={styles.assetItem}>
            <BiMessageAltDetail />
            <Text>{task.activities.length}</Text>
          </View>
          <View style={styles.assetItem}>
            <MdAttachFile />
            <Text>{task.assets.length}</Text>
          </View>
          <View style={styles.assetItem}>
            <FaList />
            <Text>0/{task.subTasks.length}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowItem}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.teamContainer}>
            {task.team.map((m, index) => (
              <View key={m._id} style={[styles.teamItem, { backgroundColor: BGS[index % BGS.length] }]}>
                <UserInfo user={m} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.rowItem}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteClicks(task._id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <TableHeader />
        {tasks.map((task, index) => <TableRow key={index} task={task} />)}
      </ScrollView>

      {/* TODO */}
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
    </>
  );
};

const TableHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerItem}>
      <Text style={styles.headerText}>Task Title</Text>
    </View>
    <View style={styles.headerItem}>
      <Text style={styles.headerText}>Priority</Text>
    </View>
    <View style={styles.headerItem}>
      <Text style={styles.headerText}>Created At</Text>
    </View>
    <View style={styles.headerItem}>
      <Text style={styles.headerText}>Assets</Text>
    </View>
    <View style={styles.headerItem}>
      <Text style={styles.headerText}>Team</Text>
    </View>
    <View style={styles.headerItem}></View>
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIcon: {
    fontSize: 24,
    marginRight: 5,
  },
  priorityText: {
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  teamContainer: {
    flexDirection: 'row',
  },
  teamItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButtonText: {
    color: '#fff',
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
};

export default Table;
