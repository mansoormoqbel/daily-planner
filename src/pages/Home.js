import React from "react";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function Home() {
  const { logout, currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  
  const handleLogout = async () => {
    try {
      await logout();
      alert("تم تسجيل الخروج بنجاح ✅");
    } catch (error) {
      console.error("❌ خطأ أثناء تسجيل الخروج:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id, // 🔑 id النصي الصحيح من Firestore
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    // تنظيف الاشتراك عند إلغاء المكون
    return () => unsubscribe();
  }, []);
  // 🔹 إضافة مهمة
  const addTask = async (task) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    setTasks([...tasks, { ...task, id: docRef.id }]);
  };

  // 🔹 تبديل حالة الاكتمال
  const toggleTask = async (id, completed) => {
    const ref = doc(db, "tasks", id);
    await updateDoc(ref, { completed: !completed });
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !completed } : t)));
  };

  // 🔹 حذف مهمة
  
  const deleteTask = async (id) => {
    console.log("🧹 Trying to delete task with id:", id, " | type:", typeof id);

    if (!id) {
      console.error("❌ Error: Task id is missing!");
      return;
    }

    try {
      // تحويل id إلى نص
      const ref = doc(db, "tasks", String(id));
      console.log("📄 Firestore reference:", ref);
      await deleteDoc(ref);
      console.log("✅ Task deleted successfully:", id);
    } catch (error) {
      console.error("🔥 Error deleting task:", error);
    }
  };

  return (
    <>
        <div className="app">
             <h2>مرحبًا {currentUser ? currentUser.email : "ضيف"} 👋</h2>
            <button onClick={handleLogout}>تسجيل الخروج</button>
        </div>
        <div className="app">
            <h1>📅 Daily Planner (Firebase)</h1>
            <TaskForm onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
    </>
  );
}




