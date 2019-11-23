-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2019 a las 13:31:24
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `redsocial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answerfromfriend`
--

CREATE TABLE `answerfromfriend` (
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL,
  `answerId` int(11) NOT NULL,
  `state` enum('correct','wrong','none') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answerfromuser`
--

CREATE TABLE `answerfromuser` (
  `userId` int(11) NOT NULL,
  `answerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friendship`
--

CREATE TABLE `friendship` (
  `fromm` int(11) NOT NULL,
  `too` int(11) NOT NULL,
  `state` enum('accepted','pending') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `birthDate` date NOT NULL,
  `points` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `text` (`text`),
  ADD KEY `questionId` (`questionId`);

--
-- Indices de la tabla `answerfromfriend`
--
ALTER TABLE `answerfromfriend`
  ADD PRIMARY KEY (`userId`,`friendId`,`answerId`),
  ADD KEY `friendId` (`friendId`),
  ADD KEY `answerId` (`answerId`);

--
-- Indices de la tabla `answerfromuser`
--
ALTER TABLE `answerfromuser`
  ADD PRIMARY KEY (`userId`,`answerId`),
  ADD KEY `answerfromuser_ibfk_2` (`answerId`);

--
-- Indices de la tabla `friendship`
--
ALTER TABLE `friendship`
  ADD PRIMARY KEY (`fromm`,`too`),
  ADD KEY `fromm` (`fromm`),
  ADD KEY `too` (`too`);

--
-- Indices de la tabla `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `text` (`text`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `answerfromfriend`
--
ALTER TABLE `answerfromfriend`
  ADD CONSTRAINT `answerfromfriend_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answerfromfriend_ibfk_2` FOREIGN KEY (`friendId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answerfromfriend_ibfk_3` FOREIGN KEY (`answerId`) REFERENCES `answer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `answerfromuser`
--
ALTER TABLE `answerfromuser`
  ADD CONSTRAINT `answerfromuser_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answerfromuser_ibfk_2` FOREIGN KEY (`AnswerId`) REFERENCES `answer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `friendship`
--
ALTER TABLE `friendship`
  ADD CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`fromm`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`too`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
