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
	<link rel="stylesheet" href="assets/vendor/toastr/toastr.min.css">
	<!-- MAIN CSS -->
	<link rel="stylesheet" href="assets/css/main.css">
	<!-- ICONS -->
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/marshal-icon.gif">
	<link href="assets/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/daterangepicker.css" />
	
	
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
												onclick="changeAssetDetails(this.value);">Search</button>
										</div>
									</div>
								</div>
							</div>
							
						<div class="col-md-8">
							<div class="panel">
								<div class="panel-heading">
									<div class="col-md-5">
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingCorr' style='display:none;'/>
									</div>
									<div class="col-md-4">								
										<h3 class="panel-title" id="smartCorrectIds"></h3>
										<div class="showCharTable" id="showJobLoad"></div>
									</div>
								</div>
								<div class="panel-body" style="height: 285px;">
									<canvas id="smtCrtJob" class="ct-chart"></canvas>
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
										<br>
										<div class="input-group col-md-12">
											<select class="form-control" id="jobSelected" name="jobSelected" onchange="drawJob(this.value)">
												<option value="0">- Select -</option>
												<option selected value="1">JOB OD</option>
												<option value="2">ID</option>
												<option value="3">HEIGHT</option>
												<option value="4">RUNOUT</option>
												<option value="5">OVALITY</option>
												<option value="6">FACEOUT</option>
											</select>
										</div>
	
									</div>
								</form>
							</div>
						
						
							<!-- TABLE STRIPED -->
							<div class="panel">
								<div class="panel-body">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Parts</th>
												<th>Count</th>
												<th>PPM</th>
												<th>%</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Rejected</td>
												<td>2</td>
												<td></td>
												<td></td>
											</tr>
											<tr>
												<td>Rework</td>
												<td>10</td>
												<td></td>
												<td></td>
											</tr>
											<tr>
												<td>Good</td>
												<td>100</td>
												<td></td>
												<td></td>
											</tr>											
										</tbody>
									</table>
								</div>
							</div>
							<!-- END TABLE STRIPED -->
						
							<!-- TABLE STRIPED -->
							<div class="panel">
								<div class="panel-body">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Parameter</th>
												<th>Value</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>CP</td>
												<td></td>
											</tr>
											<tr>
												<td>CPK</td>
												<td></td>
											</tr>											
										</tbody>
									</table>
								</div>
							</div>
							<!-- END TABLE STRIPED -->
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
	<script src="assets/chart/smartcorrect.js"></script>
	<script src="assets/scripts/Crosshairs.js"></script>	
	<script src="assets/scripts/bootstrap-datetimepicker.min.js"></script>
	<script src="assets/scripts/monitor.js"></script>
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
