import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdReplay } from "react-icons/md";
import restaurantBg from "./assets/entrance.webp";
import waitress from "./assets/waitress.png";
import entranceHelpAudio from "./assets/waitressAudio1.mp3";

const RestaurantScene = ({ changeScene }) => {
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef(null);

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-full h-screen p-4 pt-10 pb-24">
      <div className="relative flex items-center justify-center w-full max-w-4xl mt-8 aspect-video">
        <img
          src={restaurantBg}
          alt="Restaurant Background"
          className="absolute object-cover w-full h-full rounded-lg shadow-lg"
        />
        <motion.img
          src={waitress}
          alt="Waitress"
          className="absolute bottom-0 w-36 lg:w-[320px]"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "20%", opacity: 1 }}
          transition={{
            x: { duration: 1.5, ease: "easeOut" },
            opacity: { duration: 1 },
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={entranceHelpAudio}
        autoPlay
        onEnded={() => setAudioEnded(true)}
      />

      <motion.div
        className="px-4 py-6 shadow-lg w-fit bg-white/90 backdrop-blur-lg sm:px-8 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: audioEnded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-between mb-4">
            <p className="w-4/5 text-lg font-semibold text-gray-900 text-start">
              The waitress is approaching. What do you say?
            </p>
            <button
              onClick={replayAudio}
              className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
              aria-label="Replay Audio"
            >
              <MdReplay size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => changeScene("Restaurant02")} // Cambiar la escena a Restaurant02
              className="px-6 py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-lg shadow sm:text-base hover:bg-blue-700"
            >
              "Table for two, please."
            </button>
            <button
              onClick={() => changeScene("Restaurant02")} // Cambiar la escena a Restaurant02
              className="px-6 py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-lg shadow sm:text-base hover:bg-blue-700"
            >
              "What kind of food do you serve?"
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantScene;
