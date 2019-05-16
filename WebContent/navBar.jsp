 <nav class="navbar navbar-default navbar-fixed-top">
	<div class="brand">
		<a href="#"><img src="assets/img/logo.png" alt="Marshall Logo" title="Marshall Logo" class="img-responsive logo" style = "width: 260px";></a>
	</div>
	<div class="container-fluid">
		<div class="navbar-btn">
			<button type="button" id="navigation_toggle" class="btn-toggle-fullwidth"><i class="fa fa-bars" title="Navigation Toggle"></i></button>
		</div>
		<div class="col-md-2"></div>
		<div class="col-md-4" style="text-align:center">
			<h2 style="margin-top:30px; !important" id="headName" class="headfont"> </h2>
			<span title="Asset Last Connected Status" id="lastdiscon"> </span>	
		</div>				
		<div class="navbar-btn navbar-btn-right">
			<span class="btn btn-primary" title="Date-Time (YYYY-MM-DD HH:mm:ss)"><i class="fa fa-calendar"></i> <span id="dateTime"> </span></span>			
		</div>
		<div id="col-md-2">
			<ul class="nav navbar-nav navbar-right" style="margin-right:20px">
				<li><img src="" id ="statusimg" class="dropdown-toggle icon-menu" alt="PLC Status" title="" class="img-responsive logo"></li>				
			</ul>
		</div>

	</div>
</nav>

<audio id="my_audio" src="assets/media/beep.ogg"></audio>
<span class="btn-toastr"></span>
	