package io.reham.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api")
@CrossOrigin
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping("/")
    public List<Post> GetPosts() {
        return postRepository.findAll();
    }
    @GetMapping("/{id}")
    public Post GetPost(@PathVariable Integer id) {
        return postRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Post Postpost(@RequestBody Post post) {
        return postRepository.save(post);
    }
    @PutMapping("/")
    public Post PutPost(@RequestBody Post post) {
        Post oldPost = postRepository.findById(post.getId()).orElse(null);
        oldPost.setTitle(post.getTitle());
        oldPost.setDesc(post.getDesc());
        oldPost.setCategory(post.getCategory());
        return postRepository.save(oldPost);
    }
    @DeleteMapping("/{id}")
    public Integer DeletePost(@PathVariable Integer id) {
        postRepository.deleteById(id);
        return id;
    }
}