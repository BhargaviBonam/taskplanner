import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useSelector } from 'react-redux';
import { formatDate } from '../utils';
import UserInfo from './UserInfo';
import AddSubTask from './task/AddSubTask';

const ICONS = {
  high: 'md-arrow-up',
  medium: 'md-arrow-down',
  low: 'md-arrow-down',
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={{ width: '100%', backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={ICONS[task?.priority]} size={24} color={task?.priority === 'high' ? 'red' : 'black'} />
            <Text style={{ textTransform: 'uppercase', marginLeft: 8 }}>{task?.priority} Priority</Text>
          </View>

          {user?.isAdmin && <TaskDialog task={task} />}
        </View>

        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'blue', marginRight: 8 }} />
            <Text numberOfLines={1} style={{ fontSize: 16, color: 'black' }}>{task?.title}</Text>
          </View>
          <Text style={{ fontSize: 12, color: '#4B5563' }}>{formatDate(new Date(task?.date))}</Text>
        </>

        <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: '#E5E7EB', marginVertical: 8 }} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
              <Ionicons name="md-chatbubbles" size={20} color="black" />
              <Text style={{ marginLeft: 4 }}>{task?.activities?.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
              <Ionicons name="md-attach-file" size={20} color="black" />
              <Text style={{ marginLeft: 4 }}>{task?.assets?.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-list" size={20} color="black" />
              <Text style={{ marginLeft: 4 }}>0/{task?.subTasks?.length}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row-reverse' }}>
            {task?.team?.map((m, index) => (
              <View key={index} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#3182CE', alignItems: 'center', justifyContent: 'center', marginLeft: -8 }}>
                <UserInfo user={m} />
              </View>
            ))}
          </View>
        </View>

        {/* Sub tasks */}
        {task?.subTasks?.length > 0 ? (
          <View style={{ paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
            <Text numberOfLines={1} style={{ fontSize: 16, color: 'black' }}>{task?.subTasks[0].title}</Text>

            <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
              <Text style={{ fontSize: 12, color: '#4B5563' }}>{formatDate(new Date(task?.subTasks[0]?.date))}</Text>
              <View style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 4 }}>
                <Text style={{ color: '#3182CE', fontWeight: 'bold' }}>{task?.subTasks[0].tag}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
            <Text style={{ color: 'gray' }}>No Sub Task</Text>
          </View>
        )}

        <View style={{ width: '100%', paddingBottom: 8, marginTop: 16 }}>
          <TouchableOpacity onPress={() => setOpen(true)} disabled={!user.isAdmin} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: user.isAdmin ? '#3182CE' : '#E5E7EB', paddingVertical: 12, borderRadius: 8 }}>
            <Ionicons name="md-add" size={24} color="white" />
            <Text style={{ color: user.isAdmin ? 'white' : 'gray', fontWeight: 'bold', marginLeft: 4 }}>ADD SUBTASK</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
