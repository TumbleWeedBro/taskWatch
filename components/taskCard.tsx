import { View, StyleSheet, Text } from "react-native";

type TaskCardProps = {
  taskTitle?: string;
  dueDate?: string;
}

export default function TaskCard({taskTitle, dueDate}: TaskCardProps) {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{taskTitle}</Text>          
          <Text style={styles.date}>{dueDate}</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // top-align the date
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  title: {
    flexShrink: 1,      // allow text to wrap
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0e4e4',
  },

  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0e4e4',
    marginLeft: 10,
    alignSelf: 'flex-start', // ensure it stays top-right
  },
})