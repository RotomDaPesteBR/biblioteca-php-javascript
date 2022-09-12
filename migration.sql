/*
SQLyog Ultimate v10.00 Beta1
MySQL - 8.0.30 : Database - biblioteca
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`biblioteca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `biblioteca`;

/*Table structure for table `autores` */

DROP TABLE IF EXISTS `autores`;

CREATE TABLE `autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `data_nascimento` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `autores` */

insert  into `autores`(`id`,`nome`,`data_nascimento`) values (1,'Machado de Assis','21/06/1939'),(2,'Monteiro Lobato','18/04/1882'),(3,'Tappei Nagatsuki','11/05/1987');

/*Table structure for table `editoras` */

DROP TABLE IF EXISTS `editoras`;

CREATE TABLE `editoras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `endereco` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `editoras` */

insert  into `editoras`(`id`,`nome`,`endereco`) values (1,'Panini','Alameda Caiapós, 425 - Centro Empresarial Tamboré, Barueri - SP, 06460-110'),(2,'NewPOP','Av. Onze de Junho, 80 - Vila Mariana, São Paulo - SP, 04041-000'),(3,'Companhia das Letras','Condomínio Edifício Itaim Offices - R. Bandeira Paulista, 702 - Conjunto 32 - Itaim Bibi, São Paulo - SP, 04532-002');

/*Table structure for table `emprestimos` */

DROP TABLE IF EXISTS `emprestimos`;

CREATE TABLE `emprestimos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_livro` int DEFAULT NULL,
  `data_retirada` varchar(45) DEFAULT NULL,
  `data_devolucao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `emprestimos` */

insert  into `emprestimos`(`id`,`id_usuario`,`id_livro`,`data_retirada`,`data_devolucao`) values (1,3,2,'03/09/2022','05/09/2022'),(2,1,1,'20/08/2022',NULL),(3,2,2,'05/09/2022',NULL);

/*Table structure for table `livros` */

DROP TABLE IF EXISTS `livros`;

CREATE TABLE `livros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `subtitulo` varchar(100) DEFAULT NULL,
  `volume` int DEFAULT NULL,
  `qtd_paginas` int DEFAULT NULL,
  `isbn` varchar(100) DEFAULT NULL,
  `id_editora` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

/*Data for the table `livros` */

insert  into `livros`(`id`,`titulo`,`subtitulo`,`volume`,`qtd_paginas`,`isbn`,`id_editora`) values (1,'Re:Zero','Começando uma Vida em Outro Mundo',16,496,'978-6586799118',2),(2,'Re:Zero','Começando uma Vida em Outro Mundo',17,472,'978-6586799125',2),(3,'Re:Zero','Começando uma Vida em Outro Mundo',18,472,'978-6586799132',2),(4,'ABC','DCE',1,150,'123-4567891011',1);

/*Table structure for table `livros_autores` */

DROP TABLE IF EXISTS `livros_autores`;

CREATE TABLE `livros_autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_livro` int DEFAULT NULL,
  `id_autor` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

/*Data for the table `livros_autores` */

insert  into `livros_autores`(`id`,`id_livro`,`id_autor`) values (1,1,3),(2,2,3),(3,3,3),(4,4,2);

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `data_nascimento` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nome`,`data_nascimento`,`cpf`) values (1,'João Pedro','04/06/2005','443.322.567-71'),(2,'Carlos','01/02/2003','123.456.789-10'),(3,'Gustavo','05/05/2005','987.654.321-00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
