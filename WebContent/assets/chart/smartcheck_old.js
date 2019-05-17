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
		  
		  onloadData(fDt,tDt);

	  });
	  
	  $('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {
	      $(this).val(picker.startDate.format('DD-MM-YY HH:mm') + ' - ' + picker.endDate.format('DD-MM-YY HH:mm'));
	  });
	  
	  $('input[name="datetimes"]').on('cancel.daterangepicker', function(ev, picker) {
	      $(this).val('');
	  });
	});

function onloadData(fdt,tdt){
	
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
					
					var output = data.filter(obj => Object.keys(obj).includes("Axis1_Load","Axis2_Load","Axis3_Load","Axis4_Load"));
					
					var axisLoad1Var = []; var axisLoad2Var = []; var axisLoad3Var = []; var axisLoad4Var = []; var axisTemp1Var = []; var axisTemp2Var = [];  var axisTemp3Var = []; var axisTemp4Var = []; var axisVib1Var = []; var axisVib2Var = [];  var axisVib3Var = []; var axisVib4Var = [];

					for(var i = 0; i<output.length; i++) {
										
						axisLoad1Var.push(output[i].Axis1_Load); 
						axisLoad2Var.push(output[i].Axis2_Load); 
						axisLoad3Var.push(output[i].Axis3_Load); 
						axisLoad4Var.push(output[i].Axis4_Load);
						
						axisTemp1Var.push(output[i].Axis1_Temp); 
						axisTemp2Var.push(output[i].Axis2_Temp); 
						axisTemp3Var.push(output[i].Axis3_Temp); 
						axisTemp4Var.push(output[i].Axis4_Temp);
						
						axisVib1Var.push(output[i].Axis1_Vib);
						axisVib2Var.push(output[i].Axis2_Vib);
						axisVib3Var.push(output[i].Axis3_Vib);
						axisVib4Var.push(output[i].Axis4_Vib);
					}
 // Axis Load
					var axisLoad1Sum = _.sum(axisLoad1Var); var axisLoad2Sum = _.sum(axisLoad2Var); var axisLoad3Sum = _.sum(axisLoad3Var); var axisLoad4Sum = _.sum(axisLoad4Var);
					var axisLoad1Count = axisLoad1Var.length; var axisLoad2Count = axisLoad2Var.length; var axisLoad3Count = axisLoad3Var.length; var axisLoad4Count = axisLoad4Var.length;
					var axisLoad1Percent = _.divide(axisLoad1Sum, axisLoad1Count).toFixed(2); var axisLoad2Percent = _.divide(axisLoad2Sum, axisLoad2Count).toFixed(2); var axisLoad3Percent = _.divide(axisLoad3Sum, axisLoad3Count).toFixed(2); var axisLoad4Percent = _.divide(axisLoad4Sum, axisLoad4Count).toFixed(2);
					
					// document.getElementById("ax1LT").innerHTML = fromDT;
					document.getElementById("ax1L").innerHTML = axisLoad1Percent+" %"; document.getElementById("ax2L").innerHTML = axisLoad2Percent+" %"; document.getElementById("ax3L").innerHTML = axisLoad3Percent+" %"; document.getElementById("ax4L").innerHTML = axisLoad4Percent+" %";
					
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
					
					var axisTemp1Sum = _.sum(axisTemp1Var); var axisTemp2Sum = _.sum(axisTemp2Var); var axisTemp3Sum = _.sum(axisTemp3Var); var axisTemp4Sum = _.sum(axisTemp4Var);
					var axisTemp1Count = axisTemp1Var.length; var axisTemp2Count = axisTemp2Var.length; var axisTemp3Count = axisTemp3Var.length; var axisTemp4Count = axisTemp4Var.length;
					var axisTemp1Percent = _.divide(axisTemp1Sum, axisTemp1Count).toFixed(2); var axisTemp2Percent = _.divide(axisTemp2Sum, axisTemp2Count).toFixed(2); var axisTemp3Percent = _.divide(axisTemp3Sum, axisTemp3Count).toFixed(2); var axisTemp4Percent = _.divide(axisTemp4Sum, axisTemp4Count).toFixed(2);
					
					// document.getElementById("ax1TT").innerHTML = fromDT;
					document.getElementById("ax1T").innerHTML = axisTemp1Percent+" %"; document.getElementById("ax2T").innerHTML = axisTemp2Percent+" %"; document.getElementById("ax3T").innerHTML = axisTemp3Percent+" %"; document.getElementById("ax4T").innerHTML = axisTemp4Percent+" %";
					
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
					
					var axisVib1Sum = _.sum(axisVib1Var); var axisVib2Sum = _.sum(axisVib2Var); var axisVib3Sum = _.sum(axisVib3Var);  var axisVib4Sum = _.sum(axisVib4Var);
					var axisVib1Count = axisVib1Var.length; var axisVib2Count = axisVib2Var.length; var axisVib3Count = axisVib3Var.length; var axisVib4Count = axisVib4Var.length;
					var axisVib1Percent = _.divide(axisVib1Sum, axisVib1Count).toFixed(2); var axisVib2Percent = _.divide(axisVib2Sum, axisVib2Count).toFixed(2); var axisVib3Percent = _.divide(axisVib3Sum, axisVib3Count).toFixed(2); var axisVib4Percent = _.divide(axisVib4Sum, axisVib4Count).toFixed(2);
					
					// document.getElementById("ax1VT").innerHTML = fromDT;
					document.getElementById("ax1V").innerHTML = axisVib1Percent+" %"; document.getElementById("ax2V").innerHTML = axisVib2Percent+" %"; document.getElementById("ax3V").innerHTML = axisVib3Percent+" %"; document.getElementById("ax4V").innerHTML = axisVib4Percent+" %";
					
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
					var output = data.filter(obj => Object.keys(obj).includes("Axis1_Load","Axis2_Load","Axis3_Load","Axis4_Load"));
					
					var timelbl = [];
				    var axisLoad1 = [];  var axisLoad2 = []; var axisLoad3 = []; var axisLoad4 = [];
				    var axisTemp1 = []; var axisTemp2 = [];  var axisTemp3 = []; var axisTemp4 = [];
				    var axisVib1 = []; var axisVib2 = [];  var axisVib3 = []; var axisVib4 = [];
				    

					for(var i = 0; i<output.length; i++) {
												
						var iotdt = moment(output[i]._time).utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");

						timelbl.push(iotdt);
						
						axisLoad1.push(output[i].Axis1_Load);
						axisLoad2.push(output[i].Axis2_Load);
						axisLoad3.push(output[i].Axis3_Load);
						axisLoad4.push(output[i].Axis4_Load);
						
						axisTemp1.push(output[i].Axis1_Temp);
						axisTemp2.push(output[i].Axis2_Temp);
						axisTemp3.push(output[i].Axis3_Temp);
						axisTemp4.push(output[i].Axis4_Temp);
						
						axisVib1.push(output[i].Axis1_Vib);
						axisVib2.push(output[i].Axis2_Vib);
						axisVib3.push(output[i].Axis3_Vib);
						axisVib4.push(output[i].Axis4_Vib);

				   }
					
				
					var minTime = moment(_.min(timelbl));
					var maxTime = moment(_.max(timelbl));
					
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
						            data: axisLoad1
						          },
						          {
						            label: "Axis 2",
						            borderColor: 'rgb(195, 184, 78)',
						            backgroundColor: 'rgb(195, 184, 78)',
						            fill: false,
						            pointRadius: 0,
						            lineTension: 0,
						            radius: 5,
						            data: axisLoad2
						          },
						          {
						            label: "Axis 3",
						            borderColor: 'rgb(178, 75, 9)',
						            backgroundColor: 'rgb(178, 75, 9)',
						            fill: false,
						            pointRadius: 0,
						            lineTension: 0,
						            radius: 5,
						            data: axisLoad3
								   },
								   {
									label: "Axis 4",
									borderColor: 'rgb(162, 143, 188)',
						            backgroundColor: 'rgb(162, 143, 188)',
							        pointRadius: 0,
						            fill: false,
						            lineTension: 0,
						            radius: 5,
						            data: axisLoad4
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
				                    	'minute': 'hh:mm'
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
					            data: axisTemp1
					          },
					          {
					            label: "Axis 2",
					            borderColor: 'rgba(54, 162, 235, 1)',
					            backgroundColor: 'rgba(54, 162, 235, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axisTemp2
					          },
					          {
					            label: "Axis 3",
					            borderColor: 'rgba(255, 206, 86, 1)',
					            backgroundColor: 'rgba(255, 206, 86, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axisTemp3
							   },
							   {
								label: "Axis 4",
								borderColor: 'rgba(75, 192, 192, 1)',
					            backgroundColor: 'rgba(75, 192, 192, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axisTemp4
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
					                    	'minute': 'hh:mm'
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
					            data: axisVib1
					          },
					          {
					            label: "Axis 2",
					            borderColor: 'rgba(54, 162, 235, 1)',
					            backgroundColor: 'rgba(54, 162, 235, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axisVib2
					          },
					          {
					            label: "Axis 3",
					            borderColor: 'rgba(255, 206, 86, 1)',
					            backgroundColor: 'rgba(255, 206, 86, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axisVib3
							  },
							  {
								label: "Axis 4",
								borderColor: 'rgba(75, 192, 192, 1)',
					            backgroundColor: 'rgba(75, 192, 192, 1)',
					            fill: false,
					            lineTension: 0,
					            pointRadius: 0,
					            radius: 5,
					            data: axisVib4
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
					                    	'minute': 'hh:mm'
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
