

 getAssetDetails();
 
 document.getElementById("assetForm").style.display = 'none';
 document.getElementById("assetName").style.display='none';
 document.getElementById("assetName").style.display = 'none';


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
				if(response.aspects[0].variables[0].name === 'connected' && response.aspects[0].variables[0].value === 'false'){
					document.getElementById("dateButton").className = "label label-danger";
				} else{
					document.getElementById("dateButton").className = "label label-success";
				}

				if(response.aspects[0].variables[1].name === 'lastUpdated'){
					//document.getElementById("dateTime").innerHTML = response.aspects[0].variables[1].value;
					document.getElementById("dateTime").innerHTML = moment(response.aspects[0].variables[1].value).utcOffset("+00:00").format("DD-MM-YY HH:mm:ss");
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
				url : "getSmartInsertDetails",
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
		 			    
					   if(window.chart1 != undefined)
						   window.chart1.destroy();
					   
					   $('#t1lstWrkPcs,#t1avgWrkPcs,#t1avgCutTim,#t1actCutTim,#t2lstWrkPcs,#t2avgWrkPcs,#t2avgCutTim,#t2actCutTim,#t3lstWrkPcs,#t3avgWrkPcs,#t3avgCutTim,#t3actCutTim,#t4lstWrkPcs,#t4avgWrkPcs,#t4avgCutTim,#t4actCutTim').text("# # #");

					} else {
					
						drawToolChart(data);
						drawToolTable(data);
						  
					}
				},
				error: function(data) {
					console.log(data, "ERROR");
				} 
		    });
	  });
}

