import React from "react";

const Community = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-indigo-600 min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Community</h1>
      <div className="bg-white rounded-md p-8 shadow-lg w-full max-w-md">
        <p className="text-lg">Welcome to the Community section!</p>
        <p className="mt-4">
          Join our vibrant community of English learners from around the world.
        </p>
        <p className="mt-4">
          Share your experiences, ask questions, and engage in discussions with
          fellow language enthusiasts.
        </p>
        <p className="mt-4">
          Whether you're seeking advice, looking for study partners, or simply
          want to connect with others on your language learning journey,
          Community provides a supportive and inclusive environment for all
          learners.
        </p>
      </div>
    </div>
  );
};

export default Community;
