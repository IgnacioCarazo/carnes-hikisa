"use client";
import styles from "./ServicesSection.module.css";

import ServiceItem from "../(ServiceItem)/ServiceItem";

const ServicesSection = () => {
  return (
    <div className={styles.servicesSection}>
      <ServiceItem
        title="Distribución especializada"
        description="Realizamos el traslado de nuestros productos en unidades refrigeradas diseñadas para mantener la cadena de frío en todo momento. Las canales y cortes se transportan bajo condiciones controladas de temperatura, higiene y ventilación, preservando su frescura, calidad e inocuidad desde el origen hasta su destino."
        image="/images/services/distribucion.jpg"
        icon="/images/services/icons/delivery-icon.png"
      />

      <ServiceItem
        title="Servicio al Cliente"
        description="Brindamos atención ágil y asesoría clara para ayudarle a elegir el producto adecuado en cada compra. Nuestro equipo responde de forma oportuna, ofreciendo recomendaciones y acompañamiento durante todo el proceso."
        image="/images/services/servicio-cliente.jpg"
        icon="/images/services/icons/customer-service-icon.png"
        reverse
      />

      <ServiceItem
        title="Manejo y Calidad"
        description="Aplicamos protocolos estrictos de higiene y manipulación en cada etapa del proceso. Nuestro personal utiliza indumentaria adecuada y trabaja en espacios controlados para asegurar condiciones óptimas de limpieza, conservación y seguridad alimentaria. Esto permite mantener la calidad del producto desde su preparación hasta su entrega."
        image="/images/services/manejo-calidad.jpg"
        icon="/images/services/icons/quality.png"
      />

      <ServiceItem
        title="Abastecimiento para Negocios y Hogares"
        description="Brindamos atención tanto a pequeños y grandes negocios como a hogares, adaptándonos a las necesidades de cada cliente. Contamos con una amplia variedad de productos y diferentes opciones de compra, ofreciendo un servicio ágil, confiable y pensado para facilitar el abastecimiento tanto comercial como familiar."
        image="/images/services/abastecimiento.jpg"
        icon="/images/services/icons/warehouse.png"
        reverse
      />

      <ServiceItem
        title="Productos Frescos y Seleccionados"
        description="Ponemos a su disposición una amplia variedad de carnes de res, cerdo, pollo, pescado, embutidos y otros productos cuidadosamente seleccionados para ofrecer un excelente sabor, textura y calidad. Trabajamos con proveedores confiables y mantenemos un proceso de selección riguroso para asegurar que cada producto cumpla con las expectativas de nuestros clientes"
        image="/images/services/productos-frescos.jpg"
        icon="/images/services/icons/fresh.png"
      />
    </div>
  );
};

export default ServicesSection;
