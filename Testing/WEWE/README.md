# AR19_A_SIRIUS_ARQUETIPO-GATLING

Sirius es un ARTE basado en la herramienta de prueba de carga y rendimiento Gatling que integra bibliotecas y complementos que permiten realizar pruebas a aplicaciones web y servicios

Esta escrito en Escala , compilado con maven y arroja sus resultados por medio de gatling en un reporte general de resultados de ejecución.

## Ambiente

Para poder ejecutar Sirius de manera exitosa se requiere lo siguiente:

Install Java8+:  

* [Java8](https://www.oracle.com/java/technologies/downloads/)  

Install Maven:  

* [Maven](https://maven.apache.org/download.cgi)  

## Estructura

    | src
        | resources
            | bodies
            | data
        | scala
            | constants
            | microservice
                | consumes
                | simulations
    | results
        
* Resources : Alberga los recursos necesarios para la ejecución de los consumos, dentro de esta carpeta se encuentran bodies y data.

    * Bodies: En esta carpeta se encuentran los archivos .json con la definicion de los cuerpos de las peticiones usadas en los consumos.

    * Data: En esta carpeta se encuentran los archivos con la data en formato csv que servira para alimentar los consumos.

* Scala: En esta carpeta se encuentra el sourcecode de la solución.
    
    * Constants: Aloja los archivos con constantes reutilizables en el proyecto , aqui se tienen que definir las URI de los endpoints a consumir , y los nombres de los archivos .json que alimentaran las peticiones.

    * Microservice : Aloja el codigo para probar un servicio.
         
         * Consumes: Contiene la definicion de los consumos de los endpoints del servicio o servicios a probar , es decir cada metodo que se va a consumir en una simulación

         * Simulations: Las simulaciones deben contener la serie de pasos / consumos que realizaria un consumo , o un flujo natural de un usuario.

 * *Se recomienda ampliamente para mantener la estructura y forma del proyecto, seguir la estructura propuesta y generar los consumes de manera que sean reutilizados en las diferentes simulaciones.

## Variables de entorno necesarias para la ejecución.
* JAVA_HOME: C:\Program Files\Java\jdk1.8.0_351
* M2_HOME: C:\maven
* MAVEN_HOME: C:\maven

## Compile
Una vez hechos cambios en el arquetipo se recomienda compilar la solución para refrescar los cambios .


```bash
   
$mvn clean compile

$mvn clean install

```

## Test  

Para ejecutar las pruebas se puede ejecutar lo siguiente:


Ejecutar todas las pruebas en una sola ejecución:

```bash
   
$mvn gatling:test

```

O bien , ejecutar simulación por simulación de manera independiente , por ejemplo :

```bash
   
$mvn gatling:test -Dgatling.simulationClass=CLASSNAME
    
```  
Ejemplos:

```bash

$mvn gatling:test -Dgatling.simulationClass=microservice.PingUsersSimulation

$mvn gatling:test -Dgatling.simulationClass=microservice.SaveUserSimulation

$mvn gatling:test -Dgatling.simulationClass=microservice.LoginSimulation

$mvn gatling:test -Dgatling.simulationClass=microservice.UploadFileSimulation

```  


## FOMALHAUT

Los servicios que se estan consumiendo actualmente dentro de las carpetas de simulations y consumes forman parte del arquetipo AR13_A_FOMALHAUT_FORMULARIOS-DINAMICOS

para mas detalles sobre este arquetipo, como levantarlo y usarlo visitar :

[FOMALHAUT-GITHUB](https://github.com/Axitymx/AR13_A_FOMALHAUT_FORMULARIOS-DINAMICOS)


[FOMALHAUT-CReA](https://intellego365.sharepoint.com/:u:/r/sites/CentralAxity/Corporativo/CReA/SitePages/AR13_FOMALHAUT_FORMULARIOS%20DINAMICOS.aspx?csf=1&web=1&e=tQK6A8)

---


![Audience](/assets/CReA.png)

### Este ARTE forma parte del CReA de Axity, para más información visitar [CReA](https://intellego365.sharepoint.com/sites/CentralAxity/Corporativo/CReA/SitePages/Home.aspx?xsdata=MDV8MDF8fDEwMGQ2NjIxMGFmNDQ4MDhlMWNhMDhkYmU1ZmRhNjRjfDAwYTA1Y2UwYmQzZDQyMTVhNTY5YzYyNjFhMjBhMzllfDB8MHw2MzgzNTY2NDk3ODI2MDAxMzh8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKV0lqb2lNQzR3TGpBd01EQWlMQ0pRSWpvaVYybHVNeklpTENKQlRpSTZJazkwYUdWeUlpd2lWMVFpT2pFeGZRPT18MXxMMk5vWVhSekx6RTVPbTFsWlhScGJtZGZXa2RGZVZwRVRUSk9Na2wwVFVSVmVscERNREJhUkUwMVRGUnNhazU2VlhSTmJWbDNUbTFTYkZwRVNtaE9SRVp0UUhSb2NtVmhaQzUyTWk5dFpYTnpZV2RsY3k4eE56QXdNRFk0TVRjM05qVXd8NWIwNzM0Nzc1ZTU0NDcyYmUxY2EwOGRiZTVmZGE2NGN8MGRhYWQyOTgxYjkwNGIyMDg5NzI2OWIxNTUwNDdhZmQ%3D&sdata=cmJMMU5kRXRmUkJBdWtFTDg4T1RJYzJJK2FNTUlDWUF2OTdYN1VNZU13dz0%3D&ovuser=00a05ce0-bd3d-4215-a569-c6261a20a39e%2Coscar.hurtado%40axity.com&OR=Teams-HL&CT=1700166162545&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yMzEwMTIyNzcxMiIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D)




