import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    
    const findTasks = tasks.find(
      tFilter => tFilter.id === id
    );
      if(findTasks.done === false){
        findTasks.done= true;
      }else{
        findTasks.done= false;
      }  
   
    const updatedTasks = tasks.map(task => ({...task, findTasks}))

    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      taskFilter => taskFilter.id !== id
     ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})