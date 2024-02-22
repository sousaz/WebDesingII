package com.sosa.ntier;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.sosa.ntier.model.User;
import com.sosa.ntier.repository.UserRepository;

@SpringBootApplication
public class NTierApplication {

	public static void main(String[] args) {
		SpringApplication.run(NTierApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository){
		return args -> {
			userRepository.deleteAll();
			User user = new User();
			user.setName("aldaberto");
			user.setAge(19);
			userRepository.save(user);
		};
	}

}
