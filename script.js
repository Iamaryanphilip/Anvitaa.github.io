/* =====================================================
   ANVITAA ♡
   CLEAN & COMPLETE SCRIPT.JS

   Music + Vinyl + Photos + Letter + Hearts
===================================================== */


/* =====================================================
   MUSIC ELEMENTS
===================================================== */

const music = document.getElementById("backgroundMusic");

const currentSong =
    document.getElementById("currentSong");

const songArtist =
    document.getElementById("songArtist");

const songCounter =
    document.getElementById("songCounter");

const playButton =
    document.getElementById("mainPlayButton");

const playIcon =
    document.getElementById("playIcon");

const vinylRecord =
    document.getElementById("vinylRecord");

const prevButton =
    document.getElementById("prevSong");

const nextButton =
    document.getElementById("nextSong");

const songDots =
    document.getElementById("songDots");


/* =====================================================
   SONG LIST
===================================================== */

const songs = [

    {
        title: "Our Song",
        artist: "A song for you ♡",
        file: "./music/song1.mp3"
    },

    {
        title: "Our Memories",
        artist: "For the beautiful memories ♡",
        file: "./music/song2.mp3"
    },

    {
        title: "A Song For Anvitaa",
        artist: "Because you're special ♡",
        file: "./music/song3.mp3"
    },

    {
        title: "Forever",
        artist: "One more song for you ♡",
        file: "./music/song4.mp3"
    }

];


let currentSongIndex = 0;


/* =====================================================
   LOAD SONG
===================================================== */

function loadSong(index) {

    if (!music || songs.length === 0) {
        return;
    }


    /* Keep index inside song list */

    if (index < 0) {

        index = songs.length - 1;

    }

    if (index >= songs.length) {

        index = 0;

    }


    currentSongIndex = index;


    const song =
        songs[currentSongIndex];


    /* Change audio */

    music.src = song.file;


    /* Update title */

    if (currentSong) {

        currentSong.textContent =
            song.title;

    }


    /* Update artist */

    if (songArtist) {

        songArtist.textContent =
            song.artist;

    }


    /* Update counter */

    if (songCounter) {

        songCounter.textContent =
            String(currentSongIndex + 1)
                .padStart(2, "0")
            +
            " / "
            +
            String(songs.length)
                .padStart(2, "0");

    }


    /* Reload audio */

    music.load();


    /* Update dots */

    updateSongDots();

}


/* =====================================================
   PLAY MUSIC
===================================================== */

function playMusic() {

    if (!music) {
        return;
    }


    music.play()
        .then(function () {

            /* Change play icon */

            if (playIcon) {

                playIcon.textContent =
                    "❚❚";

            }


            /* Spin vinyl */

            if (vinylRecord) {

                vinylRecord.classList.add(
                    "playing"
                );

            }

        })
        .catch(function (error) {

            console.log(
                "Audio could not play:",
                error
            );

        });

}


/* =====================================================
   PAUSE MUSIC
===================================================== */

function pauseMusic() {

    if (!music) {
        return;
    }


    music.pause();


    /* Change icon */

    if (playIcon) {

        playIcon.textContent =
            "▶";

    }


    /* Stop vinyl */

    if (vinylRecord) {

        vinylRecord.classList.remove(
            "playing"
        );

    }

}


/* =====================================================
   PLAY / PAUSE
===================================================== */

function toggleMusic() {

    if (!music) {
        return;
    }


    if (music.paused) {

        playMusic();

    } else {

        pauseMusic();

    }

}


/* =====================================================
   NEXT SONG
===================================================== */

function nextSong() {

    if (!songs.length) {
        return;
    }


    currentSongIndex++;


    if (
        currentSongIndex >=
        songs.length
    ) {

        currentSongIndex = 0;

    }


    loadSong(
        currentSongIndex
    );


    playMusic();

}


/* =====================================================
   PREVIOUS SONG
===================================================== */

function previousSong() {

    if (!songs.length) {
        return;
    }


    /*
       If the song has been playing
       for more than 3 seconds,
       restart the current song.
    */

    if (
        music &&
        music.currentTime > 3
    ) {

        music.currentTime = 0;

        return;

    }


    currentSongIndex--;


    if (
        currentSongIndex < 0
    ) {

        currentSongIndex =
            songs.length - 1;

    }


    loadSong(
        currentSongIndex
    );


    playMusic();

}


/* =====================================================
   PLAY SPECIFIC SONG
===================================================== */

function playSong(index) {

    if (
        index < 0 ||
        index >= songs.length
    ) {

        return;

    }


    loadSong(index);

    playMusic();

}


/* =====================================================
   BUTTON EVENTS
===================================================== */


/* Play button */

if (playButton) {

    playButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* Previous */

if (prevButton) {

    prevButton.addEventListener(
        "click",
        previousSong
    );

}


/* Next */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSong
    );

}


/* =====================================================
   WHEN SONG ENDS
===================================================== */

if (music) {

    music.addEventListener(
        "ended",
        function () {

            nextSong();

        }
    );

}


/* =====================================================
   SONG DOTS
===================================================== */

function createSongDots() {

    if (!songDots) {
        return;
    }


    songDots.innerHTML = "";


    songs.forEach(
        function (song, index) {

            const dot =
                document.createElement(
                    "button"
                );


            dot.className =
                "song-dot";


            dot.setAttribute(
                "type",
                "button"
            );


            dot.setAttribute(
                "aria-label",
                "Play " + song.title
            );


            dot.addEventListener(
                "click",
                function () {

                    playSong(index);

                }
            );


            songDots.appendChild(
                dot
            );

        }
    );


    updateSongDots();

}


/* =====================================================
   UPDATE ACTIVE SONG DOT
===================================================== */

