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
	<!-- MAIN CSS -->
	<link rel="stylesheet" href="assets/css/main.css">
	<!-- FOR DEMO PURPOSES ONLY. You should remove this in your project -->
	<link rel="stylesheet" href="assets/css/demo.css">
	<!-- GOOGLE FONTS -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet"> -->
	<!-- ICONS -->
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/marshal-icon.gif">
	<link rel="stylesheet" href="assets/css/card.css">
	<style type="text/css">
	a {
  color: #3287B2; }
  a:hover, a:focus {
    color: #3287B2;
    text-decoration: none; }
	</style>
</head>

<body>
<!-- Mindsphere os bar -->
<script src="https://static.eu1.mindsphere.io/osbar/v4/js/main.min.js"></script>
	<script>
      _mdsp.init({
        title: "SMARTFAC",
        appId: "_mdspcontent",
        appInfoPath: "myfile.json"
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
					 
					 <br><br><br>
					 <div class="col-md-1">
					 </div>
					 
					 <a href ="#">
						 <div class="col-md-2">
							<div class="card">
							    <div class="box">
							        <div class="img">
							        </div><br><br>
							        <h4>Smart Correct<br><br><br><br><hr><span><i class="fa fa-link" title="View"></i> View</span></h4>
							    </div>
							</div>
						</div>
					</a>
					
					<a href ="smartCheck.jsp">
						<div class="col-md-2">
							<div class="card">
							    <div class="box">
							        <div class="img">
							        </div><br><br>
							        <h4>Smart Check<br><br><br><br><hr><span><i class="fa fa-link" title="View"></i> View</span></h4>
							    </div>
							</div>
						</div>
					</a>
					
					<a href ="#">
						<div class="col-md-2">
							<div class="card">
							    <div class="box">
							        <div class="img">
							        </div><br><br>
							        <h4>Smart Insert<br><br><br><br><hr><span><i class="fa fa-link" title="View"></i> View</span></h4>
							    </div>
							</div>
						</div>
					</a>
					
					<a href ="#">
						<div class="col-md-2">
							<div class="card">
							    <div class="box">
							        <div class="img">
							        </div><br><br>
							        <h4>Smart Productivity<br><br><br><br><hr><span><i class="fa fa-link" title="View"></i> View</span></h4>
							    </div>
							</div>
						</div>
					</a>
					
					<a href ="smartElectronics.jsp">
						<div class="col-md-2">
							<div class="card">
							    <div class="box">
							        <div class="img">
							        </div><br><br>
							        <h4>Smart Electronics<br><br><br><br><hr><span><i class="fa fa-link" title="View"></i> View</span></h4>
							    </div>
							</div>
						</div>
					</a>
					
					<div class="col-md-1"></div>
					


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
	<script src="assets/scripts/my-common.js"></script>
	<script src="assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js"></script>
	
	<script src="assets/scripts/moment.js"></script>
	<script src="assets/scripts/monitor.js"></script>

	
</body>

</html>
