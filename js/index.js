// When document is ready
$(() => {

    const NAV_LINKS_CONTAINER = $(".nav-links")[0];
    const NAV_LINKS = $(".nav-link"); // Actuanl nav link buttons

    // Add onload="SVGInject(this)" to all nav-icons
    SVGInject($(".icon:not(.not-svg)"));

    // Add Click Function to Nav Links
    NAV_LINKS.click(function () {
        NAV_LINKS.each(function () {
            $(this)[0].classList.remove("active");
        })
        $(this)[0].classList.add("active");
    })

    // Toggle Nav
    $(".nav-toggle-btn").click(function () {
        let icon = $(this).find('img');
        if (NAV_LINKS_CONTAINER.classList.contains("open")) {
            NAV_LINKS_CONTAINER.classList.remove("open");
            icon.attr('src', 'assets/icons/menu.svg');
            icon.fadeOut(0).fadeIn(300);
        } else {
            NAV_LINKS_CONTAINER.classList.add("open");
            icon.attr('src', 'assets/icons/close.svg');
            icon.fadeOut(0).fadeIn(300);
        }
    })

    $(window).resize(function () {
        if (window.innerWidth > 1150) {
            if (NAV_LINKS_CONTAINER.classList.contains("open")) {
                NAV_LINKS_CONTAINER.classList.remove("open");
                // Reset Menu Icon
                $('.nav-toggle-btn').find('img').attr('src', 'assets/icons/menu.svg');
            }
        }
    })

    function createGallery(url, parent) {
        Get(url).then(data => {
            var images = parseJson(data);
            images.forEach(image => {
                createImage(parent, image);
            })
        });
    }

    // Create Gallery in Home Page
    let paths = document.URL.split('/');
    let currentPage = paths[paths.length - 1];
    if (currentPage == "index.html" || currentPage == "") {
        let imageContainer = $('.images-container')[0];
        let link = randomUrl();
        createGallery(link, imageContainer);
    }

    $('.close-btn').on('click', function () {
        closeFullscreen();
        document.body.classList.remove('overflow-hidden');
        let imageViewer = $('.image-viewer');
        imageViewer[0].classList.remove('active');
        imageViewer.find('img').attr('src', '');
        $('.fullscreen-btn').find('img').attr('src', 'assets/icons/maximize.svg');
    })

    $('.fullscreen-btn').on('click', function () {
        let icon = $(this).find('img');
        if (document.fullscreenElement == null) {
            openFullscreen($('.image-viewer')[0]);
            icon.attr('src', 'assets/icons/minimize.svg');
        } else if (document.fullscreenElement == $('.image-viewer')[0]) {
            icon.attr('src', 'assets/icons/maximize.svg');
            closeFullscreen();
        }
    })

    $('.share-btn').on('click',function() {
        window.open(imageUrl);
    })
})