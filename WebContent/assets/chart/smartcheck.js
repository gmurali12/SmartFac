

 getAssetDetails();
 
 document.getElementById("assetForm").style.display = 'none';
 document.getElementById("assetName").style.display='none';
 document.getElementById("assetName").style.display = 'none';
 document.getElementById("assetDisConnectedImg").style.display = "none";
 document.getElementById("assetConnectedImg").style.display = "none";


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
	 		  
	 		  /* $('#loadingLoad,#loadingTemp,#loadingVib').show(); */
	 		  
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

			if(response.name === $('#assetName').val()){				

				document.getElementById("selectAssetName").className = "btn btn-info";
				document.getElementById("selectAssetName").innerHTML = $('#assetName').val();
				document.getElementById("dateButton").style.display = "block";
				document.getElementById("dateTime").style.display = "block";
				document.getElementById("selectAssetName").style.display = "block";
				if(response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'true'){
					document.getElementById("dateButton").className = "btn btn-success";
					document.getElementById("assetConnectedImg").style.display = "block";
					document.getElementById("assetDisConnectedImg").style.display = "none";
				} else{
					document.getElementById("dateButton").className = "btn btn-danger";
					document.getElementById("assetDisConnectedImg").style.display = "block";
					document.getElementById("assetConnectedImg").style.display = "none";
				}

				if(response.aspects[0].variables[1].name === 'lastUpdated' && response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'true'){
					//document.getElementById("dateTime").innerHTML = response.aspects[0].variables[1].value;
					document.getElementById("dateTime").innerHTML = 'Since '+moment(response.aspects[0].variables[1].value).utcOffset("+00:00").format("MMM-DD-YYYY A");
				}else{
					document.getElementById("dateTime").innerHTML = 'Since '+moment(response.aspects[0].variables[1].value).utcOffset("+00:00").format("MMM-DD-YYYY A");
				}
			}else{
				document.getElementById("selectAssetName").style.display = "none";
				document.getElementById("dateButton").style.display = "none";
				document.getElementById("dateTime").style.display = "none";
			}

			$('#myModal').modal('hide');

			smartCheckChart(response.assetId,fDt,tDt);

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
					
				document.getElementById("errorMsg").style.display = 'none';
				document.getElementById("assetForm").style.display = 'block';
				document.getElementById("assetName").style.display='block';
				
				var selectName = document.createElement('option');
				var  selectHTML = "<option value='" + response.name + "'>" + response.name + "</option>";				
				
				selectName.innerHTML = selectHTML;
				document.getElementById("assetName").add(selectName);				
				}
			
			},
			error:function(error){
				
				document.getElementById("errorMsg").style.display = 'block';
			    document.getElementById("assetForm").style.display = 'none';
			    document.getElementById("assetName").style.display='none';
			    document.getElementById("errorMsg").innerHTML = error.responseText;
			}
	  });
}



function smartCheckChart(assetId, fdt,tdt){
	
	
//	console.log(assetId, fdt,tdt)
//	var DateTime1 = moment(fdt);
//	fromdt = DateTime1.format('DD-MM-YY HH:mm');
//	var DateTime2 = moment(tdt);
//	todt = DateTime2.format('DD-MM-YY HH:mm');
	
	document.getElementById("ftdt").value = fdt + ' - ' + tdt;
	
	$('#loadingLoad,#loadingTemp,#loadingVib').show();
		
	  $(function(){
		  $.ajax({
				url : "getSmartCheckDetails",
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

					console.log(data)
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
					
						drawAxisLoad(data);
						drawAxisTemp(data);
						drawAxisVib(data);						
						drawAxisTable(data);
						  
					}
				},
				error: function(data) {
					console.log(data, "ERROR");
				} 
		    });
	  });
}

