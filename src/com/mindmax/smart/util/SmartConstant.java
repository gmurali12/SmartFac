package com.mindmax.smart.util;

public class SmartConstant {

	// General URL and Token
	public static final String TIMESERIES_URL = "https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/";
	public static final String AGGREGATE_TIMESERIES_URL = "https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/aggregates/";
	public static final String ASSET_URL = "https://gateway.eu1.mindsphere.io/api/assetmanagement/v3/assets?filter={\"name\":\"Marshall\"}";
	public static final String ASSET_ID = "b89caf86af744614be7ba54585f9c445";
	public static final String ASPECT_NAME = "/MarShall";
	public static final String JWT_TOKEN = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbW1heGRldi5sb2NhbGhvc3Q6ODA4MC91YWEvdG9rZW5fa2V5cyIsImtpZCI6ImtleS1pZC0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiIwZDJjYzc1YTBkMTY0YTFmYjU0MmMzMWFhZjc2ZjVkYiIsInN1YiI6ImY0OGZkZGFjLWRmZGEtNDc5NS04Yjg2LWEwMTkyMDM4OTBhNyIsInNjb3BlIjpbInRva2VuZ2VuYXBwLmFsbCIsIm1kc3A6Y29yZTphc3NldG1hbmFnZW1lbnQuYWRtaW4iLCJ1YWEub2ZmbGluZV90b2tlbiIsIm1kc3A6Y29yZTppb3QudHNhVXNlciIsIm1kc3A6Y29yZTppb3QudGltQWRtaW4iLCJtZHNwOmNvcmU6aW90LnRpbVVzZXIiXSwiY2xpZW50X2lkIjoidG9rZW5nZW5hcHAtbW1heGRldiIsImNpZCI6InRva2VuZ2VuYXBwLW1tYXhkZXYiLCJhenAiOiJ0b2tlbmdlbmFwcC1tbWF4ZGV2IiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJmNDhmZGRhYy1kZmRhLTQ3OTUtOGI4Ni1hMDE5MjAzODkwYTciLCJvcmlnaW4iOiJtbWF4ZGV2IiwidXNlcl9uYW1lIjoibXVyYWxpQHRlY2hnbG9iYWxpbmRpYS5jb20iLCJlbWFpbCI6Im11cmFsaUB0ZWNoZ2xvYmFsaW5kaWEuY29tIiwiYXV0aF90aW1lIjoxNTU4NDIyNDM3LCJyZXZfc2lnIjoiYzBmZjYzZWYiLCJpYXQiOjE1NTg0MjQ0MDMsImV4cCI6MTU1ODQyNjIwMywiaXNzIjoiaHR0cHM6Ly9tbWF4ZGV2LnBpYW0uZXUxLm1pbmRzcGhlcmUuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJtbWF4ZGV2IiwiYXVkIjpbIm1kc3A6Y29yZTppb3QiLCJtZHNwOmNvcmU6YXNzZXRtYW5hZ2VtZW50IiwidWFhIiwidG9rZW5nZW5hcHAiLCJ0b2tlbmdlbmFwcC1tbWF4ZGV2Il0sInRlbiI6Im1tYXhkZXYiLCJzY2hlbWFzIjpbInVybjpzaWVtZW5zOm1pbmRzcGhlcmU6aWFtOnYxIl0sImNhdCI6InVzZXItdG9rZW46djEifQ.hKgyUXoR3aCMJj3nBLUvT7nPXjUSJLcvv5Ok7cvhNRPEMTJXHEnVbDjuUuhAsHu-x2hNw0tbyB_vmdW93H9VPgw8t46cEueX3r1cCBJqR098G2qAmEA3VIbUGFrK6Q8nwL6zKDOn3VaHo1oSo_ERnoCkr_-dnqkljjtbs9Qb3jed0RwSe665eczPKnBc3qpKOwhHUVr7DaTpFYak7K7_lesbrUmGo7xrbhN0HZd_58SARZOEvB2-nzb1Kc5H46SyNABb2Y6y-Y_xWRkR-UAGmu3fjkVtRt4B01UeYBLnOUSScCpULJOsZQfUifmMvFvu17ae-SvboIK-xm__d5xFEQ";
	
	public static final String MILLISECONDS = ".000Z";
	
	//For testing this should be dynamic from UI Screen
	public static final String TIME_RANGE = "from=2019-04-17T12:30:00.000Z&to=2019-04-17T22:30:00.000Z";
	//public static final String TIME_RANGE = "from=2019-04-17T09:30:00.000Z";

	public static final String INTERVAL_PARAMS = "&intervalUnit=hour&intervalValue=1";
	
	// Smart Check screens
	public static final String SELECT_PARAMS = "&select=Axis1_Load,Axis2_Load,Axis3_Load,Axis4_Load,Axis1_Temp,Axis2_Temp,Axis3_Temp,Axis4_Temp,Axis1_Vib,Axis2_Vib,Axis3_Vib,Axis4_Vib";
	
}
