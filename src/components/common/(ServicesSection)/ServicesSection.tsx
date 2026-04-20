"use client";
import styles from "./ServicesSection.module.css";

import ServiceItem from "../(ServiceItem)/ServiceItem";


const ServicesSection = () => {
  return (
    <div className={styles.servicesSection}>
      <ServiceItem
        title="Manejo y Calidad"
        description="Aplicamos protocolos estrictos de higiene y manipulación en cada etapa del proceso. Nuestro personal utiliza indumentaria adecuada y trabaja en espacios controlados para asegurar condiciones óptimas de limpieza, conservación y seguridad alimentaria. Esto permite mantener la calidad del producto desde su preparación hasta su entrega."
        image="/images/manejo-calidad.jpg"
        icon="/images/customer-service-icon.png"

      />

      <ServiceItem
        title="Distribución Especializada"
        description="Realizamos el traslado de nuestros productos en unidades refrigeradas diseñadas para mantener la cadena de frío en todo momento. Las canales y cortes se transportan bajo condiciones controladas de temperatura, higiene y ventilación, preservando su frescura, calidad e inocuidad desde el origen hasta su destino."
        image="/images/distribucion.jpg"
        icon="/images/delivery-icon.png"
        reverse
      />

      <ServiceItem
        title="Servicio al Cliente"
        description="Brindamos atención ágil y asesoría clara para ayudarle a elegir el producto adecuado en cada compra. Nuestro equipo responde de forma oportuna, ofreciendo recomendaciones y acompañamiento durante todo el proceso."
        image="/images/servicio-cliente.webp"
        icon="/images/quality-assurance-icon.png"
      />
    </div>
  );
};

export default ServicesSection;