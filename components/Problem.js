"use client";
import { motion } from "framer-motion";

const Step = ({ emoji, title, text }) => {
  return (
    <motion.div
      className="w-full md:w-64 flex flex-col gap-2 items-center justify-center bg-white/5 p-6 rounded-lg backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-5xl mb-2">{emoji}</span>
      <h3 className="font-bold text-lg text-base-content/90">{title}</h3>
      <p className="text-sm text-base-content/70 text-center">{text}</p>
    </motion.div>
  );
};

const Arrow = ({ extraStyle }) => {
  return (
    <motion.svg
      className={`shrink-0 w-12 fill-red-600/30 ${extraStyle}`}
      viewBox="0 0 138 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
        />
      </g>
    </motion.svg>
  );
};

const Problem = () => {
  return (
    <section className="relative bg-base-200">
      {/* Copos de nieve sutiles */}
      {[...Array(10)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto px-8 py-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-6xl mb-8"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎄
          </motion.span>

          <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight mb-6 text-red-600">
            ¡Santa quiere hablar contigo!
          </h2>

          <p className="max-w-xl mx-auto text-lg text-base-content/70 leading-relaxed">
            Este año Santa está usando tecnología mágica para llamar
            personalmente a todos los niños. ¡Escribe tu carta y espera su
            llamada! ✨
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
          <Step
            emoji="📝"
            title="Sin forma de escribir a Santa"
            text="En esta era digital, muchos niños no tienen forma de hacer llegar sus deseos navideños a Santa Claus."
          />
          <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />
          <Step
            emoji="🎅"
            title="Santa no recibe sus deseos"
            text="En esta era digital, muchos niños no tienen forma de hacer llegar sus deseos navideños a Santa Claus."
          />
          <Arrow extraStyle="md:-scale-x-100 md:-rotate-90" />
          <Step
            emoji="✨"
            title="Ayudemos a la magia navideña"
            text="En esta era digital, muchos niños no tienen forma de hacer llegar sus deseos navideños a Santa Claus."
          />
        </div>
      </div>
    </section>
  );
};

export default Problem;
