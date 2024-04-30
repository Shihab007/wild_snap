package com.wildSnap.apis;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TestApisApplication implements CommandLineRunner {

//	@Autowired
//	private PersonListDao dao;

	public static void main(String[] args) {
		SpringApplication.run(TestApisApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Works..!");
	}
}
