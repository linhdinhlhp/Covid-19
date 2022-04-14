-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 01, 2021 lúc 06:18 PM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `covid-19`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cach_ly`
--

CREATE TABLE `cach_ly` (
  `id` int(11) NOT NULL,
  `idBenhNhan` int(11) NOT NULL,
  `hoTen` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `soDienThoai` int(11) NOT NULL,
  `namSinh` date NOT NULL,
  `diaChi` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `quocTich` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `hinhThucCachLy` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `diaDiemCachLy` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `mucDoCachLy` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `thoiGianBatDauCachLy` date NOT NULL,
  `hinhThuctest` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `ketQuaTest` text CHARACTER SET utf8mb4 NOT NULL,
  `lyDo` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khai_bao`
--

CREATE TABLE `khai_bao` (
  `id` int(11) NOT NULL,
  `hoTen` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `doiTuong` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `namSinh` date NOT NULL,
  `gioiTinh` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `soDienThoaiLienHe` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `soCMTHoChieu` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `soBaoHiemYTe` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `noiOHienNay` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `quocGia` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `x1` tinyint(1) NOT NULL,
  `x2` tinyint(1) NOT NULL,
  `x3` tinyint(1) NOT NULL,
  `x4` tinyint(1) NOT NULL,
  `x5` double NOT NULL,
  `y1` tinyint(1) NOT NULL,
  `y2` tinyint(1) NOT NULL,
  `y3` double NOT NULL,
  `z1` tinyint(1) NOT NULL,
  `z2` tinyint(1) NOT NULL,
  `z3` tinyint(1) NOT NULL,
  `z4` tinyint(1) NOT NULL,
  `z5` tinyint(1) NOT NULL,
  `z6` tinyint(1) NOT NULL,
  `z7` tinyint(1) NOT NULL,
  `z8` tinyint(1) NOT NULL,
  `z9` tinyint(1) NOT NULL,
  `z10` tinyint(1) NOT NULL,
  `z11` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mac_covid`
--

CREATE TABLE `mac_covid` (
  `id` int(11) NOT NULL,
  `maBenhNhan` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `tinhTrang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tiep_xuc`
--

CREATE TABLE `tiep_xuc` (
  `id` int(11) NOT NULL,
  `idBenhNhan` int(11) NOT NULL,
  `idNguoiTiepXuc` int(11) NOT NULL,
  `phanLoai` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cach_ly`
--
ALTER TABLE `cach_ly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idBenhNhan` (`idBenhNhan`);

--
-- Chỉ mục cho bảng `khai_bao`
--
ALTER TABLE `khai_bao`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `mac_covid`
--
ALTER TABLE `mac_covid`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tiep_xuc`
--
ALTER TABLE `tiep_xuc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tiep_xuc_ibfk_1` (`idBenhNhan`),
  ADD KEY `tiep_xuc_ibfk_2` (`idNguoiTiepXuc`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cach_ly`
--
ALTER TABLE `cach_ly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `khai_bao`
--
ALTER TABLE `khai_bao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `mac_covid`
--
ALTER TABLE `mac_covid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tiep_xuc`
--
ALTER TABLE `tiep_xuc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cach_ly`
--
ALTER TABLE `cach_ly`
  ADD CONSTRAINT `cach_ly_ibfk_1` FOREIGN KEY (`idBenhNhan`) REFERENCES `mac_covid` (`id`);

--
-- Các ràng buộc cho bảng `tiep_xuc`
--
ALTER TABLE `tiep_xuc`
  ADD CONSTRAINT `tiep_xuc_ibfk_1` FOREIGN KEY (`idBenhNhan`) REFERENCES `mac_covid` (`id`),
  ADD CONSTRAINT `tiep_xuc_ibfk_2` FOREIGN KEY (`idNguoiTiepXuc`) REFERENCES `cach_ly` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
