

 getAssetDetails();

$(document).ready(function() {
	  $('#myModal').modal('show');
	  $('[data-toggle="tooltip"]').tooltip({title:'Click here to change asset details!', delay :500,placement: "bottom"}); 
	});


function changeAssetName(){
	 $('#myModal').modal('show');
}




function changeAssetDetails(assetName){


	var e = document.getElementById("assetName");
	var strUser = e.options[e.selectedIndex].value;

	if(strUser==0){

		document.getElementById("validation").style.display = "block";
		document.getElementById("validation").innerHTML = "Choose Asset Name";	

	}else{

		document.getElementById("validation").style.display = "none";	 

		document.getElementById("dateButton").style.display = "none";	
		document.getElementById("selectAssetName").style.display = "none";

		var fDt = moment().startOf('day').format('DD-MM-YYYY HH:mm');
		var tDt = moment().endOf('day').format('DD-MM-YYYY HH:mm');

		document.getElementById("ftdt").value = fDt + ' - ' + tDt;



		//Date time picker
		var assetId;

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
				format: 'DD-MM-YY',
				cancelLabel: 'Clear'
			}
		}, function(start, end, label) {

			/* $('#loadingHyPress,#loadingTemp,#loadingVib').show(); */

			fDt = start.format('DD-MM-YYYY HH:mm');
			tDt = end.format('DD-MM-YYYY HH:mm');		 		  
			smartCheckChart(assetId,fDt,tDt);


		});

		$('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {
			$(this).val(picker.startDate.format('DD-MM-YYYY') + ' - ' + picker.endDate.format('DD-MM-YYYY'));
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

				assetId = response.assetId;
				
				console.log(response,"responseresponse")

				if(response.name === $('#assetName').val()){				

					document.getElementById("selectAssetName").className = "btn btn-info";
					document.getElementById("selectAssetName").innerHTML = $('#assetName').val();
					document.getElementById("dateButton").style.display = "block";
					document.getElementById("dateTime").style.display = "block";
					document.getElementById("selectAssetName").style.display = "block";
					if(response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'false'){
						document.getElementById("dateButton").className = "label label-danger";
					} else{
						document.getElementById("dateButton").className = "label label-success";
					}

					if(response.aspects[0].variables[1].name === 'lastUpdated'){
						document.getElementById("dateTime").innerHTML = response.aspects[0].variables[1].value;
					}
				}else{
					document.getElementById("selectAssetName").style.display = "none";
					document.getElementById("dateButton").style.display = "none";
					document.getElementById("dateTime").style.display = "none";
				}

				$('#myModal').modal('hide');
				

				smartCheckChart(response.assetId,fDt,tDt);

			},
			error : function(error){
				
				document.getElementById("errorMsg").style.display = 'block';
			    document.getElementById("assetForm").style.display = 'none';
			    document.getElementById("assetName").style.display='none';
			    document.getElementById("errorMsg").innerHTML = error.responseText;
				
			}
		});
	}
}


function getAssetDetails(fDt,tDt){
	 $.ajax({
		  url : "getAssetDetails",
			method : "GET",		
			cache: false,
			datatype : "application/json",
			contentType: "application/json;	 charset=utf-8",
			success : function(response){

				if(response){
					
					console.log(response,"response")
				var selectName = document.createElement('option');
				var  selectHTML = "<option value='" + response.name + "'>" + response.name + "</option>";				
				
				selectName.innerHTML = selectHTML;
				document.getElementById("assetName").add(selectName);
				}
			
			},
			error:function(error){
				console.log(error.responseText,"AssetDetailsError")
				document.getElementById("errorMsg").style.display = 'block';
			    document.getElementById("assetForm").style.display = 'none';
			    document.getElementById("assetName").style.display='none';
			    document.getElementById("errorMsg").innerHTML = error.responseText;
			}
	  });
}



 function changeName(assetName){
	
	 $.ajax({
		  url : "getAssetDetails",
			method : "GET",		
			cache: false,
			datatype : "application/json",
			contentType: "application/json;	 charset=utf-8",
			success : function(response){
				
			if(response.name === assetName){
				document.getElementById("dateButton").style.display = "block";
				document.getElementById("dateTime").style.display = "block";
				if(response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'false'){
					document.getElementById("dateButton").className = "label label-danger";
				} else{
					document.getElementById("dateButton").className = "label label-success";
				}
				
				if(response.aspects[0].variables[1].name === 'lastUpdated'){
				document.getElementById("dateTime").innerHTML = response.aspects[0].variables[1].value;
				}
			}else{
				document.getElementById("dateButton").style.display = "none";
				document.getElementById("dateTime").style.display = "none";
			}

		}
	 });
	
}


