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
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.mindmax.smart.util.SmartConstant;
import com.mindmax.smart.vo.AssetVO;

/**
 * Servlet implementation class getTimeServlet
 */
// @WebServlet("/getAssetDetails")
public class AssetServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AssetServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		getAssetDetails(request, response);
		//getDummyData(request, response);
	}

    private void getDummyData(HttpServletRequest request,
            HttpServletResponse response) {
        String data = "";
        String str = "";



        InputStream inputStream = null;
        JSONArray JData = new JSONArray();

        try {

            inputStream = new FileInputStream(new File(
            		"/home/tgi-user/git/SmartFac/src/com/mindmax/smart/servlet/API_Asset_Data.txt"));
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    inputStream));

            while (str != null) {
				str = br.readLine();
				data = data + str;
			}
           
            JSONObject jsonObj = new JSONObject(data);

            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            out.print(jsonObj);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
	protected void getAssetDetails(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		HttpURLConnection myURLConnection = null;
		String data = "";
		String str = "";

		try {

			URL url = new URL("" + SmartConstant.ASSET_URL);

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

			AssetVO assetVO = parseVoFromRequest(data,AssetVO.class);
			
			Gson gson = new Gson();
			String jsonInString = gson.toJson(assetVO);
			JSONObject jsonObj = new JSONObject(jsonInString);
			
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			out.print(jsonObj);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public AssetVO parseVoFromRequest(String requestString,Class className) throws Exception {
		AssetVO retVal = null;
		
		try {
			Gson gson = new Gson();
			
			JSONObject ja = new JSONObject(requestString);
			JSONArray array = ja.getJSONObject("_embedded").names();
			System.out.println("array-->"+array);
			System.out.println("array length-->"+array.length());
			
			if (array == null || array.length() == 0) {
				return null;
			}
			
			for (int i = 0; i < array.length(); i++) {
				
				String name = array.get(i).toString();
				System.out.println("name->"+name);
				
				JSONArray value = ja.getJSONObject("_embedded").getJSONArray(name);
				System.out.println("value->"+value);
				
				retVal = (AssetVO) gson.fromJson(value.get(0).toString(),className);
				if(retVal!=null){
					System.out.println("Asset ID----------->"+retVal.getAssetId());
				}
				
			}
			
			String jsonString = gson.toJson(retVal);

            System.out.println(""+jsonString);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return retVal;
	}	
}
