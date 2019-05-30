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
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/marshal-icon.gif">
	<link rel="stylesheet" type="text/css" href="assets/css/daterangepicker.css" />

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
	
</head>

<body>

  	
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
									<div class="col-md-4">
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingHyPress' style='display:none;'/>
									</div>
									<div class="col-md-4">
								 		<h3 class="panel-title" style='text-align:center'>Hydraulic Pressure</h3>
								 	</div>
								</div>
								<div class="panel-body">
									<canvas id="hydrPress" class="ct-chart" style="max-height:160px !important; height:160px !important"></canvas>
								</div><hr>
								
								<div class="panel-heading">
									<div class="col-md-4">
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingMtrtemp' style='display:none;'/>
									</div>
									<div class="col-md-4">
										<h3 class="panel-title" style='text-align:center'>Motor Temperature</h3>
									</div>
								</div>
								<div class="panel-body">
									<canvas id="motorTemp" class="ct-chart" style="max-height:160px !important; height:160px !important"></canvas>
								</div><hr>
								
								<div class="panel-heading">
									<div class="col-md-4">
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingPPress' style='display:none;'/>
									</div>
									<div class="col-md-4">								
										<h3 class="panel-title" style='text-align:center'>Pneumatic Pressure</h3>
									</div>
								</div>
								<div class="panel-body">
									<canvas id="pneuPress" class="ct-chart" style="max-height:160px !important; height:160px !important"></canvas>
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
							
							<!-- TABLE STRIPED -->
							<div class="panel">
								<div class="panel-body">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Property</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Hydraulic MPCB</td>
												<td><span id='hMPCBStatus'> </span></td>
											</tr>
											<tr>
												<td>Lubrication MPCB</td>
												<td><span id='lMPCBStatus'> </span></td>
											</tr>
											<tr>
												<td>Blower Fan MPCB</td>
												<td><span id='bfMPCBStatus'> </span></td>
											</tr>
											<tr>
												<td>Air Conditioner MPCB</td>
												<td><span id='acMPCBStatus'> </span></td>
											</tr>
											<tr>
												<td>Lubrication Level</td>
												<td><span id='lLevelStatus'> </span></td>
											</tr>
											<tr>
												<td>Hydraulic Level</td>
												<td><span id='hLevelStatus'> </span></td>
											</tr>
											<tr>
												<td>Lubrication Pressure</td>
												<td><span id='lPressureStatus'> </span></td>
											</tr>
											<tr>
												<td>Air Pressure</td>
												<td><span id='airPressureStatus'> </span></td>
											</tr>
											<tr>
												<td>Hydraulic Pressure</td>
												<td><span id='hPressureStatus'> </span></td>
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
    <script src="assets/vendor/toastr/toastr.min.js"></script>
	<script src="assets/scripts/my-common.js"></script>
	<script src="assets/vendor/toastr/toastr.min.js"></script>

	<script src="assets/scripts/moment.js"></script>
	<script src="assets/scripts/chartjs-2.js"></script>
	<script src="assets/chart/smartelectronics.js"></script>
	<script src="assets/scripts/Crosshairs.js"></script>	
    <script src="assets/scripts/lodash.js"></script>
	<script type="text/javascript" src="assets/scripts/daterangepicker.min.js"></script>
    
	
  	
</body>

</html>
