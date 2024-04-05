-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: newtaskmaster
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_usuarios`
--

DROP TABLE IF EXISTS `tb_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuarios` (
  `id_usuarios` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) NOT NULL,
  `telefono` int DEFAULT NULL,
  `correo_usuario` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `activo` char(1) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  UNIQUE KEY `correo_usuario_UNIQUE` (`correo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES (1,'mar perez',32442525,'maiuu@gmail.com','$2b$10$IT0qY1DfkXauU2Fso6FyJOIQSwxvgiVFL4CVORunBeELLMa8BH9nO','calle 5','0'),(2,'juan gomez',32457779,'gomez1@gmail.com','123458','clla 3','1'),(3,'pedro lopez',34256676,'lopez1@gmail.com','345678','calle 8','1'),(4,'marta perez',32442525,'marta@gmail.com','$2b$10$kLOZ8toqe0UofVV/U8uthu6xHFxyNxcKQRqkSM8qf62ZJvDMrVBWG','calle 3','1'),(5,'luis perez',324429875,'luisa@gmail.com','$2b$10$XcMfyvz/2dGuJP6TxbA8HetS/x/FN7u9gb3FUWsKB0nvmjwKEfyZ2','calle 5','1'),(6,'luisa perez',324429875,'lua@gmail.com','$2b$10$AbOnhnC6IUbjmhWR.scVOeBbTjzUH2qwZAgRaY5OQVwqrVYLhE6Jm','calle 5','1'),(7,'mar perez',324429875,'mar@gmail.com','$2b$10$ilwGaAOpDdf/Xtn.4dKjUeep9UV.WfFJI5Gzel6sFLR/S8Np2nOYW','calle 5','1');
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-29 16:58:46
