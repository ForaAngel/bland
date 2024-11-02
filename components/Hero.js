import Image from "next/image";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Tu recepcionista virtual inteligente 24/7
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Bot de IA que maneja llamadas, reservas y consultas de tus huéspedes
          automáticamente. Integración en minutos, atención personalizada
          siempre.
        </p>
        <div className="flex gap-4">
          <button className="btn btn-primary btn-wide">
            Prueba {config.appName}
          </button>
          <button className="btn btn-outline">Ver Demo</button>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full">
          <div className="text-center">
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-sm opacity-70">Atención</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">+95%</h3>
            <p className="text-sm opacity-70">Respuestas</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">-50%</h3>
            <p className="text-sm opacity-70">Costos</p>
          </div>
        </div>
      </div>

      <div className="lg:w-full relative">
        {/* <div className="absolute -top-4 -left-4 bg-primary/10 rounded-lg p-4 backdrop-blur-sm z-10">
          <p className="text-sm font-medium">
            ¿Tienen disponibilidad para este fin de semana?
          </p>
        </div> */}
        {/* <Image
          src="https://images.unsplash.com/photo-1635350736475-c8cef4b21906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
          alt="AI Hotel Assistant Demo"
          className="w-full rounded-xl shadow-2xl"
          priority={true}
          width={500}
          height={500}
        /> */}
        {/* <div className="absolute -bottom-4 -right-4 bg-primary/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm font-medium">
            ¡Por supuesto! Tenemos habitaciones disponibles...
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
