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
		</nav>
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
						
						<!-- Popup Start-->
						
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
						<!-- Popup End-->
						
						<div class="col-lg-12">
						  <div class="col-lg-3" style="float:right;">
							<div class="panel">
								<div class="panel-body">
									<div class="input-group">
										<input class="form-control" type="text" id="ftdt" name="datetimes" placeholder="Select Date & Time *" autoComplete="off">
										<span class="input-group-btn"><button class="btn btn-primary" type="button"><i class="fa fa-calendar"></i></button></span>
									</div>
								</div>
							</div></div>
						</div>
						
						<div class="col-md-6">
							<div class="panel">
								<div class="panel-heading">
									<div class="col-md-5">
										<img src="assets/img/loading.gif" height="35px" width="35px" id='loadingtool' style='display:none;'/>
									</div>
									<div class="col-md-4">	
										<h3 class="panel-title" id="smartCorrectIds">Tool Life - T1</h3>
									</div>
									<div class="col-lg-3">
										<select class="form-control" id="jobSelected" name="jobSelected" onchange="drawToolChart();">
											<option value="t0">- Select -</option>
											<option selected value="1">Tool 1</option>
											<option value="2">Tool 2</option>
											<option value="3">Tool 3</option>
											<option value="4">Tool 4</option>
											<option value="5">Tool 5</option>
											<option value="6">Tool 6</option>
											<option value="7">Tool 7</option>
											<option value="8">Tool 8</option>
											<option value="9">Tool 9</option>
											<option value="10">Tool 10</option>
											<option value="11">Tool 11</option>
											<option value="12">Tool 12</option>
										</select>
									</div>
								</div>
								<div class="panel-body" style="height:547px;">
									<canvas id="toolChart" class="ct-chart"></canvas>
								</div>
							</div>
						</div>
				

                    
                    <div class="col-md-6">
                   
							<!-- TABLE STRIPED -->
						<div class="panel">
							<div class="panel-body">
								<table class="table table-striped" >
									<thead>
										<tr>
											<th>Tool number</th>
											<th>Actual Cutting time</th>
											<th>Actual Workpiece produced</th>
											<th>Average cutting time</th>
											<th>Average workpieces produced</th>
										</tr>
									</thead>
									<tbody >
										<tr>
											<td>T1</td>
											<td id="t1actCutTim"></td>
											<td id="t1actWrkPcs"></td>
											<td id="t1avgCutTim"></td>											
											<td id="t1avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T2</td>
											<td id="t2actCutTim"></td>
											<td id="t2actWrkPcs"></td>
											<td id="t2avgCutTim"></td>											
											<td id="t2avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T3</td>
											<td id="t3actCutTim"></td>
											<td id="t3actWrkPcs"></td>
											<td id="t3avgCutTim"></td>											
											<td id="t3avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T4</td>
											<td id="t4actCutTim"></td>
											<td id="t4actWrkPcs"></td>
											<td id="t4avgCutTim"></td>											
											<td id="t4avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T5</td>
											<td id="t5actCutTim"></td>
											<td id="t5actWrkPcs"></td>
											<td id="t5avgCutTim"></td>											
											<td id="t5avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T6</td>
											<td id="t6actCutTim"></td>
											<td id="t6actWrkPcs"></td>
											<td id="t6avgCutTim"></td>											
											<td id="t6avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T7</td>
											<td id="t7actCutTim"></td>
											<td id="t7actWrkPcs"></td>
											<td id="t7avgCutTim"></td>											
											<td id="t7avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T8</td>
											<td id="t8actCutTim"></td>
											<td id="t8actWrkPcs"></td>
											<td id="t8avgCutTim"></td>											
											<td id="t8avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T9</td>
											<td id="t9actCutTim"></td>
											<td id="t9actWrkPcs"></td>
											<td id="t9avgCutTim"></td>											
											<td id="t9avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T10</td>
											<td id="t10actCutTim"></td>
											<td id="t10actWrkPcs"></td>
											<td id="t10avgCutTim"></td>											
											<td id="t10avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T11</td>
											<td id="t11actCutTim"></td>
											<td id="t11actWrkPcs"></td>
											<td id="t11avgCutTim"></td>											
											<td id="t11avgWrkPcs"></td>
										</tr>
										<tr>
											<td>T12</td>
											<td id="t12actCutTim"></td>
											<td id="t12actWrkPcs"></td>
											<td id="t12avgCutTim"></td>											
											<td id="t12avgWrkPcs"></td>
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
	<script src="assets/chart/smartinsert.js"></script>
	<script src="assets/scripts/Crosshairs.js"></script>	
	<script src="assets/scripts/bootstrap-datetimepicker.min.js"></script>
	<script src="assets/scripts/monitor.js"></script>
	<script type="text/javascript" src="assets/scripts/daterangepicker.min.js"></script>

  
</body>

</html>
