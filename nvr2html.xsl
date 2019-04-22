<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet exclude-result-prefixes="out"
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:out="http://www.w3.org/1999/XSL/Transform">
  
<!--  American Printing House for the Blind, Inc.
      Copyrifht (c) 2008 - 2009, All Rights Reserved.

	Convert validation reports to HTML - combined report.html
-->
<xsl:output method="html" omit-xml-declaration="yes" />

<xsl:template match="/">
	<!-- head - title -->
	<head>
	  <title><xsl:value-of select="//dtbTestResults/results/details/test/testDetail/node()/head/book/title/text()" /><xsl:text>: </xsl:text><xsl:value-of select="//dtbTestResults/head/program/@appName" /><xsl:text> </xsl:text><xsl:value-of select="//dtbTestResults/head/program/@appVersion" /> Report Summary</title>
	</head>
	<body>
	  <h1><xsl:value-of select="//dtbTestResults/results/details/test/testDetail/node()/head/book/title/text()" /><xsl:text>: </xsl:text><xsl:value-of select="//dtbTestResults/head/program/@appName" /><xsl:text> </xsl:text><xsl:value-of select="//dtbTestResults/head/program/@appVersion" /> Report Summary</h1>
	  <xsl:apply-templates select="//details/test" />
	</body>
</xsl:template>

<!-- test - test results -->
<xsl:template match="test">
	<h2><xsl:value-of select="./@name" /><xsl:text>: </xsl:text><xsl:value-of select="testDetail/node()/head/program/@appName" /><xsl:text> </xsl:text><xsl:value-of select="testDetail/node()/head/program/@appVersion" /></h2>
	<p><xsl:value-of select="testDetail/testSummary/text()" /></p>
	<xsl:if test="testResult[. != '0']">
	  <div>File count: <xsl:value-of select="testDetail/node()/head/book/fileCount/text()" /></div>
  	  <xsl:apply-templates select="testDetail/node()/head/book/creator" />
	  <xsl:apply-templates select="testDetail/node()/body/message" />
	  <xsl:if test="testDetail/text()">
	  	<p><xsl:value-of select="testDetail/text()" /></p>
	  </xsl:if>
	  <xsl:apply-templates select="testDetail/node()/foot" />
	</xsl:if>
</xsl:template>

<!-- creator -->
<xsl:template match="creator">
	<div>Creator: <xsl:value-of select="text()" /></div>
</xsl:template>

<!-- message -->
<xsl:template match="message">
	<h3><xsl:value-of select="@type/."/></h3>
	<div>File: <xsl:value-of select="file/@name/."/>
	<xsl:if test="file[@line != '']">, at line: <xsl:value-of select="file/@line/."/>, col: <xsl:value-of select="file/@column/."/></xsl:if>
 	</div>
	<div><xsl:value-of select="testProcessor/label/."/>:</div>
	<div><xsl:value-of select="detail/."/></div>
</xsl:template>

<!-- foot -->
<xsl:template match="foot">
	<h3>Summary</h3>
	<div>EndTime: <xsl:value-of select="endTime/."/></div>
	<div>Elapsed time: <xsl:value-of select="elapsedTime/."/></div>
	<div>Failure count: <strong><xsl:value-of select="failureCount/."/></strong></div>
	<xsl:if test="procErrCount[. != '']">
		<div>Process error count: <strong><xsl:value-of select="procErrCount/."/></strong></div>
		<div>App error count: <strong><xsl:value-of select="appErrCount/."/></strong></div>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>
