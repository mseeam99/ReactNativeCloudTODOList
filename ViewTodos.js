import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { IconButton } from 'react-native-paper';
import axios from 'axios';

export default function TodoListPage({ route, navigation }) {
  const [todos, setTodos] = useState([]);
  const { currentUserEMAIL } = route.params;
  const finalCurrentUserEMAIL = String(currentUserEMAIL);

  const FIREBASE_URL = 'https://reactnativebackend-bdcd5-default-rtdb.firebaseio.com/todos.json';

    //Work same as setState of Flutter
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(FIREBASE_URL);
      const data = response.data;
      const todoArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setTodos(todoArray);
    } catch (error) {
        Alert.alert("Error!");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://reactnativebackend-bdcd5-default-rtdb.firebaseio.com/todos/${id}.json`);
      Alert.alert('Deleted!');
      fetchTodos(); 
    } catch (error) {
      //console.error("Error deleting TODO: ", error);
      Alert.alert("Error", "Failed to delete the item. Please try again.");
    }
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <Text style={styles.todoDate}>{new Date(item.date).toLocaleString()}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <IconButton icon="delete" iconColor="orangered" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your TODO List</Text>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderTodoItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
    color: '#333',
  },
  todoDate: {
    fontSize: 14,
    color: '#999',
  },
});

