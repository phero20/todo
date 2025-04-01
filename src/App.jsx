import { useState, useEffect } from "react";
import "./App.css";
import Sign from "./components/Sign";
import Task from "./components/Task";
import Nav from "./components/Nav";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

initializeApp(firebaseConfig);

function App() {
  const [isLogin, setLogin] = useState(false);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [data, setData] = useState(null);
  const [taskLength, setTaskLength] = useState(0);

  const db = getFirestore();
  const auth = getAuth();

  const handleSignUp = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          username: username,
          email: email,
          createdAt: new Date().toISOString(),
        });
      }
      setUserName(username);
      setUserEmail(email);
      setLogin(true);
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          alert("The password is too weak. Please use at least 6 characters.");
          break;
    
        case "auth/email-already-in-use":
          alert("This email is already registered. Please log in or use a different email.");
          break;
    
        case "auth/invalid-email":
          alert("Invalid email format. Please enter a valid email address.");
          break;
    
        case "auth/network-request-failed":
          alert("Network error. Please check your internet connection and try again.");
          break;
    
        default:
          alert("An error occurred: " + error.message);
          break;
      }
    }
    
  };

  const handleLogIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setData(userDocSnap.data());
        setUserName(userDocSnap.data().username);
        setUserEmail(userDocSnap.data().email);
      }

      setLogin(true);
    } catch (error) {
      console.error("Error during login:", error.message);
    
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password. Please try again.");
          break;
    
        case "auth/invalid-credential":
          alert("Invalid credential. Please check your email and password.");
          break;
    
        case "auth/user-not-found":
          alert("No user found with this email. Please sign up.");
          break;
    
        case "auth/invalid-email":
          alert("Invalid email format. Please enter a valid email.");
          break;
    
        case "auth/network-request-failed":
          alert("Network error. Please check your internet connection.");
          break;
    
        default:
          alert("An error occurred: " + error.message);
          break;
      }
    }    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLogin(true);

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setData(userDocSnap.data());
          setUserName(userDocSnap.data().username);
          setUserEmail(userDocSnap.data().email);
        }
      } else {
        setLogin(false);
        setUserName(null);
        setUserEmail(null);
        setData(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const deleteOperation = async (updatedTasks) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { tasks: updatedTasks });

      const updatedUserDocSnap = await getDoc(userDocRef);
      setTaskLength(updatedTasks.length);
      setData(updatedUserDocSnap.data());
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddTask = async ({ title, descrip, date, time }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
      }
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const existingTasks = userDocSnap.data().tasks || [];
      const newTask = {
        title,
        descrip,
        date,
        time,
        marked: false,
      };
      const updatedTasks = [...existingTasks, newTask];
      await updateDoc(userDocRef, { tasks: updatedTasks });

      const updatedUserDocSnap = await getDoc(userDocRef);
      setData(updatedUserDocSnap.data());
      setTaskEntryOpen(false);
      setTaskLength(updatedTasks.length);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");
  const [datee, setDate] = useState("");
  const [timee, setTime] = useState("");
  const [indexx, setIndex] = useState(0);

  const updateOperation = async (indexx) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in.");
        return;
      }
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const existingTasks = userDocSnap.data().tasks || [];
      const updatedTasks = [...existingTasks];
      setIndex(indexx);
      setTitle(updatedTasks[indexx].title);
      setDescrip(updatedTasks[indexx].descrip);
      setDate(updatedTasks[indexx].date);
      setTime(updatedTasks[indexx].time);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdateTask = async ({ title, descrip, date, time }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      const userDocSnap = await getDoc(userDocRef);
      const existingTasks = userDocSnap.data().tasks || [];
      const updatedTasks = [...existingTasks];

      if (indexx < 0 || indexx >= updatedTasks.length) {
        console.error("Invalid index for updating task.");
        return;
      }

      updatedTasks[indexx] = {
        title,
        descrip,
        date,
        time,
        marked: false,
      };

      await updateDoc(userDocRef, { tasks: updatedTasks });

      const updatedUserDocSnap = await getDoc(userDocRef);
      setData(updatedUserDocSnap.data());
      setTaskLength(updatedTasks.length);

      setUpdatedOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleMarked = async (indexx) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      const userDocSnap = await getDoc(userDocRef);
      const existingTasks = userDocSnap.data().tasks || [];
      const updatedTasks = [...existingTasks];

      if (indexx < 0 || indexx >= updatedTasks.length) {
        console.error("Invalid index for updating task.");
        return;
      }

      updatedTasks[indexx] = {
        ...updatedTasks[indexx],
        marked: !updatedTasks[indexx].marked,
      };

      await updateDoc(userDocRef, { tasks: updatedTasks });

      const updatedUserDocSnap = await getDoc(userDocRef);
      setData(updatedUserDocSnap.data());
      setTaskLength(updatedTasks.length);
    } catch (error) {
      console.error("Error toggling marked status:", error);
    }
  };

  const handlelogout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();

      setLogin(false);
      setImage(null);
      setUserName(null);
      setUserEmail(null);
      setData(null);
      setTaskLength(0);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [isTaskEntryOpen, setTaskEntryOpen] = useState(false);
  const [isUpdatedOpen, setUpdatedOpen] = useState(false);

  const setTaskkLength = (tass) => {
    setTaskLength(tass);
  };

  const handleUpdatedOpen = () => {
    setUpdatedOpen(true);
  };
  const handleUpdatedClose = () => {
    setUpdatedOpen(false);
  };

  const handleTaskEntryOpen = () => {
    setTaskEntryOpen(true);
  };
  const handleTaskClose = () => {
    setTaskEntryOpen(false);
  };

  return (
    <>
      <div className="w-screen flex flex-col">
        <Sign
          handleSignUp={handleSignUp}
          handleLogIn={handleLogIn}
          islogin={isLogin}
        />

        <div className="fixed w-full z-50">
          <Nav
            isLogin={isLogin}
            image={image}
            userName={userName}
            userEmail={userEmail}
            handleTaskEntryOpen={handleTaskEntryOpen}
            taskLength={taskLength}
            handlelogout={handlelogout}
          />
        </div>

        <div className={`w-full flex-grow ${isLogin ? "pt-40" : "pt-0"}`}>
          <Task
            isLogin={isLogin}
            data={data}
            deleteOperation={deleteOperation}
            updateOperation={updateOperation}
            isTaskEntryOpen={isTaskEntryOpen}
            handleTaskClose={() => handleTaskClose()}
            handleAddTask={handleAddTask}
            handleUpdatedOpen={handleUpdatedOpen}
            handleUpdatedClose={handleUpdatedClose}
            isUpdatedOpen={isUpdatedOpen}
            updateTitle={title}
            updateDescrip={descrip}
            updateDate={datee}
            updateTime={timee}
            handleUpdateTask={handleUpdateTask}
            setTaskkLength={setTaskkLength}
            handleMarked={handleMarked}
          />
        </div>
      </div>
    </>
  );
}

export default App;
