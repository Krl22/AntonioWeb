import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdReplay } from "react-icons/md";

const RestaurantScene02 = ({ changeScene }) => {
  const [audioEnded, setAudioEnded] = useState(false);

  const replayAudio = () => {
    // Simulación de reproducción de audio (no hay audio real por ahora)
    setAudioEnded(false);
    setTimeout(() => setAudioEnded(true), 3000); // Simula que el audio terminó después de 3 segundos
  };

  return (
    <div className="flex flex-col items-center justify-around w-full h-screen p-4 pt-10 pb-24">
      {/* Placeholder de fondo */}
      <div className="relative flex items-center justify-center w-full max-w-4xl mt-8 bg-gray-300 aspect-video">
        <div className="flex items-center justify-center w-full h-full text-lg text-white bg-gray-500">
          <p>Restaurant Scene 02 (Placeholder Background)</p>
        </div>
      </div>

      {/* Simulación de audio (sin archivo real) */}
      <button
        onClick={replayAudio}
        className="px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Replay (Simulado)
      </button>

      {/* Cambio de escena dependiendo de si el audio ha terminado */}
      <motion.div
        className="px-4 py-6 shadow-lg w-fit bg-white/90 backdrop-blur-lg sm:px-8 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: audioEnded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-between mb-4">
            <p className="w-4/5 text-lg font-semibold text-gray-900 text-start">
              The waiter asks: "Would you like to start with drinks or food?"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => changeScene("Restaurant03")} // Cambiar a la siguiente escena
              className="px-6 py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-lg shadow sm:text-base hover:bg-blue-700"
            >
              "I'll have a drink, please."
            </button>
            <button
              onClick={() => changeScene("Restaurant03")} // Cambiar a la siguiente escena
              className="px-6 py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-lg shadow sm:text-base hover:bg-blue-700"
            >
              "I'd like some food, please."
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantScene02;
