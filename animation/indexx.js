    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    gsap.from("header", {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.from(".Middle .title h1", {
        scrollTrigger: {
            trigger: ".Middle .title",
            start: "top 80%", 
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".featured-news-containeer .news-griid > *", {
        scrollTrigger: {
            trigger: ".featured-news-containeer",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        stagger: 0.2, 
        duration: 0.8,
        ease: "back.out(1.2)"
    });


    gsap.from(".stories-grid .story-card", {
        scrollTrigger: {
            trigger: ".stories-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -20, 
        stagger: 0.1, 
        duration: 0.5,
        ease: "power1.out"
    });


    gsap.from(".latest-posts-containeer .feature-poost", {
        scrollTrigger: {
            trigger: ".latest-posts-containeer",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power2.out"
    });
    
    gsap.from(".latest-posts-containeer .sidebaar-posts .small-post-caard", {
        scrollTrigger: {
            trigger: ".latest-posts-containeer",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.2, 
        ease: "power1.out"
    });


    gsap.from(".video-playliistt .playlist-iteem", {
        scrollTrigger: {
            trigger: ".trending-video-containeer",
            start: "top 75%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: 20, 
        stagger: 0.08,
        duration: 0.4,
        ease: "power1.out"
    });


    gsap.from(".footeer-containeer", {
        scrollTrigger: {
            trigger: ".footeer-containeer",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power1.out"
    });
