package com.wildSnap.apis.Util.image;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.FieldPosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import lombok.Synchronized;

public class ImageUploadUtils {
	
	static Connection connection = null;
    static int getValue;
    
    private static SimpleDateFormat generalFormat = new SimpleDateFormat("yyyyMMdd");

    	
//    @Synchronized
//    public static String generateOid(int count) {
//	    Date today = new Date();
//	    
//	    String todayAsString = generalFormat.format(today);
//	    return todayAsString + "-" + String.format("%07d", count);
//    }
    
    @Synchronized
    public static String generateOid(int count) {
	    Date today = new Date();
	    
	    Random rnd = new Random();
        int number = rnd.nextInt(999999);
	    
	    String todayAsString = generalFormat.format(today);
	    return todayAsString + "-" + number + "-" + String.format("%07d", count);
    }
    

    public static String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        Random rnd = new Random();
        int number = rnd.nextInt(999999);		

        // this will convert any number sequence into 6 character.
        return String.format("%09d", number);
    }
    

    public static String getRequisitionId() {
        StringBuffer stringBuffer = new StringBuffer();
        Date now = new Date();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssZ");
        simpleDateFormat.format(now, stringBuffer, new FieldPosition(0));
        // this will convert any number sequence into 6 character.
        return stringBuffer.toString()+getRandomNumberString();
    }


    
    @Synchronized
    public static String generateRequisitionId(int count) {
    Date today = new Date();
    
    String todayAsString = generalFormat.format(today);
    return ImageUploadConstants.REQEUST_PREFIX_DOER.concat(todayAsString + "-" + String.format("%07d", count));
    }
    
    
    @Synchronized
    public static String generateProductShipmentId(int count) {
    Date today = new Date();
    
    String todayAsString = generalFormat.format(today);
    return ImageUploadConstants.REQEUST_PRODUCT_SHIPMENT.concat(todayAsString + "-" + String.format("%07d", count));
    }

	
    
    
//    public static String generateRequisitionId() {
//    	
//    	int requisitionIdInitialize = 1; 
//    	String requisitionIdname="DOER-";
//    	String symble="-";
//    	int requisitionIdIncrease=requisitionIdInitialize+1;
//        String id = String.format("%09d", requisitionIdIncrease); 
//    	return requisitionIdname+getCurrentDate()+symble+id;
//    }
	    
	public static String getCurrentDate() {
	    Date date = new Date();
	    SimpleDateFormat requisitionIdDateFormat = new SimpleDateFormat("YYYYMMdd");
	    return requisitionIdDateFormat.format(date);
	}
	
	
	
	
	public static String getCurrenttime() {
	    Date date = new Date();
	    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
		    return simpleDateFormat.format(date);
	}

   
	public static String getRequisitionIdgenerator() {
		int RequisitionId = 000001;
		RequisitionId+=1; 
	    String id=String.valueOf(RequisitionId);
	    String result=RequisitionId+id;
		
		
		return getRequisitionId()+result;
		
	}

	public static int generateProductId(String string) {
		try {
			String productIdQuery = null;
			Statement st = connection.createStatement();
			ResultSet set=st.executeQuery(productIdQuery);
			if(set.next()) {
			return	getValue=Integer.parseInt(set.getString(1));
				
			}
			
		}catch(Exception e){
			
		}
		return getValue;
	}


	public static String insertSerialNo() {
		
		generateProductId("select count(ProductId)+000001 from requisitiondetail");
		String insertProductId="insert into requisitiondetail values(?)";
		String pro="PRD-"+getValue;
		
		try {
			PreparedStatement ps = connection.prepareStatement(insertProductId);
			ps.setString(1, pro);
		ps.execute();
			
		}catch(Exception e) {
			
		}
		
		return pro;
	}
    
    
    public static class MyUniqueNumber {
    private static MyUniqueNumber myUniqueNumber;  
    int number;  
    String id = "Prd-";
    int seedValue=000001;
       
	    private MyUniqueNumber(){ 
	        number = seedValue; 
	    }  
	   
	    public static MyUniqueNumber getInstance(){  
	        if(myUniqueNumber == null){  
	            myUniqueNumber=new MyUniqueNumber();  
	        }  
	        return myUniqueNumber;  
	    }  
	       
	    public String getUniqueNumber(){  
	        number+=1; 
	        String s=String.valueOf(number);
	       String result = id+s;
	        return result;  
	    }  
    }
}
