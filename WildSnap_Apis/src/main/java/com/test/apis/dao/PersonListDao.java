package com.test.apis.dao;

import com.test.apis.model.PersonListModel;
import com.test.apis.request.PersonListRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static net.sf.jsqlparser.parser.feature.Feature.update;

@Repository
public class PersonListDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<PersonListModel> personDao(PersonListRequest personRequest) throws Exception{
        String sql = " select * from person where 1 = 1 ";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        List<PersonListModel> result = new ArrayList<PersonListModel>();
        for(Map<String, Object> row:rows){
            PersonListModel person = new PersonListModel();
            person.setId((String) row.get("id"));
            person.setName((String) row.get("name"));
            person.setValue((String) row.get("value"));
            result.add(person);
        }
        return result;
    }
}
