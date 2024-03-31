import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { Transitioning } from 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import TaskDetails from './pages/TaskDetails';
import Tasks from './pages/Tasks';
import Trash from './pages/Trash';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import { setOpenSidebar } from './redux/slices/authSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return user ? (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
    </Stack.Navigator>
  ) : (
    <Login />
  );
}

function MainScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Trash" component={Trash} />
      <Tab.Screen name="Users" component={Users} />
    </Tab.Navigator>
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const transitionRef = useRef();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transitioning.View
      ref={transitionRef}
      transition={transition}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        transform: [{ translateX: isSidebarOpen ? 0 : '100%' }],
      }}
    >
      <TouchableOpacity onPress={closeSidebar} style={{ flex: 1 }}>
        <IoClose size={25} />
      </TouchableOpacity>
      <Sidebar />
    </Transitioning.View>
  );
};

const transition = {
  duration: 700,
  type: 'timing',
};

const App = () => {
  return (
    <NavigationContainer>
      <Layout />
    </NavigationContainer>
  );
};

export default App;
