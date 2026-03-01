import { StyleSheet, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

type TaskCardProps = {
  id: string;
  taskTitle?: string;
  dueDate?: string;
  onDelete: (id: string) => void;
}

function remainingDays(dueDate?: string): number | null {
  if (!dueDate) return null;

  const parsedDate = new Date(dueDate);
  if (isNaN(parsedDate.getTime())) return null;

  const now = new Date();
  const timeDiff = parsedDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export default function TaskCard({ id, taskTitle, dueDate, onDelete }: TaskCardProps) {
  const daysLeft = remainingDays(dueDate);

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.deleteAction} onPress={() => onDelete(id)}>
        <Text style={styles.actionText}>Delete</Text>
      </RectButton>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>{taskTitle}</Text>
        </View>

        <View style={styles.rightContent}>
          {daysLeft !== null && (
            <Text style={[styles.daysLeft, daysLeft < 0 && styles.overdue]}>
              {daysLeft < 0
                ? `${Math.abs(daysLeft)} days overdue`
                : daysLeft === 0
                  ? 'Due today'
                  : `${daysLeft} days left`}
            </Text>
          )}
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // center-align the content blocks
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  leftContent: {
    flex: 1,
    marginRight: 10,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  title: {
    flexShrink: 1,      // allow text to wrap
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0e4e4',
  },
  date: {
    fontSize: 16,
    color: '#c0b8b8',
    marginBottom: 4,
  },
  daysLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50', // green for upcoming tasks
  },
  overdue: {
    color: '#f44336', // red for overdue tasks
  },
  deleteAction: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 20,
    marginRight: -20, // To avoid gaps if layout permits
    paddingLeft: 20,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
  },
})