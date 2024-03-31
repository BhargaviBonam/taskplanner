import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  const submitHandler = async (data) => {
    console.log("submit");
  };

  useEffect(() => {
    user && navigation.navigate("Dashboard");
  }, [user, navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* left side */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 20, color: '#666' }}>
              Manage all your tasks in one place!
            </Text>
            <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', color: '#1e4ed8', marginVertical: 10 }}>
              Cloud-Based{"\n"}Task Manager
            </Text>
            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#1e4ed8', transform: [{ rotate: '45deg' }] }} />
          </View>
        </View>

        {/* right side */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <View style={{ width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#1e4ed8', textAlign: 'center', marginBottom: 10 }}>Welcome back!</Text>
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 }}>Keep all your credentials safe.</Text>
            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
                rules={{ required: "Email Address is required!" }}
              />
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.email && errors.email.message}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="your password"
                    secureTextEntry
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
                rules={{ required: "Password is required!" }}
              />
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.password && errors.password.message}</Text>
            </View>
            <TouchableOpacity onPress={handleSubmit(submitHandler)} style={{ backgroundColor: '#1e4ed8', padding: 10, borderRadius: 10 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ marginTop: 10 }}>
              <Text style={{ color: '#1e4ed8', textAlign: 'center' }}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
