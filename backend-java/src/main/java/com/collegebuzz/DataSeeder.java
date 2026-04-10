package com.collegebuzz;

import com.collegebuzz.model.Club;
import com.collegebuzz.model.Notice;
import com.collegebuzz.model.User;
import com.collegebuzz.repository.ClubRepository;
import com.collegebuzz.repository.NoticeRepository;
import com.collegebuzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed initial data if the database is empty
        if (userRepository.count() == 0) {
            User admin = new User("admin_1", "Admin User", "tamil515253@gmail.com", "admin", "password123");
            userRepository.save(admin);
        }

        if (noticeRepository.count() == 0) {
            Notice n1 = new Notice();
            n1.setTitle("Welcome to Campus");
            n1.setDescription("Welcome to the new academic year! We are excited to have you here.");
            n1.setTag("General");
            n1.setAuthorId("admin_1");
            noticeRepository.save(n1);

            Notice n2 = new Notice();
            n2.setTitle("Library Hours Extended");
            n2.setDescription("The library will now be open until midnight during finals week.");
            n2.setTag("Academics");
            n2.setAuthorId("admin_1");
            noticeRepository.save(n2);
        }

        if (clubRepository.count() == 0) {
            Club c1 = new Club();
            c1.setName("Computer Science Society");
            c1.setMembers(120);
            c1.setEvent("Hackathon Prep");
            c1.setTime("Friday 5:00 PM");
            c1.setLocation("Lab 3");
            clubRepository.save(c1);

            Club c2 = new Club();
            c2.setName("Debate Club");
            c2.setMembers(45);
            c2.setEvent("Weekly Meetup");
            c2.setTime("Thursday 6:00 PM");
            c2.setLocation("Room 101");
            clubRepository.save(c2);
        }
    }
}