function drawToolChart(data){
	
	var smartInsertData = data[0];
	var toolLoad = smartInsertData.filter(obj => Object.keys(obj).includes("ActWpcPrdT1","ActWpcPrdT2","ActWpcPrdT3","ActWpcPrdT4","ActWpcPrdT5","ActWpcPrdT6",
			"ActWpcPrdT7","ActWpcPrdT8","ActWpcPrdT9","ActWpcPrdT10","ActWpcPrdT11","ActWpcPrdT12",
			"ActCuttTimeT1","ActCuttTimeT2","ActCuttTimeT3","ActCuttTimeT4","ActCuttTimeT5","ActCuttTimeT6","ActCuttTimeT7","ActCuttTimeT8","ActCuttTimeT9",
			"ActCuttTimeT10","ActCuttTimeT11","ActCuttTimeT12"));

	var toolWorkPiece = [];
	var toolCuttingTime =[];
	var toolLbTime = [];

	if(toolLoad == ""){	
		document.getElementById('showAxisLoad').innerHTML= "No data Found";
		
	}else{
	    
		//document.getElementById('showAxisLoad').style.display = "none";
		for(var key in toolLoad){
			
			toolWorkPiece.push(toolLoad[key].ActWpcPrdT1.firstvalue);
	    	toolCuttingTime.push(toolLoad[key].ActCuttTimeT1.firstvalue);
	    	toolLbTime.push(moment(toolLoad[key].ActWpcPrdT1.firsttime, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm"));
	    	
	    	//toolWorkPiece.push(toolLoad[key].ActWpcPrdT1.lastvalue,toolLoad[key].ActWpcPrdT1.firstvalue,toolLoad[key].ActWpcPrdT1.minvalue,toolLoad[key].ActWpcPrdT1.maxvalue);
	    	//toolCuttingTime.push(toolLoad[key].ActCuttTimeT1.lastvalue,toolLoad[key].ActCuttTimeT1.firstvalue,toolLoad[key].ActCuttTimeT1.minvalue,toolLoad[key].ActCuttTimeT1.maxvalue);
	    	//toolLbTime.push(toolLoad[key].ActWpcPrdT1.lasttime,toolLoad[key].ActWpcPrdT1.firsttime,toolLoad[key].ActWpcPrdT1.mintime, toolLoad[key].ActWpcPrdT1.maxtime);
	    }
    
		console.log("toolWorkPiece",toolWorkPiece);
		console.log("toolCuttingTime",toolCuttingTime);
		console.log("toolLbTime",toolLbTime);
						
		var toolData = {
		labels: toolLbTime,
	    datasets: [
	               {
	            	   label: "Workpices produced",
				       data: toolWorkPiece,
				       backgroundColor: "lightblue",
				       borderColor: "blue",
				       borderWidth: 1,
	               },
				   {
	            	   label: "Cutting time",
				       data: toolCuttingTime,
				       backgroundColor: "pink",
				       borderColor: "red",
				       borderWidth: 1,
				   	}
	               ]
		};
	 					 
				
		var toolOptions = {
		responsive: true,
		legend: {
			display: true,position: "bottom",
			labels: {
		        fontColor: "#333",
		        fontSize: 12
		      }
		    },
		    
		    scales: {
		    	xAxes: [{
		    		gridLines: { display:false }
		    	}],
		      yAxes: [{
		        ticks: {
		          min: 0
		        },
		        gridLines: {
	                display:false
	            }
		      }]
		    }
		};

		var toolCtx = $("#toolChart");
	
		if(window.chart1 != undefined)
			window.chart1.destroy();
		  
		window.chart1 = new Chart(toolCtx, {
			type: "bar",
		  	data: toolData,
		    options: toolOptions
		});
	}
}

function drawToolTable(data){
	
	var smartTableData = data[1];
	console.log(smartTableData,"smartTableData")
	var toolTable = smartTableData[0];

	console.log(toolTable,"toolTable")
	if(toolTable == ""){
		$('#myTable').empty()
		var newRow = $("<tr><td>no results found</td></tr>");
		$("#myTable").append(newRow);
	}

	// Table Data
	document.getElementById("t1actCutTim").innerHTML = toolTable.ActCuttTimeT1;
	document.getElementById("t1actWrkPcs").innerHTML = toolTable.ActWpcPrdT1;
	
	document.getElementById("t2actCutTim").innerHTML = toolTable.ActCuttTimeT2;
	document.getElementById("t2actWrkPcs").innerHTML = toolTable.ActWpcPrdT2;
	
	document.getElementById("t3actCutTim").innerHTML = toolTable.ActCuttTimeT3;
	document.getElementById("t3actWrkPcs").innerHTML = toolTable.ActWpcPrdT3;
	
	document.getElementById("t4actCutTim").innerHTML = toolTable.ActCuttTimeT4;
	document.getElementById("t4actWrkPcs").innerHTML = toolTable.ActWpcPrdT4;
	
	document.getElementById("t5actCutTim").innerHTML = toolTable.ActCuttTimeT5;
	document.getElementById("t5actWrkPcs").innerHTML = toolTable.ActWpcPrdT5;
	
	document.getElementById("t6actCutTim").innerHTML = toolTable.ActCuttTimeT6;
	document.getElementById("t6actWrkPcs").innerHTML = toolTable.ActWpcPrdT6;
	
	document.getElementById("t7actCutTim").innerHTML = toolTable.ActCuttTimeT7;
	document.getElementById("t7actWrkPcs").innerHTML = toolTable.ActWpcPrdT7;
	
	document.getElementById("t8actCutTim").innerHTML = toolTable.ActCuttTimeT8;
	document.getElementById("t8actWrkPcs").innerHTML = toolTable.ActWpcPrdT8;
	
	document.getElementById("t9actCutTim").innerHTML = toolTable.ActCuttTimeT9;
	document.getElementById("t9actWrkPcs").innerHTML = toolTable.ActWpcPrdT9;
	
	document.getElementById("t10actCutTim").innerHTML = toolTable.ActCuttTimeT10;
	document.getElementById("t10actWrkPcs").innerHTML = toolTable.ActWpcPrdT10;
	
	document.getElementById("t11actCutTim").innerHTML = toolTable.ActCuttTimeT11;
	document.getElementById("t11actWrkPcs").innerHTML = toolTable.ActWpcPrdT11;
	
	document.getElementById("t12actCutTim").innerHTML = toolTable.ActCuttTimeT12;
	document.getElementById("t12actWrkPcs").innerHTML = toolTable.ActWpcPrdT12;
	
}