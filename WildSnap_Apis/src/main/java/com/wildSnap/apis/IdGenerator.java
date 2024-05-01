package com.wildSnap.apis;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.springframework.stereotype.Component;

import lombok.Synchronized;

@Component("idGenerator")
public class IdGenerator {
	private SimpleDateFormat generalFormat = new SimpleDateFormat("yyyyMMdd-HHmmss");
	private final int NUM_CHARS = 15;
	private String chars = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static Random r = new Random();

	@Synchronized
	private String getRandomWord() {
		char[] buf = new char[NUM_CHARS];
		for (int i = 0; i < buf.length; i++) {
			buf[i] = chars.charAt(r.nextInt(chars.length()));
		}
		return new String(buf);
	}


	@Synchronized
	public String generateOid() {
		Date today = new Date();
		String todayAsString = generalFormat.format(today);
		return todayAsString + "-" + getRandomWord();
	}
}
