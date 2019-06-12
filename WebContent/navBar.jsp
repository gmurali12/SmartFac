<div class="container-fluid">
  <div class="row">
      <div class ="col-md-12">
	<nav class="navbar navbar-default navbar-fixed-top"
		style="padding-top: 22px">
		<div class="col-md-4">
		<div class="brand">
			<a href="index.jsp"><img src="assets/img/logo.png"
				alt="Marshall Logo" title="Marshall Logo"
				class="img-responsive logo" style="width: 260px;"></a>
		</div>
		<!-- 	<div class="container-fluid"> -->
		<div class="navbar-btn">
			<button type="button" id="navigation_toggle"
				class="btn-toggle-fullwidth">
				<i class="fa fa-bars" title="Navigation Toggle"></i>
			</button>
		</div></div>
		<!-- 		<div class="row"> -->
       <div class="col-md-8">
		<div class="col-md-2" style="text-align: center">
			<h2 style="margin-top: 30px; !important" id="headName"
				class="headfont"></h2>
			<span title="Asset Last Connected Status" id="lastdiscon"> </span>
		</div>


	<div class="col-md-3 navAlign" id="showAssetName">
			<div class="nav navbar-nav navbar-right">
				<span data-toggle="tooltip"
					title="Click here to change asset details" id="selectAssetName"
					onclick="changeAssetName()"></span>
			</div>
		</div>

	<div class="col-md-3 navAlignRight">	    
		<div id="assetConnectedImg" style="padding-top: 22px;">
		<span>Online</span>
		</div>
		<div id="assetDisConnectedImg" style="padding-top: 22px;">
		<span>Offline</span>
		</div>
		</div>


		<div class="col-md-2 navAlignRight" id="showAssetName">
			<div class="nav navbar-nav navbar-right">
				<span id="dateButton" title="Date-Time (YYYY-MM-DD HH:mm:ss)">
					<span id="dateTime"></span>
				</span>				
			</div>
		</div>
		
	
	</div>
		<!-- 		</div> -->
		<!-- 	</div> -->
	</nav>
	</div>
	</div>
</div>
<audio id="my_audio" src="assets/media/beep.ogg"></audio>
<span class="btn-toastr"></span>

