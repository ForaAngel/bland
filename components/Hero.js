"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start z-10">
        <motion.h1
          className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 text-red-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ¡Habla con Santa! 🎅
        </motion.h1>

        <motion.p
          className="text-lg opacity-80 leading-relaxed"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ¿Has sido bueno este año? ¡Escribe tu carta a Santa y él te llamará
          personalmente! Santa y sus elfos están usando tecnología mágica para
          hacer llamadas especiales a todos los niños. 🎄✨
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <motion.button
              className="btn bg-red-600 hover:bg-red-700 text-white border-none min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Escribir mi Carta
            </motion.button>
          </Link>
          <motion.button
            className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Ejemplo
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full">
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <h3 className="text-3xl font-bold text-green-600">24/7</h3>
            <p className="text-sm opacity-70">Llamadas Mágicas</p>
          </motion.div>
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <h3 className="text-3xl font-bold text-red-600">+1M</h3>
            <p className="text-sm opacity-70">Niños Felices</p>
          </motion.div>
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <h3 className="text-3xl font-bold text-green-600">100%</h3>
            <p className="text-sm opacity-70">Magia Navideña</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="lg:w-full relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl pointer-events-none">
          <Image
            src="/santahero.jpeg"
            alt="Santa Claus feliz saludando"
            fill
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
