import React from "react";
import { auth } from "../firebaseconfig";

const Account = () => {
  const currentUser = auth.currentUser;

  return (
    <div className="p-4 bg-white rounded-md shadow-md pt-[92px]">
      <h1 className="mb-4 text-2xl font-bold">Account Information</h1>
      {currentUser && (
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Email:</p>
            <p>{currentUser.email}</p>
          </div>
          <div>
            <p className="font-semibold">Display Name:</p>
            <p>{currentUser.displayName || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Photo:</p>
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="User profile"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <p className="font-semibold">Email Verified:</p>
            <p>{currentUser.emailVerified ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
