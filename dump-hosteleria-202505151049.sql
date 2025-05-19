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
  `Imagen` varchar(500) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Carlos','López','666777888','carlos.lopez@email.com',NULL),(2,'Maria','Antonieta','111222333','a@gmail.com',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comanda`
--

LOCK TABLES `comanda` WRITE;
/*!40000 ALTER TABLE `comanda` DISABLE KEYS */;
INSERT INTO `comanda` VALUES (1,2,1,1,1,'13:10:00'),(2,2,19,3,1,'13:30:00');
/*!40000 ALTER TABLE `comanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `IDFactura` int NOT NULL AUTO_INCREMENT,
  `ClienteID` int NOT NULL,
  `NumMesa` int NOT NULL,
  `Producto` varchar(100) NOT NULL,
  `Cantidad` int NOT NULL,
  `PrecioUnitario` decimal(10,2) NOT NULL,
  `PrecioTotal` decimal(10,2) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  PRIMARY KEY (`IDFactura`),
  KEY `ClienteID` (`ClienteID`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`ClienteID`) REFERENCES `cliente` (`ClienteID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,1,2,'Refresco de cola',1,1.00,1.00,'2025-05-15','10:48:43'),(2,1,2,'Agua con gas 1 litro',3,1.00,3.00,'2025-05-15','10:48:43');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
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
INSERT INTO `mesa` VALUES (1,1,4,0),(2,1,4,1),(3,1,4,0),(4,1,4,0),(5,1,4,0),(6,1,4,0),(7,2,5,0),(8,2,5,0),(9,2,7,0),(10,2,2,1),(11,2,2,1),(12,2,5,0),(13,2,4,0),(14,2,4,0),(15,2,6,0),(16,2,2,0),(17,2,2,0),(18,2,5,0),(19,2,6,0);
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
  `NumOrden` int NOT NULL,
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
INSERT INTO `producto` VALUES (1,'Refresco de cola','',1.00,6,1),(2,'Refresco de naranja','',1.00,6,1),(3,'Refresco de limón','',1.00,6,1),(4,'Refresco de té','',1.00,6,1),(5,'Refresco','',1.00,6,1),(6,'Zumo de manzana','',0.50,7,1),(7,'Zumo de naranja','',0.50,7,1),(8,'Zumo de piña','',0.50,7,1),(9,'Zumo de melocotón','',0.50,7,1),(10,'Zumo de tomate','',0.50,7,1),(11,'Zumo casero','',2.00,7,1),(12,'Limonada casera','',0.80,7,1),(13,'Batido de chocolate','',1.00,8,1),(14,'Batido de vainilla','',1.00,8,1),(15,'Batido de fresa','',1.00,8,1),(16,'Batido casero','',2.00,8,1),(17,'Agua mineral 1 litro','',1.00,9,1),(18,'Botellín de agua 500 ml','',0.50,9,1),(19,'Agua con gas 1 litro','',1.00,9,1),(20,'Botellín de agua con gas 500 ml','',0.50,9,1),(21,'Caña','',1.00,10,1),(22,'Zurito','',0.80,10,1),(23,'Cañón','',1.50,10,1),(24,'Cerveza sin alcohol','',1.00,10,1),(25,'Cerveza rubia','',1.00,10,1),(26,'Cerveza tostada','',1.50,10,1),(27,'Cerveza negra','',1.50,10,1),(28,'Cerveza con limón','',1.00,10,1),(29,'Solo','',0.40,11,1),(30,'Solo doble','',0.80,11,1),(31,'Americano','',0.50,11,1),(32,'Cortado','',0.40,11,1),(33,'Con leche','',0.50,11,1),(34,'Capuchino','',0.50,11,1),(35,'Café Bombón','',0.80,11,1),(36,'Café Vienés','',0.80,11,1),(37,'Carajillo','',1.00,11,1),(38,'Escoces','',1.80,11,1),(39,'Irlandes','',1.80,11,1),(40,'Café de autor','',2.00,11,1),(41,'Cola-cao','',0.80,12,1),(42,'Chocolate','',1.00,12,1),(43,'Infusiones','',0.50,13,1),(44,'Copa de vino','',1.20,14,1),(45,'Vino 1','',8.00,14,1),(46,'Vino 2','',10.00,14,1),(47,'Vino 3','',12.00,14,1),(48,'Vino 4','',15.00,14,1),(49,'Vino 5','',16.00,14,1),(50,'Copa de vino','',1.20,15,1),(51,'Vino 1','',8.00,15,1),(52,'Vino 2','',10.00,15,1),(53,'Vino 3','',12.00,15,1),(54,'Vino 4','',15.00,15,1),(55,'Vino 5','',16.00,15,1),(56,'Copa de vino','',1.20,16,1),(57,'Vino 1','',8.00,16,1),(58,'Vino 2','',10.00,16,1),(59,'Vino 3','',12.00,16,1),(60,'Vino 4','',15.00,16,1),(61,'Vino 5','',16.00,16,1),(62,'Copa de vino','',1.20,17,1),(63,'Vino 1','',8.00,17,1),(64,'Vino 2','',10.00,17,1),(65,'Vino 3','',12.00,17,1),(66,'Vino 4','',15.00,17,1),(67,'Vino 5','',16.00,17,1),(68,'Chupito de orujo de hierbas','',1.50,18,1),(69,'Chupito de café','',1.50,18,1),(70,'Chupito','',1.50,18,1),(71,'Bloody Mary','',3.50,19,1),(72,'Mojito','',3.50,19,1),(73,'Cosmopolitan','',3.50,19,1),(74,'Daiquiri','',3.50,19,1),(75,'Margarita','',3.50,19,1),(76,'Manhattan','',3.50,19,1),(77,'Gin Fizz','',3.50,19,1),(78,'Moscow Mule','',3.50,19,1),(79,'Cóctel de autor','',3.50,19,1),(80,'Cóctel Zubieta','',3.50,19,1),(81,'Combinado','',3.50,19,1),(82,'San Francisco','',3.50,20,1),(83,'Mojito sin alcohol','',3.50,20,1),(84,'Cóctel de autor','',3.50,20,1),(85,'Bocata 1','',3.00,21,1),(86,'Bocata 2','',4.00,21,1),(87,'Bocata 3','',4.50,21,1),(88,'Bocata 4','',5.00,21,1),(89,'Bocata 5','',5.50,21,1),(90,'Sandwich 1','',3.00,22,1),(91,'Sandwich 2','',4.00,22,1),(92,'Sandwich 3','',4.50,22,1),(93,'Sandwich 4','',5.00,22,1),(94,'Sandwich 5','',5.50,22,1),(95,'Pintxo 1','',1.00,23,1),(96,'Pintxo 2','',1.50,23,1),(97,'Pintxo 3','',2.00,23,1),(98,'Pintxo 4','',2.50,23,1),(99,'Pintxo 5','',3.00,23,1),(100,'Ración 1','',2.00,24,1),(101,'Ración 2','',2.50,24,1),(102,'Ración 3','',3.00,24,1),(103,'Ración 4','',3.50,24,1),(104,'Ración 5','',4.00,24,1),(105,'Menú del día','',18.00,25,1),(106,'Menú degustación','',40.00,26,1),(107,'Entrante frío 1','',8.00,27,1),(108,'Entrante frío 2','',9.00,27,1),(109,'Entrante fría 3','',10.00,27,1),(110,'Entrante frío 4','',11.00,27,1),(111,'Entrante frío 5','',12.00,27,1),(112,'Entrante caliente 1','',8.00,28,1),(113,'Entrante caliente 2','',9.00,28,1),(114,'Entrante caliente 3','',10.00,28,1),(115,'Entrante caliente 4','',11.00,28,1),(116,'Entrante caliente 5','',12.00,28,1),(117,'Pescado 1','',10.00,29,1),(118,'Pescado 2','',11.00,29,1),(119,'Pescado 3','',12.00,29,1),(120,'Pescado 4','',13.00,29,1),(121,'Pescado 5','',14.00,29,1),(122,'Carne 1','',10.00,30,1),(123,'Carne 2','',11.00,30,1),(124,'Carne 3','',12.00,30,1),(125,'Carne 4','',13.00,30,1),(126,'Carne 5','',14.00,30,1),(127,'Postre 1','',3.00,31,1),(128,'Postre 2','',3.50,31,1),(129,'Postre 3','',4.00,31,1),(130,'Postre 4','',4.50,31,1),(131,'Postre 5','',5.00,31,1),(132,'Bizcocho','',0.80,32,1),(133,'Magdalena','',0.50,32,1),(134,'Galleta','',0.50,32,1),(135,'Tarta','',1.20,32,1),(136,'Bollería','',0.80,32,1),(137,'Helados','',1.00,32,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,1,2,3,'2025-05-19','13:00:00',''),(2,1,10,2,'2025-05-20','13:00:00','Mesa con vista a la ventana'),(3,2,11,2,'2025-05-20','13:00:00','Mesa con vista a la ventana');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ValidarCapacidadMesa` BEFORE INSERT ON `reserva` FOR EACH ROW BEGIN
  DECLARE capacidadMesa INT;

  SELECT Capacidad INTO capacidadMesa
  FROM Mesa
  WHERE NumMesa = NEW.NumMesa;

  IF NEW.NumComensales > capacidadMesa THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El número de comensales excede la capacidad de la mesa.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ValidarMesaOcupadaPorFecha` BEFORE INSERT ON `reserva` FOR EACH ROW BEGIN
  DECLARE cantidadReservas INT;

  SELECT COUNT(*) INTO cantidadReservas
  FROM Reserva
  WHERE NumMesa = NEW.NumMesa
    AND Fecha = NEW.Fecha;

  IF cantidadReservas > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La mesa ya está reservada para esa fecha';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ValidarReservaCliente` BEFORE INSERT ON `reserva` FOR EACH ROW BEGIN
  IF NEW.NumComensales > 8 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Un cliente no puede reservar para más de 8 comensales.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM Reserva
    WHERE ClienteID = NEW.ClienteID
      AND Fecha = NEW.Fecha
      AND Hora = NEW.Hora
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Un cliente no puede reservar más de una mesa para la misma fecha y hora.';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ReservaMesa` AFTER INSERT ON `reserva` FOR EACH ROW BEGIN
    UPDATE Mesa
    SET Ocupado = TRUE
    WHERE NumMesa = NEW.NumMesa;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `LiberarMesa` AFTER DELETE ON `reserva` FOR EACH ROW BEGIN
  DECLARE count_reservas INT;

  SELECT COUNT(*) INTO count_reservas
  FROM Reserva
  WHERE NumMesa = OLD.NumMesa;

  IF count_reservas = 0 THEN
    UPDATE Mesa
    SET Ocupado = FALSE
    WHERE NumMesa = OLD.NumMesa;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
-- Temporary view structure for view `vistapersonasporsalayfecha`
--

DROP TABLE IF EXISTS `vistapersonasporsalayfecha`;
/*!50001 DROP VIEW IF EXISTS `vistapersonasporsalayfecha`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vistapersonasporsalayfecha` AS SELECT 
 1 AS `IDSala`,
 1 AS `NombreSala`,
 1 AS `Fecha`,
 1 AS `TotalComensales`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'hosteleria'
--
/*!50003 DROP PROCEDURE IF EXISTS `GenerarFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerarFactura`(
    IN _NumMesa INT
)
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE _IDProducto INT;
  DECLARE _Cantidad INT;
  DECLARE _Precio DECIMAL(10,2);
  DECLARE _NombreProducto VARCHAR(100);
  DECLARE _Hora TIME;
  DECLARE _ClienteID INT;

  DECLARE cur CURSOR FOR
    SELECT c.IDProducto, c.cantidad, p.Precio, p.Nombre, c.hora
    FROM Comanda c
    JOIN Producto p ON c.IDProducto = p.IDProducto
    WHERE c.NumMesa = _NumMesa;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  SELECT ClienteID INTO _ClienteID
  FROM Reserva
  WHERE NumMesa = _NumMesa
  ORDER BY Fecha DESC, Hora DESC
  LIMIT 1;

  OPEN cur;
  fetch_loop: LOOP
    FETCH cur INTO _IDProducto, _Cantidad, _Precio, _NombreProducto, _Hora;
    IF done THEN
      LEAVE fetch_loop;
    END IF;

    INSERT INTO Factura (
      ClienteID, NumMesa, Producto, Cantidad, PrecioUnitario,
      PrecioTotal, Fecha, Hora
    )
    VALUES (
      _ClienteID, _NumMesa, _NombreProducto, _Cantidad, _Precio,
      _Precio * _Cantidad, CURDATE(), CURTIME()
    );
  END LOOP;

  CLOSE cur;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RealizarReserva` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RealizarReserva`(
  IN p_ClienteID INT,
  IN p_NumComensales INT,
  IN p_Fecha DATE,
  IN p_Hora TIME,
  IN p_Observaciones VARCHAR(255)
)
BEGIN
  DECLARE v_NumMesa INT;

  IF p_NumComensales >= 8 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Para reservas de 8 o más personas, por favor contacte directamente con el restaurante.';
  END IF;

  SELECT m.NumMesa INTO v_NumMesa
  FROM Mesa m
  WHERE m.Capacidad >= p_NumComensales
    AND m.NumMesa NOT IN (
      SELECT r.NumMesa
      FROM Reserva r
      WHERE r.Fecha = p_Fecha AND r.Hora = p_Hora
    )
  ORDER BY m.Capacidad ASC
  LIMIT 1;

  IF v_NumMesa IS NULL THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'No hay mesas disponibles para ese número de comensales en la fecha y hora solicitadas.';
  END IF;

  INSERT INTO Reserva (ClienteID, NumMesa, NumComensales, Fecha, Hora, Observaciones)
  VALUES (p_ClienteID, v_NumMesa, p_NumComensales, p_Fecha, p_Hora, p_Observaciones);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vistapersonasporsalayfecha`
--

/*!50001 DROP VIEW IF EXISTS `vistapersonasporsalayfecha`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vistapersonasporsalayfecha` AS select `s`.`IDSala` AS `IDSala`,`s`.`NombreSala` AS `NombreSala`,`r`.`Fecha` AS `Fecha`,sum(`r`.`NumComensales`) AS `TotalComensales` from ((`reserva` `r` join `mesa` `m` on((`r`.`NumMesa` = `m`.`NumMesa`))) join `sala` `s` on((`m`.`IDSala` = `s`.`IDSala`))) group by `s`.`IDSala`,`s`.`NombreSala`,`r`.`Fecha` order by `r`.`Fecha`,`s`.`IDSala` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-15 10:49:58
