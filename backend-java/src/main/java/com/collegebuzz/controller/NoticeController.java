package com.collegebuzz.controller;

import com.collegebuzz.model.Notice;
import com.collegebuzz.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "*")
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return noticeRepository.save(notice);
    }
}
