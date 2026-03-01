import AddTask from '@/components/addTask';
import InputModal from '@/components/inputModal';
import TaskCard from '@/components/taskCard';
import { auth, db } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        if (!auth.currentUser) return;

        const q = query(
            collection(db, 'users', auth.currentUser.uid, 'tasks'),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTasks: any[] = [];
            snapshot.forEach((doc) => {
                fetchedTasks.push({ id: doc.id, ...doc.data() });
            });
            // Sort client-side to avoid needing an immediate Firebase composite index
            fetchedTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

            setTasks(fetchedTasks);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Navigation is handled by onAuthStateChanged in _layout.tsx
        } catch (error: any) {
            alert('Sign out failed: ' + error.message);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            if (!auth.currentUser) return;
            const idToken = await auth.currentUser.getIdToken();
            const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
            const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
            const path = `users/${auth.currentUser.uid}/tasks/${taskId}`;

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Delete failed:", errorData);
                alert("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("An error occurred while deleting the task.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Tasks</Text>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {tasks.length === 0 ? (
                    <Text style={{ color: '#c0b8b8', textAlign: 'center', marginTop: 50 }}>No tasks found. Create one!</Text>
                ) : (
                    tasks.map((task, index) => (
                        <View key={task.id}>
                            <TaskCard
                                id={task.id}
                                taskTitle={task.title}
                                dueDate={task.dueDate}
                                onDelete={handleDeleteTask}
                            />
                            {index < tasks.length - 1 && <View style={styles.spacer} />}
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.addTaskContainer}>
                <AddTask setModalVisible={setModalVisible} />
            </View>

            <InputModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000', // Dark contrast background matching component's #1e1e1e
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#000000',
        zIndex: 1, // Stay above scroll content
    },
    title: {
        color: '#f0e4e4',
        fontSize: 28,
        fontWeight: 'bold',
    },
    signOutButton: {
        backgroundColor: '#1e1e1e',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    signOutText: {
        color: '#f0e4e4',
        fontSize: 14,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 10,
        paddingBottom: 100, // Make extra room for the sticky add task button
    },
    spacer: {
        height: 15,
    },
    addTaskContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 40 : 30,
        left: 20,
        right: 20,
        height: 70, // Consistent height calculation
    }
});