function getAssetDetails(fDt,tDt){
	 $.ajax({
		  url : "getAssetDetails",
			method : "GET",		
			cache: false,
			datatype : "application/json",
			contentType: "application/json;	 charset=utf-8",
			success : function(response){

				var selectName = document.createElement('option');
				var  selectHTML = "<option value='" + response.name + "'>" + response.name + "</option>";				
				
				selectName.innerHTML = selectHTML;
				document.getElementById("assetName").add(selectName);				
			},
			error:function(error){
				console.log(error.responseText,"AssetDetailsError")
				document.getElementById("errorMsg").style.display = 'block';
			    document.getElementById("assetForm").style.display = 'none';
			    document.getElementById("assetName").style.display='none';
			    document.getElementById("errorMsg").innerHTML = error.responseText;
			}
	  });
}



function smartCheckChart(assetId, fdt,tdt){
	
	console.log(assetId, fdt,tdt)
	
	var DateTime1 = moment(fdt);
	fromdt = DateTime1.format('DD-MM-YY HH:mm');
	var DateTime2 = moment(tdt);
	todt = DateTime2.format('DD-MM-YY HH:mm');
	
	document.getElementById("ftdt").value = fdt + ' - ' + tdt;
	
	$('#loadingHyPress,#loadingTemp,#loadingVib').show();
		
	  $(function(){
		  $.ajax({
				url : "getSmartElectronicsDetails",
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

					$('#loadingHyPress,#loadingTemp,#loadingVib').hide();
										
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
					
						drawHydraulic(data);
						drawMotorTemp(data);
						drawPneumatic(data);
						
						drawElectronicsTable(data);
						  
					}
				},
				error: function(data) {
					console.log(data, "ERROR");
				} 
		    });
	  });
}

