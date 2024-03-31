import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from '../utils';

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: '⇑⇑',
    medium: '⇑',
    low: '⇓',
  };

  const TableHeader = () => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <Text style={{ flex: 2 }}>Task Title</Text>
        <Text style={{ flex: 1 }}>Priority</Text>
        <Text style={{ flex: 1 }}>Team</Text>
        <Text style={{ flex: 1 }}>Created At</Text>
      </View>
    </View>
  );

  const TableRow = ({ task }) => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', paddingVertical: 10 }}>
      <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[{ width: 10, height: 10, borderRadius: 5 }, TASK_TYPE[task.stage]]} />
        <Text style={{ marginLeft: 5 }}>{task.title}</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[{ fontSize: 20 }, PRIOTITYSTYELS[task.priority]]}>{ICONS[task.priority]}</Text>
        <Text style={{ marginLeft: 5 }}>{task.priority}</Text>
      </View>

      <View style={{ flex: 1 }}>
        {task.team.map((m, index) => (
          <View key={index} style={[{ width: 20, height: 20, borderRadius: 10, marginRight: -5 }, BGS[index % BGS.length]]}>
            <UserInfo user={m} />
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: '#666' }}>{moment(task.date).fromNow()}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ width: '100%', backgroundColor: '#fff', padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 3, borderRadius: 5 }}>
      <TableHeader />
      {tasks?.map((task, id) => (
        <TableRow key={id} task={task} />
      ))}
    </View>
  );
};

const UserTable = ({ users }) => {
  // UserTable implementation
    const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
};

const Dashboard = () => {
  const summary = {
    tasks: [
      { title: 'Task 1', priority: 'high', stage: 'todo', team: [{ name: 'User 1' }, { name: 'User 2' }], date: new Date() },
      { title: 'Task 2', priority: 'medium', stage: 'in progress', team: [{ name: 'User 3' }, { name: 'User 4' }], date: new Date() },
      { title: 'Task 3', priority: 'low', stage: 'completed', team: [{ name: 'User 5' }, { name: 'User 6' }], date: new Date() }
    ]
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TaskTable tasks={summary.tasks} />
    </View>
  );
};

export default Dashboard;
