import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data";
import { getInitials } from "../utils";
import ConfirmationDialog from "../components/Dialogs";
import AddUser from "../components/AddUser";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#D1D5DB" }}>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <Text style={{ flex: 1 }}>Full Name</Text>
        <Text style={{ flex: 1 }}>Title</Text>
        <Text style={{ flex: 1 }}>Email</Text>
        <Text style={{ flex: 1 }}>Role</Text>
        <Text style={{ flex: 1 }}>Active</Text>
      </View>
    </View>
  );

  const TableRow = ({ user }) => (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
        paddingVertical: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#3B82F6",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
            {getInitials(user.name)}
          </Text>
        </View>
        <Text>{user.name}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text>{user.title}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>{user.email || "user.email.com"}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>{user.role}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => user.isActive ? userActionHandler() : null}
          style={{
            width: 80,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor: user?.isActive ? "#3B82F6" : "#F59E0B",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>
            {user.isActive ? "Active" : "Disabled"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={() => editClick(user)} style={{ marginRight: 10 }}>
          <Text style={{ color: "#3B82F6" }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteClick(user?._id)}>
          <Text style={{ color: "#EF4444" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd size={24} color="#FFFFFF" />}
            onPress={() => setOpen(true)}
            style={{ backgroundColor: "#3B82F6", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}
          />
        </View>
        <View style={{ backgroundColor: "#FFFFFF", padding: 10, borderRadius: 5 }}>
          <ScrollView horizontal>
            <TableHeader />
            <ScrollView>
              {summary.users?.map((user, index) => (
                <TableRow key={index} user={user} />
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      </View>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Users;
