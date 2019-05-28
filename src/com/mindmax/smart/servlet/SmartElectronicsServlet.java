package com.mindmax.smart.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;

import com.mindmax.smart.util.SmartConstant;
import com.mindmax.smart.util.SmartUtil;

/**
 * Servlet implementation class for SmartElectronics
 */
// @WebServlet("/getSmartCheckDetails")
public class SmartElectronicsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SmartElectronicsServlet() {
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

		String chartData = getSmartElectronicsChartData(request, response);
		System.out.println("chartData-->"+chartData);
		
		String tableData = getSmartElectronicsTableData(request, response);

		String smartElectronicsData = "[" + chartData + "," + tableData + "]";

		JSONArray jsonArray = null;
		try {
			jsonArray = new JSONArray(smartElectronicsData);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");

		out.print(jsonArray);

	}

	private String getSmartElectronicsChartData(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		System.out
				.println("Inside getSmartElectronicsChartData - START " + startTime);
		JSONArray jsonArray = null;

		HttpURLConnection myURLConnection = null;
		String data = "";
		String str = "";

		String fromDate = null;
		String toDate = null;
		String assetId = null;

		assetId = request.getParameter("assetId");

		if (assetId == null) {
			try {
				throw new Exception("INVALID_ASSET_ID");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		fromDate = request.getParameter("fromDT");
		toDate = request.getParameter("toDT");

		String dateFilter = SmartUtil.populateDateFilter(fromDate, toDate);

		try {

			URL url = new URL("" + SmartConstant.AGGREGATE_TIMESERIES_URL
					+ assetId + SmartConstant.ASPECT_NAME
					+ SmartConstant.SMART_ELECTRONICS_CHART + dateFilter);
			
			System.out.println("url--->"+url.toString());

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
			if(myURLConnection.getResponseCode() == 400){
				PrintWriter out = response.getWriter();
				response.setContentType("application/json");
				out.print("BAD_REQUEST, interval aligned");
				
			} else{
				InputStream inputStream = myURLConnection.getInputStream();
	
				BufferedReader br = new BufferedReader(new InputStreamReader(
						inputStream));
	
				while (str != null) {
					str = br.readLine();
					data = data + str;
				}
	
				jsonArray = new JSONArray(data);
				System.out.println("Inside getSmartElectronicsChartData - Time Taken: "
						+ (System.currentTimeMillis() - startTime) / 1000
						+ " seconds");

			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return jsonArray.toString();
	}

	private String getSmartElectronicsTableData(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		System.out
				.println("Inside getSmartElectronicsTableData - START " + startTime);
		JSONArray jsonArray = null;

		HttpURLConnection myURLConnection = null;
		InputStream inputStream = null;

		String data = "";
		String str = "";
		String assetId = null;

		assetId = request.getParameter("assetId");

		if (assetId == null) {
			try {
				throw new Exception("INVALID_ASSET_ID");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		try {

			URL url = new URL("" + SmartConstant.TIMESERIES_URL + assetId
					+ SmartConstant.ASPECT_NAME
					+ SmartConstant.SMART_ELECTRONICS_TABLE);

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
			if(myURLConnection.getResponseCode() == 400){
				PrintWriter out = response.getWriter();
				response.setContentType("application/json");
				out.print("BAD_REQUEST, interval aligned");
				
			}else{
				inputStream = myURLConnection.getInputStream();
	
				BufferedReader br = new BufferedReader(new InputStreamReader(
						inputStream));
	
				while (str != null) {
					str = br.readLine();
					data = data + str;
				}
	
				jsonArray = new JSONArray(data);
	
				System.out.println("Inside getSmartElectronicsTableData - Time Taken: "
						+ (System.currentTimeMillis() - startTime) / 1000
						+ " seconds");
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (myURLConnection != null) {
				myURLConnection = null;
				inputStream = null;

			}
		}
		return jsonArray.toString();
	}
}
