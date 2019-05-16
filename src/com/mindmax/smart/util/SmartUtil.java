package com.mindmax.smart.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class SmartUtil {

	public static String getFormattedDate(String date) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		Calendar c = Calendar.getInstance();
		try {
			c.setTime(sdf.parse(date));
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Set GMT hours
		c.add(Calendar.HOUR, -5);
		c.add(Calendar.MINUTE, -30);

		return sdf.format(c.getTime() + ".00Z");

	}

	public static void main(String[] arg) {

		System.out.println(getFormattedDate("20-04-19 15:30"));
	}
}
