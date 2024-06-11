import React from "react";

const Grammar = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-indigo-600 min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Grammar</h1>
      <div className="bg-white rounded-md p-8 shadow-lg w-full max-w-md">
        <p className="text-lg">Welcome to the Grammar section!</p>
        <p className="mt-4">
          Here you can learn and practice English grammar rules and concepts.
        </p>
        <p className="mt-4">
          Explore lessons on tenses, sentence structure, punctuation, and more.
        </p>
        <p className="mt-4">
          Whether you're a beginner looking to build a strong foundation or an
          advanced learner seeking to refine your skills, Grammar provides
          comprehensive resources to help you master the intricacies of English
          grammar.
        </p>
      </div>
    </div>
  );
};

export default Grammar;
