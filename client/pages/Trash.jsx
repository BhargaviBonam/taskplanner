import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import { TASK_TYPE } from "../utils";
import ConfirmationDialog from "../components/Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setSelected(id);
    setType("delete");
    setMsg("Do you want to permanently delete the selected item?");
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  const TableHeader = () => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#D1D5DB" }}>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <Text style={{ flex: 1 }}>Task Title</Text>
        <Text style={{ flex: 1 }}>Priority</Text>
        <Text style={{ flex: 1 }}>Stage</Text>
        <Text style={{ flex: 1 }}>Modified On</Text>
      </View>
    </View>
  );

  const TableRow = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
        paddingVertical: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: TASK_TYPE[item.stage],
            }}
          />
          <Text numberOfLines={2} style={{ flex: 1, marginLeft: 5 }}>
            {item?.title}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>{ICONS[item?.priority]}</Text>
          <Text>{item?.priority}</Text>
        </View>
      </View>

      <View style={{ flex: 1, textAlign: "center" }}>{item?.stage}</View>
      <View style={{ flex: 1, textAlign: "right" }}>
        <Text style={{ fontSize: 12 }}>
          {new Date(item?.date).toDateString()}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={() => restoreClick(item._id)}>
            <MdOutlineRestore size={24} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteClick(item._id)}>
            <MdDelete size={24} color="#F87171" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Title title="Trashed Tasks" />

          <View style={{ flexDirection: "row" }}>
            <Button
              label="Restore All"
              icon={<MdOutlineRestore size={24} color="#000" />}
              onPress={() => restoreAllClick()}
            />
            <Button
              label="Delete All"
              icon={<MdDelete size={24} color="#F87171" />}
              onPress={() => deleteAllClick()}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "#FFF", padding: 10, borderRadius: 5 }}>
          <ScrollView horizontal>
            <TableHeader />
            <ScrollView>
              {tasks.map((tk, id) => (
                <TableRow key={id} item={tk} />
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      </View>

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        type={type}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  );
};

export default Trash;
