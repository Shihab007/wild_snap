package com.test.apis.service;

import java.util.Arrays;

public class TwoEvents {
    public static void main(String[] args) {
        String[] event1 = {"01:15","02:00"};
        String[] event2 = {"02:00","03:00"};
        System.out.println(new TwoEvents().haveConflict(event1, event2));

    }

    public boolean haveConflict(String[] event1, String[] event2) {
        String[] startEnd1 = event1;
        String[] startEnd2 = event2;

        int start1 = toMinutes(startEnd1[0]);
        int end1 = toMinutes(startEnd1[1]);
        int start2 = toMinutes(startEnd2[0]);
        int end2 = toMinutes(startEnd2[1]);

        return  start1 <= end2 && end1 >= start2;
    }

    private int toMinutes(String time){
        String[] parts = time.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);
        return hours * 60 + minutes;
    }
}
