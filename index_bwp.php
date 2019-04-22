<?php
session_start();
error_reporting(1);
$option = $_GET["op"];


function runNlsProtector() {
$prefix = $_GET["prefix"];
	$id = $_GET["id"];
$input = $_GET["url"] . "/noDRM";
$output = $_GET["url"] . "/withDRM";
$cmd = sprintf("/opt/nlsval/run-protector.sh %s %s %s %s", $prefix, $id, $input, $output);
disable_ob();
echo "<pre>";
execute ($cmd);
echo "</pre>";
}


function runNlsValidator () {
	$id = $_GET["id"];
	if ($id==null)
		$id = "75833";
	$url = $_GET["url"];
	if ($url==null)
		$url = "/home/kcreasy/75833";
	$cmd = sprintf("/opt/nlsval/run-validator.sh %s %s", $id, $url);
	disable_ob();
	echo exec('whoami');
	echo "<pre>";
	execute ($cmd);
	echo "</pre>";
	report();
}


function report () {
	$id = $_GET["id"];
	$path = sprintf("/opt/nlsval/reports/%s/%s.xml", $id, $id);
	// Load the detailed report and display it as HTML.
	$XML = new DOMDocument();
	$XML->load($path);

	# START XSLT
	$xslt = new XSLTProcessor();
	$XSL = new DOMDocument();
	$XSL->load('nvr2html.xsl');
	$xslt->importStylesheet( $XSL );
	print $xslt->transformToXML( $XML );
}

 
function execute($cmd) {
	set_time_limit(0);

	// capture stderr instead of silently logging to apache error log
	$handle = popen("$cmd 2>&1", "r");

	if (ob_get_level() == 0) 
		ob_start();

	while(!feof($handle)) {

		$buffer = fgets($handle);
		$buffer = trim(htmlspecialchars($buffer));

		echo $buffer . "\n";
		//            echo str_pad('', 4096);    

		ob_flush();
		flush();
		sleep(1);
	}

	pclose($handle);
	ob_end_flush();

/*   $proc = proc_open($cmd, [['pipe','r'],['pipe','w'],['pipe','w']], $pipes);
    while(($line = fgets($pipes[1])) !== false) {
echo $line;
    }
    while(($line = fgets($pipes[2])) !== false) {
	echo $line;
    }
    fclose($pipes[0]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    return proc_close($proc);
 */
}


function disable_ob() {
	// Turn off output buffering
	ini_set('output_buffering', 'off');
	// Turn off PHP output compression
	// lblakey: headers already sent, but I don't think you need this
	// ini_set('zlib.output_compression', false);
	// Implicitly flush the buffer(s)
	ini_set('implicit_flush', true);
	ob_implicit_flush(true);
	// Clear, and turn off output buffering
	while (ob_get_level() > 0) {
		// Get the current level
		$level = ob_get_level();
		// End the buffering
		ob_end_clean();
		// If the current level has not changed, abort
		if (ob_get_level() == $level) break;
	}
	// Disable apache output buffering/compression
	if (function_exists('apache_setenv')) {
		apache_setenv('no-gzip', '1');
		apache_setenv('dont-vary', '1');
	}
}
?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>NLS Verification</title>
  <link rev="made" href="mailto:kcreasy@aph.org" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="generator" content="NoteTab Pro 4.95" />
  <meta name="author" content="Keith Creasy" />
  <meta name="description" content="Page for viewing and managing NLS authorization for the Book Port Plus." />
</head>
<body bgcolor="#FFFFFF" text="#000000" link="#0000FF" vlink="#800080" alink="#FF0000">

<h1>American Printing House for the Blind<br/>NLS Validation and Protection Tools</h1>


 <ul id="progress-list">
</ul>


<?php
printf ("<h2>%s</h2>", $option);

switch( $option) {
case "nlsValidate":
	runNlsValidator();
	break;
case "nlsProtect":
	runNlsProtector();
	break;
default:
	runNlsValidator();
	break;
}

?>

</body>
</html>

