$(function(){
	console.log("I am getLatestTimeSeriesServ 1111111111");
    $.ajax({
		url : "getLatestTimeSeriesServ",
		method : "GET",
		cache: false,
		datatype : "application/json",
		contentType: "application/json",
		success : function(data){
			
					
			var dLen = data.length;
			var datapoints = JSON.stringify(data);
			
			document.getElementById("dpCount").innerHTML = dLen;
			document.getElementById("assetDatapoint").innerHTML = datapoints;

		},
		 
		error: function(data) {

		} 
	});
});


$(function(){ 
	
	console.log("I am getAssetDetailsServ 222222222");
	
    $.ajax({
		url : "getAssetDetails",
		method : "GET",
		cache: false,
		datatype : "application/json",
		contentType: "application/json",
		success : function(data){
			
			var assetID, aspectname = "";
			
			
			for(var i = 0; i<data.length; i++) {
				
				assetID = data[i].AssetID;
				aspectname = data[i].AspectName;

			}
			
					
			
			document.getElementById("assetid").innerHTML = assetID;
			document.getElementById("aspectname").innerHTML = aspectname;

		},
		 
		error: function(data) {

		} 
	});
});