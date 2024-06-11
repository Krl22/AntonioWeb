import React from "react";

const VocabularyBuilder = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-indigo-600 min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Vocabulary Builder</h1>
      <div className="bg-white rounded-md p-8 shadow-lg w-full max-w-md">
        <p className="text-lg">Welcome to Vocabulary Builder!</p>
        <p className="mt-4">
          Here you can expand your vocabulary with a variety of exercises and
          activities.
        </p>
        <p className="mt-4">
          Explore themed word lists, practice pronunciation, and test your
          knowledge with quizzes and games.
        </p>
        <p className="mt-4">
          Whether you're preparing for exams, improving your writing skills, or
          simply striving to enhance your vocabulary, Vocabulary Builder
          provides the tools and resources you need to succeed.
        </p>
      </div>
    </div>
  );
};

export default VocabularyBuilder;
