
<nav class="navbar navbar-default navbar-fixed-top"
	style="padding-top: 22px">
	<div class="brand">
		<a href="index.jsp"><img src="assets/img/logo.png" alt="Marshall Logo"
			title="Marshall Logo" class="img-responsive logo"
			style="width:260px;"></a>
	</div>
	<div class="container-fluid">
		<div class="navbar-btn">
			<button type="button" id="navigation_toggle" class="btn-toggle-fullwidth"><i class="fa fa-bars" title="Navigation Toggle"></i></button>
		</div>
		<div class="row">

			<div class="col-md-2"></div>
			<div class="col-md-3" style="text-align: center">
				<h2 style="margin-top: 30px; !important" id="headName"
					class="headfont"></h2>
				<span title="Asset Last Connected Status" id="lastdiscon"> </span>
			</div>

			<div id="col-md-4" id="showAssetName">
				<div class="nav navbar-nav navbar-right"
					style="margin-right: 20px; margin-top: 4%;">
					<span id="dateButton" 
						title="Date-Time (YYYY-MM-DD HH:mm:ss)"> 
						<span id="dateTime"> </span>
					</span>
				</div>
			</div>
			<div id="col-md-3" id="showAssetName">
				<div class="nav navbar-nav navbar-right"
					style="margin-right: 20px; margin-top: 3%;">
					<span  data-toggle="tooltip"
						title="Click here to change asset details" id="selectAssetName"
						onclick="changeAssetName()"></span>
				</div>
			</div>
		</div>
	</div>
</nav>

<audio id="my_audio" src="assets/media/beep.ogg"></audio>
<span class="btn-toastr"></span>

