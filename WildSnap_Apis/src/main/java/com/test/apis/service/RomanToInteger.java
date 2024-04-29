package com.test.apis.service;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

class RomanToInteger {

    public static void main(String[] args) {
        RomanToInteger conv = new RomanToInteger();

        Scanner scanner = new Scanner(System.in);

        System.out.println("s =");
        String input = scanner.nextLine();

        int result = conv.romanToInt(input);
        System.out.println(result);

        scanner.close();

    }

    public int romanToInt(String s) {
        Map<Character,Integer> map=new HashMap<>();
        map.put('I',1);
        map.put('V',5);
        map.put('X',10);
        map.put('L',50);
        map.put('C',100);
        map.put('D',500);
        map.put('M',1000);

        int result=0;
        int n=s.length();
        for(int i=0;i<n;i++){
            int currentValue=map.get(s.charAt(i));
            if(i<n-1 && currentValue<map.get(s.charAt(i+1))){
                result-=currentValue;
            }else{
                result+=currentValue;
            }
        }
        return result;

    }
}
