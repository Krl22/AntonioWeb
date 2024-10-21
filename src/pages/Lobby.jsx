import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseconfig";
import { collection, doc, setDoc, getDoc, Timestamp } from "firebase/firestore"; // Añadido getDoc para obtener datos de usuario

const Lobby = () => {
  const [roomId, setRoomId] = useState(""); // Estado para el ID de la sala al unirse
  const navigate = useNavigate();

  // Función para obtener el nickname del usuario desde Firestore
  const getUserNickname = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId); // Referencia al documento del usuario en la colección 'users'
      const userDoc = await getDoc(userDocRef); // Obtener el documento del usuario
      if (userDoc.exists()) {
        const userData = userDoc.data(); // Acceder a los datos del usuario
        return userData.nickname; // Devolver el campo 'nickname'
      } else {
        console.log("No such user document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user nickname: ", error);
      return null;
    }
  };

  // Función para crear una sala
  const handleCreateRoom = async () => {
    const newRoomId = generateRoomId(); // Generar un nuevo ID de sala
    const creatorId = auth.currentUser.uid; // Obtener el ID del creador (usuario autenticado)

    try {
      const nickname = await getUserNickname(creatorId); // Obtener el nickname del usuario desde Firestore

      if (!nickname) {
        console.error("Nickname not found for user");
        return;
      }

      // Crear un documento en la colección "rooms" de Firestore usando setDoc para establecer el ID del documento
      await setDoc(doc(collection(db, "rooms"), newRoomId), {
        // Cambia addDoc por setDoc
        roomId: newRoomId,
        creator: {
          id: creatorId,
          nickname: nickname, // Usar el nickname del documento de usuario
        },
        players: [
          {
            id: creatorId,
            nickname: nickname, // Usar el nickname del documento de usuario
            joinedAt: Timestamp.now(),
          },
        ],
        status: "waiting", // Estado inicial de la sala
        createdAt: Timestamp.now(),
      });

      console.log("Room created with ID: ", newRoomId);
      navigate(`/room/${newRoomId}`);
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  // Función para unirse a una sala
  const handleJoinRoom = () => {
    if (roomId) {
      // Redirigir a la sala con el ID introducido
      navigate(`/room/${roomId}`);
    } else {
      alert("Please enter a valid Room ID");
    }
  };

  // Función para buscar salas disponibles (aquí podrías mostrar un listado de salas)
  const handleSearchRooms = () => {
    navigate("/search-rooms");
  };

  // Función para generar un ID aleatorio de sala (puedes cambiar la lógica)
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 6); // Genera una cadena alfanumérica de 8 caracteres
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Game Lobby</h2>

        {/* Botón para crear una sala */}
        <button
          onClick={handleCreateRoom}
          className="w-full mb-4 btn btn-primary"
        >
          Create Room
        </button>

        {/* Input y botón para unirse a una sala */}
        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Enter Room ID</span>
          </label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
            className="w-full input input-bordered"
          />
          <button
            onClick={handleJoinRoom}
            className="w-full mt-4 btn btn-secondary"
          >
            Join Room
          </button>
        </div>

        {/* Botón para buscar salas */}
        <button onClick={handleSearchRooms} className="w-full btn btn-outline">
          Search Rooms
        </button>
      </div>
    </div>
  );
};

export default Lobby;
