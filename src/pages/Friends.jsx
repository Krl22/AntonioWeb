import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseconfig";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const Friends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState("");
  const [messages, setMessages] = useState("");
  const currentUser = auth.currentUser;

  // Obtener la lista de amigos del usuario
  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setFriendsList(doc.data().friends || []);
          }
        });
      }
    };
    fetchFriends();
  }, [currentUser]);

  // Agregar amigo
  const handleAddFriend = async () => {
    if (currentUser && newFriendEmail) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        friends: [...friendsList, newFriendEmail],
      });
      setNewFriendEmail(""); // Limpiar el campo después de agregar
    }
  };

  // Manejar el envío de mensaje
  const handleSendMessage = async (friendEmail) => {
    // Aquí puedes implementar la lógica para enviar mensajes a amigos
    console.log(`Message sent to ${friendEmail}: ${messages}`);
    // Lógica para almacenar el mensaje en Firestore puede ir aquí
    setMessages(""); // Limpiar el campo después de enviar
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-600">
      <div className="max-w-4xl p-8 mx-auto mt-20 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          Friends List
        </h1>

        {/* Sección para agregar amigos */}
        <div className="p-6 mb-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
            Add Friend
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="email"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              className="w-2/3 input input-bordered input-primary"
              placeholder="Enter friend's email"
            />
            <button onClick={handleAddFriend} className="btn btn-primary">
              Add
            </button>
          </div>
        </div>

        {/* Lista de amigos */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
            Your Friends
          </h2>
          <ul className="space-y-2">
            {friendsList.map((friend, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 transition-shadow duration-300 bg-white rounded-md shadow hover:shadow-lg"
              >
                <span className="text-gray-800">{friend}</span>
                <button
                  onClick={() => handleSendMessage(friend)}
                  className="btn btn-secondary"
                >
                  Send Message
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Friends;
