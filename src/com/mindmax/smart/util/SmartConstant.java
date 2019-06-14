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
	
	public static final String JWT_TOKEN = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbW1heGRldi5sb2NhbGhvc3Q6ODA4MC91YWEvdG9rZW5fa2V5cyIsImtpZCI6ImtleS1pZC0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiI5NTEzZjhhMmI4ODA0OGJiYTEzOWJjOTFlNDFjYTQwZiIsInN1YiI6ImY0OGZkZGFjLWRmZGEtNDc5NS04Yjg2LWEwMTkyMDM4OTBhNyIsInNjb3BlIjpbInRva2VuZ2VuYXBwLmFsbCIsIm1kc3A6Y29yZTphc3NldG1hbmFnZW1lbnQuYWRtaW4iLCJ1YWEub2ZmbGluZV90b2tlbiIsIm1kc3A6Y29yZTppb3QudHNhVXNlciIsIm1kc3A6Y29yZTppb3QudGltQWRtaW4iLCJtZHNwOmNvcmU6aW90LnRpbVVzZXIiXSwiY2xpZW50X2lkIjoidG9rZW5nZW5hcHAtbW1heGRldiIsImNpZCI6InRva2VuZ2VuYXBwLW1tYXhkZXYiLCJhenAiOiJ0b2tlbmdlbmFwcC1tbWF4ZGV2IiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJmNDhmZGRhYy1kZmRhLTQ3OTUtOGI4Ni1hMDE5MjAzODkwYTciLCJvcmlnaW4iOiJtbWF4ZGV2IiwidXNlcl9uYW1lIjoibXVyYWxpQHRlY2hnbG9iYWxpbmRpYS5jb20iLCJlbWFpbCI6Im11cmFsaUB0ZWNoZ2xvYmFsaW5kaWEuY29tIiwiYXV0aF90aW1lIjoxNTYwNDgwNzExLCJyZXZfc2lnIjoiYzBmZjYzZWYiLCJpYXQiOjE1NjA0ODA3MTIsImV4cCI6MTU2MDQ4MjUxMiwiaXNzIjoiaHR0cHM6Ly9tbWF4ZGV2LnBpYW0uZXUxLm1pbmRzcGhlcmUuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJtbWF4ZGV2IiwiYXVkIjpbIm1kc3A6Y29yZTppb3QiLCJtZHNwOmNvcmU6YXNzZXRtYW5hZ2VtZW50IiwidWFhIiwidG9rZW5nZW5hcHAiLCJ0b2tlbmdlbmFwcC1tbWF4ZGV2Il0sInRlbiI6Im1tYXhkZXYiLCJzY2hlbWFzIjpbInVybjpzaWVtZW5zOm1pbmRzcGhlcmU6aWFtOnYxIl0sImNhdCI6InVzZXItdG9rZW46djEifQ.UjNxM8PKhLnyD9zJ2GsNzd2wNops0DJ6keyRMgjL4ZGiwNxn29JzEDic6WcjC8mXGEYJ6PCe2wnMOABVCikHZzdTsVzyHYoqxp5z7JB7Znjo-dRVcav_QaDhvIZ7k-BciP7Wt_SBgAz3PiQ-a69PJCsPGAbnEiEK_9XKmsxcZr2vA2gQDPB9eAmTzAU5GtFRy86s2VOyHgs7m8TtAaL6e5UHzZB9Yc-3pz8CvfdgnEohIAI4cekIIUhWaUCh1zglCZ96umngJKO3xx43cRwoosgGmQH6XZMNK77qYlA7DzvTF8_AFH9tTrwXXCPZ1OXiy36ZWr_orrbjKHc3bs9znw";
	
	//public static final String TIMEZONE = "%2B05:30";
	public static final String TIMEZONE = ":00.000Z";
	
	public static final String INTERVAL_PARAMS = "&intervalUnit=hour&intervalValue=1";
	
	// Smart Check 
	//public static final String SMART_CHECK_SELECT = "select=Axis1_Load,Axis2_Load,Axis3_Load,Axis4_Load,Axis1_Temp,Axis2_Temp,Axis3_Temp,Axis4_Temp,Axis1_Vib,Axis2_Vib,Axis3_Vib,Axis4_Vib";
	public static final String SMART_CHECK_CHART = "select=LoadAxis1,LoadAxis2,LoadAxis3,LoadAxis4,TempAxis1,TempAxis2,TempAxis3,TempAxis4,VibAxis1,VibAxis2,VibAxis3,VibAxis4";
	public static final String SMART_CHECK_TABLE = "select=LoadAxis1,LoadAxis2,LoadAxis3,LoadAxis4,TempAxis1,TempAxis2,TempAxis3,TempAxis4,VibAxis1,VibAxis2,VibAxis3,VibAxis4";

	// Smart Electronics
	public static final String SMART_ELECTRONICS_CHART = "select=HPActual,HPMin,HPMax,TempMtr1,TempMtr2,TempMtr3,TempMtr4,PPActual,PPMin,PPMax";
	public static final String SMART_ELECTRONICS_TABLE = "select=MpcbHyd,MpcbLub,MpcbBfan,MpcbAircond,LevelLub,LevelHyd,PrsLub,PrsAir,PrsHyd";
	
	
	// Smart Correct
	public static final String SMART_CORRECT_CHART = "select=MeanOD,MesuredOD,LoTolOD,UpTolOD,MeanID,MesuredID,LoTolID,UpTolID,MeanHeight,MesuredHeight,LoTolHeight,UpTolHeight,MeanOvality,MesuredOvality,LoTolOvality,UpTolOvality,MeanFaceout,MesuredFaceout,LoTolFaceout,UpTolFaceout,MeanRunout,MesuredRunout,LoTolRunout,UpTolRunout,TotalPartCount";
	public static final String SMART_CORRECT_TABLE = "select=GoodParts,RejectParts,ReworkParts,PpmGood,PpmRejected,PpmRework,PerGood,PerRejected,PerRework,Cp,Cpk";
	
	// Smart Insert
	public static final String SMART_INSERT_CHART = "select=MeanOD,MesuredOD,LoTolOD,UpTolOD,MeanID,MesuredID,LoTolID,UpTolID,MeanHeight,MesuredHeight,LoTolHeight,UpTolHeight,MeanOvality,MesuredOvality,LoTolOvality,UpTolOvality,MeanFaceout,MesuredFaceout,LoTolFaceout,UpTolFaceout,MeanRunout,MesuredRunout,LoTolRunout,UpTolRunout,TotalPartCount";
	public static final String SMART_INSERT_TABLE = "select=GoodParts,RejectParts,ReworkParts,PpmGood,PpmRejected,PpmRework,PerGood,PerRejected,PerRework,Cp,Cpk";

}
