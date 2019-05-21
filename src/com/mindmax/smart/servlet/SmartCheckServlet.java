package com.mindmax.smart.servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.mindmax.smart.util.SmartConstant;
import com.mindmax.smart.util.SmartUtil;
import com.mindmax.smart.vo.SmartCheckVO;

/**
 * Servlet implementation class getTimeServlet
 */
// @WebServlet("/getSmartCheckDetails")
public class SmartCheckServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final int String = 0;
	private static final int Object = 0;
	private static final int Map = 0;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SmartCheckServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		System.out.println("Inside Get");
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Inside Post");
		getSmartCheckDetails(request, response);
		
		//getDummyData(request, response);
	}
	
    private void getDummyData(HttpServletRequest request,
            HttpServletResponse response) {
        String data = "";
        String str = "";

        String fromDT = request.getParameter("fromDT");
        String toDT = request.getParameter("toDT");

       
       

        InputStream inputStream = null;
        JSONArray JData = new JSONArray();

        try {

            inputStream = new FileInputStream(new File(
            		"/home/tgi-user/git/SmartFac/src/com/mindmax/smart/servlet/API_All_Axis_Data.txt"));
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    inputStream));

            while (str != null) {
                str = br.readLine();
                data = data + str;
            }

            JSONArray JArray = new JSONArray(data);

            for (int j = 0; j < JArray.length(); j++) {
                JData.put(JArray.get(j));
            }

            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            out.print(JData);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

	protected void getSmartCheckDetails(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		System.out.println("Inside getSmartCheckDetails - START " + startTime);

		HttpURLConnection myURLConnection = null;
		String data = "";
		String str = "";
		
		String fromDate = null;
		String toDate = null;
		String assetId = null;
		
		assetId = request.getParameter("assetId");
		
		if(assetId == null){
			try {
				throw new Exception("INVALID_ASSET_ID");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		fromDate = request.getParameter("fromDT");
		toDate = request.getParameter("toDT");

		System.out.println("Date fromDate--->"+fromDate);
		System.out.println("Date toDate--->"+toDate);
		
		String dateFilter = SmartUtil.populateDateFilter(fromDate, toDate);
		System.out.println("Date Filter--->"+dateFilter);
		
		try {

			URL url = new URL("" + SmartConstant.AGGREGATE_TIMESERIES_URL
					+ assetId + SmartConstant.ASPECT_NAME
					+ dateFilter + SmartConstant.SELECT_PARAMS);
			System.out.println("URL---->" + url.toString());

			myURLConnection = (HttpURLConnection) url.openConnection();

			// Set Auth TOken
			String authorizationToken = "Bearer " + SmartConstant.JWT_TOKEN;
			myURLConnection.setRequestProperty("Authorization",
					authorizationToken);

			myURLConnection.setRequestMethod("GET");
			myURLConnection.setRequestProperty("Content-Type",
					"application/json");
			myURLConnection.setDoOutput(true);
			myURLConnection.connect();

			InputStream inputStream = myURLConnection.getInputStream();

			BufferedReader br = new BufferedReader(new InputStreamReader(
					inputStream));

			while (str != null) {
				str = br.readLine();
				data = data + str;
			}

			JSONArray jsonArray = new JSONArray(data);
            
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			out.print(jsonArray);

			System.out.println("Inside getSmartCheckDetails - Time Taken: "
					+ (System.currentTimeMillis() - startTime) / 1000
					+ " seconds");

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	protected void getSmartCheckAggregateDetails(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		System.out.println("Inside getSmartCheckDetails - START " + startTime);

		HttpURLConnection myURLConnection = null;
		String data = "";
		String str = "";

		try {

			URL url = new URL("" + SmartConstant.AGGREGATE_TIMESERIES_URL
					+ SmartConstant.ASSET_ID + SmartConstant.ASPECT_NAME
					+ SmartConstant.TIME_RANGE + SmartConstant.INTERVAL_PARAMS + SmartConstant.SELECT_PARAMS);
			System.out.println("URL---->" + url.toString());

			myURLConnection = (HttpURLConnection) url.openConnection();

			// Set Auth TOken
			String authorizationToken = "Bearer " + SmartConstant.JWT_TOKEN;
			myURLConnection.setRequestProperty("Authorization",
					authorizationToken);

			myURLConnection.setRequestMethod("GET");
			myURLConnection.setRequestProperty("Content-Type",
					"application/json");
			myURLConnection.setDoOutput(true);
			myURLConnection.connect();

			InputStream inputStream = myURLConnection.getInputStream();

			BufferedReader br = new BufferedReader(new InputStreamReader(
					inputStream));

			while (str != null) {
				str = br.readLine();
				data = data + str;
			}
			System.out.println(" Data------->" + data);
			
			List<SmartCheckVO> smartList = parseVoFromRequest(data);
			Gson gson = new Gson();
			// convert your list to json
			data = gson.toJson(smartList);
			
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			out.print(data);

			System.out.println("Inside getSmartCheckDetails - Time Taken: "
					+ (System.currentTimeMillis() - startTime) / 1000
					+ " seconds");

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public List<SmartCheckVO> parseVoFromRequest(String requestString,
			Class className) throws Exception {

		List<SmartCheckVO> smartList = new ArrayList<SmartCheckVO>();
		try {
			Gson gson = new Gson();

			JSONArray array = new JSONArray(requestString);
			System.out.println("array-->" + array);
			System.out.println("array length-->" + array.length());

			for (int i = 0; i < array.length(); i++) {

				SmartCheckVO vo = (SmartCheckVO) gson.fromJson(array.get(i)
						.toString(), className);

				if (vo != null && vo.getAxis1_Load() > 0) {
					smartList.add(vo);
				}
			}

			if (smartList != null) {
				System.out.println("smartList Size:" + smartList.size());
				System.out.println(smartList.toString());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return smartList;
	}
	
	public List<SmartCheckVO> parseVoFromRequest(String requestString) throws Exception {

		List<SmartCheckVO> smartList = new ArrayList<SmartCheckVO>();
		try {
			Gson gson = new Gson();
			
			JSONArray array = new JSONArray(requestString);
			System.out.println("array-->" + array);
			System.out.println("array length-->" + array.length());

			List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < array.length(); i++) {
				
				JSONObject ja = new JSONObject(array.get(i).toString());
				listMap.add(toMap(ja));
			}
				
			int time =12;
			for(int i=0;i<listMap.size();i++){
				Map <String, Object> map = listMap.get(i);
				
				SmartCheckVO smartCheckVO = new SmartCheckVO();
				for (Map.Entry<String,Object> entry : map.entrySet()){  
					System.out.println("Key = " + entry.getKey() + 
	                        ", Value = " + entry.getValue()); 
					
					
					String key = entry.getKey();
					System.out.println("key--->"+key);
		            JSONObject obj = new  JSONObject(map.get(key).toString());
		            
		            if(key.equalsIgnoreCase("Axis1_Load")){
		            	smartCheckVO.setAxis1_Load(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis2_Load")){
		            	smartCheckVO.setAxis2_Load(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis3_Load")){
		            	smartCheckVO.setAxis3_Load(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis4_Load")){
		            	smartCheckVO.setAxis4_Load(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis1_Temp")){
		            	smartCheckVO.setAxis1_Temp(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis2_Temp")){
		            	smartCheckVO.setAxis2_Temp(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis3_Temp")){
		            	smartCheckVO.setAxis3_Temp(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis4_Temp")){
		            	smartCheckVO.setAxis4_Temp(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis1_Vib")){
		            	smartCheckVO.setAxis1_Vib(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis2_Vib")){
		            	smartCheckVO.setAxis2_Vib(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis3_Vib")){
		            	smartCheckVO.setAxis3_Vib(obj.getDouble("average"));
		            }else if(key.equalsIgnoreCase("Axis4_Vib")){
		            	smartCheckVO.setAxis4_Vib(obj.getDouble("average"));
		            }else{
		            	
		            }
		            
				}
				smartCheckVO.set_time("2019-04-17T"+time+":30:00Z");
	            smartList.add(smartCheckVO);
				time = time +1;
			}
			
			if (smartList != null) {
				System.out.println("smartList Size:" + smartList.size());
				System.out.println(smartList.toString());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return smartList;
	}
	
	public static Map<String, Object> toMap(JSONObject object) throws JSONException {
	    Map<String, Object> map = new HashMap<String, Object>();

	    Iterator<String> keysItr = object.keys();
	    while(keysItr.hasNext()) {
	        String key = keysItr.next();
	        Object value = object.get(key);

	        if(value instanceof JSONArray) {
	            value = toList((JSONArray) value);
	        }

	        else if(value instanceof JSONObject) {
	            value = toMap((JSONObject) value);
	        }
	        if(key.startsWith("Axis") || key.equalsIgnoreCase("average")){
	        	//Object actValue = object.get(value.toString());
	        	map.put(key, value.toString());
	        }
	    }
	    if(map !=null){
	    	map.remove("");
	    }
	    return map;
	}
	
	public static List<Object> toList(JSONArray array) throws JSONException {
	    List<Object> list = new ArrayList<Object>();
	    for(int i = 0; i < array.length(); i++) {
	        Object value = array.get(i);
	        if(value instanceof JSONArray) {
	            value = toList((JSONArray) value);
	        }

	        else if(value instanceof JSONObject) {
	            value = toMap((JSONObject) value);
	        }
	        list.add(value);
	    }
	    return list;
	}
}
