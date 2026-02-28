import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {collection, getDocs, query} from 'firebase/firestore';
import {db} from '../firebaseConfig';

type AddTaskProps = {
    setModalVisible: (visible: boolean) => void;
}

export default function AddTask({ setModalVisible }: AddTaskProps) {

    return (
        <TouchableOpacity style={{flex: 1}} onPress={() => setModalVisible(true)}> 
            <View style={styles.container}>
                <Text style={styles.text}>Add Task</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#1e1e1e',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 70,
    paddingHorizontal: 30,
    borderRadius: 20,},

  dateContainer: {
  
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0e4e4',
  },
})