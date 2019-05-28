
<nav class="navbar navbar-default navbar-fixed-top"
	style="padding-top: 22px">
	<div class="brand">
		<a href="index.jsp"><img src="assets/img/logo.png" alt="Marshall Logo"
			title="Marshall Logo" class="img-responsive logo"
			style="width:260px;"></a>
	</div>
	<div class="container-fluid">
		<div class="row">

			<div class="col-md-2"></div>
			<div class="col-md-4" style="text-align: center">
				<h2 style="margin-top: 30px; !important" id="headName"
					class="headfont"></h2>
				<span title="Asset Last Connected Status" id="lastdiscon"> </span>
			</div>
			<div class="col-md-4">
				<!-- <span class="btn btn-primary" title="Date-Time (YYYY-MM-DD HH:mm:ss)"><i class="fa fa-calendar"></i> <span id="dateTime"> </span></span> -->
			</div>

			<div id="col-md-2" id="showAssetName">
				<div class="nav navbar-nav navbar-right"
					style="margin-right: 20px; margin-top: 30px">
					<span id="dateButton" class="btn btn-primary"
						title="Date-Time (YYYY-MM-DD HH:mm:ss)"> 
						<span id="dateTime"> </span>
					</span>
				</div>
			</div>
			<div id="col-md-2" id="showAssetName">
				<div class="nav navbar-nav navbar-right"
					style="margin-right: 20px; margin-top: 30px">
					<span class="btn btn-info" data-toggle="tooltip"
						title="Click here to change asset details" id="selectAssetName"
						onclick="changeAssetName()"></span>
				</div>
			</div>
		</div>
	</div>
</nav>

<audio id="my_audio" src="assets/media/beep.ogg"></audio>
<span class="btn-toastr"></span>

