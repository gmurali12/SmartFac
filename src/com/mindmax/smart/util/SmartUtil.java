package com.mindmax.smart.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.StringJoiner;

public class SmartUtil {

	public static String populateDateFilter(String fromDate, String toDate) {

		String filterString = "";
		Date startDate = new Date();
		Date endDate = new Date();

		try {

			if (fromDate.equalsIgnoreCase("") || toDate.equalsIgnoreCase("")) {

				Calendar startCal = Calendar.getInstance();
				startCal.set(Calendar.HOUR, 0);
				startCal.set(Calendar.MINUTE,0);
				startCal.set(Calendar.SECOND,0);
				startCal.add(Calendar.DATE, -1);
				
/*				startCal.add(Calendar.HOUR, -5);  
				startCal.add(Calendar.MINUTE, -30);
*/				
				startDate = startCal.getTime();
				System.out.println("startDate"+startDate);
				
				Calendar endCal = Calendar.getInstance();
				endCal.set(Calendar.MINUTE,23);
				endCal.set(Calendar.MINUTE,0);
				endCal.set(Calendar.SECOND,0);
				endCal.add(Calendar.DATE, -1);
				/*endCal.add(Calendar.HOUR, -5);  
				endCal.add(Calendar.MINUTE, -30);*/
				
				endDate = endCal.getTime();
				System.out.println("endDate"+endDate);

			} else {

				Date date = null;
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				date = sdf.parse(fromDate);
				Calendar startCal = Calendar.getInstance();
				startCal.setTime(date);
				startCal.add(Calendar.HOUR, -5);  
				startCal.add(Calendar.MINUTE, -30);
				startDate = startCal.getTime();

				Calendar endCal = Calendar.getInstance();
				date = sdf.parse(toDate);
				endCal.setTime(date);
				endCal.add(Calendar.HOUR, -5);  
				endCal.add(Calendar.MINUTE, -30);
				endDate = endCal.getTime();
			}

			filterString = populateFilterWithDate(startDate, endDate);

		} catch (Exception e) {
			System.out.println("INVALID DATE....");
			e.printStackTrace();
		}

		return filterString;

	}

	private static String populateFilterWithDate(Date startDate, Date endDate) {

		StringJoiner filterString = new StringJoiner("");
		try {
			String fromDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
					.format(startDate);
			filterString.add("?from=");
			filterString.add(fromDate);
			filterString.add(SmartConstant.MILLISECONDS);

			String toDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
					.format(endDate);
			filterString.add("&to=");
			filterString.add(toDate);
			filterString.add(SmartConstant.MILLISECONDS);

			populateInterval(startDate, endDate, filterString);
			return filterString.toString();

		} catch (Exception e) {
			System.out.println("INVALID DATE....");
			e.printStackTrace();
		}
		return null;

	}

	private static StringJoiner populateInterval(Date startDate, Date endDate,
			StringJoiner filterString) {

		long diff = endDate.getTime() - startDate.getTime();
		long diffHours = diff / (60 * 60 * 1000);
		int diffInDays = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

		System.out.println("diffHours:"+diffHours);
		System.out.println("diffInDays:"+diffInDays);
		
		if (diffHours >= 48) {
			filterString.add("&intervalUnit=hour&intervalValue=8");
			return filterString;
		} else if (diffHours >= 8 && diffHours < 48) {
			filterString.add("&intervalUnit=hour&intervalValue=4");
			return filterString;
		} else if (diffHours >= 2 && diffHours < 8) {
			filterString.add("&intervalUnit=minute&intervalValue=5");
			return filterString;
		} else{
			filterString.add("&intervalUnit=minute&intervalValue=2");
			return filterString;
		}

	}

	public static void main(String[] arg) {

		System.out.println(populateDateFilter(null, null));
		System.out.println("-----------------------------------");
		System.out.println(populateDateFilter("20-04-2019 00:00",
				"20-05-2019 00:00"));
	
	}
}
