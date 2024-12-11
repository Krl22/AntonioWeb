import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseconfig";
import { doc, getDoc, updateDoc, onSnapshot, runTransaction } from "firebase/firestore";
import { questions } from "./utils/questions";

const MAX_QUESTIONS = 10;
const TRACK_LENGTH = 400;

// Asignación de colores a cada jugador
const ballColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
];

const Game = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [winner, setWinner] = useState(null);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);

    const unsubscribe = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoomData(data);

        // Verificar el estado del dashboard
        const winningPlayer = data.players.find(
          (player) => player.progress >= MAX_QUESTIONS
        );
        if (winningPlayer) {
          setWinner(winningPlayer.nickname);
          setDashboardVisible(true);
        } else {
          setDashboardVisible(data.dashboardVisible || false);
        }

        data.players.forEach((player) => {
          if (isNaN(player.progress)) {
            player.progress = 0;
          }
        });

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleAnswerSubmit = async () => {
    const isCorrect = checkAnswer(selectedOption);
    setSelectedOption("");

    if (isCorrect && roomData) {
      const user = auth.currentUser;
      const roomRef = doc(db, "rooms", roomId);

      try {
        await runTransaction(db, async (transaction) => {
          const roomDoc = await transaction.get(roomRef);
          if (!roomDoc.exists()) {
            throw "Document does not exist!";
          }

          const roomData = roomDoc.data();
          const updatedPlayers = roomData.players.map((player) =>
            player.id === user.uid
              ? { ...player, progress: player.progress + 1 }
              : player
          );

          transaction.update(roomRef, { players: updatedPlayers });
        });

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } catch (error) {
        console.error("Error updating player progress: ", error);
      }
    }
  };

  const checkAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    return selectedOption === correctAnswer;
  };

  const updateRoomStatus = async (roomId, status) => {
    const roomRef = doc(db, "rooms", roomId);
    try {
      await updateDoc(roomRef, {
        status: status,
      });
      console.log("Room status updated successfully");
    } catch (error) {
      console.error("Error updating room status: ", error);
    }
  };

  const handleReturnToRoom = async () => {
    const user = auth.currentUser;

    try {
      // Actualiza el estado de la sala a "waiting"
      await updateRoomStatus(roomId, "waiting");

      // Reinicia el progreso de los jugadores a 0
      const updatedPlayers = roomData.players.map((player) => ({
        ...player,
        progress: 0, // Solo reinicia el progreso del jugador que regresa
      }));

      try {
        await updateDoc(doc(db, "rooms", roomId), {
          players: updatedPlayers,
        });

        // Reinicia otros estados relevantes para el juego
        setCurrentQuestionIndex(0);
        setWinner(null);
        setDashboardVisible(false);
        navigate(`/room/${roomId}`);
        setSelectedOption("");
      } catch (error) {
        console.error("Error updating player progress: ", error);
      }
    } catch (error) {
      console.error("Error returning to room:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (dashboardVisible) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Game Over!</h1>
        <h2 className="mt-4">Winner: {winner}</h2>

        {/* Mostrar el puntaje de todos los jugadores */}
        <div className="p-4 mt-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Final Scores:</h3>
          <ul>
            {roomData.players.map((player) => (
              <li key={player.id} className="mt-2">
                {player.nickname}: {player.progress} points
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para regresar a la sala */}
        <button onClick={handleReturnToRoom} className="mt-4 btn btn-primary">
          Return to Room
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Race to the Finish Line!</h1>
      <h2 className="mt-4">Room: {roomId}</h2>

      <div className="w-full max-w-md p-8 mt-6 bg-white rounded shadow-md">
        <h3 className="text-lg font-semibold">Players' Progress</h3>

        {/* Progreso de los jugadores */}
        <div className="relative w-full h-20 bg-gray-200 rounded-lg">
          {roomData.players.map((player, index) => (
            <div
              key={player.id}
              className={`absolute rounded-full h-8 w-8 ${
                ballColors[index % ballColors.length]
              }`}
              style={{
                left: `${(player.progress / MAX_QUESTIONS) * 100}%`,
                top: `${index * 50}px`,
                transition: "left 0.5s ease",
              }}
            >
              <span className="text-xs text-center text-white">
                {player.nickname}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md p-8 mt-8 bg-white rounded shadow-md">
        <h3 className="text-lg font-semibold">
          Question: {questions[currentQuestionIndex].question}
        </h3>

        {questions[currentQuestionIndex].options.map((option, idx) => (
          <label key={idx} className="block mt-4">
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}

        <button
          onClick={handleAnswerSubmit}
          disabled={!selectedOption}
          className="mt-4 btn btn-primary"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default Game;
