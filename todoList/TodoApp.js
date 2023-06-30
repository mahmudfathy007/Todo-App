import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';
import axios from 'axios';

const baseUrl = "http://192.168.1.2:3000"; 

export default function Todo({ loggedInUser }) {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/todo/${loggedInUser}/getTodos`);
      setTaskItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new task for the logged-in user
  const handleAddTask = async () => {
    Keyboard.dismiss();
  
    if (!task.trim()) {
      return;
    }
  
    try {
      const response = await axios.post(`${baseUrl}/api/v1/todo/${loggedInUser}/createTodos`, {
        title: task
      });
  
      setTaskItems([...taskItems, response.data]);
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a task for the logged-in user
  const completeTask = async (index) => {
    try {
      const taskToDelete = taskItems[index];
      await axios.delete(`${baseUrl}/api/v1/todo/${loggedInUser}/deleteTodo/${taskToDelete.id}`);
      const updatedTasks = taskItems.filter(item => item.id !== taskToDelete.id);
      setTaskItems(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task
                  text={item.title}
                  onDelete={() => handleDeleteTask(item.id)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
