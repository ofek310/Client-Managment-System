USE [master]
GO

CREATE DATABASE [OrtInterviewDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'OrtInterviewDatabase', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\OrtInterviewDatabase.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'OrtInterviewDatabase_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\OrtInterviewDatabase_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [OrtInterviewDatabase].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [OrtInterviewDatabase] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET ARITHABORT OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [OrtInterviewDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [OrtInterviewDatabase] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET  DISABLE_BROKER 
GO

ALTER DATABASE [OrtInterviewDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [OrtInterviewDatabase] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET RECOVERY FULL 
GO

ALTER DATABASE [OrtInterviewDatabase] SET  MULTI_USER 
GO

ALTER DATABASE [OrtInterviewDatabase] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [OrtInterviewDatabase] SET DB_CHAINING OFF 
GO

ALTER DATABASE [OrtInterviewDatabase] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [OrtInterviewDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [OrtInterviewDatabase] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [OrtInterviewDatabase] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [OrtInterviewDatabase] SET QUERY_STORE = ON
GO

ALTER DATABASE [OrtInterviewDatabase] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO

ALTER DATABASE [OrtInterviewDatabase] SET  READ_WRITE 
GO

USE [OrtInterviewDatabase]
GO

CREATE TABLE [dbo].[clientsDatabase](
	[Name] [varchar](100) NOT NULL,
	[ID] [int] NOT NULL,
	[IP] [varchar](100) NOT NULL,
	[Phone] [varchar](100) NOT NULL
) ON [PRIMARY]

USE [OrtInterviewDatabase]
GO

INSERT INTO [dbo].[clientsDatabase]
           ([Name]
           ,[ID]
           ,[IP]
           ,[Phone])
     VALUES
           ('Priscilla Matthews', 384525101, '80.119.117.187', '+972-523862672'),
           ('Benjamin Douglas', 660652470, '104.29.98.222', '+972-557712987'),
           ('Jordan Porter', 753184050, '1.10.243.200', '+972-532509246'),
           ('Jacqueline Hughes', 875322869, '103.255.178.143', '+972-551448824'),
           ('Max Dunn', 338605579, '88.144.81.24', '+972-543503816'),
           ('Christy Neal', 68672047, '62.113.223.73', '+972-542202337'),
           ('Jessica Rodriquez', 150318228, '12.189.93.218', '+972-558975263'),
           ('Terri Gordon', 482018827, '212.74.99.171', '+972-505375808'),
           ('Frank Hamilton', 790979272, '70.32.16.194', '+972-541414650'),
           ('Felecia Ford', 534268339, '77.139.213.201', '+972-559328061'),
           ('Aubree Long', 39512322, '121.113.29.210', '+972-507896703'),
           ('Tristan Brewer', 91900407, '50.87.175.194', '+972-545165250'),
           ('Mattie Ross', 403769532, '94.252.132.224', '+972-534831657'),
           ('Miriam Caldwell', 767862527, '105.168.58.247', '+972-542739332'),
           ('Dolores Robertson', 68576123, '139.228.93.215', '+972-545560916'),
           ('Christina Hunt', 470236670, '75.128.159.27', '+972-549627649'),
           ('Ethel Freeman', 451148183, '198.55.114.244', '+972-535050005'),
           ('Marilyn Kelley', 127141687, '109.122.224.164', '+972-523314497'),
           ('Marvin Kim', 969423987, '86.140.236.36', '+972-543576817'),
           ('Monica Shelton', 8736928, '113.185.43.99', '+972-541350820'),
           ('Flenn Neal', 938993938, '207.171.162.115', '+972-530574010'),
           ('Timmothy Riley', 366232932, '71.69.19.61', '+972-548714955'),
           ('Gladys Gomez', 224058453, '62.221.151.150', '+972-553118725'),
           ('Ray Ortiz', 140198631, '123.139.35.70', '+972-501371777'),
           ('Mike White', 43993278, '197.253.220.3', '+972-541117565'),
           ('Terri Byrd', 624213302, '170.79.229.235', '+972-552658624'),
           ('Joyce Duncan', 760444406, '104.237.52.50', '+972-524138666'),
           ('Carole Garrett', 133292698, '106.10.73.22', '+972-523988066'),
           ('Joan Jackson', 976579458, '24.66.90.83', '+972-552037957'),
           ('Mark Black', 622795052, '191.6.137.31', '+972-537608013'),
           ('Eugene Frazier', 826328668, '216.208.233.155', '+972-544545920'),
           ('Terry Carr', 222487571, '103.19.16.90', '+972-527662962'),
           ('Samuel Murray', 562368886, '8.40.166.238', '+972-505707479'),
           ('Donald May', 201431194, '187.94.129.66', '+972-558091299'),
           ('Claude Woods', 637163908, '78.170.254.42', '+972-537094406'),
           ('Alan Steward', 631615440, '186.210.91.59', '+972-541849674'),
           ('Christina Dean', 379978463, '156.210.111.98', '+972-521882261'),
           ('Maurice Boyd', 871700894, '151.250.232.140', '+972-534230979'),
           ('Daryl Mason', 596921817, '104.218.66.37', '+972-548206508'),
           ('Alyssa Stephens', 139193023, '109.74.13.84', '+972-544077527'),
           ('Stanley Rivera', 432787646, '195.184.106.3', '+972-536586531'),
           ('Bill Mitchelle', 353546336, '209.58.169.183', '+972-520280447'),
           ('Diana Peck', 477398853, '13.225.189.253', '+972-541500479'),
           ('Owen Pearson', 429480874, '190.205.100.27', '+972-542685335'),
           ('Alan Wheeler', 21630314, '185.5.17.140', '+972-526012379'),
           ('Theresa Griffin', 991133273, '184.162.191.22', '+972-532713164'),
           ('Dwayne Allen', 840694103, '80.119.117.49', '+972-551937240'),
           ('Franklin Phillips', 870256526, '130.185.144.76', '+972-509060787'),
           ('Greg Medina', 18169151, '104.20.218.249', '+972-508112956'),
           ('Kirk Fuller', 545884686, '108.62.122.143', '+972-555611424')
GO