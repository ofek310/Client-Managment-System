USE [OrtInterviewDatabase]
GO

/****** Object:  Table [dbo].[clientsDatabase]    Script Date: 12/07/2023 06:26:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[clientsDatabase](
	[Name] [varchar](100) NOT NULL,
	[ID] [int] NOT NULL,
	[IP] [varchar](100) NOT NULL,
	[Phone] [varchar](100) NOT NULL
) ON [PRIMARY]
GO

