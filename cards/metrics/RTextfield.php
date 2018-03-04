<?php 

$checked_out = $_POST['checked_out'];
$metric = $_POST['metric'];
$modified = $_POST['modified'];
$title = $_POST['title'];
$text = $_POST['text'];
$id = $_POST['id'];
$oneLine = $_POST['oneLine'];
$numericalOnly = $_POST['numericalOnly'];
$cardColor = $_POST['cardColor'];

?>

<div class="card blue-grey darken-1" style="background: <?php echo $cardColor; ?> !important;">
	<div class="card-content white-text">
		<div>
			<span style="color: #FFF;" class="card-title"><?php echo $title; ?></span>
			<div style="pointer-events: <?php if($checked_out == "false") { echo "none"; } else { echo "auto"; } ?>;" metric='<?php echo $metric; ?>' id="<?php echo $id; ?>">
				<?php
				if($oneLine == 'true') {
					echo '<div class="input-field col s6">
			        	<input value="'.$text.'" style="color: #FFF;" id="text_'.$id.'" type="text" class="validate">
			        </div>
	         		<style type="text/css">
			 			/* Change text input colors */

			 			  /* label color */
						.input-field label {
							color: #CCC !important;
						}
						/* label focus color */
						.input-field input[type=text]:focus + label {
							color: #FFF !important;
						}
						/* label underline focus color */
						.input-field input[type=text]:focus {
							border-bottom: 1px solid #FFF !important;
							box-shadow: 0 1px 0 0 #FFF !important;
						}
						/* valid color */
						.input-field input[type=text].valid {
							border-bottom: 1px solid #FFF !important;
							box-shadow: 0 1px 0 0 #FFF !important;
						}
						/* invalid color */
						.input-field input[type=text].invalid {
							border-bottom: 1px solid #FFF !important;
							box-shadow: 0 1px 0 0 #FFF !important;
						}
						/* icon prefix focus color */
						.input-field .prefix.active {
							color: #FFF !important;
						}
	 				</style>';
 				}
 				else {
					echo '<div class="input-field col s6">
			        	<textarea id="text_'.$id.'" class="materialize-textarea">'.$text.'</textarea>
			        </div>
	         		<style type="text/css">
			 			/* label focus color */
					    .input-field input[type=text]:focus + label, .materialize-textarea:focus:not([readonly]) + label {
					     	color: #FFF !important;
					    }

						/* label underline focus color */
					    .input-field input[type=text]:focus, .materialize-textarea:focus:not([readonly]) {
						    border-bottom: 1px solid #FFF !important;
						    box-shadow: 0 1px 0 0 #FFF !important;
					    }
	 				</style>';
 				}
 				?>
 				<script type="text/javascript">
 					if(<?php if($numericalOnly == "true") { echo true; } else { echo false; } ?>) {
 						$("#text_<?php echo $id; ?>").keypress(function(e) {
						    var a = [];
						    var k = e.which;

						    for (i = 48; i < 58; i++)
						        a.push(i);

						    if (!(a.indexOf(k)>=0))
						        e.preventDefault();
						});
 					}
 				</script>
				<p  id="modified_<?php echo $id; ?>" style="font-size: 0.6em; color: #FFF; visibility: <?php if($modified == "true") { echo "hidden"; } else { echo "visible"; } ?>;">Not observed yet</p>
				<br>
			</div>
			<style type="text/css">
	  			input[type='radio']:checked + label:after {
	  				background: #888;
	  				border: #888;
	  			}
			</style>
		</div>
	</div>
</div>