function updateSongDots() {

    if (!songDots) {
        return;
    }


    const dots =
        songDots.querySelectorAll(
            ".song-dot"
        );


    dots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index ===
                currentSongIndex
            );

        }
    );

}


/* =====================================================
   START WEBSITE
===================================================== */

function startWebsite() {

    const story =
        document.getElementById(
            "story"
        );


    /* Scroll to story */

    if (story) {

        story.scrollIntoView({
            behavior: "smooth"
        });

    }


    /* Start music */

    if (
        music &&
        music.paused
    ) {

        playMusic();

    }

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHearts() {

    const container =
        document.querySelector(
            ".hearts"
        );


    if (!container) {
        return;
    }


    setInterval(
        function () {

            const heart =
                document.createElement(
                    "div"
                );


            heart.className =
                "heart";


            const symbols = [
                "♡",
                "♥",
                "♡",
                "✦"
            ];


            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            heart.style.left =
                Math.random() *
                100 +
                "%";


            heart.style.fontSize =
                14 +
                Math.random() *
                22 +
                "px";


            heart.style.animationDuration =
                8 +
                Math.random() *
                7 +
                "s";


            container.appendChild(
                heart
            );


            setTimeout(
                function () {

                    heart.remove();

                },
                17000
            );


        },
        1400
    );

}


/* =====================================================
   HEARTS WHEN CLICKING
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        /*
           Don't create click hearts
           inside photo viewer.
        */

        if (
            event.target.closest(
                ".photo-viewer"
            )
        ) {

            return;

        }


        const container =
            document.querySelector(
                ".hearts"
            );


        if (!container) {
            return;
        }


        const symbols = [
            "♥",
            "♡",
            "❤",
            "✦"
        ];


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const heart =
                document.createElement(
                    "div"
                );


            heart.className =
                "tap-heart";


            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            heart.style.left =
                event.clientX +
                "px";


            heart.style.top =
                event.clientY +
                "px";


            heart.style.setProperty(
                "--x",
                (
                    Math.random() *
                    120 -
                    60
                ) +
                "px"
            );


            heart.style.setProperty(
                "--y",
                (
                    Math.random() *
                    -120 -
                    40
                ) +
                "px"
            );


            heart.style.fontSize =
                14 +
                Math.random() *
                16 +
                "px";


            container.appendChild(
                heart
            );


            setTimeout(
                function () {

                    heart.remove();

                },
                1200
            );

        }

    }
);


/* =====================================================
   FINAL SURPRISE
===================================================== */

function createHearts() {

    const surprise =
        document.getElementById(
            "surprise"
        );


    if (surprise) {

        surprise.innerHTML = `

            <div class="surprise-message">

                <span>♡</span>

                <p>
                    You are, and always will be,
                    someone very special to me. ❤️
                </p>

            </div>

        `;

    }


    const container =
        document.querySelector(
            ".hearts"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(
            function () {

                const heart =
                    document.createElement(
                        "div"
                    );


                heart.className =
                    "tap-heart";


                heart.textContent =
                    "♥";


                heart.style.left =
                    Math.random() *
                    100 +
                    "%";


                heart.style.top =
                    "80%";


                heart.style.setProperty(
                    "--x",
                    (
                        Math.random() *
                        200 -
                        100
                    ) +
                    "px"
                );


                heart.style.setProperty(
                    "--y",
                    (
                        Math.random() *
                        -300 -
                        100
                    ) +
                    "px"
                );


                container.appendChild(
                    heart
                );


                setTimeout(
                    function () {

                        heart.remove();

                    },
                    1500
                );


            },
            i * 80
        );

    }

}


/* =====================================================
   LETTER
===================================================== */

function openLetter() {

    const envelope =
        document.querySelector(
            ".envelope"
        );


    const letter =
        document.getElementById(
            "letterContent"
        );


    if (
        !envelope ||
        !letter
    ) {

        return;

    }


    envelope.classList.toggle(
        "open"
    );


    letter.classList.toggle(
        "open"
    );

}


/* =====================================================
   PHOTO VIEWER
===================================================== */

function openPhoto(element) {

    const viewer =
        document.getElementById(
            "photoViewer"
        );


    const largePhoto =
        document.getElementById(
            "largePhoto"
        );


    if (
        !viewer ||
        !largePhoto
    ) {

        return;

    }


    const image =
        element.querySelector(
            "img"
        );


    if (!image) {
        return;
    }


    largePhoto.src =
        image.src;


    largePhoto.alt =
        image.alt;


    viewer.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE PHOTO
===================================================== */

function closePhoto() {

    const viewer =
        document.getElementById(
            "photoViewer"
        );


    if (!viewer) {
        return;
    }


    viewer.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closePhoto();

        }

    }
);


/* =====================================================
   PHOTO VIEWER BACKGROUND CLICK
===================================================== */

const photoViewer =
    document.getElementById(
        "photoViewer"
    );


if (photoViewer) {

    photoViewer.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                photoViewer
            ) {

                closePhoto();

            }

        }
    );

}


/* =====================================================
   NAVIGATION EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const nav =
            document.querySelector(
                ".top-nav"
            );


        if (!nav) {
            return;
        }


        if (
            window.scrollY > 80
        ) {

            nav.style.background =
                "rgba(20,38,61,.94)";

            nav.style.backdropFilter =
                "blur(15px)";

        } else {

            nav.style.background =
                "linear-gradient(rgba(10,20,34,.45), transparent)";

            nav.style.backdropFilter =
                "none";

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Load first song
        */

        loadSong(0);


        /*
           Create song dots
        */

        createSongDots();


        /*
           Start floating hearts
        */

        createFloatingHearts();

    }
);