function drawHydraulic(data){
	
	var smartData = data[0];
	var hpData= smartData.filter(obj => Object.keys(obj).includes("Hydraulic_Pressure_Max","Hydraulic_Pressure_Min","Hydraulic_Pressure_Actual"));

	var hpMax = [];	var hpAct = [];	var hpMin = [];	
	var hpTime = [];

    for(var key in hpData){				
    	hpMax.push(hpData[key].Hydraulic_Pressure_Max.firstvalue,hpData[key].Hydraulic_Pressure_Max.minvalue,
    			   hpData[key].Hydraulic_Pressure_Max.maxvalue,hpData[key].Hydraulic_Pressure_Max.lastvalue);
    	hpAct.push(hpData[key].Hydraulic_Pressure_Actual.firstvalue,hpData[key].Hydraulic_Pressure_Actual.minvalue,
    			   hpData[key].Hydraulic_Pressure_Actual.maxvalue,hpData[key].Hydraulic_Pressure_Actual.lastvalue);
    	hpMin.push(hpData[key].Hydraulic_Pressure_Min.firstvalue,hpData[key].Hydraulic_Pressure_Min.minvalue,
    			   hpData[key].Hydraulic_Pressure_Min.maxvalue,hpData[key].Hydraulic_Pressure_Min.lastvalue);
    	
    	hpTime.push(hpData[key].Hydraulic_Pressure_Min.firsttime,hpData[key].Hydraulic_Pressure_Min.mintime,
				hpData[key].Hydraulic_Pressure_Min.maxtime,hpData[key].Hydraulic_Pressure_Min.lasttime);
    	
    	
    }

    var minTime = moment(_.min(hpTime));
	var maxTime = moment(_.max(hpTime));
	

	var duration = moment.duration(maxTime.diff(minTime));
	var asMinutes = duration.asMinutes();
	
	var duration1 = moment.duration(maxTime.diff(minTime));
	var asHours = duration1.asHours();

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
	
									
	var hpData = {
		labels: hpTime,
			datasets: 
			[					
				 {
					 label: "HP Max",
					 borderColor: 'rgb(158, 16, 48)',backgroundColor: 'rgb(158, 16, 48)',
					 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
					 data: hpMax
		         },
		         {
		        	 label: "HP Actual",
		        	 borderColor: 'rgb(10, 110, 109)',backgroundColor: 'rgb(0, 110, 109)',
		        	 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
		        	 data: hpAct
		          },
		          {
		        	  label: "HP Min",
		        	  borderColor: 'rgb(72, 81, 103)',backgroundColor: 'rgb(72, 81, 103)',
		        	  fill: false, pointRadius: 0,lineTension: 0,radius: 5,
		        	  data: hpMin
				   }
			  ]
	};
	 					 
				
	var  hpOptions = {
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
            
			yAxes: [{
	            	horizontalAlign: "left",
	                verticalAlign: "center",
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Pressure (Pa)',
	                    fontSize: 12,
	                },
	                ticks: {
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

	var hpCtx = $("#hydrPress");

	if(window.chart1 != undefined)
		window.chart1.destroy();
	  	window.chart1 = new Chart(hpCtx, {
	  		type: "line",
	  		data: hpData,
	    	options: hpOptions
	  	});
	
}

function drawMotorTemp(data){
	
	var smartData = data[0];
	var motorData= smartData.filter(obj => Object.keys(obj).includes("Motor_Temperature_Axis_1","Motor_Temperature_Axis_2","Motor_Temperature_Axis_3","Motor_Temperature_Axis_4"));

	var motorTemp1 = []; var motorTemp2 = [];  var motorTemp3 = []; var motorTemp4 = [];
	var motorTime = [];

    for(var key in motorData){				
    	motorTemp1.push(motorData[key].Motor_Temperature_Axis_1.firstvalue,motorData[key].Motor_Temperature_Axis_1.minvalue,
    			   motorData[key].Motor_Temperature_Axis_1.maxvalue,motorData[key].Motor_Temperature_Axis_1.lastvalue);
    	motorTemp2.push(motorData[key].Motor_Temperature_Axis_2.firstvalue,motorData[key].Motor_Temperature_Axis_2.minvalue,
    			   motorData[key].Motor_Temperature_Axis_2.maxvalue,motorData[key].Motor_Temperature_Axis_2.lastvalue);
    	motorTemp3.push(motorData[key].Motor_Temperature_Axis_3.firstvalue,motorData[key].Motor_Temperature_Axis_3.minvalue,
    			   motorData[key].Motor_Temperature_Axis_3.maxvalue,motorData[key].Motor_Temperature_Axis_3.lastvalue);
    	motorTemp4.push(motorData[key].Motor_Temperature_Axis_4.firstvalue,motorData[key].Motor_Temperature_Axis_4.minvalue,
 			   motorData[key].Motor_Temperature_Axis_4.maxvalue,motorData[key].Motor_Temperature_Axis_4.lastvalue);
    	
    	motorTime.push(motorData[key].Motor_Temperature_Axis_1.firsttime,motorData[key].Motor_Temperature_Axis_1.mintime,
    			motorData[key].Motor_Temperature_Axis_1.maxtime,motorData[key].Motor_Temperature_Axis_1.lasttime);
    	
    	
    }

    var minTime = moment(_.min(motorTime));
	var maxTime = moment(_.max(motorTime));
	

	var duration = moment.duration(maxTime.diff(minTime));
	var asMinutes = duration.asMinutes();
	
	var duration1 = moment.duration(maxTime.diff(minTime));
	var asHours = duration1.asHours();

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
	
									
	var motorAxisData = {
		labels: motorTime,
			datasets: 
			[					
				 {
					 label: "Motor 1 Temp",
			         borderColor: 'rgb(136, 176, 75)',backgroundColor: 'rgb(136, 176, 75)',
			         fill: false,lineTension: 0,pointRadius: 0,radius: 5,
					 data: motorTemp1
		         },
		         {
		        	 label: "Motor 2 Temp",
			         backgroundColor: "rgb(158, 16, 48)",borderColor: "rgb(158, 16, 48)",
		        	 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
		        	 data: motorTemp2
		          },
		          {
		        	  label: "Motor 3 Temp",
			          borderColor: "rgb(0, 110, 109)",backgroundColor: "rgb(0, 110, 109)",
		        	  fill: false, pointRadius: 0,lineTension: 0,radius: 5,
		        	  data: motorTemp3
				   },
			       {
					   label: "Motor 4 Temp",
			           borderColor: 'rgb(42, 75, 124)',backgroundColor: 'rgb(42, 75, 124)',
			           fill: false, pointRadius: 0,lineTension: 0,radius: 5,
			           data: motorTemp4
			       }
			  ]
	};
	 					 
				
	var  motorOptions = {
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
            
			yAxes: [{
	            	horizontalAlign: "left",
	                verticalAlign: "center",
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Temperature (\xB0 C)',
	                    fontSize: 12,
	                },
	                ticks: {
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

	var mototrCtx = $("#motorTemp");

	if(window.chart2 != undefined)
		window.chart2.destroy();
	  	window.chart2 = new Chart(mototrCtx, {
	  		type: "line",
	  		data: motorAxisData,
	    	options: motorOptions
	  	});
	
}

function drawPneumatic(data){
	
	var smartData = data[0];
	var ppData= smartData.filter(obj => Object.keys(obj).includes("Pneumatic_Pressure_Max","Pneumatic_Pressure_Min","Pneumatic_Pressure_Actual"));

	var ppMax = [];	var ppAct = [];	var ppMin = [];	
	var ppTime = [];

    for(var key in ppData){				
    	ppMax.push(ppData[key].Pneumatic_Pressure_Max.firstvalue,ppData[key].Pneumatic_Pressure_Max.minvalue,
    			ppData[key].Pneumatic_Pressure_Max.maxvalue,ppData[key].Pneumatic_Pressure_Max.lastvalue);
    	ppAct.push(ppData[key].Pneumatic_Pressure_Actual.firstvalue,ppData[key].Pneumatic_Pressure_Actual.minvalue,
    			ppData[key].Pneumatic_Pressure_Actual.maxvalue,ppData[key].Pneumatic_Pressure_Actual.lastvalue);
    	ppMin.push(ppData[key].Hydraulic_Pressure_Min.firstvalue,ppData[key].Hydraulic_Pressure_Min.minvalue,
    			ppData[key].Pneumatic_Pressure_Min.maxvalue,ppData[key].Pneumatic_Pressure_Min.lastvalue);
    	
    	ppTime.push(ppData[key].Hydraulic_Pressure_Min.firsttime,ppData[key].Hydraulic_Pressure_Min.mintime,
    			ppData[key].Hydraulic_Pressure_Min.maxtime,ppData[key].Hydraulic_Pressure_Min.lasttime);
    	
    	
    }

    var minTime = moment(_.min(ppTime));
	var maxTime = moment(_.max(ppTime));
	

	var duration = moment.duration(maxTime.diff(minTime));
	var asMinutes = duration.asMinutes();
	
	var duration1 = moment.duration(maxTime.diff(minTime));
	var asHours = duration1.asHours();

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
	
									
	var ppData = {
		labels: ppTime,
			datasets: 
			[					
				 {
					 label: "P.P Max",
					 backgroundColor: "rgb(158, 16, 48)",borderColor: "rgb(158, 16, 48)",
					 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
					 data: ppMax
		         },
		         {
		        	 label: "P.P Actual",
		        	 borderColor: "rgb(0, 110, 109)",backgroundColor: "rgb(0, 110, 109)",
		        	 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
		        	 data: ppAct
		          },
		          {
		        	  label: "P.P Min",
		        	  borderColor: 'rgb(72, 81, 103)',backgroundColor: 'rgb(72, 81, 103)',
		        	  fill: false, pointRadius: 0,lineTension: 0,radius: 5,
		        	  data: ppMin
				   }
			  ]
	};
	 					 
				
	var  ppOptions = {
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
            
			yAxes: [{
	            	horizontalAlign: "left",
	                verticalAlign: "center",
	                scaleLabel: {
	                    display: true,
	                    labelString: 'Pressure (Pa)',
	                    fontSize: 12,
	                },
	                ticks: {
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

	var ppCtx = $("#pneuPress");

	if(window.chart3 != undefined)
		window.chart3.destroy();
	  	window.chart3 = new Chart(ppCtx, {
	  		type: "line",
	  		data: ppData,
	    	options: ppOptions
	  	});
	  	
}

function drawElectronicsTable(data){
	
	var tableData = data[1][0];
	
	console.log(data,"data")
	console.log(tableData,"tableData")
   	
	document.getElementById("lastReported").innerHTML = moment(tableData._time).utcOffset("+00:00").format("DD-MM-YY HH:mm:ss");
	if(tableData.Hydraulic_MCB === true){
		$('#hMPCBStatus').attr('class','label label-success'); $('#hMPCBStatus').text("ON");
	} else {
		$('#hMPCBStatus').attr('class','label label-danger'); $('#hMPCBStatus').text("OFF");
	}
	
	if(tableData.Lubrication_MCB === true){
		$('#lMPCBStatus').attr('class','label label-success'); $('#lMPCBStatus').text("ON");
	} else {
		$('#lMPCBStatus').attr('class','label label-danger'); $('#lMPCBStatus').text("OFF");
	}
	
	if(tableData.Blower_Fan_MCB === true){
		$('#bfMPCBStatus').attr('class','label label-success'); $('#bfMPCBStatus').text("ON");
	} else {
		$('#bfMPCBStatus').attr('class','label label-danger'); $('#bfMPCBStatus').text("OFF");
	}
	
	if(tableData.Air_Conditioner_MCB === true){
		$('#acMPCBStatus').attr('class','label label-success'); $('#acMPCBStatus').text("ON");
	} else {
		$('#acMPCBStatus').attr('class','label label-danger'); $('#acMPCBStatus').text("OFF");
	}
	
	if(tableData.Lubrication_Level === true){
		$('#lLevelStatus').attr('class','label label-success'); $('#lLevelStatus').text("OK");
	} else {
		$('#lLevelStatus').attr('class','label label-danger'); $('#lLevelStatus').text("NOT OK");
	}
	
	if(tableData.Hydraulic_Level === true){
		$('#hLevelStatus').attr('class','label label-success'); $('#hLevelStatus').text("OK");
	} else {
		$('#hLevelStatus').attr('class','label label-danger'); $('#hLevelStatus').text("NOT OK");
	}
	
	if(tableData.Lubrication_Pressure === true){
		$('#lPressureStatus').attr('class','label label-success'); $('#lPressureStatus').text("OK");
	} else {
		$('#lPressureStatus').attr('class','label label-danger'); $('#lPressureStatus').text("NOT OK");
	}
	
	if(tableData.Air_Pressure === true){
		$('#airPressureStatus').attr('class','label label-success'); $('#airPressureStatus').text("OK");
	} else {
		$('#airPressureStatus').attr('class','label label-danger'); $('#airPressureStatus').text("NOT OK");
	}
	
	if(tableData.Hydraulic_Pressure === true){
		$('#hPressureStatus').attr('class','label label-success'); $('#hPressureStatus').text("OK");
	} else {
		$('#hPressureStatus').attr('class','label label-danger'); $('#hPressureStatus').text("NOT OK");
	}
}