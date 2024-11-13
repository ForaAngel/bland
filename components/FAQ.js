"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const faqList = [
  {
    question: "¿Cómo funciona la llamada con Santa?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Santa utilizará su teléfono mágico especial para llamarte directamente
        desde el Polo Norte. Recibirás la llamada en el día y hora que elijas,
        ¡así que asegúrate de estar listo! 🎅📞
      </div>
    ),
  },
  {
    question: "¿En qué idioma habla Santa?",
    answer: (
      <p>
        ¡Santa es mágico! Puede hablar en el idioma que prefieras. Solo
        asegúrate de indicar tu idioma preferido al escribir tu carta. ✨
      </p>
    ),
  },
  {
    question: "¿Puedo grabar la llamada con Santa?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        ¡Por supuesto! Santa te permite grabar la llamada para que puedas
        guardar este momento mágico para siempre. 🎄
      </div>
    ),
  },
  {
    question: "¿Qué pasa si pierdo mi llamada con Santa?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        ¡No te preocupes! Santa entiende que a veces hay imprevistos. Podrás
        reprogramar tu llamada dentro de la temporada navideña. 🎁
      </div>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-red-200/30"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 ${isOpen ? "text-red-600" : "text-base-content"}`}
        >
          {item?.question}
        </span>
        <div
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${
            isOpen ? "bg-red-100" : "bg-base-100"
          }`}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-lg"
          >
            {isOpen ? "🎄" : "🎅"}
          </motion.span>
        </div>
      </button>

      <motion.div
        ref={accordion}
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-5 leading-relaxed text-base-content/80">
          {item?.answer}
        </div>
      </motion.div>
    </motion.li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200 relative overflow-hidden" id="faq">
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

      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <motion.div
          className="flex flex-col text-left basis-1/2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="inline-block font-semibold text-red-600 mb-4">
            Preguntas Frecuentes
          </p>
          <h2 className="sm:text-4xl text-3xl font-extrabold text-red-600 mb-4">
            ¿Tienes dudas sobre la llamada de Santa? 🎅
          </h2>
          <p className="text-base-content/70">
            Aquí encontrarás las respuestas a las preguntas más comunes sobre la
            experiencia mágica de hablar con Santa ✨
          </p>
        </motion.div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
