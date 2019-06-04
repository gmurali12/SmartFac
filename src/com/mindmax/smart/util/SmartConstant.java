package com.mindmax.smart.util;

public class SmartConstant {

	// General URL and Token
	public static final String TIMESERIES_URL = "https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/";
	public static final String AGGREGATE_TIMESERIES_URL = "https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/aggregates/";
	public static final String ASSET_URL = "https://gateway.eu1.mindsphere.io/api/assetmanagement/v3/assets?filter={\"typeId\":\"mmaxdev.AssetTypeMarshall\"}";
	//public static final String ASSET_ID = "b89caf86af744614be7ba54585f9c445";
	
	//public static final String ASPECT_NAME = "/MarShall?";
	
	public static final String SMART_CHECK_ASPECT_NAME = "/Smart_check?";
	public static final String SMART_CORRECT_ASPECT_NAME = "/Smart_correct?";
	public static final String SMART_ELECTRONICS_ASPECT_NAME = "/Smart_electronics?";
	public static final String SMART_INSERT_ASPECT_NAME = "/Smart_insert?";
	public static final String SMART_PRODUCTIVITY1_ASPECT_NAME = "/Smart_productivity1?";
	public static final String SMART_PRODUCTIVITY2_ASPECT_NAME = "/Smart_productivity2?";
	
	public static final String JWT_TOKEN = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbW1heGRldi5sb2NhbGhvc3Q6ODA4MC91YWEvdG9rZW5fa2V5cyIsImtpZCI6ImtleS1pZC0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJiN2E0YjY0YjU5MmU0ZjE4YTYzOTc2MzNlOGFjMmYxYSIsInN1YiI6ImY0OGZkZGFjLWRmZGEtNDc5NS04Yjg2LWEwMTkyMDM4OTBhNyIsInNjb3BlIjpbInRva2VuZ2VuYXBwLmFsbCIsIm1kc3A6Y29yZTphc3NldG1hbmFnZW1lbnQuYWRtaW4iLCJ1YWEub2ZmbGluZV90b2tlbiIsIm1kc3A6Y29yZTppb3QudHNhVXNlciIsIm1kc3A6Y29yZTppb3QudGltQWRtaW4iLCJtZHNwOmNvcmU6aW90LnRpbVVzZXIiXSwiY2xpZW50X2lkIjoidG9rZW5nZW5hcHAtbW1heGRldiIsImNpZCI6InRva2VuZ2VuYXBwLW1tYXhkZXYiLCJhenAiOiJ0b2tlbmdlbmFwcC1tbWF4ZGV2IiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJmNDhmZGRhYy1kZmRhLTQ3OTUtOGI4Ni1hMDE5MjAzODkwYTciLCJvcmlnaW4iOiJtbWF4ZGV2IiwidXNlcl9uYW1lIjoibXVyYWxpQHRlY2hnbG9iYWxpbmRpYS5jb20iLCJlbWFpbCI6Im11cmFsaUB0ZWNoZ2xvYmFsaW5kaWEuY29tIiwiYXV0aF90aW1lIjoxNTU5NjQ4OTM4LCJyZXZfc2lnIjoiYzBmZjYzZWYiLCJpYXQiOjE1NTk2NDg5MzksImV4cCI6MTU1OTY1MDczOSwiaXNzIjoiaHR0cHM6Ly9tbWF4ZGV2LnBpYW0uZXUxLm1pbmRzcGhlcmUuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJtbWF4ZGV2IiwiYXVkIjpbIm1kc3A6Y29yZTppb3QiLCJtZHNwOmNvcmU6YXNzZXRtYW5hZ2VtZW50IiwidWFhIiwidG9rZW5nZW5hcHAiLCJ0b2tlbmdlbmFwcC1tbWF4ZGV2Il0sInRlbiI6Im1tYXhkZXYiLCJzY2hlbWFzIjpbInVybjpzaWVtZW5zOm1pbmRzcGhlcmU6aWFtOnYxIl0sImNhdCI6InVzZXItdG9rZW46djEifQ.kC99h90vLV3_oMd9BRlgTrdQDi8GREGpNT6aLaIFJW5XoNMhI6c1_OlY3GN1O5M48aWmtTRAFLvE8AgVZC1L9ccTQ8Y-xy7HMhZJ7I17LNKVOXnxIu8MDhx1gHRDYI6UVXEHDU66V5qWZTQD9S0cP1rHtvs6e9UCMbp-Gg0PN87lGiYe-ftk9CBX4pBMyNBqzM3aISQ47xOVdByYeQKphKzHXQPUyXo_UwBU4AxV_cmNmXd-xpk8DEhfJGdkkgUpFSJ4Xke6ZLKWFqpzyNkAzZ3WLtCwghkXI5vFs4vbdnlTgsdj7YvHKE6ruvH9KsVS70j_Y33BdRf9CgaZCwQ3SA";
	
	public static final String TIMEZONE = "%2B05:30";
	public static final String INTERVAL_PARAMS = "&intervalUnit=hour&intervalValue=1";
	
	// Smart Check 
	//public static final String SMART_CHECK_SELECT = "select=Axis1_Load,Axis2_Load,Axis3_Load,Axis4_Load,Axis1_Temp,Axis2_Temp,Axis3_Temp,Axis4_Temp,Axis1_Vib,Axis2_Vib,Axis3_Vib,Axis4_Vib";
	public static final String SMART_CHECK_CHART = "select=LoadAxis1,LoadAxis2,LoadAxis3,LoadAxis4,TempAxis1,TempAxis2,TempAxis3,TempAxis4,VibAxis1,VibAxis2,VibAxis3,VibAxis4";
	public static final String SMART_CHECK_TABLE = "select=LoadAxis1,LoadAxis2,LoadAxis3,LoadAxis4,TempAxis1,TempAxis2,TempAxis3,TempAxis4,VibAxis1,VibAxis2,VibAxis3,VibAxis4";

	// Smart Electronics
	public static final String SMART_ELECTRONICS_CHART = "select=Hydraulic_Pressure_Max,Hydraulic_Pressure_Min,Hydraulic_Pressure_Actual,Motor_Temperature_Axis_1,Motor_Temperature_Axis_2,Motor_Temperature_Axis_3,Motor_Temperature_Axis_4,Pneumatic_Pressure_Max,Pneumatic_Pressure_Min,Pneumatic_Pressure_Actual";
	public static final String SMART_ELECTRONICS_TABLE = "select=Hydraulic_MCB,Lubrication_MCB,Blower_Fan_MCB,Air_Conditioner_MCB,Lubrication_Level,Hydraulic_Level,Lubrication_Pressure,Air_Pressure,Hydraulic_Pressure";
}
