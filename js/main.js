/* =========================================================
   LOAD GALLERY
========================================================= */

async function loadGallery() {

    try {

        const response =
            await fetch("resource/gallery.json");


        if (!response.ok) {

            throw new Error(
                "Cannot load gallery.json"
            );

        }


        const data =
            await response.json();


        createGallery(data.images);

    }

    catch (error) {

        console.error(
            "Gallery error:",
            error
        );

    }

}


/* =========================================================
   CREATE GALLERY
========================================================= */

function createGallery(images) {

    const gallery =
        document.getElementById("piano-grid");


    const counter =
        document.getElementById("collection-count");


    /*
     * Show number of images
     */

    counter.textContent =
        String(images.length).padStart(2, "0");


    /*
     * Create every piano
     */

    images.forEach((piano, index) => {

        const card =
            document.createElement("article");


        card.className =
            "piano-card reveal hover-target";


        /*
         * Image wrapper
         */

        const imageWrapper =
            document.createElement("div");


        imageWrapper.className =
            "piano-image-wrapper";


        /*
         * Image
         */

        const image =
            document.createElement("img");


        image.className =
            "piano-image";


        image.src =
            piano.url;


        image.alt =
            piano.name;


        image.loading =
            index < 2
                ? "eager"
                : "lazy";


        /*
         * Information
         */

        const info =
            document.createElement("div");


        info.className =
            "piano-info";


        const name =
            document.createElement("div");


        name.className =
            "piano-name";


        name.textContent =
            piano.name;


        const type =
            document.createElement("div");


        type.className =
            "piano-type";


        type.textContent =
            piano.type || "";


        /*
         * Build HTML
         */

        imageWrapper.appendChild(
            image
        );


        info.appendChild(
            name
        );


        info.appendChild(
            type
        );


        card.appendChild(
            imageWrapper
        );


        card.appendChild(
            info
        );


        gallery.appendChild(
            card
        );


        /*
         * Add hover effects
         */

        setupCardEffect(card);

    });


    /*
     * Start scroll observer
     */

    setupRevealObserver();

}


/* =========================================================
   CARD MOUSE EFFECT
========================================================= */

function setupCardEffect(card) {

    const image =
        card.querySelector(".piano-image");


    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width - 0.5;


            const y =
                (event.clientY - rect.top)
                / rect.height - 0.5;


            image.style.transform =
                `
                scale(1.08)
                translate(
                    ${x * 8}px,
                    ${y * 8}px
                )
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            image.style.transform =
                "scale(1.02) translate(0, 0)";

        }
    );


    /*
     * Cursor effect
     */

    card.addEventListener(
        "mouseenter",
        () => {

            document.body
                .classList
                .add("cursor-hover");

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            document.body
                .classList
                .remove("cursor-hover");

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupRevealObserver() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   HERO LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document
            .querySelector(".hero")
            .classList
            .add("loaded");

    }
);


/* =========================================================
   PARALLAX
========================================================= */

const parallaxImages =
    document.querySelectorAll(
        ".feature-image, .final-image img"
    );


window.addEventListener(
    "scroll",
    () => {

        parallaxImages.forEach(
            image => {

                const rect =
                    image.parentElement
                        .getBoundingClientRect();


                const center =
                    rect.top +
                    rect.height / 2;


                const distance =
                    center -
                    window.innerHeight / 2;


                const movement =
                    distance * -0.08;


                image.style.transform =
                    `translateY(${movement}px)`;

            }
        );

    }
);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.querySelector(".cursor");


const ring =
    document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        cursor.style.left =
            mouseX + "px";


        cursor.style.top =
            mouseY + "px";

    }
);


function animateCursor() {

    ringX +=
        (mouseX - ringX) * 0.12;


    ringY +=
        (mouseY - ringY) * 0.12;


    ring.style.left =
        ringX + "px";


    ring.style.top =
        ringY + "px";


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================================================
   NAVIGATION HOVER
========================================================= */

document
    .querySelectorAll(".hover-target")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body
                    .classList
                    .add("cursor-hover");

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body
                    .classList
                    .remove("cursor-hover");

            }
        );

    });


/* =========================================================
   START
========================================================= */

loadGallery();