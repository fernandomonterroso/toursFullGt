
# 1. Documentación de requerimiento
**Acta de proyecto**
| Tema | Descripción |
|--|--|
| Objetivo | 1. Crear un sistema para poder registrar y tener el control sobre ventas del negocio, reportes y poder facturar las ventas, además de ingresar demás controles como compras que realiza la empresa.
||2. debe ayudar a mejorar la eficiencia operativa de la lavandería, lo que incluye la gestión del inventario, la entrega de los pedidos y la gestión de los pagos| 
||3. Calcular los cobros que se van a cobrar al cliente.|
|Criterios de éxito |1. El sistema de ventas debe ser capaz de aumentar las ventas totales de la lavandería, ya sea a través de la venta de nuevos productos o servicios, la retención de clientes existentes o la captación de nuevos clientes.|
||2. el sistema de ventas debe ser capaz de adaptarse a los cambios en las necesidades del negocio y de los clientes, lo que incluye la capacidad de agregar nuevos productos o servicios, la integración con otros sistemas y la capacidad de escalar a medida que el negocio crece.|
||3.  Reducción de errores y problemas en la entrega de los pedidos.|
|  | 4. Sistema eficiente en tiempo de carga, tener múltiples conexiones del sistema en simultaneo. |
| Partes interesadas | Departamento de ventas de la empresa de lavandería y dueño del negocio. |
| Usuarios | Empleados |



# 2. Analisis

**Tecnologías**
Debido a los ítems solicitados, el sistema debe de ser web, por lo cual se examina que las tecnologías adecuadas para realizar este sistema son: Node.js, Bootstrap y Vue.js como las principales tecnologías de desarrollo. A continuación, le presento algunas razones por las que creo que estas tecnologías serían ideales para su sitio web.

 -  Seguridad y confiabilidad: Con Node.js, podemos garantizar un alto nivel de seguridad y confiabilidad en el procesamiento de pagos en línea. Node.js es conocido por su capacidad para manejar grandes cantidades de datos y solicitudes de manera eficiente, lo que es esencial para proteger los datos de sus clientes y evitar cualquier posible violación de seguridad.
    
 -  Interfaz de usuario atractiva y fácil de usar: Bootstrap es uno de los frameworks de diseño web más populares y ampliamente utilizados en todo el mundo. Con Bootstrap, podemos crear una interfaz de usuario atractiva y fácil de usar que brinde a sus clientes una experiencia de usuario intuitiva y consistente. Esto les permitirá realizar sus pagos de manera fácil y rápida, lo que a su vez aumentará la satisfacción del cliente y la tasa de conversión.
    
 -  Experiencia de usuario interactiva: Con Vue.js, podemos agregar interacciones en tiempo real a su página web, como actualizaciones en tiempo real del estado del pago, validaciones de formularios en línea y otros aspectos que pueden ser necesarios en una página de cobros de lavandería. Esto hará que su página web sea más atractiva e interactiva para sus clientes, lo que aumentará la satisfacción del cliente y mejorará su reputación en línea.
    
 -  Escalabilidad y facilidad de mantenimiento: Con Node.js y Vue.js, podemos crear una aplicación web altamente escalable y fácil de mantener. Estas tecnologías nos permiten crear componentes reutilizables que hacen que el código sea más fácil de mantener y actualizar. Además, con Node.js, podemos manejar una gran cantidad de solicitudes de manera simultánea y rápida, lo que garantiza que su sitio web se mantenga operativo incluso en momentos de alta demanda.
 
