let myAnim , secondOne
const scrollAnimation = () => {
    const pages = [...document.querySelectorAll('.page')];
    const container = document.querySelector(".container");
    if (pages || container === null) return 
    console.log(container, pages)
    myAnim = gsap.to(pages, {
        xPercent: -100 * (pages.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            snap: 1 / (pages.length - 1),
            // base vertical scrolling on how wide the container is so it feels more natural.
            end: () => "+=" + container.offsetWidth
        }
    });
}

const yoBro = () => {
    const facts = [...document.querySelectorAll('.fact')];
    console.log(facts)

    secondOne = gsap.to(facts, {
        xPercent: -115 * (facts.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".factsContainer",
            pin: true,
            scrub: 1,
            snap: 1 / (facts.length - 1),
            // base vertical scrolling on how wide the container is so it feels more natural.
            end:  `+=4320`
        }
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if (typeof myAnim === "undefined" && [...document.querySelectorAll('.page')] !== []) {
    scrollAnimation();
}
if(typeof secondOne === "undefined") 
    setTimeout(yoBro , 10000)

barba.init({
    sync: true,
    transitions: [{
        name: 'transition-base',
        async leave() {
            const done = this.async();
            await delay(1000);
            done();
        },
        async enter() {
            document.documentElement.scrollTop = 0;
            setTimeout(scrollAnimation, 10);
            // setTimeout(yoBro , 10)
        },
    }],
    views: [
        {
            namespace: 'about',
            afterEnter() {
                // setTimeout(yoBro , 10) 
            },
        }
    ],
});