getAssetDetails();

var smartCorrectData = null;

var assetLocPopUp = JSON.parse(sessionStorage.getItem('assetPopup')); 
 
document.getElementById("assetForm").style.display = 'none';
document.getElementById("assetName").style.display='none';
document.getElementById("assetName").style.display = 'none';
document.getElementById("assetDisConnectedImg").style.display = "none";
document.getElementById("assetConnectedImg").style.display = "none";



$(document).ready(function() {
	  
	 if(assetLocPopUp == null){
		  $('#myModal').modal('show');
	 }else if(assetLocPopUp != null && assetLocPopUp.isAssetSelected !== 'true'){
		 $('#myModal').modal('hide');
		 changeAssetDetails(assetLocPopUp.assetName);
		 
	 }	 
	  $('[data-toggle="tooltip"]').tooltip({title:'Click here to change asset details!', delay :500,placement: "bottom"}); 
	});


function changeAssetName(){
	 $('#myModal').modal('show');
}


function assetDetailsPop(){
	
	
	 var e = document.getElementById("assetName");
	 var assetVal =  e.options[e.selectedIndex].value;
	
	if(assetVal === ""){
	 document.getElementById("validation").style.display = "block";
	 document.getElementById("validation").innerHTML = "Choose Asset Name";
	}else{
		 document.getElementById("validation").style.display = "none";	 
		changeAssetDetails(assetVal);
	}
	
	
}

function changeAssetDetails(assetName){

	var strUser = assetName;
     
	var selectedAssetDetails = Object.assign({
		 isAssetSelected:true,
		 assetName:strUser
	 });	
	
	sessionStorage.setItem('assetPopup',JSON.stringify(selectedAssetDetails));
	     		     
    	 //document.getElementById("dateButton").style.display = "none";	
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
		 		   smartCorrectChart(assetId,fDt,tDt);
		 		
	
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
	
				if(response.name === strUser){				
	
					document.getElementById("selectAssetName").className = "btn btn-info";
					document.getElementById("selectAssetName").innerHTML = strUser;
					//document.getElementById("dateButton").style.display = "block";
					document.getElementById("dateTime").style.display = "block";
					document.getElementById("selectAssetName").style.display = "block";
					if(response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'false'){
						//document.getElementById("dateButton").className = "label label-danger";
						document.getElementById("assetDisConnectedImg").style.display = "none";
						document.getElementById("assetConnectedImg").style.display = "block";
					} else{
						//document.getElementById("dateButton").className = "label label-success";
						document.getElementById("assetDisConnectedImg").style.display = "block";
						document.getElementById("assetConnectedImg").style.display = "none";
					}
	
					if(response.aspects[0].variables[1].name === 'lastUpdated' && response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'true'){
						//document.getElementById("dateTime").innerHTML = response.aspects[0].variables[1].value;	
						document.getElementById("dateTime").innerHTML = 'Since '+moment(response.aspects[0].variables[1].value).format("MMM DD,YYYY hh:mm A");
					}else{
						document.getElementById("dateTime").innerHTML = 'Since '+moment(response.aspects[0].variables[1].value)	.format("MMM DD,YYYY hh:mm A");
					}
				}else{
					document.getElementById("selectAssetName").style.display = "none";
					//document.getElementById("dateButton").style.display = "none";
					document.getElementById("dateTime").innerHTML = 'Since '+moment(response.aspects[0].variables[1].value)	.format("MMM,DD,YYYY hh:mm A");
				}
				
	
				smartCorrectChart(response.assetId,fDt,tDt);
				$('#myModal').modal('hide');
	
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



function smartCorrectChart(assetId, fdt,tdt){
	
	
//	console.log(assetId, fdt,tdt)
//	var DateTime1 = moment(fdt);
//	fromdt = DateTime1.format('DD-MM-YY HH:mm');
//	var DateTime2 = moment(tdt);
//	todt = DateTime2.format('DD-MM-YY HH:mm');
	
	document.getElementById("ftdt").value = fdt + ' - ' + tdt;
	
	$('#loadingCorr').show();
		
	  $(function(){
		  $.ajax({
				url : "getSmartCorrectDetails",
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
				
					$('#loadingCorr').hide();
										
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
						smartCorrectData = data;
						drawJob();
						//drawAxisTable(data);
						  
					}
				},
				error: function(data) {
					console.log(data, "ERROR");
				} 
		    });
	  });
}

