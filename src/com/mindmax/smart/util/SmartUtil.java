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
				startDate = startCal.getTime();
				
				Calendar endCal = Calendar.getInstance();
				endCal.set(Calendar.HOUR,23);
				endCal.set(Calendar.MINUTE,0);
				endCal.set(Calendar.SECOND,0);
				endDate = endCal.getTime();
				
				System.out.println("Inside IF ");
				System.out.println("startDate->"+startDate);
				System.out.println("endDate->"+endDate);

			} else {

				Date date = null;
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				date = sdf.parse(fromDate);
				Calendar startCal = Calendar.getInstance();
				startCal.setTime(date);
				startCal.set(Calendar.HOUR, 0);
				startCal.set(Calendar.MINUTE,0);
				startCal.set(Calendar.SECOND,0);
				startDate = startCal.getTime();

				Calendar endCal = Calendar.getInstance();
				date = sdf.parse(toDate);
				endCal.setTime(date);
				endCal.set(Calendar.HOUR_OF_DAY,8);
				endCal.set(Calendar.MINUTE,0);
				endCal.set(Calendar.SECOND,0);
				
				int diffInDays = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
				if(diffInDays>90){
					endCal.set(Calendar.HOUR_OF_DAY,0);
				}
				
				endDate = endCal.getTime();
				
			}

			filterString = populateFilterWithDate(startDate, endDate);
			System.out.println("filterString----->"+filterString);

		} catch (Exception e) {
			System.out.println("INVALID DATE....");
			e.printStackTrace();
		}

		return filterString;

	}

	private static String populateFilterWithDate(Date startDate, Date endDate) {

		StringJoiner filterString = new StringJoiner("");
		try {
			String fromDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm")
					.format(startDate);
			filterString.add("&from=");
			filterString.add(fromDate);
			filterString.add(SmartConstant.TIMEZONE);

			String toDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm")
					.format(endDate);
			filterString.add("&to=");
			filterString.add(toDate);
			filterString.add(SmartConstant.TIMEZONE);

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
		System.out.println("diffHours--->"+diffHours);
		System.out.println("diffInDays--->"+diffInDays);

		if (diffInDays > 90) {
			filterString.add("&intervalUnit=hour&intervalValue=24");
			return filterString;
		}else if (diffInDays > 60 && diffInDays <= 90) {
			filterString.add("&intervalUnit=hour&intervalValue=16");
			return filterString;
		}else if (diffInDays > 30 && diffInDays <= 60) {
			filterString.add("&intervalUnit=hour&intervalValue=8");
			return filterString;
		}else if (diffInDays > 8 && diffInDays <=30) {
			filterString.add("&intervalUnit=hour&intervalValue=4");
			return filterString;
		} else if (diffInDays > 1 && diffInDays <=7) {
			filterString.add("&intervalUnit=hour&intervalValue=1");
			return filterString;
		} else if (diffHours >= 24 && diffHours < 48) {
			filterString.add("&intervalUnit=hour&intervalValue=1");
			return filterString;
		} else{
			filterString.add("&intervalUnit=minute&intervalValue=10");
			return filterString;
		}

	}

	public static void main(String[] arg) {

		System.out.println(populateDateFilter("01-04-2019 00:00",
				"31-05-2019 23:00"));
	
	}
}
