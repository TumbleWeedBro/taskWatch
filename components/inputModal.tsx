import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

type InputModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
};

export default function InputModal({ visible, onClose, onSave }: InputModalProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const handleSave = async () => {
    try {
      if (!auth.currentUser) {
        console.error("No user is currently signed in. Cannot add task.");
        alert("You must be logged in to create a task.");
        return;
      }

      await addDoc(collection(db, 'users', auth.currentUser.uid, 'tasks'), {
        title: inputValue,
        dueDate: date.toISOString(),
        userId: auth.currentUser.uid, // Tie task solely to the account using it
        createdAt: new Date().toISOString()
      });
      setInputValue('');
      onSave && onSave();
      onClose();
    }
    catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add task.");
    }
  };


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type..."
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              multiline
            />
            <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)} >
              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}
              <Text>{date ? date.toDateString() : "Pick a Date"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // overlay
    justifyContent: 'center',           // vertical centering
    alignItems: 'center',               // horizontal centering
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: '90%',    // optional: ensures it’s wide enough
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    textAlignVertical: 'top'
  },

  dateButton: {

  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 30,
  },
});