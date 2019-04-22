<html>
<?php
session_start();
error_reporting(3);

// Load the detailed report and display it as HTML.
$path = $argv[1];
if ($path == null)
$path = $_GET['report'];
$XML = new DOMDocument();
$XML->load($path);

# START XSLT
$xslt = new XSLTProcessor();
$XSL = new DOMDocument();
$XSL->load('nvr2html.xsl');
$xslt->importStylesheet( $XSL );
print $xslt->transformToXML( $XML );
?>

</html>
