-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: hosteleria
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `IDCategoria` int NOT NULL AUTO_INCREMENT,
  `Categoria` varchar(50) NOT NULL,
  `SubCategoria` int DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDCategoria`),
  KEY `SubCategoria` (`SubCategoria`),
  CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`SubCategoria`) REFERENCES `categoria` (`IDCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Bebida',NULL,NULL),(2,'Comida',NULL,NULL),(3,'Menú',NULL,NULL),(4,'Carta',NULL,NULL),(5,'Postre',NULL,NULL),(6,'Refrescos',1,NULL),(7,'Zumos',1,NULL),(8,'Batidos',1,NULL),(9,'Agua',1,NULL),(10,'Cervezas',1,NULL),(11,'Cafés',1,NULL),(12,'Cacao',1,NULL),(13,'Infusiones',1,NULL),(14,'Vinos Tintos',1,NULL),(15,'Vinos Blancos',1,NULL),(16,'Vinos Rosados',1,NULL),(17,'Vinos Espumosos',1,NULL),(18,'Licores',1,NULL),(19,'Cócteles',1,NULL),(20,'Moctails',1,NULL),(21,'Bocatas',2,NULL),(22,'Sandwiches',2,NULL),(23,'Pintxos',2,NULL),(24,'Raciones',2,NULL),(25,'Menú del día',3,NULL),(26,'Menú degustación',3,NULL),(27,'Entrantes fríos',4,NULL),(28,'Entrantes calientes',4,NULL),(29,'Pescados',4,NULL),(30,'Carnes',4,NULL),(31,'Postres',5,NULL),(32,'Repostería',5,NULL);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `ClienteID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ClienteID`),
  UNIQUE KEY `Telefono` (`Telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comanda`
--

DROP TABLE IF EXISTS `comanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comanda` (
  `IDComanda` int NOT NULL AUTO_INCREMENT,
  `NumMesa` int NOT NULL,
  `IDProducto` int NOT NULL,
  `cantidad` int NOT NULL,
  `NumOrden` int DEFAULT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`IDComanda`),
  KEY `NumMesa` (`NumMesa`),
  KEY `IDProducto` (`IDProducto`),
  CONSTRAINT `comanda_ibfk_1` FOREIGN KEY (`NumMesa`) REFERENCES `mesa` (`NumMesa`),
  CONSTRAINT `comanda_ibfk_2` FOREIGN KEY (`IDProducto`) REFERENCES `producto` (`IDProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comanda`
--

LOCK TABLES `comanda` WRITE;
/*!40000 ALTER TABLE `comanda` DISABLE KEYS */;
/*!40000 ALTER TABLE `comanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa`
--

DROP TABLE IF EXISTS `mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa` (
  `NumMesa` int NOT NULL AUTO_INCREMENT,
  `IDSala` int NOT NULL,
  `Capacidad` int NOT NULL,
  `Ocupado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`NumMesa`),
  KEY `IDSala` (`IDSala`),
  CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`IDSala`) REFERENCES `sala` (`IDSala`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa`
--

LOCK TABLES `mesa` WRITE;
/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
INSERT INTO `mesa` VALUES (1,1,4,0),(2,1,4,0),(3,1,4,0),(4,1,4,0),(5,1,4,0),(6,1,4,0),(7,2,5,0),(8,2,5,0),(9,2,7,0),(10,2,2,0),(11,2,2,0),(12,2,5,0),(13,2,4,0),(14,2,4,0),(15,2,6,0),(16,2,2,0),(17,2,2,0),(18,2,5,0),(19,2,6,0);
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `IDProducto` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(150) DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `IDCategoria` int NOT NULL,
  PRIMARY KEY (`IDProducto`),
  KEY `IDCategoria` (`IDCategoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`IDCategoria`) REFERENCES `categoria` (`IDCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Refresco de cola','',1.00,6),(2,'Refresco de naranja','',1.00,6),(3,'Refresco de limón','',1.00,6),(4,'Refresco de té','',1.00,6),(5,'Refresco','',1.00,6),(6,'Zumo de manzana','',0.50,7),(7,'Zumo de naranja','',0.50,7),(8,'Zumo de piña','',0.50,7),(9,'Zumo de melocotón','',0.50,7),(10,'Zumo de tomate','',0.50,7),(11,'Zumo casero','',2.00,7),(12,'Limonada casera','',0.80,7),(13,'Batido de chocolate','',1.00,8),(14,'Batido de vainilla','',1.00,8),(15,'Batido de fresa','',1.00,8),(16,'Batido casero','',2.00,8),(17,'Agua mineral 1 litro','',1.00,9),(18,'Botellín de agua 500 ml','',0.50,9),(19,'Agua con gas 1 litro','',1.00,9),(20,'Botellín de agua con gas 500 ml','',0.50,9),(21,'Caña','',1.00,10),(22,'Zurito','',0.80,10),(23,'Cañón','',1.50,10),(24,'Cerveza sin alcohol','',1.00,10),(25,'Cerveza rubia','',1.00,10),(26,'Cerveza tostada','',1.50,10),(27,'Cerveza negra','',1.50,10),(28,'Cerveza con limón','',1.00,10),(29,'Solo','',0.40,11),(30,'Solo doble','',0.80,11),(31,'Americano','',0.50,11),(32,'Cortado','',0.40,11),(33,'Con leche','',0.50,11),(34,'Capuchino','',0.50,11),(35,'Café Bombón','',0.80,11),(36,'Café Vienés','',0.80,11),(37,'Carajillo','',1.00,11),(38,'Escoces','',1.80,11),(39,'Irlandes','',1.80,11),(40,'Café de autor','',2.00,11),(41,'Cola-cao','',0.80,12),(42,'Chocolate','',1.00,12),(43,'Infusiones','',0.50,13),(44,'Copa de vino','',1.20,14),(45,'Vino 1','',8.00,14),(46,'Vino 2','',10.00,14),(47,'Vino 3','',12.00,14),(48,'Vino 4','',15.00,14),(49,'Vino 5','',16.00,14),(50,'Copa de vino','',1.20,15),(51,'Vino 1','',8.00,15),(52,'Vino 2','',10.00,15),(53,'Vino 3','',12.00,15),(54,'Vino 4','',15.00,15),(55,'Vino 5','',16.00,15),(56,'Copa de vino','',1.20,16),(57,'Vino 1','',8.00,16),(58,'Vino 2','',10.00,16),(59,'Vino 3','',12.00,16),(60,'Vino 4','',15.00,16),(61,'Vino 5','',16.00,16),(62,'Copa de vino','',1.20,17),(63,'Vino 1','',8.00,17),(64,'Vino 2','',10.00,17),(65,'Vino 3','',12.00,17),(66,'Vino 4','',15.00,17),(67,'Vino 5','',16.00,17),(68,'Chupito de orujo de hierbas','',1.50,18),(69,'Chupito de café','',1.50,18),(70,'Chupito','',1.50,18),(71,'Bloody Mary','',3.50,19),(72,'Mojito','',3.50,19),(73,'Cosmopolitan','',3.50,19),(74,'Daiquiri','',3.50,19),(75,'Margarita','',3.50,19),(76,'Manhattan','',3.50,19),(77,'Gin Fizz','',3.50,19),(78,'Moscow Mule','',3.50,19),(79,'Cóctel de autor','',3.50,19),(80,'Cóctel Zubieta','',3.50,19),(81,'Combinado','',3.50,19),(82,'San Francisco','',3.50,20),(83,'Mojito sin alcohol','',3.50,20),(84,'Cóctel de autor','',3.50,20),(85,'Bizcocho','',0.80,21),(86,'Magdalena','',0.50,21),(87,'Galleta','',0.50,21),(88,'Tarta','',1.20,21),(89,'Bollería','',0.80,21),(90,'Helados','',1.00,21),(91,'Bocata 1','',3.00,22),(92,'Bocata 2','',4.00,22),(93,'Bocata 3','',4.50,22),(94,'Bocata 4','',5.00,22),(95,'Bocata 5','',5.50,22),(96,'Sandwich 1','',3.00,23),(97,'Sandwich 2','',4.00,23),(98,'Sandwich 3','',4.50,23),(99,'Sandwich 4','',5.00,23),(100,'Sandwich 5','',5.50,23),(101,'Pintxo 1','',1.00,24),(102,'Pintxo 2','',1.50,24),(103,'Pintxo 3','',2.00,24),(104,'Pintxo 4','',2.50,24),(105,'Pintxo 5','',3.00,24),(106,'Ración 1','',2.00,25),(107,'Ración 2','',2.50,25),(108,'Ración 3','',3.00,25),(109,'Ración 4','',3.50,25),(110,'Ración 5','',4.00,25),(111,'Menú del día','',18.00,26),(112,'Menú degustación','',40.00,27),(113,'Entrante frío 1','',8.00,28),(114,'Entrante frío 2','',9.00,28),(115,'Entrante fría 3','',10.00,28),(116,'Entrante frío 4','',11.00,28),(117,'Entrante frío 5','',12.00,28),(118,'Entrante caliente 1','',8.00,29),(119,'Entrante caliente 2','',9.00,29),(120,'Entrante caliente 3','',10.00,29),(121,'Entrante caliente 4','',11.00,29),(122,'Entrante caliente 5','',12.00,29),(123,'Pescado 1','',10.00,30),(124,'Pescado 2','',11.00,30),(125,'Pescado 3','',12.00,30),(126,'Pescado 4','',13.00,30),(127,'Pescado 5','',14.00,30),(128,'Carne 1','',10.00,31),(129,'Carne 2','',11.00,31),(130,'Carne 3','',12.00,31),(131,'Carne 4','',13.00,31),(132,'Carne 5','',14.00,31),(133,'Postre 1','',3.00,32),(134,'Postre 2','',3.50,32),(135,'Postre 3','',4.00,32),(136,'Postre 4','',4.50,32),(137,'Postre 5','',5.00,32);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `IDReserva` int NOT NULL AUTO_INCREMENT,
  `ClienteID` int NOT NULL,
  `NumMesa` int NOT NULL,
  `NumComensales` int NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Observaciones` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDReserva`),
  KEY `ClienteID` (`ClienteID`),
  KEY `NumMesa` (`NumMesa`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`ClienteID`) REFERENCES `cliente` (`ClienteID`),
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`NumMesa`) REFERENCES `mesa` (`NumMesa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `IDSala` int NOT NULL,
  `CapacidadSala` int NOT NULL,
  `NombreSala` varchar(100) NOT NULL,
  PRIMARY KEY (`IDSala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (1,24,'Sala 1'),(2,55,'Sala 2');
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hosteleria'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-13 11:48:23
