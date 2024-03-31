import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useSelector, useDispatch } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';

const linkData = [
  {
    label: 'Dashboard',
    link: 'dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Tasks',
    link: 'tasks',
    icon: 'tasks',
  },
  {
    label: 'Completed',
    link: 'completed/completed',
    icon: 'task-alt',
  },
  {
    label: 'In Progress',
    link: 'in-progress/in progress',
    icon: 'outline-pending-actions',
  },
  {
    label: 'To Do',
    link: 'todo/todo',
    icon: 'outline-pending-actions',
  },
  {
    label: 'Team',
    link: 'team',
    icon: 'users',
  },
  {
    label: 'Trash',
    link: 'trashed',
    icon: 'trash-alt',
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <TouchableOpacity onPress={closeSidebar} style={[styles.link, el.link === path ? styles.activeLink : null]}>
        <MaterialIcons name={el.icon} size={24} color="black" />
        <Text style={styles.linkText}>{el.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.taskButton}>
          <MaterialIcons name="outline-add-task" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>TaskMe</Text>
      </View>

      <View style={styles.links}>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </View>

      <TouchableOpacity style={styles.settingsButton}>
        <MaterialIcons name="settings" size={24} color="black" />
        <Text style={styles.linkText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  taskButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  links: {
    flex: 1,
    marginBottom: 20,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeLink: {
    backgroundColor: '#2564ed2d',
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default Sidebar;
