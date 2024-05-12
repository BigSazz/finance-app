"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div>
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back{isLoaded ? ", " : " "}
        <span className="capitalize">{user?.firstName}</span>
        👋{" "}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        Here is a quick overview of your finances.
      </p>
    </div>
  );
};
