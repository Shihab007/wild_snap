package com.wildSnap.apis.coreUtils;

import lombok.Synchronized;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@Component("idGenerator")
public class IdGenerator {
    private final int NUM_CHARS = 15;
    private String chars = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private String passwordChars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";

    private static Random r = new Random();
    private SimpleDateFormat generalFormat = new SimpleDateFormat("yyyyMMdd-HHmmss");
    private SimpleDateFormat fetchIdFormat = new SimpleDateFormat("yyyyMMddHHmmss");

    private final int TRACE_NUM_CHARS = 6;
    private String traceChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    private SimpleDateFormat traceDateFormat = new SimpleDateFormat("yyMMdd");

    private String instituteCode = "001";

    private static final int OTP_NUM_CHARS = 6;
    private static String otpChars = "0123456789";


    @Synchronized
    private String getRandomWord() {
        char[] buf = new char[NUM_CHARS];
        for (int i = 0; i < buf.length; i++) {
            buf[i] = chars.charAt(r.nextInt(chars.length()));
        }
        return new String(buf);
    }

    @Synchronized
    public String generateId() {
        Date today = new Date();
        String todayAsString = generalFormat.format(today);
        return Constant.REQEUST_PREFIX_DRWS.concat(todayAsString + "-" + getRandomWord());
    }


    @Synchronized
    public String generateOid() {
        Date today = new Date();
        String todayAsString = generalFormat.format(today);
        return todayAsString + "-" + getRandomWord();
    }
}
