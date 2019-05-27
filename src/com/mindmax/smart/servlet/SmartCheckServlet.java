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
 * Servlet implementation class getTimeServlet
 */
// @WebServlet("/getSmartCheckDetails")
public class SmartCheckServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

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

		String chartData = getSmartCheckChartData(request, response);
		String tableData = getSmartCheckTableData(request, response);

		String smartCheckData = "[" + chartData + "," + tableData + "]";

		JSONArray jsonArray = null;
		try {
			jsonArray = new JSONArray(smartCheckData);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		

		out.print(jsonArray);

	}

	private String getSmartCheckChartData(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		System.out
				.println("Inside getSmartCheckChartData - START " + startTime);
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
		
		System.out.println(fromDate+"&&&&&&&&&"+toDate);

		String dateFilter = SmartUtil.populateDateFilter(fromDate, toDate);

		try {

			URL url = new URL("" + SmartConstant.AGGREGATE_TIMESERIES_URL
					+ assetId + SmartConstant.ASPECT_NAME
					+ SmartConstant.SMART_CHECK_SELECT + dateFilter);

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

			jsonArray = new JSONArray(data);
			System.out.println("Inside getSmartCheckChartData - Time Taken: "
					+ (System.currentTimeMillis() - startTime) / 1000
					+ " seconds");

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return jsonArray.toString();
	}

	private String getSmartCheckTableData(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		System.out
				.println("Inside getSmartCheckTableData - START " + startTime);
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
					+ SmartConstant.SMART_CHECK_SELECT);

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

			inputStream = myURLConnection.getInputStream();

			BufferedReader br = new BufferedReader(new InputStreamReader(
					inputStream));

			while (str != null) {
				str = br.readLine();
				data = data + str;
			}

			jsonArray = new JSONArray(data);

			System.out.println("Inside getSmartCheckDetails - Time Taken: "
					+ (System.currentTimeMillis() - startTime) / 1000
					+ " seconds");

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