**Infraestructura**
El cliente posee una infraestructura con las siguientes características:
 - Servidor inter core i5 6700, 8 de RAM # 2666MHz con windows server.
 - Topología de tipo estrella.
 - 5 equipos host.
 Diagrama de su infraestuctura 
 ![enter image description here](https://upload.wikimedia.org/wikipedia/commons/5/53/Netzwerktopologie_Stern.png)
Las tecnologías elegidas fueron elegidas con base en la infraestructura para la integración y despliegue correcto de la misma.

**Requerimientos**
***Requerimientos no funcionables:***
 5.  El sitio web debe ser fácil de usar y accesible para todos los usuarios, independientemente de su nivel de habilidad tecnológica. Debe tener una interfaz de usuario intuitiva y atractiva que permita a los usuarios realizar tareas de manera eficiente y satisfactoria.
    
 6.  El sitio web debe garantizar la seguridad de los datos del usuario, especialmente en lo que respecta a los pagos y transacciones en línea. Debe implementar medidas de seguridad robustas, como la autenticación y la autorización adecuadas, para evitar el acceso no autorizado a los datos del usuario.
    
 7.  El sitio web debe tener un tiempo de respuesta rápido y un alto rendimiento, especialmente durante los picos de tráfico. Debe ser capaz de manejar grandes cantidades de datos y solicitudes de manera eficiente sin ralentizar el sitio web o causar errores en el procesamiento.
    
 8.  El sitio web debe ser escalable y capaz de manejar un aumento en el tráfico de usuarios a medida que crece su negocio. Debe poder manejar múltiples solicitudes simultáneamente y garantizar que el sitio web siga funcionando sin problemas incluso durante momentos de alta demanda.
    
 9.  El sitio web debe ser fácil de mantener y actualizar. Debe tener un código limpio y bien organizado para que sea fácil de entender y modificar. Además, debe tener documentación clara y completa que facilite la resolución de problemas y la actualización del sitio web.
    
 10.  Compatibilidad: El sitio web debe ser compatible con una amplia gama de dispositivos y navegadores, asegurando una experiencia de usuario consistente en diferentes plataformas.
 
***Requerimientos funcionables***
 1. Integración con servicios de terceros: El sitio web debe ser capaz de integrarse con servicios de terceros como servicio de certificacion de facturaciones. 
 2.  Generación de facturas: El sitio web debe ser capaz de generar facturas detalladas de los pedidos y pagos realizados.

**Restricciones**
 1. Restricciones vigentes de SAT:
	a. Todos los contribuyentes en Guatemala deben registrarse ante el SAT y obtener un número de identificación tributaria (NIT) antes de poder emitir facturas legales. 
	b. SAT es responsable de autorizar el uso de formatos de facturas y comprobantes fiscales. Los formatos deben cumplir con ciertos requisitos de diseño y contenido para ser válidos.
	c. Se debe realizar la validación electrónica de la factura. 
 2. El sistema debe de ser seguro en las transacciones.
 3. Los datos solicitados para el cliente son apellido y nombre, domicilio (calle, número, apartamento y piso), barrio y teléfono.
 4. El cálculo de los cobros debe ser validado en sistema.
 5. Si existe alguna inconsistencia en los datos, se debe de mostrar él originen del error para mantener la confianza de los datos.

**Analisis de procesos**
Con base a los requerimientos podemos establecer el análisis de como lograr los puntos solicitados por el cliente, establecer los procesos a implementar en el sistema, definición de soluciones, definir aspectos importantes, definir la complejidad de cada proceso.

# 4. kanban
	Se implemento en jira.
	Link de seguimiento. [enter link description here](https://aseguramientodesoft-2022.atlassian.net/jira/software/projects/SL/boards/2/roadmap)

Tablero 
![enter image description here](https://github.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/blob/main/media/jira%20kan22.png?raw=true)

# 5. Documentar las pruebas

# 6. Documentar la implementación

# 7. Otros
**Diagrama de GANTT**
El diagrama de grant fue generador en la pagina de monday.com.
El link del seguimiento es el siguiente https://ninguna61774.monday.com/boards/4174702899/
Vista de diagrama de GANTT
![enter image description here](https://github.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/blob/main/media/grant%20vista.png?raw=true)

Tabla de tareas registradas en diagrama de GANTT
![enter image description here](https://github.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/blob/main/media/tareas%20grant.png?raw=true)

**Manual de usuario**
En la pantalla de clientes tenemos múltiples opciones de ingreso de información para que el cliente ingrese, sus apellidos, nombre, dirección, teléfono y nit que es validado antes de continuar con el proceso. 

![enter image description here](https://raw.githubusercontent.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/main/media/formu_cliente.png)

**Ingreso datos cliente y información de servicios**
En esta sección se ingresa y se valida los datos, fechas, precios y tipos de servicios solicitados por el cliente.

![enter image description here](https://raw.githubusercontent.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/main/media/pagina_coti.png)

**Formulario de Cotización**
En la parte del formulario de cotización es donde se interactúa con el cliente con datos personales, identificación tributaria y la información de la cotización de los servicios a adquirir siendo los siguientes:

1. Pantalla clientes.
A. ingresa el cliente.
2. Pantalla de cotización.
A. Buscar cliente.
B. meter datos de los productos.
C. Calcula.
D. Guarda la cotizacion

![enter image description here](https://raw.githubusercontent.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/main/media/coti_cliente.png)


** Listado de Cotizaciones**
En esta sección es donde encontramos el historial de cotizaciones realizadas a diferentes clientes. Iniciando con el ID, nombre, fecha, estado, fecha devolución, días restantes de entrega y opciones como se muestra a continuación:

![enter image description here](https://raw.githubusercontent.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/main/media/listado_cotis.png)


**Modelo de Factura **
En esta sección se visualiza la factura con el nombre del cliente, dirección Nit, correlativo de factura, fecha y detalle de los servicios y precios adquiridos.

También en esta sección, se muestra la firma FEL y términos y condiciones. 
![enter image description here](https://raw.githubusercontent.com/fernandomonterrosoumg/PROYECTO_LAVANDERIA/main/media/factura.png)

