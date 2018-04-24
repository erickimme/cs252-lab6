if (document.documentElement.clientWidth > 768) {
    // init controller
    var controller = new ScrollMagic.Controller();

    // Parallax background
    new ScrollMagic.Scene({
            triggerElement: "#parallax",
            triggerHook: "onEnter",
        })
        .duration('200%')
        .setTween("#parallax", {
            backgroundPosition: "500% 100%",
            ease: Linear.easeNone
        })
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);


    new ScrollMagic.Scene({
            triggerElement: "#slidein2",
            triggerHook: "onLeave",
        })
        .duration('100%')
        .setTween("#parallax", {
            backgroundPosition: "500% 100%",
            ease: Linear.easeNone
        })
        .setPin("#slidein2")
//        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
            triggerElement: "#slidein3",
            triggerHook: "onLeave",
        })
        .setPin("#slidein3")
//        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);


    //Moving divs
    // Fade in
    var fadeInTimeline = new TimelineMax();
    var fadeInFrom = TweenMax.from("#opacity1", 1, {
        autoAlpha: 0
    });
    var fadeInTo = TweenMax.to("#opacity2", 0, {
        autoAlpha: 1
    });
    fadeInTimeline
        .add(fadeInFrom)
        .add(fadeInTo);

    new ScrollMagic.Scene({
            triggerElement: "#slidein2",
            offset: 100,
        })
        .setTween(fadeInTimeline)
        .duration(200)
        //    .reverse(false)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);


    var fadeInTimeline2 = new TimelineMax();
    var fadeInFrom2 = TweenMax.from("#opacity2", 1, {
        autoAlpha: 0
    });
    var fadeInTo2 = TweenMax.to("#opacity1", 0, {
        autoAlpha: 1
    });
    fadeInTimeline2
        .add(fadeInFrom2)
        .add(fadeInTo2);

    new ScrollMagic.Scene({
            triggerElement: "#slidein3",
            offset: 100,
        })
        .setTween(fadeInTimeline2)
        .duration(400)
        //    .reverse(false)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

}