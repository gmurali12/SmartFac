//Date time picker

$(function() {
	  $('input[name="datetimes"]').daterangepicker({
		  "showDropdowns": true,
		  "opens": "left",
		  ranges: {
			  'Today': [moment().startOf('day'), moment()],
		        'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
		        'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
		        'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment()],
		        'This Month': [moment().startOf('month'), moment().endOf('month')],
		        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		    },
	    timePicker: true,
	    // startDate: moment().startOf('hour'),
	    // endDate: moment().startOf('hour').add(32, 'hour'),
	    autoUpdateInput: false,
	    locale: {
	      format: 'DD-MM-YY HH:mm',
	      cancelLabel: 'Clear'
	    }
	  }, function(start, end, label) {
		  
		  /* $('#loadingLoad,#loadingTemp,#loadingVib').show(); */
		  
		  var fDt = start.format('YYYY-MM-DDTHH:mm:00');
		  var tDt = end.format('YYYY-MM-DDTHH:mm:00');
		  

	  });
	  
	  $('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {
	      $(this).val(picker.startDate.format('DD-MM-YY HH:mm') + ' - ' + picker.endDate.format('DD-MM-YY HH:mm'));
	  });
	  
	  $('input[name="datetimes"]').on('cancel.daterangepicker', function(ev, picker) {
	      $(this).val('');
	  });
	  
	  $.ajax({
		  url : "getAssetDetails",
			method : "GET",		
			cache: false,
			datatype : "application/json",
			contentType: "application/json;	 charset=utf-8",
			success : function(response){
				
				console.log(response,"response")
				console.log(response.aspects[0].variables[1].value)
				if(response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'false'){
					document.getElementById("dateButton").className = "label label-danger";
				} else{
					document.getElementById("dateButton").className = "label label-success";
				}
				
				if(response.aspects[0].variables[1].name === 'lastUpdated'){
					console.log(response.aspects[0].variables[0].name)
				document.getElementById("dateTime").innerHTML = response.aspects[0].variables[1].value;
				}
				 smartCheckChart(response.assetId,null,null);
			},
	  error:function(error){
		 
		  console.log(assetData)
		 console.log(error.responseText,"AssetDetailsError") 
		 
	  }
		  
	  });
	  
	  
	});

