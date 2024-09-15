import React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'; 

export default function InsidePage({ route, navigation }) {
  const [todo, onChangeTodo] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const { currentUserEMAIL } = route.params;
  const finalCurrentUserEMAIL = String(currentUserEMAIL);

  const FIREBASE_URL = 'https://reactnativebackend-bdcd5-default-rtdb.firebaseio.com/todos.json';
  
  async function addNewElementOnList() {
    if (todo.trim() === '') {
      alert('Please enter a TODO item.');
      return;
    }
    try {
      await axios.post(FIREBASE_URL, {
        text: todo,
        date: date.toISOString(),
      });
      onChangeTodo('');
      setDate(new Date());
      Alert.alert("Success !");
    } catch (error) {
      Alert.alert("Try Again !");
    }
  }

  function reRouteToDatabasePage() {
    navigation.navigate('TodoListPage', { finalCurrentUserEMAIL: finalCurrentUserEMAIL });
  }

  function handleDateChange(event, selectedDate) {
    const newDate = selectedDate || date;
    setDate(newDate);
  }

  function handleLogout() {
    Alert.alert("Logged Out !");
    navigation.navigate('HomeScreenWidget'); 
  }

  return (
    <View>
      <View style={styles.innerView}>
        <Text style={styles.label}>Add Your TODO</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeTodo}
          value={todo}
          placeholder="TODO"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.selectDateAndTime}>
        <Text style={styles.label}>Add Date and Time</Text>
        <DateTimePicker
          mode="datetime"
          display="spinner"
          value={date}
          onChange={handleDateChange}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.databaseButton} onPress={reRouteToDatabasePage}>
          <IconButton 
            icon="database"
            iconColor="black"
            size={40}
          />   
          <Text style={styles.textInsideDatabaseButton}>View Existing TODO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButtonWithText} onPress={addNewElementOnList}>
          <IconButton 
            icon="plus"
            iconColor="black"
            size={40}
          />   
          <Text style={styles.textInsideIconButtonWithText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButtonWithText: {
    borderRadius: 90,
    backgroundColor: 'dodgerblue',
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  textInsideIconButtonWithText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  innerView: {
    marginBottom: 20,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  inputText: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingLeft: 10,
  },
  selectDateAndTime: {
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    marginTop: 20, 
  },
  databaseButton: {
    borderRadius: 30,
    backgroundColor: 'dodgerblue',
    height: 90,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  textInsideDatabaseButton: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  logoutContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
