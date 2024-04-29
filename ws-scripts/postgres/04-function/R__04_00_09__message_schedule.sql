--DROP FUNCTION IF EXISTS create_sms_job(varchar(128));
CREATE OR REPLACE FUNCTION create_sms_job(p_schedule_oid varchar(128), p_sms_job_oid varchar(128))
RETURNS void AS $create_sms_job$
    DECLARE
    	v_schedule				record;	
    	v_sms_job_oid				varchar(128);
    	v_total_sms				numeric(10,0);
    	v_message_text				text;
    	v_contact				record;	
    BEGIN
    
        SELECT * INTO v_schedule FROM schedule WHERE oid = p_schedule_oid;
        
        v_total_sms := (select count(c.oid) from schedule_detail sd, contact_group_detail cgd, contact c where 1 = 1 
        and sd.schedule_oid = p_schedule_oid and sd.contact_group_oid = cgd.contact_group_oid and cgd.contact_oid = c.oid);
        
        if v_schedule.schedule_mode = 'English' then 
        	SELECT message_template_text_en INTO v_message_text FROM message_template WHERE oid = v_schedule.message_template_oid;
        else 
        	SELECT message_template_text_bn INTO v_message_text FROM message_template WHERE oid = v_schedule.message_template_oid;
        end if;
        
	v_sms_job_oid := p_sms_job_oid;
        
        if v_schedule.schedule_mode = 'Once' then 
        	
		INSERT INTO sms_job(oid, sms_job_title, started_on, message_text, total_sms, institute_oid, status, created_by)
		VALUES(v_sms_job_oid, v_schedule.name_en, v_schedule.schedule_time, v_message_text, v_total_sms, v_schedule.institute_oid, 'Pending', v_schedule.created_by);
		
		for v_contact in (select c.oid, c.name_en, c.name_bn, c.contact_no, c.email from schedule_detail sd, contact_group_detail cgd, contact c where 1 = 1 
        and sd.schedule_oid = p_schedule_oid and sd.contact_group_oid = cgd.contact_group_oid and cgd.contact_oid = c.oid) loop 
			
			INSERT INTO sms_job_detail(oid, name_en, name_bn, contact_no, email, contact_oid, sms_job_oid, institute_oid, status, created_by)
			VALUES(uuid(), v_contact.name_en, v_contact.name_bn, v_contact.contact_no, v_contact.email, 
			v_contact.oid, v_sms_job_oid, v_schedule.institute_oid, 'Pending', v_schedule.created_by);
		
		end loop;
        
        end if;
    END;
$create_sms_job$ LANGUAGE plpgsql;
-- SELECT create_sms_job('10', '10');
