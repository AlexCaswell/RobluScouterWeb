<?php 

$checked_out = $_POST['checked_out'];
$metric = $_POST['metric'];
$modified = $_POST['modified'];
$title = $_POST['title'];
$value = $_POST['value'];
$id = $_POST['id'];
$cardColor = $_POST['cardColor'];

?>

<div class="card blue-grey darken-1" style="background: <?php echo $cardColor; ?> !important;">
	<div class="card-content white-text">
		<div>
			<span style="color: #FFF;" class="card-title"><?php echo $title; ?></span>
			<div style="pointer-events: <?php if($checked_out == "false") { echo "none"; } else { echo "auto"; } ?>; position: absolute; top: 20%; right: 30px;" metric='<?php echo $metric; ?>' id="<?php echo $id; ?>">
				<p>
					<input onclick="update_boolean(<?php echo "'".$id."'"; ?>)" name="tf_group_<?php echo $id; ?>" type="radio" id="true_<?php echo $id; ?>" <?php if($value == "true") { echo "checked"; } ?>/>
					<label style="color: #FFF;" for="true_<?php echo $id; ?>">Yes</label>
				</p>
				<p>
					<input onclick="update_boolean(<?php echo "'".$id."'"; ?>)" name="tf_group_<?php echo $id; ?>" type="radio" id="false_<?php echo $id; ?>" <?php if($value == "false") { echo "checked"; } ?>/>
					<label style="color: #FFF;" for="false_<?php echo $id; ?>">No</label>
				</p>
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
