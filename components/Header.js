"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/app/icon.png";
import config from "@/config";
import ButtonAccount from "./ButtonAccount";

const links = [
  {
    href: "/#pricing",
    label: "Planes Mágicos",
    icon: "🎁",
  },
  {
    href: "/#testimonials",
    label: "Testimonios",
    icon: "⭐",
  },
  {
    href: "/#faq",
    label: "Preguntas",
    icon: "🎅",
  },
];

const cta = <ButtonAccount extraStyle="btn-primary" />;

const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header className="bg-base-200 relative">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-600/10 rounded-full"
          initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear",
          }}
        />
      ))}

      <nav className="container flex items-center justify-between px-8 py-4 mx-auto">
        <motion.div
          className="flex lg:flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg text-red-600">
              {config.appName}
            </span>
          </Link>
        </motion.div>

        <div className="flex lg:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-red-600"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </motion.button>
        </div>

        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="flex items-center gap-2 text-base-content hover:text-red-600 transition-colors"
                title={link.label}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
      </nav>

      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10"
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0"
              title={`${config.appName} homepage`}
              href="/"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-8"
                placeholder="blur"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-extrabold text-lg text-red-600">
                {config.appName}
              </span>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-red-600"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          <div className="flow-root mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <motion.div
                    key={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-base-content hover:text-red-600 transition-colors"
                      title={link.label}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col">{cta}</div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
