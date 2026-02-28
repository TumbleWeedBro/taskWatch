import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';

//types
import Task from '@/types/Task';

//components
import TaskCard from '@/components/taskCard';
import AddTask from '@/components/addTask';
import InputModal from '@/components/inputModal';

//functions
import remaingDays from '@/functions/remainingDays';

//database stuff
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {


  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const querySnap = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const fetchedTasks: Task[] = [];
      snapshot.forEach(doc => {
        fetchedTasks.push({
          id: doc.id, 
          title: doc.data().title, 
          date: doc.data().dueDate} as Task);
      });
      setTasks(fetchedTasks);
    });

    return () => querySnap(); // Cleanup listener on unmount
  }, []);

  return (
    <SafeAreaView style={styles.container}> 
      {tasks && tasks.length > 0 ? (tasks.map((task) => (
        <TaskCard 
          key={task.id}
          taskTitle={task.title}
          dueDate={remaingDays(task.date).toString() + " days left"}
        />
      ))): (
        <TaskCard 
          key={"no-tasks"}
          taskTitle={"Create a task to get started!"}
          dueDate={"0 days left"}
        />
      )}
      <AddTask setModalVisible={setModalVisible} />
      <InputModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0e4e4',
  },
})