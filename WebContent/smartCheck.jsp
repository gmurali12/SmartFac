<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- VENDOR CSS -->
	<link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/vendor/linearicons/style.css">
	<link rel="stylesheet" href="assets/vendor/chartist/css/chartist-custom.css">
	<link rel="stylesheet" href="assets/vendor/toastr/toastr.min.css">
	
	<!-- MAIN CSS -->
	<link rel="stylesheet" href="assets/css/main.css">
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/marshal-icon.gif">
	<link href="assets/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/daterangepicker.css" />
	
	<style>
	td{
	width:130px
	}
	</style>
	
	
</head>

<body>
<!-- Mindsphere os bar -->
<script src="https://static.eu1.mindsphere.io/osbar/v4/js/main.min.js"></script>
	<script>
      _mdsp.init({
    	  title: "SMARTFAC",
    	  appId: "_mdspcontent",
    	  initialize: true,
    	  appInfoPath: "assets/json/app-info.json",
    	  polyfills: {
    	        es5adapter: true,
    	        promise: false,
    	        webcomponents: true
    	    }
       });
  	</script>
 
<div id="_mdspcontent"> 
	<!-- WRAPPER -->
	<div id="wrapper">
	
		<!-- NAVBAR -->
			<%@include file="navBar.jsp" %>
		<!-- END NAVBAR -->
		
		<!-- LEFT SIDEBAR -->
			<%@include file="sideBar.jsp" %>

		<!-- END LEFT SIDEBAR -->
		<!-- MAIN -->
		<div class="main">
			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<div class="row">

							<div id="myModal" class="modal modal-wide fade"
								data-backdrop="static" aria-hidden="true" data-keyboard="false">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title">Asset Name</h4>
										</div>
										<div class="col-md-12 modal-body"
											style="left: 30%;">
											<div>
												<span class="text-danger" id="errorMsg"></span>
											</div>
											<div class = "col-md-4">
												<form id="assetForm" method="post" action="">
													<select name="assetName" id="assetName">
														<option value="">Select Asset Name</option>
													</select>
												</form>
											</div>
											<div  class = "col-md-4" style="padding-top: 6px;">
												<span id="validation" class="text-danger" ></span>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-primary"
												onclick="changeName(this.value);">Search</button>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-8">
							<div class="panel">
							
								<div class="panel-heading">
									<div class="col-md-4">									    
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingLoad' style='display:none;'/>
									</div>
									<div class="col-md-4">									
										<h3 class="panel-title" style='text-align:center'>Axis Load</h3>
										<div class="showCharTable" id="showAxisLoad"></div>
									</div>
								</div>
								<div class="panel-body">
									<canvas id="axisload" class="ct-chart" width="604px" height="180px" style="max-height:160px !important; height:160px !important"></canvas>
								</div><hr>
								
								<div class="panel-heading">
									<div class="col-md-4">									  
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingTemp' style='display:none;'/>
									</div>
									<div class="col-md-4">
										<h3 class="panel-title" style='text-align:center'>Axis Temperature</h3>
										<div class="showCharTable" id="showAxisTemp"></div>
									</div>
								</div>
								<div class="panel-body">
									<canvas id="axistemperature" class="ct-chart" width="604px" height="180px" style="max-height:160px !important; height:160px !important"></canvas>
								</div><hr>
								
								<div class="panel-heading">
									<div class="col-md-4">
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingVib' style='display:none;'/>
									</div>
									<div class="col-md-4">
										<h3 class="panel-title" style='text-align:center'>Axis Vibration</h3>
										<div class ="showCharTable" id="showAxisVib"></div>
									</div>
								</div>
								<div class="panel-body">
									<canvas id="axisvibration" class="ct-chart" width="604px" height="180px"  style="max-height:160px !important; height:160px !important"></canvas>
								</div>
														
							</div>
						</div>
					
						<div class="col-md-4">
					<!-- INPUTS -->
							<div class="panel">
								<form action="#" method="POST">
									<div class="panel-body">

										<div class="input-group">
											<input class="form-control" type="text" id="ftdt" name="datetimes" placeholder="Select Date & Time *" autoComplete="off">
											<span class="input-group-btn"><button class="btn btn-primary" type="button"><i class="fa fa-calendar"></i></button></span>
										</div>
									</div>
								</form>
							</div>
						
							
							<div class="panel">
								<div class="panel-body">
								<table class="table table-striped">
										<thead>
											<tr>
												<th>Axis</th>
												<th>Load</th>
												<th>Time Stamp</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody id="myTable">
											<tr>
												<td>Axis 1</td>
												<td id="ax1L"> </td>
												<td id="ax1TS"> </td>
												<td><span id='ax1st'> </span></td>
											</tr>
											<tr>
												<td>Axis 2</td>
												<td id="ax2L"> </td>
												<td id="ax2TS"> </td>
												<td><span id='ax2st'> </span></td>
											</tr>
											<tr>
												<td>Axis 3</td>
												<td id="ax3L"> </td>
												<td id="ax3TS"> </td>
												<td><span id='ax3st'> </span></td>
											</tr>
											<tr>
												<td>Axis 4</td>
												<td id="ax4L"> </td>
												<td id="ax4TS"> </td>
												<td><span id='ax4st'> </span></td>
											</tr>
										</tbody>
									</table>
								</div>

								<div class="panel-body">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Axis</th>
												<th>Temperature</th>
												<th>Time Stamp</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Axis 1</td>
												<td id="ax1T"> </td>
												<td id="ax1TTS"> </td>
												<td><span id='ax1Tst'> </span></td>
											</tr>
											<tr>
												<td>Axis 2</td>
												<td id="ax2T"> </td>
												<td id="ax2TTS"> </td>
												<td><span id='ax2Tst'> </span></td>
											</tr>
											<tr>
												<td>Axis 3</td>
												<td id="ax3T"> </td>
												<td id="ax3TTS"> </td>
												<td><span id='ax3Tst'> </span></td>
											</tr>
											<tr>
												<td>Axis 4</td>
												<td id="ax4T"> </td>
												<td id="ax4TTS"> </td>
												<td><span id='ax4Tst'> </span></td>
											</tr>
										</tbody>
									</table>
								</div>
								
								<div class="panel-body">
								<table class="table table-striped">
										<thead>
											<tr>
												<th>Axis</th>
												<th>Vibration</th>
												<th>Time Stamp</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Axis 1</td>
												<td id="ax1V"> </td>
												<td id="ax1VTS"> </td>
												<td><span id='ax1Vst'> </span></td>
											</tr>
											<tr>
												<td>Axis 2</td>
												<td id="ax2V"> </td>
												<td id="ax2VTS"> </td>
												<td><span id='ax2Vst'> </span></td>
											</tr>
											<tr>
												<td>Axis 3</td>
												<td id="ax3V"> </td>
												<td id="ax3VTS"> </td>
												<td><span id='ax3Vst'> </span></td>
											</tr>
											<tr>
												<td>Axis 4</td>
												<td id="ax4V"> </td>
												<td id="ax4VTS"> </td>
												<td><span id='ax4Vst'> </span></td>
											</tr>
										</tbody>
									</table>
								</div>								
							</div>							
						</div>
						
					</div>
				</div>
			</div>
			<!-- END MAIN CONTENT -->
		</div>
		<!-- END MAIN -->
	</div>
	<!-- END WRAPPER -->
</div> <!-- .Os bar -->

	<!-- Javascript -->
	<script src="assets/vendor/jquery/jquery.min.js"></script>
	<script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js"></script>
	<script src="assets/scripts/my-common.js"></script>
	<script src="assets/vendor/toastr/toastr.min.js"></script>
	
	<script src="assets/scripts/moment.js"></script>	
	<script src="assets/scripts/chartjs-2.js"></script>
	<script src="assets/chart/smartcheck.js"></script>
	<script src="assets/scripts/Crosshairs.js"></script>	
	<script src="assets/scripts/bootstrap-datetimepicker.min.js"></script>
    <script src="assets/scripts/lodash.js"></script>
    <script type="text/javascript" src="assets/scripts/daterangepicker.min.js"></script>
    	
	

  	<script type="text/javascript">
        $('.form_datetime').datetimepicker({
            language:  'en',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0
        });
    </script>
	
</body>

</html>
