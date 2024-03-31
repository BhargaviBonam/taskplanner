import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "@react-navigation/native";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "#3B82F6",
  "in progress": "#FCD34D",
  completed: "#34D399",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Loading />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <TouchableOpacity onPress={() => setOpen(true)} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#3B82F6', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}>
            <Text style={{ color: '#ffffff', marginRight: 5 }}>Create Task</Text>
            <IoMdAdd size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <TaskTitle label='To Do' color={TASK_TYPE.todo} />
            <TaskTitle label='In Progress' color={TASK_TYPE["in progress"]} />
            <TaskTitle label='completed' color={TASK_TYPE.completed} />
          </View>
        )}

        {selected !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Table tasks={tasks} />
            </View>
          </ScrollView>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </View>
  );
};

export default Tasks;
