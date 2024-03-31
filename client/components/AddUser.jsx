import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import Loading from './Loader';

const AddUser = ({ open, setOpen, userData }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: userData ?? {} });

  const handleOnSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <View style={styles.container}>
        <Text style={styles.title}>{userData ? "UPDATE PROFILE" : "ADD NEW USER"}</Text>
        <View style={styles.form}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Full name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="name"
            rules={{ required: 'Full name is required!' }}
            defaultValue=""
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
          {/* Repeat the Controller for other input fields */}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleOnSubmit)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setOpen(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddUser;
