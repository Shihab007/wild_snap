package com.test.apis.service;

import java.util.HashMap;
import java.util.Map;

public class SingleNumber {
    public static void main(String[] args) {
        System.out.println(new SingleNumber().singleNumber(new int[]{4,1,2,1,2}));
    }
    public int singleNumber(int[] nums) {
        Map<Integer, Integer> map =new HashMap<>();
        for (int i = 0; i < nums.length; i++)
            map.put(nums[i], map.getOrDefault(nums[i], 0)+1);

        for(Map.Entry<Integer, Integer> n : map.entrySet())
            if(n.getValue() == 1) return n.getKey();

        return 0;
    }
}
