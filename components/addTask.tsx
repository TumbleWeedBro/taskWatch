import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AddTaskProps = {
  setModalVisible: (visible: boolean) => void;
}

export default function AddTask({ setModalVisible }: AddTaskProps) {

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(true)}>
      <View style={styles.container}>
        <Text style={styles.text}>Add Task</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    // Add shadow so it floats nicely
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0e4e4',
  },
})