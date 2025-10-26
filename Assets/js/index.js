document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");
    const bottomLeft = document.querySelector(".Bottom-left");
    const sectionTwo = document.getElementById("two");
    const footer = document.querySelector("footer");
    const footerImage = document.querySelector("footer .Image");
    const contactBox = document.getElementById("contactBox");
    const closeContactBtn = document.querySelector("#contactBox .close-btn");

    const scrollthreshold = 1;

    function isElementInViewport(el, threshold = 0) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            rect.top <= windowHeight - threshold &&
            rect.bottom >= threshold
        );
    }
    
    if (!bottomLeft || !sectionTwo || !footer) {
        console.error(
            "Un des éléments principaux pour l'animation (#two, .Bottom-left, ou footer) est manquant."
        );
    }
    if (!footerImage) {
        console.warn("L'élément 'footer .Image' est manquant.");
    }
    if (!contactBox || !closeContactBtn) {
        console.error("Les éléments du formulaire de contact sont manquants.");
    }
    
    function toggleHeaderClass() {
        if (!header) return;

        if (window.scrollY > scrollthreshold) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    
    function handleSectionTwoAnimation() {
        if (!bottomLeft || !sectionTwo || !footer) return;

        const threshold = 150;
        const sectionTwoInView = isElementInViewport(sectionTwo, threshold);
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        const shouldBeVisible = sectionTwoInView && footerTop > windowHeight / 3;

        if (shouldBeVisible) {
            bottomLeft.classList.add("is-visible");
        } else {
            bottomLeft.classList.remove("is-visible");
        }
    }

    function handleFooterImageAnimation() {
        if (!footerImage || !footer) return;
        
        const footerThreshold = (window.innerHeight || document.documentElement.clientHeight) * 0.8;

        const isFooterInView = footer.getBoundingClientRect().top <= footerThreshold;

        if (isFooterInView) {
            footerImage.classList.add("in-footer");
        } else {
            footerImage.classList.remove("in-footer");
        }
    }

    function handleContactBoxAnimation() {
        if (!contactBox || !footer) return;
        
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        const isFooterVisible = footerRect.top <= windowHeight; 

        if (isFooterVisible) {
            if (!contactBox.classList.contains("is-closed-by-user")) {
                contactBox.classList.add("is-visible");
            }
        } else {
            contactBox.classList.remove("is-visible");
            contactBox.classList.remove("is-closed-by-user"); // Optionnel: la réactiver
        }
    }

    closeContactBtn.addEventListener("click", function() {
        if (!contactBox) return;
        contactBox.classList.remove("is-visible");
        contactBox.classList.add("is-closed-by-user"); // Ajoute une classe pour ne pas la rouvrir au scroll
    });
    function handleGlobalScroll() {
        toggleHeaderClass();
        handleSectionTwoAnimation();
        handleFooterImageAnimation();
        handleContactBoxAnimation();
    }


    window.addEventListener("scroll", handleGlobalScroll);

    window.addEventListener("resize", handleGlobalScroll);

    handleGlobalScroll();
});