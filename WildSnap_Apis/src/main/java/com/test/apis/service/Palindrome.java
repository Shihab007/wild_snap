package com.test.apis.service;

public class Palindrome {

    public static void main(String[] args) {
        System.out.println(new Palindrome().isPalindrome("A man, a plan, a canal: Panama"));
    }

    public boolean isPalindrome(String s) {
        s = s.toLowerCase().replaceAll("[^a-z0-9]","");
        int i = 0, l = s.length()-1;

        while (i<l){
            if(s.charAt(i) != s.charAt(l)) return false;
            i++;
            l--;
        }

        return true;
    }

}
