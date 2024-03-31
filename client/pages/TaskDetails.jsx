import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "@react-navigation/native";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import Button from "../components/Button";

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "#F87171",
  medium: "#FCD34D",
  low: "#6EE7B7",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#4B5563', alignItems: 'center', justifyContent: 'center' }}>
      <MdOutlineMessage size={24} color="#ffffff" />
    </View>
  ),
  started: (
    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' }}>
      <FaThumbsUp size={20} color="#ffffff" />
    </View>
  ),
  assigned: (
    <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#4B5563', alignItems: 'center', justifyContent: 'center' }}>
      <FaUser size={14} color="#ffffff" />
    </View>
  ),
  bug: (
    <FaBug size={24} color="#EF4444" />
  ),
  completed: (
    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#34D399', alignItems: 'center', justifyContent: 'center' }}>
      <MdOutlineDoneAll size={24} color="#ffffff" />
    </View>
  ),
  "in progress": (
    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' }}>
      <GrInProgress size={16} color="#ffffff" />
    </View>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();

  const [selected, setSelected] = useState(0);
  const task = tasks[3];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4B5563', marginBottom: 10 }}>{task?.title}</Text>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: 20, marginBottom: 20, borderRadius: 10 }}>
              {/* LEFT */}
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: bgColor[task?.priority], paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginRight: 10 }}>
                    <View>{ICONS[task?.priority]}</View>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', marginLeft: 5 }}>{task?.priority} Priority</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: TASK_TYPE[task.stage], marginRight: 5 }} />
                    <Text style={{ textTransform: 'uppercase', color: '#000000' }}>{task?.stage}</Text>
                  </View>
                </View>

                <Text style={{ color: '#6B7280', marginBottom: 10 }}>Created At: {moment(task?.date).format("MMM DD, YYYY")}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', marginRight: 5 }}>Assets :</Text>
                    <Text>{task?.assets?.length}</Text>
                  </View>

                  <Text>|</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', marginRight: 5 }}>Sub-Task :</Text>
                    <Text>{task?.subTasks?.length}</Text>
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#374151', fontWeight: 'bold', fontSize: 16 }}>TASK TEAM</Text>
                  <View style={{ marginTop: 5 }}>
                    {task?.team?.map((m, index) => (
                      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#D1D5DB', paddingVertical: 10 }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: '#ffffff' }}>{getInitials(m?.name)}</Text>
                        </View>

                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: 'bold', color: '#374151' }}>{m?.name}</Text>
                          <Text style={{ color: '#6B7280' }}>{m?.title}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: '#6B7280', fontWeight: 'bold' }}>SUB-TASKS</Text>
                  <View style={{ marginTop: 10 }}>
                    {task?.subTasks?.map((el, index) => (
                      <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' }}>
                          <MdTaskAlt size={24} color="#4B5563" />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ color: '#6B7280', fontSize: 12 }}>{moment(el?.date).format("MMM DD, YYYY")}</Text>
                          <View style={{ backgroundColor: '#D1D5DB', borderRadius: 20, paddingHorizontal: 5, paddingVertical: 2, marginTop: 5 }}>
                            <Text style={{ textTransform: 'uppercase', color: '#4B5563', fontSize: 10 }}>{el?.tag}</Text>
                          </View>
                          <Text style={{ color: '#374151' }}>{el?.title}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* RIGHT */}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', color: '#374151', fontSize: 16 }}>ASSETS</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                  {task?.assets?.map((el, index) => (
                    <Image key={index} source={{ uri: el }} style={{ width: 150, height: 150, borderRadius: 10, marginRight: 10, marginBottom: 10 }} />
                  ))}
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <Activities activity={task?.activities} id={id} />
          </>
        )}
      </Tabs>
    </ScrollView>
  );
};

const Activities = ({ activity, id }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;

  const handleSubmit = async () => {};

  const Card = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 10 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#6B7280', alignItems: 'center', justifyContent: 'center' }}>
            {TASKTYPEICON[item?.type]}
          </View>
          <View style={{ width: 1, height: 40, backgroundColor: '#D1D5DB' }} />
        </View>

        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={{ fontWeight: 'bold', color: '#374151' }}>{item?.by?.name}</Text>
          <View style={{ flexDirection: 'column', marginTop: 5 }}>
            <Text style={{ textTransform: 'capitalize', color: '#6B7280' }}>{item?.type}</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>{moment(item?.date).fromNow()}</Text>
          </View>
          <Text style={{ color: '#374151' }}>{item?.activity}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', color: '#6B7280', fontSize: 16, marginBottom: 10 }}>Activities</Text>
        {activity?.map((el, index) => (
          <Card key={index} item={el} />
        ))}
      </View>

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', color: '#6B7280', fontSize: 16, marginBottom: 10 }}>Add Activity</Text>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
          {act_types.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <TouchableOpacity onPress={() => setSelected(item)} style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: selected === item ? '#6B7280' : '#D1D5DB', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: selected === item ? '#ffffff' : 'transparent' }} />
              </TouchableOpacity>
              <Text>{item}</Text>
            </View>
          ))}
          <TextInput
            multiline
            value={text}
            onChangeText={setText}
            placeholder='Type ......'
            style={{ backgroundColor: '#ffffff', width: '100%', height: 150, borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10 }}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Button
              title='Submit'
              onPress={handleSubmit}
              style={{ backgroundColor: '#3B82F6', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default TaskDetails;