function smartCheckChart(assetId, fdt,tdt){
	
	var DateTime1 = moment(fdt);
	 fromdt = DateTime1.format('DD-MM-YY HH:mm');
	 var DateTime2 = moment(tdt);
	 todt = DateTime2.format('DD-MM-YY HH:mm');
	
   document.getElementById("ftdt").value = fromdt + ' - ' + todt;
	
	$('#loadingLoad,#loadingTemp,#loadingVib').show();
		
	  $(function(){
		  $.ajax({
				url : "getSmartheckDetails",
				method : "GET",
				 data:{
					 assetId:assetId,
					 fromDT: fdt,
					 toDT: tdt,
			     },
				cache: false,
				datatype : "application/json",
				contentType: "application/json",
				success : function(data){
					
					
					$('#loadingLoad,#loadingTemp,#loadingVib').hide();
										
					var dLen = data.length;
								
					if (dLen == 0){
						toastr.options.closeButton = true;
		 				$(".btn-toastr").ready(function(){
							toastr.info('No data Found for Time Range', 'Info', {timeOut: 5000});

						});		 				
		 			    
		 				  $('#ax1st,#ax2st,#ax3st,#ax4st,#ax1Tst,#ax2Tst,#ax3Tst,#ax4Tst,#ax1Vst,#ax2Vst,#ax3Vst,#ax4Vst').attr('class','label label-default');
		 				  $('#ax1st,#ax2st,#ax3st,#ax4st,#ax1Tst,#ax2Tst,#ax3Tst,#ax4Tst,#ax1Vst,#ax2Vst,#ax3Vst,#ax4Vst').text("# # #");
			 			  $('#ax1L,#ax2L,#ax3L,#ax4L,#ax1T,#ax2T,#ax3T,#ax4T,#ax1V,#ax2V,#ax3V,#ax4V').text("# # #");
		 				
					   if(window.chart1 != undefined)
							 window.chart1.destroy();
					   
					   if(window.chart2 != undefined)
							 window.chart2.destroy();
					   
					   if(window.chart3 != undefined)
							 window.chart3.destroy();


					} else {
					
					var output = data.filter(obj => Object.keys(obj).includes("Axis1_Load","Axis2_Load","Axis3_Load","Axis4_Load","Axis1_Temp","Axis2_Temp","Axis3_Temp","Axis4_Temp","Axis1_Vib","Axis2_Vib","Axis3_Vib","Axis4_Vib"));
					
					


 // Axis Load
					var axisAverage= 0;
					var axisLoad1Percent=0;
					var axisLoad2Percent=0
					var axisLoad3Percent =0;
					var axisLoad4Percent=0;
					var axis1Load = [];
					var axis2Load=[];
					var axis3Load=[];
					var axis4Load=[];
					var axis1Temp=[];
					var axis2Temp=[];
					var axis3Temp=[];
					var axis4Temp=[];
					var axis1Vib=[];
					var axis2Vib=[];
					var axis3Vib=[];
					var axis4Vib=[];
					var timelbl = [];
					
				    for(var key in output){				
				    	axisAverage += +output[key].Axis1_Load.average.toFixed(2);
				    	axisLoad1Percent = (axisAverage / output.length).toFixed(2);
				    	
				    	axis1Load.push(
				    			output[key].Axis1_Load.minvalue,
				    			output[key].Axis1_Load.maxvalue,
				    			output[key].Axis1_Load.firstvalue,
				    			output[key].Axis1_Load.lastvalue)
				    	
				    	axis2Load.push(
				    			output[key].Axis2_Load.minvalue,
				    			output[key].Axis2_Load.maxvalue,
				    			output[key].Axis2_Load.firstvalue,
				    			output[key].Axis2_Load.lastvalue)	
				    	
				    					    
				    	
				    	axis3Load.push(
				    			output[key].Axis3_Load.minvalue,
				    			output[key].Axis3_Load.maxvalue,
				    			output[key].Axis3_Load.firstvalue,
				    			output[key].Axis3_Load.lastvalue)	
				    	
				    		axis4Load.push(
				    			output[key].Axis4_Load.minvalue,
				    			output[key].Axis4_Load.maxvalue,
				    			output[key].Axis4_Load.firstvalue,
				    			output[key].Axis4_Load.lastvalue)
				    			
				    		axis1Temp.push(
				    			output[key].Axis1_Temp.minvalue,
				    			output[key].Axis1_Temp.maxvalue,
				    			output[key].Axis1_Temp.firstvalue,
				    			output[key].Axis1_Temp.lastvalue)
				    			
				    		axis2Temp.push(
				    				output[key].Axis2_Temp.minvalue,
					    			output[key].Axis2_Temp.maxvalue,
					    			output[key].Axis2_Temp.firstvalue,
					    			output[key].Axis2_Temp.lastvalue
					    			)
				    			
				    		axis3Temp.push(
				    				output[key].Axis3_Temp.minvalue,
					    			output[key].Axis3_Temp.maxvalue,
					    			output[key].Axis3_Temp.firstvalue,
					    			output[key].Axis3_Temp.lastvalue		
				    		)
				    			
				    		axis4Temp.push(
				    				output[key].Axis4_Temp.minvalue,
					    			output[key].Axis4_Temp.maxvalue,
					    			output[key].Axis4_Temp.firstvalue,
					    			output[key].Axis4_Temp.lastvalue
				    		)	
				    						    		
				    			
				    		axis1Vib.push(
				    				output[key].Axis1_Vib.minvalue,
					    			output[key].Axis1_Vib.maxvalue,
					    			output[key].Axis1_Vib.firstvalue,
					    			output[key].Axis1_Vib.lastvalue
				    		)
				    		
				    		axis2Vib.push(
				    				output[key].Axis2_Vib.minvalue,
					    			output[key].Axis2_Vib.maxvalue,
					    			output[key].Axis2_Vib.firstvalue,
					    			output[key].Axis2_Vib.lastvalue
				    		)	
				    		
				    		axis3Vib.push(
				    				output[key].Axis3_Vib.minvalue,
					    			output[key].Axis3_Vib.maxvalue,
					    			output[key].Axis3_Vib.firstvalue,
					    			output[key].Axis3_Vib.lastvalue
				    		)	
				    		
				    		axis4Vib.push(
				    				output[key].Axis4_Vib.minvalue,
					    			output[key].Axis4_Vib.maxvalue,
					    			output[key].Axis4_Vib.firstvalue,
					    			output[key].Axis4_Vib.lastvalue
				    		)	
				    	//axis Load
				    	document.getElementById("ax1TS").innerHTML = moment(output[key].Axis1_Load.lasttime).format("DD-MM-YY HH:mm:ss");				    	
				    	document.getElementById("ax1L").innerHTML = output[key].Axis1_Load.lastvalue+"%";
				    	
				    	document.getElementById("ax2TS").innerHTML = moment(output[key].Axis2_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");				    	
				    	document.getElementById("ax2L").innerHTML = output[key].Axis2_Load.lastvalue+"%";
				    	
				    	document.getElementById("ax3TS").innerHTML = moment(output[key].Axis3_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");				    	
				    	document.getElementById("ax3L").innerHTML = output[key].Axis3_Load.lastvalue+"%";
				    	
				    	document.getElementById("ax4TS").innerHTML = moment(output[key].Axis4_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");				    	
				    	document.getElementById("ax4L").innerHTML = output[key].Axis4_Load.lastvalue+"%";
				    	
				    	//axis Temp
				    	document.getElementById("ax1TTS").innerHTML = moment(output[key].Axis1_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");				    	
				    	document.getElementById("ax1T").innerHTML = output[key].Axis1_Temp.lastvalue+"%";
				    	
				    	document.getElementById("ax2TTS").innerHTML = moment(output[key].Axis2_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
				    	document.getElementById("ax2T").innerHTML = output[key].Axis2_Temp.lastvalue+"%";
				    	
				    	document.getElementById("ax3TTS").innerHTML = moment(output[key].Axis3_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");				    	
				    	document.getElementById("ax3T").innerHTML = output[key].Axis3_Temp.lastvalue+"%";
				    	
				    	document.getElementById("ax4TTS").innerHTML = moment(output[key].Axis4_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
				    	document.getElementById("ax4T").innerHTML = output[key].Axis4_Temp.lastvalue+"%";
				    	
				    	//axis Vib
				    	document.getElementById("ax1VTS").innerHTML = moment(output[key].Axis1_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");				    	
				    	document.getElementById("ax1V").innerHTML = output[key].Axis1_Vib.lastvalue+"%";
				    	
				    	document.getElementById("ax2VTS").innerHTML = moment(output[key].Axis2_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
				    	document.getElementById("ax2V").innerHTML = output[key].Axis2_Vib.lastvalue+"%";
				    	
				    	document.getElementById("ax3VTS").innerHTML = moment(output[key].Axis3_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
				    	document.getElementById("ax3V").innerHTML = output[key].Axis3_Vib.lastvalue+"%";
				    	
				    	document.getElementById("ax4VTS").innerHTML = moment(output[key].Axis4_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
				    	document.getElementById("ax4V").innerHTML = output[key].Axis4_Vib.lastvalue+"%";
				    	
				    	timelbl.push(
				    			
				    			moment(output[key].Axis1_Load.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Load.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Load.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			
				    			moment(output[key].Axis2_Load.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Load.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Load.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis3_Load.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Load.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Load.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis4_Load.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Load.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Load.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Load.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis1_Temp.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Temp.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Temp.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis2_Temp.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Temp.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Temp.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis3_Temp.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Temp.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Temp.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis4_Temp.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Temp.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Temp.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Temp.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis1_Vib.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Vib.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Vib.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis1_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis2_Vib.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Vib.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Vib.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis2_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis3_Vib.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Vib.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Vib.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis3_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			
				    			moment(output[key].Axis4_Vib.firsttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Vib.mintime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Vib.maxtime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"),
				    			moment(output[key].Axis4_Vib.lasttime).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss")				    			
				    			
				    			
				    			)
				    	
				    }				   
 
				    
					// document.getElementById("ax1LT").innerHTML = fromDT;
					//document.getElementById("ax1L").innerHTML = axisLoad1Percent+" %"; document.getElementById("ax2L").innerHTML = axisLoad2Percent+" %"; document.getElementById("ax3L").innerHTML = axisLoad3Percent+" %"; document.getElementById("ax4L").innerHTML = axisLoad4Percent+" %";
					
					
				
					if(axisLoad1Percent > 100){
						$('#ax1st').attr('class','label label-danger'); $('#ax1st').text("NOT OK");
					} else {
						$('#ax1st').attr('class','label label-success'); $('#ax1st').text("OK");
					} if(axisLoad2Percent > 100){
						$('#ax2st').attr('class','label label-danger'); $('#ax2st').text("NOT OK");
					} else {
						$('#ax2st').attr('class','label label-success'); $('#ax2st').text("OK");
					} if(axisLoad3Percent > 100){
						$('#ax3st').attr('class','label label-danger'); $('#ax3st').text("NOT OK");
					} else {
						$('#ax3st').attr('class','label label-success'); $('#ax3st').text("OK");
					} if(axisLoad4Percent > 100){
						$('#ax4st').attr('class','label label-danger'); $('#ax4st').text("NOT OK");
					} else {
						$('#ax4st').attr('class','label label-success'); $('#ax4st').text("OK");
					}
// Axis Temp
					
					var axisTemp1Sum = 0;					
					var axisTemp1Percent = 0;
					var axisTemp2Percent = 0;
					var axisTemp3Percent = 0;
					var axisTemp4Percent = 0;
					
					// document.getElementById("ax1TT").innerHTML = fromDT;
					//document.getElementById("ax1T").innerHTML = axisTemp1Percent+" %"; document.getElementById("ax2T").innerHTML = axisTemp2Percent+" %"; document.getElementById("ax3T").innerHTML = axisTemp3Percent+" %"; document.getElementById("ax4T").innerHTML = axisTemp4Percent+" %";
					
					if(axisTemp1Percent > 100){
						$('#ax1Tst').attr('class','label label-danger'); $('#ax1Tst').text("NOT OK");
					} else {
						$('#ax1Tst').attr('class','label label-success'); $('#ax1Tst').text("OK");
					} if(axisTemp2Percent > 100){
						$('#ax2Tst').attr('class','label label-danger'); $('#ax2Tst').text("NOT OK");
					} else {
						$('#ax2Tst').attr('class','label label-success'); $('#ax2Tst').text("OK");
					} if(axisTemp3Percent > 100){
						$('#ax3Tst').attr('class','label label-danger'); $('#ax3Tst').text("NOT OK");
					} else {
						$('#ax3Tst').attr('class','label label-success'); $('#ax3Tst').text("OK");
					} if(axisTemp4Percent > 100){
						$('#ax4Tst').attr('class','label label-danger'); $('#ax4Tst').text("NOT OK");
					} else {
						$('#ax4Tst').attr('class','label label-success'); $('#ax4Tst').text("OK");
					}	
					
					
// Axis Var
					
					var axisVib1Sum = 0;
					var axisVib1Percent = 0;
					var axisVib2Percent = 0;
					var axisVib3Percent = 0;
					var axisVib4Percent = 0;
					
					// document.getElementById("ax1VT").innerHTML = fromDT;
					//document.getElementById("ax1V").innerHTML = axisVib1Percent+" %"; document.getElementById("ax2V").innerHTML = axisVib2Percent+" %"; document.getElementById("ax3V").innerHTML = axisVib3Percent+" %"; document.getElementById("ax4V").innerHTML = axisVib4Percent+" %";
					
					if(axisVib1Percent > 100){
						$('#ax1Vst').attr('class','label label-danger'); $('#ax1Vst').text("NOT OK");
					} else {
						$('#ax1Vst').attr('class','label label-success'); $('#ax1Vst').text("OK");
					} if(axisVib2Percent > 100){
						$('#ax2Vst').attr('class','label label-danger'); $('#ax2Vst').text("NOT OK");
					} else {
						$('#ax2Vst').attr('class','label label-success'); $('#ax2Vst').text("OK");
					} if(axisVib3Percent > 100){
						$('#ax3Vst').attr('class','label label-danger'); $('#ax3Vst').text("NOT OK");
					} else {
						$('#ax3Vst').attr('class','label label-success'); $('#ax3Vst').text("OK");
					} if(axisVib4Percent > 100){
						$('#ax4Vst').attr('class','label label-danger'); $('#ax4Vst').text("NOT OK");
					} else {
						$('#ax4Vst').attr('class','label label-success');$('#ax4Vst').text("OK");
					}
					
// charts				
					
					
				    var axisLoad1 = [];  var axisLoad2 = []; var axisLoad3 = []; var axisLoad4 = [];
				    var axisTemp1 = []; var axisTemp2 = [];  var axisTemp3 = []; var axisTemp4 = [];
				    var axisVib1 = []; var axisVib2 = [];  var axisVib3 = []; var axisVib4 = [];
				   
				    console.log(timelbl)
				    console.log(axis1Load)
					
					var minTime = moment(_.min(timelbl));
					var maxTime = moment(_.max(timelbl));
					
					console.log(maxTime,"maxTime");
					console.log(minTime,"minTime");
					var duration = moment.duration(maxTime.diff(minTime));
					var asMinutes = duration.asMinutes();
					
					var duration1 = moment.duration(maxTime.diff(minTime));
					var asHours = duration1.asHours();
					
					
					console.log("asMinutes -> "+ asMinutes);
					console.log("asHours -> "+ asHours);

					if(asMinutes > 0 && asMinutes <= 60){
						unitChart1 = 'minute';
						unitStepSizeChart1 = 5; 
					} else if(asMinutes > 60 && asMinutes <= 120){
						unitChart1 = 'minute';
						unitStepSizeChart1 = 10; 
					} else if(asMinutes > 120 && asMinutes <= 240){
						unitChart1 = 'minute';
						unitStepSizeChart1 = 15; 
					} else if(asMinutes > 240 && asHours >= 4){
						unitChart1 = 'hour';
						unitStepSizeChart1 = 1; 
					}
					
													
					 var data1 = {
					        labels: timelbl,
					        datasets: [					
					                   {
						            label: "Axis 1",
						            borderColor: 'rgb(78,176,153)',
						            backgroundColor: 'rgb(78,176,153)',
						            fill: false,
						            pointRadius: 0,
						            lineTension: 0,
						            radius: 5,
						            data: axis1Load
						          },
						          {
						            label: "Axis 2",
						            borderColor: 'rgb(195, 184, 78)',
						            backgroundColor: 'rgb(195, 184, 78)',
						            fill: false,
						            pointRadius: 0,
						            lineTension: 0,
						            radius: 5,
						            data: axis2Load
						          },
						          {
						            label: "Axis 3",
						            borderColor: 'rgb(178, 75, 9)',
						            backgroundColor: 'rgb(178, 75, 9)',
						            fill: false,
						            pointRadius: 0,
						            lineTension: 0,
						            radius: 5,
						            data: axis3Load
								   },
								   {
									label: "Axis 4",
									borderColor: 'rgb(162, 143, 188)',
						            backgroundColor: 'rgb(162, 143, 188)',
							        pointRadius: 0,
						            fill: false,
						            lineTension: 0,
						            radius: 5,
						            data: axis4Load
									}
					        ]
					      };
					 					 
								
				    var  options1 = {
				    	responsive: true,
				    	maintainAspectRatio: false,
				    	legend: {
				            display: true,
				            position : 'right',
				            labels: {
				            	fontSize: 10
				            }
				        },
						tooltips: {
							mode: 'index',
							intersect: false,
						},
						hover: {
							mode: 'nearest',
							intersect: true
						},
						crosshairs: {
		                    color: 'grey',
		                    lineWidth: 1
		                  },
				        scales: {
				            xAxes: [{
				            	type: 'time',
				            	 time: {
				                    unit: unitChart1,
				                    format: "YYYY-MM-DD hh:mm",
				                    unitStepSize: unitStepSizeChart1,
				                    displayFormats: {
				                    	'minute': 'hh:mm',
				                         'hour': 'hh:mm'
				                    }
					             },
				            	 ticks: {
				            		 autoSkip: true,
				            	        maxTicksLimit: 20
				            	    },
				            	    scaleLabel: {
					                    display: true,
					                    labelString: 'Time',
					                    fontSize: 12,
					                    fontColor: "black"
					                },
					                gridLines: {
					                    display:false
					                }
					            }],
				            yAxes: [
				            	{
					            	horizontalAlign: "left",
					                verticalAlign: "center",
					                scaleLabel: {
					                    display: true,
					                    labelString: 'Load (%)',
					                    fontSize: 12,
					                },
					                ticks: {
					                    /*
										 * max: 100, min: 0, stepSize: 20
										 */
					                	scaleOverride : true,
					                    scaleSteps : 10,
					                    scaleStepWidth : 50,
					                    min: 0 
					                },
					                gridLines: {
					                    display:false
					                }
				            }]
				        }
				   
				    }

console.log(options1,"options1")
								
					var data2 = {
					        labels: timelbl,
					        datasets: [
					          {
					            label: "Axis 1",
					            borderColor: 'rgba(255,99,132,1)',
					            backgroundColor: 'rgba(255, 99, 132, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis1Temp
					          },
					          {
					            label: "Axis 2",
					            borderColor: 'rgba(54, 162, 235, 1)',
					            backgroundColor: 'rgba(54, 162, 235, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis2Temp
					          },
					          {
					            label: "Axis 3",
					            borderColor: 'rgba(255, 206, 86, 1)',
					            backgroundColor: 'rgba(255, 206, 86, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis3Temp
							   },
							   {
								label: "Axis 4",
								borderColor: 'rgba(75, 192, 192, 1)',
					            backgroundColor: 'rgba(75, 192, 192, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis4Temp
							   }
					        ]
					      };
				    
				    var  options2 = {
					    responsive: true,
					    maintainAspectRatio: false,
					    legend: {
				            display: true,
				            position : 'right',
				            labels: {
				            	fontSize: 10
				            }
				        },
						tooltips: {
							mode: 'index',
							intersect: false,
						},
						hover: {
							mode: 'nearest',
							intersect: true
						},
						crosshairs: {
		                    color: 'grey',
		                    lineWidth: 1
		                  },
				        scales: {
				            xAxes: [{
				            	type: 'time',
				            	 time: {
				            		 unit: unitChart1,
					                    format: "YYYY-MM-DD hh:mm",
					                    unitStepSize: unitStepSizeChart1,
					                    displayFormats: {
					                    	'minute': 'hh:mm',
					                    	'hour': 'hh:mm'
				                    }
					             },
				            	 ticks: {
				            	        autoSkip: true,
				            	        maxTicksLimit: 20
				            	    },
				            	    scaleLabel: {
					                    display: true,
					                    labelString: 'Time',
					                    fontSize: 12,
					                    fontColor: "black"
					                },
					                gridLines: {
					                    display:false
					                }
					            }],
				            yAxes: [
				            	{
					            	horizontalAlign: "left",
					                verticalAlign: "center",
					                scaleLabel: {
					                    display: true,
					                    labelString: 'Temperature (\xB0 C)',
					                    fontSize: 12,
					                },
					                ticks: {
					                    /*
										 * max: 80, min: 0, stepSize: 20
										 */
					                	scaleOverride : true,
					                    scaleSteps : 10,
					                    scaleStepWidth : 50,
					                    min: 0 
					                },
					                gridLines: {
					                    display:false
					                }
				            }]
				        }
				    }
				    
				    var data3 = {
					        labels: timelbl,
					        datasets: [
					          {
					            label: "Axis 1",
					            borderColor: 'rgba(255,99,132,1)',
					            backgroundColor: 'rgba(255, 99, 132, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis1Vib
					          },
					          {
					            label: "Axis 2",
					            borderColor: 'rgba(54, 162, 235, 1)',
					            backgroundColor: 'rgba(54, 162, 235, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis2Vib
					          },
					          {
					            label: "Axis 3",
					            borderColor: 'rgba(255, 206, 86, 1)',
					            backgroundColor: 'rgba(255, 206, 86, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis3Vib
							  },
							  {
								label: "Axis 4",
								borderColor: 'rgba(75, 192, 192, 1)',
					            backgroundColor: 'rgba(75, 192, 192, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axis4Vib
								}
					        ]
					      };

				    var  options3 = {
					    responsive: true,
					    maintainAspectRatio: false,
					    legend: {
				            display: true,
				            position : 'right',
				            labels: {
				            	fontSize: 10
				            }
				        },
						tooltips: {
							mode: 'index',
							intersect: false,
						},
						hover: {
							mode: 'nearest',
							intersect: true
						},
						crosshairs: {
		                    color: 'grey',
		                    lineWidth: 1
		                  },
				        scales: {
				            xAxes: [{
				            	type: 'time',
				            	 time: {
				            		 unit: unitChart1,
					                    format: "YYYY-MM-DD hh:mm",
					                    unitStepSize: unitStepSizeChart1,
					                    displayFormats: {
					                    	'minute': 'hh:mm',
					                    	'hour': 'hh:mm'
				                    }
					             },
				            	 ticks: {
				            	        autoSkip: true,
				            	        maxTicksLimit: 20
				            	    },
				            	    scaleLabel: {
					                    display: true,
					                    labelString: 'Time',
					                    fontSize: 12,
					                    fontColor: "black"
					                },
					                gridLines: {
					                    display:false
					                }
					            }],
				            yAxes: [
				            	{
					            	horizontalAlign: "left",
					                verticalAlign: "center",
					                scaleLabel: {
					                    display: true,
					                    labelString: 'Vibration (%)',
					                    fontSize: 12,
					                },
					                ticks: {
					                    /*
										 * max: 20, min: 0, stepSize: 5
										 */
					                	scaleOverride : true,
					                    scaleSteps : 10,
					                    scaleStepWidth : 50,
					                    min: 0 
					                },
					                gridLines: {
					                    display:false
					                }
				            }]
				        }
				    }
				

				      var ctx1 = $("#axisload");
					  var ctx2 = $("#axistemperature");
					  var ctx3 = $("#axisvibration");
				    		
					  if(window.chart1 != undefined)
					      window.chart1.destroy();
						  window.chart1 = new Chart(ctx1, {
						    type: "line",
						    data: data1,
						    options: options1
					  });
						  
						  
						  if(window.chart2 != undefined)
						      window.chart2.destroy();
							  window.chart2 = new Chart(ctx2, {
							    type: "line",
							    data: data2,
							    options: options2
						  });
							  
						  if(window.chart3 != undefined)
						      window.chart3.destroy();
							  window.chart3 = new Chart(ctx3, {
							    type: "line",
							    data: data3,
							    options: options3
						  });

					}
					var dLen = data.length;
					
					if (dLen == 0){
						 $("#dataStatus").text("No data Found for Time Range");

						if(window.chart1 != undefined)
  					      window.chart1.destroy();
					}
				    
				},
				error: function(data) {
					console.log(data);
				} 
		    });
		   
		  
	  });
	  
}
