package com.wildSnap.apis.dao.classifyimage;

import com.wildSnap.apis.request.classifyimage.ClassifyImageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClassifyImageDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int save(ClassifyImageRequest request) throws Exception{
        try {

            String sql = "insert into wild_snap.uploaded_image(oid, image_url, image_path, image_name, image_description) values(?,?,?,?,?)";
            return  jdbcTemplate.update(sql,
                    request.getBody().getOid(),
                    request.getBody().getImageUrl(),
                    request.getBody().getImagePath(),
                    request.getBody().getImageName(),
                    request.getBody().getImageDescription()
            );
        }catch(Exception e){
            e.printStackTrace();
        }
        return 0;

    }
}
