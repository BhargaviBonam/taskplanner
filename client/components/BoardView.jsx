import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskCard from './TaskCard';

const BoardView = ({ tasks }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Adjust the number of columns as needed
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Adjust alignment as needed
    paddingHorizontal: 8, // Adjust horizontal padding between columns
  },
});

export default BoardView;