function drawAxisLoad(data){
	
	var smartChartData = data[0];
	var axisLoad = smartChartData.filter(obj => Object.keys(obj).includes("LoadAxis1","LoadAxis2","LoadAxis3","LoadAxis4"));

	var axis1Load = [];
	var axis2Load=[];
	var axis3Load=[];
	var axis4Load=[];
	var loadTime = [];
	

	if(axisLoad == ""){	
		document.getElementById('showAxisLoad').innerHTML= "No data Found";
		
	}else{
	    
		document.getElementById('showAxisLoad').style.display = "none";
	
    for(var key in axisLoad){				
	
    	axis1Load.push(axisLoad[key].LoadAxis1.minvalue,axisLoad[key].LoadAxis1.maxvalue,axisLoad[key].LoadAxis1.firstvalue,axisLoad[key].LoadAxis1.lastvalue);
    	axis2Load.push(axisLoad[key].LoadAxis2.minvalue,axisLoad[key].LoadAxis2.maxvalue,axisLoad[key].LoadAxis2.firstvalue,axisLoad[key].LoadAxis2.lastvalue);
    	axis3Load.push(axisLoad[key].LoadAxis3.minvalue,axisLoad[key].LoadAxis3.maxvalue,axisLoad[key].LoadAxis3.firstvalue,axisLoad[key].LoadAxis3.lastvalue);
    	axis4Load.push(axisLoad[key].LoadAxis4.minvalue,axisLoad[key].LoadAxis4.maxvalue,axisLoad[key].LoadAxis4.firstvalue,axisLoad[key].LoadAxis4.lastvalue);
			
    	loadTime.push(axisLoad[key].LoadAxis1.firsttime,axisLoad[key].LoadAxis1.mintime,axisLoad[key].LoadAxis1.maxtime,axisLoad[key].LoadAxis1.lasttime);

    }
    
    console.log(loadTime, "loadTime");
    
    var minTime = moment(_.min(loadTime));
	var maxTime = moment(_.max(loadTime));
	

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
	
									
	var axisLoadData = {
		labels: loadTime,
			datasets: 
			[					
				 {
					 label: "Axis 1",
					 borderColor: 'rgb(78,176,153)',backgroundColor: 'rgb(78,176,153)',
					 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
					 data: axis1Load
		         },
		         {
		        	 label: "Axis 2",
		        	 borderColor: 'rgb(195, 184, 78)',backgroundColor: 'rgb(195, 184, 78)',
		        	 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
		        	 data: axis2Load
		          },
		          {
		        	  label: "Axis 3",
		        	  borderColor: 'rgb(178, 75, 9)',backgroundColor: 'rgb(178, 75, 9)',
		        	  fill: false, pointRadius: 0,lineTension: 0,radius: 5,
		        	  data: axis3Load
				   },
				   {
					   label: "Axis 4",
					   borderColor: 'rgb(162, 143, 188)',backgroundColor: 'rgb(162, 143, 188)',
					   pointRadius: 0,fill: false,lineTension: 0,radius: 5,
					   data: axis4Load
					}
			  ]
	};
	 					 
				
	var  axisLoadOptions = {
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
	                    labelString: 'Load (%)',
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

	var axisLoadCtx = $("#axisload");

	if(window.chart1 != undefined)
		window.chart1.destroy();
	  	window.chart1 = new Chart(axisLoadCtx, {
	  		type: "line",
	  		data: axisLoadData,
	    	options: axisLoadOptions
	  	});
	}
}

function drawAxisTemp(data){
	
	var smartChartData = data[0];
	var axisTemp = smartChartData.filter(obj => Object.keys(obj).includes("TempAxis1","TempAxis2","TempAxis3","TempAxis4"));
	var axis1Temp = [];
	var axis2Temp=[];
	var axis3Temp=[];
	var axis4Temp=[];
	var tempTime = [];
	
	
	if(axisTemp == ""){		
		document.getElementById('showAxisTemp').innerHTML= "No data Found";
		
	}else{
	    		
		document.getElementById('showAxisTemp').style.display = "none";

	
	
    for(var key in axisTemp){				
	
    	axis1Temp.push(axisTemp[key].TempAxis1.minvalue,axisTemp[key].TempAxis1.maxvalue,axisTemp[key].TempAxis1.firstvalue,axisTemp[key].TempAxis1.lastvalue);
    	axis2Temp.push(axisTemp[key].TempAxis2.minvalue,axisTemp[key].TempAxis2.maxvalue,axisTemp[key].TempAxis2.firstvalue,axisTemp[key].TempAxis2.lastvalue);
    	axis3Temp.push(axisTemp[key].TempAxis3.minvalue,axisTemp[key].TempAxis3.maxvalue,axisTemp[key].TempAxis3.firstvalue,axisTemp[key].TempAxis3.lastvalue);
    	axis4Temp.push(axisTemp[key].TempAxis4.minvalue,axisTemp[key].TempAxis4.maxvalue,axisTemp[key].TempAxis4.firstvalue,axisTemp[key].TempAxis4.lastvalue);
			
    	tempTime.push(axisTemp[key].TempAxis1.firsttime,axisTemp[key].TempAxis1.mintime,axisTemp[key].TempAxis1.maxtime,axisTemp[key].TempAxis1.lasttime);

    }

	var minTime = moment(_.min(tempTime));
	var maxTime = moment(_.max(tempTime));

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
	
									
	var axisTempData = {
		labels: tempTime,
			datasets: 
			[					
				 {
					 label: "Axis 1",
					 borderColor: 'rgb(78,176,153)',backgroundColor: 'rgb(78,176,153)',
					 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
					 data: axis1Temp
		         },
		         {
		        	 label: "Axis 2",
		        	 borderColor: 'rgb(195, 184, 78)',backgroundColor: 'rgb(195, 184, 78)',
		        	 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
		        	 data: axis2Temp
		          },
		          {
		        	  label: "Axis 3",
		        	  borderColor: 'rgb(178, 75, 9)',backgroundColor: 'rgb(178, 75, 9)',
		        	  fill: false, pointRadius: 0,lineTension: 0,radius: 5,
		        	  data: axis3Temp
				   },
				   {
					   label: "Axis 4",
					   borderColor: 'rgb(162, 143, 188)',backgroundColor: 'rgb(162, 143, 188)',
					   pointRadius: 0,fill: false,lineTension: 0,radius: 5,
					   data: axis4Temp
					}
			  ]
	};
	 					 
				
	var  axisTempOptions = {
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

	var axisTempCtx = $("#axistemperature");

	if(window.chart2 != undefined)
		window.chart2.destroy();
	  	window.chart2 = new Chart(axisTempCtx, {
	  		type: "line",
	  		data: axisTempData,
	    	options: axisTempOptions
	  	});
	}
}

function drawAxisVib(data){
	var smartChartData = data[0];
	var axisVib = smartChartData.filter(obj => Object.keys(obj).includes("VibAxis1","VibAxis2","VibAxis3","VibAxis4"));
	var axis1Vib = [];
	var axis2Vib=[];
	var axis3Vib=[];
	var axis4Vib=[];
	var vibTime = [];
	
	if(axisVib == ""){

		document.getElementById('showAxisVib').innerHTML= "No data Found";
	}else{

		document.getElementById('showAxisVib').style.display= "none";

		for(var key in axisVib){				

			axis1Vib.push(axisVib[key].VibAxis1.minvalue,axisVib[key].VibAxis1.maxvalue,axisVib[key].VibAxis1.firstvalue,axisVib[key].VibAxis1.lastvalue);
			axis2Vib.push(axisVib[key].VibAxis2.minvalue,axisVib[key].VibAxis2.maxvalue,axisVib[key].VibAxis2.firstvalue,axisVib[key].VibAxis2.lastvalue);
			axis3Vib.push(axisVib[key].VibAxis3.minvalue,axisVib[key].VibAxis3.maxvalue,axisVib[key].VibAxis3.firstvalue,axisVib[key].VibAxis3.lastvalue);
			axis4Vib.push(axisVib[key].VibAxis4.minvalue,axisVib[key].VibAxis4.maxvalue,axisVib[key].VibAxis4.firstvalue,axisVib[key].VibAxis4.lastvalue);

			vibTime.push(axisVib[key].VibAxis1.firsttime,axisVib[key].VibAxis1.mintime,axisVib[key].VibAxis1.maxtime,axisVib[key].VibAxis1.lasttime);

		}

		var minTime = moment(_.min(vibTime));
		var maxTime = moment(_.max(vibTime));
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


		var axisVibData = {
				labels: vibTime,
				datasets: 
					[					
						{
							label: "Axis 1",
							borderColor: 'rgb(78,176,153)',backgroundColor: 'rgb(78,176,153)',
							fill: false,pointRadius: 0,lineTension: 0,radius: 5,
							data: axis1Vib
						},
						{
							label: "Axis 2",
							borderColor: 'rgb(195, 184, 78)',backgroundColor: 'rgb(195, 184, 78)',
							fill: false,pointRadius: 0,lineTension: 0,radius: 5,
							data: axis2Vib
						},
						{
							label: "Axis 3",
							borderColor: 'rgb(178, 75, 9)',backgroundColor: 'rgb(178, 75, 9)',
							fill: false, pointRadius: 0,lineTension: 0,radius: 5,
							data: axis3Vib
						},
						{
							label: "Axis 4",
							borderColor: 'rgb(162, 143, 188)',backgroundColor: 'rgb(162, 143, 188)',
							pointRadius: 0,fill: false,lineTension: 0,radius: 5,
							data: axis4Vib
						}
						]
		};


		var  axisVibOptions = {
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
							labelString: 'Vibration (%)',
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

		var axisVibCtx = $("#axisvibration");

		if(window.chart3 != undefined)
			window.chart3.destroy();
		window.chart3 = new Chart(axisVibCtx, {
			type: "line",
			data: axisVibData,
			options: axisVibOptions
		});
	}
}

function drawAxisTable(data){
	
	console.log(data,"axisTable")
	var smartTableData = data[1];
	var axisTable = smartTableData[0];


	
	if(axisTable == ""){
	 $('#myTable').empty()
     var newRow = $("<tr><td>no results found</td></tr>");
     $("#myTable").append(newRow);
	}
	//axis Load Table
	document.getElementById("lastReported").innerHTML = moment(axisTable._time).utcOffset("+00:00").format("DD-MM-YY HH:mm:ss");
	
	document.getElementById("ax1L").innerHTML = axisTable.LoadAxis1+"%";
	if(axisTable.LoadAxis1 > 100){
		$('#ax1st').attr('class','label label-danger'); $('#ax1st').text("NOT OK");
	} else {
		$('#ax1st').attr('class','label label-success'); $('#ax1st').text("OK");
	}
	
	document.getElementById("ax2L").innerHTML = axisTable.LoadAxis2+"%";
	if(axisTable.LoadAxis2 > 100){
		$('#ax2st').attr('class','label label-danger'); $('#ax2st').text("NOT OK");
	} else {
		$('#ax2st').attr('class','label label-success'); $('#ax2st').text("OK");
	}
	
	document.getElementById("ax3L").innerHTML = axisTable.LoadAxis3+"%";
	if(axisTable.LoadAxis3 > 100){
		$('#ax3st').attr('class','label label-danger'); $('#ax3st').text("NOT OK");
	} else {
		$('#ax3st').attr('class','label label-success'); $('#ax3st').text("OK");
	}
	
	document.getElementById("ax4L").innerHTML = axisTable.LoadAxis4+"%";
	if(axisTable.LoadAxis4 > 100){
		$('#ax4st').attr('class','label label-danger'); $('#ax4st').text("NOT OK");
	} else {
		$('#ax4st').attr('class','label label-success'); $('#ax4st').text("OK");
	}
	
	//axis Temp Table
	document.getElementById("ax1T").innerHTML = axisTable.TempAxis1+"%";
	if(axisTable.TempAxis1 > 100){
		$('#ax1Tst').attr('class','label label-danger'); $('#ax1Tst').text("NOT OK");
	} else {
		$('#ax1Tst').attr('class','label label-success'); $('#ax1Tst').text("OK");
	}
	
	document.getElementById("ax2T").innerHTML = axisTable.TempAxis2+"%";
	if(axisTable.TempAxis2 > 100){
		$('#ax2Tst').attr('class','label label-danger'); $('#ax2Tst').text("NOT OK");
	} else {
		$('#ax2Tst').attr('class','label label-success'); $('#ax2Tst').text("OK");
	}
	
	document.getElementById("ax3T").innerHTML = axisTable.TempAxis3+"%";
	if(axisTable.TempAxis3 > 100){
		$('#ax3Tst').attr('class','label label-danger'); $('#ax3Tst').text("NOT OK");
	} else {
		$('#ax3Tst').attr('class','label label-success'); $('#ax3Tst').text("OK");
	}
	
	document.getElementById("ax4T").innerHTML = axisTable.TempAxis4+"%";
	if(axisTable.TempAxis4 > 100){
		$('#ax4Tst').attr('class','label label-danger'); $('#ax4Tst').text("NOT OK");
	} else {
		$('#ax4Tst').attr('class','label label-success'); $('#ax4Tst').text("OK");
	}
	
	//axis Vib Table
	document.getElementById("ax1V").innerHTML = axisTable.VibAxis1+"%";
	if(axisTable.VibAxis1 > 100){
		$('#ax1Vst').attr('class','label label-danger'); $('#ax1Vst').text("NOT OK");
	} else {
		$('#ax1Vst').attr('class','label label-success'); $('#ax1Vst').text("OK");
	}
	
	document.getElementById("ax2V").innerHTML = axisTable.VibAxis2+"%";
	if(axisTable.VibAxis2 > 100){
		$('#ax2Vst').attr('class','label label-danger'); $('#ax2Vst').text("NOT OK");
	} else {
		$('#ax2Vst').attr('class','label label-success'); $('#ax2Vst').text("OK");
	}
	
	document.getElementById("ax3V").innerHTML = axisTable.VibAxis3+"%";
	if(axisTable.VibAxis3 > 100){
		$('#ax3Vst').attr('class','label label-danger'); $('#ax3Vst').text("NOT OK");
	} else {
		$('#ax3Vst').attr('class','label label-success'); $('#ax3Vst').text("OK");
	}
	
	document.getElementById("ax4V").innerHTML = axisTable.VibAxis4+"%";
	if(axisTable.VibAxis4.lastvalue > 100){
		$('#ax4Vst').attr('class','label label-danger'); $('#ax4Vst').text("NOT OK");
	} else {
		$('#ax4Vst').attr('class','label label-success'); $('#ax4Vst').text("OK");
	}
}