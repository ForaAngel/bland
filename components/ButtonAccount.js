"use client";

import { Popover, Transition } from "@headlessui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import config from "@/config";

const ButtonAccount = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: config.auth.callbackUrl });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "unauthenticated") {
    return (
      <button
        onClick={handleSignIn}
        className="btn bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-transform duration-200 flex items-center gap-2 border-none px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span role="img" aria-label="santa">
          🎅
        </span>
      </button>
    );
  }

  return (
    <Popover className="relative z-10">
      <Popover.Button className="btn bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-transform duration-200 flex items-center gap-3 border-none px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {session?.user?.image ? (
          <div className="relative w-8 h-8">
            <Image
              src={session.user.image}
              alt={session.user.name || "Account"}
              className="rounded-full shrink-0"
              referrerPolicy="no-referrer"
              fill
              sizes="32px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <span className="w-8 h-8 bg-red-700 flex justify-center items-center rounded-full shrink-0 text-white">
            {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0)}
          </span>
        )}
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-[16rem] transform">
          <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-base-content ring-opacity-5 bg-base-100 p-1">
            <div className="space-y-0.5 text-sm">
              <button
                className="flex items-center gap-2 hover:bg-red-100 duration-200 py-1.5 px-4 w-full rounded-lg font-medium text-red-600"
                onClick={handleSignOut}
              >
                <span role="img" aria-label="waving-hand">
                  👋
                </span>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ButtonAccount;
