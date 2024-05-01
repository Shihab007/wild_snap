package com.wildSnap.apis.Util.image;

import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.text.FieldPosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.joda.time.DateTime;

import com.google.gson.GsonBuilder;

import lombok.Synchronized;

public class UtilService {

    public static String generateOid ()
    {
        return getRandomNumberString()+System.currentTimeMillis();
    }

    public static String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

    public static String applicationId() {
        StringBuffer stringBuffer = new StringBuffer();
        Date now = new Date();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssZ");
        simpleDateFormat.format(now, stringBuffer, new FieldPosition(0));
        // this will convert any number sequence into 6 character.
        return stringBuffer.toString()+getRandomNumberString();
    }

    @Synchronized
	public static String print(Object object) {
		GsonBuilder builder = new GsonBuilder()
			.registerTypeAdapter(BigDecimal.class, new GsonBigDecimalUtil())
			.registerTypeAdapter(DateTime.class, new GsonDateTimeUtil());
		builder.excludeFieldsWithoutExposeAnnotation();
		builder.excludeFieldsWithModifiers(Modifier.STATIC, Modifier.TRANSIENT, Modifier.VOLATILE, Modifier.FINAL);
		if (ImageUploadConstants.PREETY_JSON) {
			builder.setPrettyPrinting();
		}
		return builder.create().toJson(object);
	}
}
