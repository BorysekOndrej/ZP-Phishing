<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Falešný FB - vaše heslo</title>
</head>
<body>
	<h2>Při běžném útoku by jste byli automaticky přesměrování, tady si ale nejdřív ukážeme Vaše heslo. ;)</h2>
	<script type="text/javascript">
		<?php
			$email = $_POST["email"];
			$password = $_POST["pass"];
			echo 'alert("Email: '.$email.'\nHeslo: '.$password.'");'; // I am aware of XSS, but as this is just a proof-of-concept without any storing of data, it's not a priority to fix right now.
		?>
		
		window.location.href = "https://facebook.com";
	</script>
</body>
</html>