function drawJob(){
	
	var jobSelected = document.getElementById('jobSelected');
	
	var jobId = jobSelected.value;
	var smartChartData = smartCorrectData[0];
	

	var jobLoad = smartChartData.filter(obj => Object.keys(obj).includes("MeanOD","MesuredOD","LoTolOD","UpTolOD","MeanID","MesuredID","LoTolID","UpTolID","MeanHeight",
			"MesuredHeight","LoTolHeight","UpTolHeight","MeanOvality","MesuredOvality","LoTolOvality","UpTolOvality","MeanFaceout","MesuredFaceout","LoTolFaceout",
			"UpTolFaceout","MeanRunout","MesuredRunout","LoTolRunout","UpTolRunout","TotalPartCount"));

	console.log(jobLoad, "jobLoad");
	var meanSize = []; var measuredSize=[]; var upperTol=[]; var lowerTol=[];
	var loadTime = [];
	
	if(jobLoad == ""){	
		document.getElementById('showJobLoad').innerHTML= "No data found";
		
	}else{
	    
		document.getElementById('showJobLoad').style.display = "none";
	
    for(var key in jobLoad){				
	
    	if(jobId==1){
    		document.getElementById('smartCorrectIds').innerHTML = 'JOB OD'; 
    		meanSize.push(jobLoad[key].MeanOD.minvalue,jobLoad[key].MeanOD.maxvalue,jobLoad[key].MeanOD.firstvalue,jobLoad[key].MeanOD.lastvalue);
    		measuredSize.push(jobLoad[key].MesuredOD.minvalue,jobLoad[key].MesuredOD.maxvalue,jobLoad[key].MesuredOD.firstvalue,jobLoad[key].MesuredOD.lastvalue);
    		//upperTol.push(jobLoad[key].UpTolOD.minvalue,jobLoad[key].UpTolOD.maxvalue,jobLoad[key].UpTolOD.firstvalue,jobLoad[key].UpTolOD.lastvalue);
    		lowerTol.push(jobLoad[key].LoTolOD.minvalue,jobLoad[key].LoTolOD.maxvalue,jobLoad[key].LoTolOD.firstvalue,jobLoad[key].LoTolOD.lastvalue);
				
	    	loadTime.push(jobLoad[key].MeanOD.firsttime,jobLoad[key].MeanOD.mintime,jobLoad[key].MeanOD.maxtime,jobLoad[key].MeanOD.lasttime);
    	}else if(jobId==2){
    		document.getElementById('smartCorrectIds').innerHTML = 'JOB ID'; 
    		meanSize.push(jobLoad[key].MeanID.minvalue,jobLoad[key].MeanID.maxvalue,jobLoad[key].MeanID.firstvalue,jobLoad[key].MeanID.lastvalue);
    		measuredSize.push(jobLoad[key].MesuredID.minvalue,jobLoad[key].MesuredID.maxvalue,jobLoad[key].MesuredID.firstvalue,jobLoad[key].MesuredID.lastvalue);
    		//upperTol.push(jobLoad[key].UpTolID.minvalue,jobLoad[key].UpTolID.maxvalue,jobLoad[key].UpTolID.firstvalue,jobLoad[key].UpTolID.lastvalue);
    		lowerTol.push(jobLoad[key].LoTolID.minvalue,jobLoad[key].LoTolID.maxvalue,jobLoad[key].LoTolID.firstvalue,jobLoad[key].LoTolID.lastvalue);
				
	    	loadTime.push(jobLoad[key].MeanID.firsttime,jobLoad[key].MeanID.mintime,jobLoad[key].MeanID.maxtime,jobLoad[key].MeanID.lasttime);
    	}else if(jobId==3){    		
    		document.getElementById('smartCorrectIds').innerHTML = 'JOB HEIGHT'; 
    		meanSize.push(jobLoad[key].MeanHeight.minvalue,jobLoad[key].MeanHeight.maxvalue,jobLoad[key].MeanHeight.firstvalue,jobLoad[key].MeanHeight.lastvalue);
    		measuredSize.push(jobLoad[key].MesuredHeight.minvalue,jobLoad[key].MesuredHeight.maxvalue,jobLoad[key].MesuredHeight.firstvalue,jobLoad[key].MesuredHeight.lastvalue);
    		//upperTol.push(jobLoad[key].UpTolHeight.minvalue,jobLoad[key].UpTolHeight.maxvalue,jobLoad[key].UpTolHeight.firstvalue,jobLoad[key].UpTolHeight.lastvalue);
    		lowerTol.push(jobLoad[key].LoTolHeight.minvalue,jobLoad[key].LoTolHeight.maxvalue,jobLoad[key].LoTolHeight.firstvalue,jobLoad[key].LoTolHeight.lastvalue);
				
	    	loadTime.push(jobLoad[key].MeanHeight.firsttime,jobLoad[key].MeanHeight.mintime,jobLoad[key].MeanHeight.maxtime,jobLoad[key].MeanHeight.lasttime);

    	}else if(jobId==4){
    		document.getElementById('smartCorrectIds').innerHTML = 'JOB RUNOUT'; 
    		meanSize.push(jobLoad[key].MeanRunout.minvalue,jobLoad[key].MeanRunout.maxvalue,jobLoad[key].MeanRunout.firstvalue,jobLoad[key].MeanRunout.lastvalue);
    		measuredSize.push(jobLoad[key].MesuredRunout.minvalue,jobLoad[key].MesuredRunout.maxvalue,jobLoad[key].MesuredRunout.firstvalue,jobLoad[key].MesuredRunout.lastvalue);
    		//upperTol.push(jobLoad[key].UpTolRunout.minvalue,jobLoad[key].UpTolRunout.maxvalue,jobLoad[key].UpTolRunout.firstvalue,jobLoad[key].UpTolRunout.lastvalue);
    		lowerTol.push(jobLoad[key].LoTolRunout.minvalue,jobLoad[key].LoTolRunout.maxvalue,jobLoad[key].LoTolRunout.firstvalue,jobLoad[key].LoTolRunout.lastvalue);
				
	    	loadTime.push(jobLoad[key].MeanRunout.firsttime,jobLoad[key].MeanRunout.mintime,jobLoad[key].MeanRunout.maxtime,jobLoad[key].MeanRunout.lasttime);

    	}else if(jobId==5){
    		document.getElementById('smartCorrectIds').innerHTML = 'JOB OVALITY'; 
    		meanSize.push(jobLoad[key].MeanOvality.minvalue,jobLoad[key].MeanOvality.maxvalue,jobLoad[key].MeanOvality.firstvalue,jobLoad[key].MeanOvality.lastvalue);
    		measuredSize.push(jobLoad[key].MesuredOvality.minvalue,jobLoad[key].MesuredOvality.maxvalue,jobLoad[key].MesuredOvality.firstvalue,jobLoad[key].MesuredOvality.lastvalue);
    		//upperTol.push(jobLoad[key].UpTolOvality.minvalue,jobLoad[key].UpTolOvality.maxvalue,jobLoad[key].UpTolOvality.firstvalue,jobLoad[key].UpTolOvality.lastvalue);
    		lowerTol.push(jobLoad[key].LoTolOvality.minvalue,jobLoad[key].LoTolOvality.maxvalue,jobLoad[key].LoTolOvality.firstvalue,jobLoad[key].LoTolOvality.lastvalue);
				
	    	loadTime.push(jobLoad[key].MeanOvality.firsttime,jobLoad[key].MeanOvality.mintime,jobLoad[key].MeanOvality.maxtime,jobLoad[key].MeanOvality.lasttime);

    	}else if(jobId==6){
    		document.getElementById('smartCorrectIds').innerHTML = 'JOB FACEOUT'; 
    		meanSize.push(jobLoad[key].MeanFaceout.minvalue,jobLoad[key].MeanFaceout.maxvalue,jobLoad[key].MeanFaceout.firstvalue,jobLoad[key].MeanFaceout.lastvalue);
    		measuredSize.push(jobLoad[key].MesuredFaceout.minvalue,jobLoad[key].MesuredFaceout.maxvalue,jobLoad[key].MesuredFaceout.firstvalue,jobLoad[key].MesuredFaceout.lastvalue);
    		//upperTol.push(jobLoad[key].UpTolFaceout.minvalue,jobLoad[key].UpTolFaceout.maxvalue,jobLoad[key].UpTolFaceout.firstvalue,jobLoad[key].UpTolFaceout.lastvalue);
    		lowerTol.push(jobLoad[key].LoTolFaceout.minvalue,jobLoad[key].LoTolFaceout.maxvalue,jobLoad[key].LoTolFaceout.firstvalue,jobLoad[key].LoTolFaceout.lastvalue);
				
	    	loadTime.push(jobLoad[key].MeanFaceout.firsttime,jobLoad[key].MeanFaceout.mintime,jobLoad[key].MeanFaceout.maxtime,jobLoad[key].MeanFaceout.lasttime);

    	}else{
    		document.getElementById('smartCorrectIds').style.display = 'none'; 
    	}

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
	
									
	var crtJobData = {
		labels: loadTime,
			datasets: 
			[					
				 {
					 label: "Mean Size",
					 borderColor: 'rgb(0, 165, 145)',backgroundColor: 'rgb(0, 165, 145)',
					 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
					 data: meanSize
		         },
		         {
		        	 label: "Measured Size",
		        	 borderColor: 'rgb(195, 184, 78)',backgroundColor: 'rgb(195, 184, 78)',
		        	 fill: false,pointRadius: 0,lineTension: 0,radius: 5,
		        	 data: measuredSize
		          },
		          {
		        	  label: "Upper Tolerance",
		        	  borderColor: 'rgb(178, 75, 94)',backgroundColor: 'rgb(178, 75, 94)',
		        	  fill: false, pointRadius: 0,lineTension: 0,radius: 5,
		        	  data: upperTol
				   },
				   {
					   label: "Lower Tolerance",
					   borderColor: 'rgb(162, 143, 188)',backgroundColor: 'rgb(162, 143, 188)',
					   pointRadius: 0,fill: false,lineTension: 0,radius: 5,
					   data: lowerTol
					}
			  ]
	};
	 					 
				
	var  crtJobOptions = {
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

	var crtJobCtx = $("#smtCrtJob");

	if(window.chart1 != undefined)
		window.chart1.destroy();
	  	window.chart1 = new Chart(crtJobCtx, {
	  		type: "line",
	  		data: crtJobData,
	    	options: crtJobOptions
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