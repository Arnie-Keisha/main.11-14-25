const openNav = document.querySelector("#menu-toggle");
const NavContainer = document.querySelector(".NavContainer");
const close = document.querySelector("#Close");

openNav.addEventListener("click", () => {
    if (openNav) {
        NavContainer.style.display = "flex";
    }
});

close.addEventListener("click", () => {
    if (close) {
        NavContainer.style.display = "none";
    }
});

const slider = document.getElementById("slider");
let index = 0;
const slides = document.querySelectorAll(".slide").length;
const slideWidth = 700;

setInterval(() => {
    index = (index + 1) % slides;
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
}, 3000);

const storiesGrid = document.getElementById("storiesGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const scrollDistance = 310;
const autoScrollInterval = 3000;
let scrollTimer;

function startAutoScroll() {
    if (scrollTimer) return;

    scrollTimer = setInterval(() => {
        const scrollEnd = storiesGrid.scrollWidth - storiesGrid.clientWidth;
        if (storiesGrid.scrollLeft >= scrollEnd - 5) {
            storiesGrid.scrollLeft = 0;
        } else {
            storiesGrid.scrollBy({ left: scrollDistance, behavior: "smooth" });
        }
    }, autoScrollInterval);
}
function stopAutoScroll() {
    clearInterval(scrollTimer);
    scrollTimer = null;
}
function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        storiesGrid.scrollBy({ left: scrollDistance, behavior: "smooth" });
        resetAutoScroll();
    });
}
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        storiesGrid.scrollBy({ left: -scrollDistance, behavior: "smooth" });
        resetAutoScroll();
    });
}
if (storiesGrid) {
    storiesGrid.addEventListener("mouseenter", stopAutoScroll);
    storiesGrid.addEventListener("mouseleave", startAutoScroll);
    startAutoScroll();
}

document.querySelectorAll(".courses-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const currentList = link.nextElementSibling;
        const allLists = document.querySelectorAll(".member-list");

        // Close all other lists first
        allLists.forEach((list) => {
            if (list !== currentList) list.style.display = "none";
        });

        // Toggle the current list
        if (currentList && currentList.classList.contains("member-list")) {
            currentList.style.display =
                currentList.style.display === "flex" ? "none" : "flex";
        }
    });
});

// Optional: click anywhere outside to close all
document.addEventListener("click", (e) => {
    if (!e.target.closest(".courses-links")) {
        document.querySelectorAll(".member-list").forEach((list) => {
            list.style.display = "none";
        });
    }
});

// Subject Hover Dropdown Functionality
const bottomNav = document.querySelector(".bottomNavBAR");
const courseLinks = document.querySelectorAll(".courses-links");
courseLinks.forEach((course) => {
    const memberLists = course.querySelectorAll(".member-list");
    memberLists.forEach((list) => {
        const cards = list.querySelectorAll(".member-card");
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                // Open modal unique to that course
                const courseId = list.id;
                openModalForCourse(courseId, card.dataset.member);
            });
        });
    });
});

function openModalForCourse(courseId, memberId) {
    // Example: open different content depending on course
    switch (courseId) {
        case "feu-members":
            alert(`Opening FEU modal for member ${memberId}`);
            break;
        case "nstp-members":
            alert(`Opening NSTP modal for member ${memberId}`);
            break;
        case "purposive-members":
            alert(`Opening Purposive modal for member ${memberId}`);
            break;
        case "events-members":
            alert(`Opening Events modal for member ${memberId}`);
            break;
        case "journey-members":
            alert(`Opening FEU Journey modal for member ${memberId}`);
            break;
    }
}

if (bottomNav && subjectDropdown) {
    subjectDropdown.style.display = "none";
    subjectDropdown.style.position = "absolute";

    const subjectLinks = bottomNav.querySelectorAll(".courses-links a");

    function showDropdownFor(link) {
        // Make dropdown visible but hidden to measure its width
        subjectDropdown.style.display = "block";
        subjectDropdown.style.visibility = "hidden";
        subjectDropdown.style.left = "0px";

        const rect = link.getBoundingClientRect();
        const navRect = bottomNav.getBoundingClientRect();
        const dropdownWidth =
            subjectDropdown.offsetWidth ||
            subjectDropdown.getBoundingClientRect().width ||
            200;

        // center dropdown relative to the hovered link
        let left =
            rect.left -
            navRect.left +
            bottomNav.scrollLeft +
            rect.width / 2 -
            dropdownWidth / 2;

        // clamp so dropdown stays inside bottomNav bounds
        const minLeft = 0;
        const maxLeft = Math.max(0, bottomNav.clientWidth - dropdownWidth);
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;

        subjectDropdown.style.left = `${left}px`;
        subjectDropdown.style.top = `${rect.bottom - navRect.top}px`;

        // restore visibility
        subjectDropdown.style.visibility = "visible";
        subjectDropdown.style.display = "block";
    }

    let hideTimer = null;
    function scheduleHide() {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            if (
                ![...subjectLinks].some((l) => l.matches(":hover")) &&
                !subjectDropdown.matches(":hover")
            ) {
                subjectDropdown.style.display = "none";
                subjectLinks.forEach((l) =>
                    l.classList.remove("subject-active")
                );
            }
        }, 50);
    }

    subjectLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            showDropdownFor(link);
            subjectLinks.forEach((l) => l.classList.remove("subject-active"));
            link.classList.add("subject-active");
        });

        link.addEventListener("mouseleave", () => {
            scheduleHide();
        });
    });

    subjectDropdown.addEventListener("mouseenter", () => {
        clearTimeout(hideTimer);
        subjectDropdown.style.display = "block";
    });
    subjectDropdown.addEventListener("mouseleave", scheduleHide);

    window.addEventListener("resize", () => {
        subjectDropdown.style.display = "none";
    });
}

// Search Overlay Functionality
let searchIcon =
    document.getElementById("searchIcon") ||
    document.querySelector(".search .fa-search") ||
    document.querySelector(".search i");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearchBtn = document.getElementById("closeSearchBtn");
const searchInput = document.getElementById("searchInput");

function hideSearch() {
    if (searchOverlay) {
        searchOverlay.style.opacity = "0";
        setTimeout(() => {
            searchOverlay.style.display = "none";
        }, 300);
    }
}

function showSearch() {
    if (!searchOverlay) return;
    searchOverlay.style.display = "block";
    // allow CSS transition; small timeout ensures opacity transition works
    setTimeout(() => {
        searchOverlay.style.opacity = "1";
        if (searchInput) searchInput.focus();
    }, 10);
}

if (searchIcon && searchOverlay) {
    searchIcon.addEventListener("click", (event) => {
        event.preventDefault();
        showSearch();
    });
}

// close handlers
if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", hideSearch);
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        searchOverlay &&
        searchOverlay.style.opacity === "1"
    ) {
        hideSearch();
    }
});

if (searchOverlay) {
    searchOverlay.addEventListener("click", (event) => {
        if (event.target === searchOverlay) {
            hideSearch();
        }
    });
}

// handle Enter key on search input
if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                console.log("Search query:", query);
            }
            hideSearch();
        }
    });
}

// handle Enter key on search input
if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            // Prevent the default behavior (like form submission)
            event.preventDefault();

            const query = searchInput.value.trim().toLowerCase();

            if (query) {
                // Map of search terms to their page URLs (based on your navigation)
                const pageMap = {
                    "about us": "about-us.html",
                    aboutus: "about-us.html",
                    academics: "academics.html",
                    certificate: "certificate.html",
                    teachers: "teachers.html",
                    home: "index.html",
                    blog: "blog.html",
                };

                if (pageMap[query]) {
                    // Redirect to the matching page
                    window.location.href = pageMap[query];
                } else {
                    // Handle general or non-page searches
                    console.log(`Performing general search for: ${query}`);

                    // You can replace the alert with a redirect to a dedicated search results page
                    // (e.g., window.location.href = `search.html?q=${encodeURIComponent(query)}`);
                    alert(
                        `Search for "${query}" initiated. Try searching for an existing page like "About us" or "Academics" for a redirect!`
                    );
                }
            }

            // Hide the search overlay after processing the input
            hideSearch();
        }
    });
}

// --- Organized Documentation popup / gallery for member-activity-box ---
(function () {
    const dropdownMembers = document.querySelectorAll(
        "#subjectDropdown .member-activity-box"
    );
    if (!dropdownMembers || dropdownMembers.length === 0) return;

    function createLargeModal() {
        const existing = document.getElementById("docModalOverlay");
        if (existing) existing.remove();

        const overlay = document.createElement("div");
        overlay.id = "docModalOverlay";
        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "99999",
            padding: "24px",
        });

        const modal = document.createElement("div");
        modal.id = "docModal";
        Object.assign(modal.style, {
            background: "#fff",
            width: "96%",
            maxWidth: "1400px",
            height: "92vh",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        });

        // Header
        const header = document.createElement("div");
        Object.assign(header.style, {
            padding: "18px 22px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        });

        const titleWrap = document.createElement("div");
        const title = document.createElement("div");
        title.id = "docModalTitle";
        Object.assign(title.style, { fontSize: "20px", fontWeight: "700" });
        const actText = document.createElement("div");
        actText.id = "docModalAct";
        Object.assign(actText.style, {
            fontSize: "14px",
            color: "#666",
            marginTop: "6px",
        });

        titleWrap.appendChild(title);
        titleWrap.appendChild(actText);

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        Object.assign(closeBtn.style, {
            background: "#e53935",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
        });

        header.appendChild(titleWrap);
        header.appendChild(closeBtn);

        // Main content area (gallery + thumbnails)
        const content = document.createElement("div");
        Object.assign(content.style, {
            display: "flex",
            gap: "18px",
            padding: "18px",
            flex: "1 1 auto",
            overflow: "hidden",
        });

        const galleryArea = document.createElement("div");
        Object.assign(galleryArea.style, {
            flex: "2 1 70%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "#fafafa",
            borderRadius: "8px",
            padding: "12px",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
        });

        const mainImg = document.createElement("img");
        mainImg.id = "docModalMainImg";
        Object.assign(mainImg.style, {
            maxWidth: "100%",
            maxHeight: "60vh",
            objectFit: "contain",
            borderRadius: "6px",
            background: "#fff",
        });
        mainImg.alt = "";

        const caption = document.createElement("div");
        caption.id = "docModalCaption";
        Object.assign(caption.style, {
            width: "100%",
            textAlign: "left",
            color: "#444",
            fontSize: "13px",
        });

        // navigation arrows
        const navLeft = document.createElement("button");
        const navRight = document.createElement("button");
        navLeft.textContent = "◀";
        navRight.textContent = "▶";
        [navLeft, navRight].forEach((btn) =>
            Object.assign(btn.style, {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.45)",
                color: "#fff",
                border: "none",
                padding: "10px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
            })
        );
        navLeft.style.left = "18px";
        navRight.style.right = "18px";

        galleryArea.appendChild(mainImg);
        galleryArea.appendChild(caption);
        galleryArea.appendChild(navLeft);
        galleryArea.appendChild(navRight);

        const thumbsArea = document.createElement("div");
        Object.assign(thumbsArea.style, {
            flex: "0 0 360px",
            width: "360px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingRight: "6px",
        });

        content.appendChild(galleryArea);
        content.appendChild(thumbsArea);

        // Sections container (Activity / Performance / Event)
        const sections = document.createElement("div");
        Object.assign(sections.style, {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "14px",
            padding: "16px",
            borderTop: "1px solid #eee",
            background: "#fff",
            height: "260px",
            overflow: "auto",
        });

        function buildSection(titleText, id) {
            const box = document.createElement("div");
            box.id = id;
            Object.assign(box.style, {
                background: "#f7f7f7",
                borderRadius: "8px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                height: "100%",
                overflow: "auto",
            });
            const h = document.createElement("div");
            h.textContent = titleText;
            Object.assign(h.style, { fontWeight: "700", marginBottom: "6px" });
            const wrap = document.createElement("div");
            wrap.className = "section-items";
            Object.assign(wrap.style, {
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
            });
            box.appendChild(h);
            box.appendChild(wrap);
            return box;
        }

        const activityBox = buildSection("Activity", "section-activity");
        const performanceBox = buildSection(
            "Performance",
            "section-performance"
        );
        const eventBox = buildSection("Event", "section-event");

        sections.appendChild(activityBox);
        sections.appendChild(performanceBox);
        sections.appendChild(eventBox);

        // Footer
        const footer = document.createElement("div");
        Object.assign(footer.style, {
            padding: "12px 18px",
            borderTop: "1px solid #eee",
            fontSize: "13px",
            color: "#666",
        });
        footer.textContent =
            "Click thumbnails to view. Use ← → keys to navigate.";

        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(sections);
        modal.appendChild(footer);
        overlay.appendChild(modal);

        // Close handlers
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeModal();
        });
        closeBtn.addEventListener("click", closeModal);
        function closeModal() {
            overlay.remove();
            document.removeEventListener("keydown", keyHandler);
            document.body.style.overflow = "";
        }
        function keyHandler(e) {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        }

        // gallery state
        let imgs = [];
        let current = 0;

        function render(images, headerTitle, actTextStr, sectionsData) {
            imgs = (images || []).slice();
            current = 0;
            title.textContent = headerTitle || "Documentation";
            actText.textContent = actTextStr || "";
            thumbsArea.innerHTML = "";
            caption.textContent = "";

            // clear sections
            activityBox.querySelector(".section-items").innerHTML = "";
            performanceBox.querySelector(".section-items").innerHTML = "";
            eventBox.querySelector(".section-items").innerHTML = "";

            // main gallery
            if (!imgs || imgs.length === 0) {
                mainImg.style.display = "none";
                const msg = document.createElement("div");
                msg.className = "doc-msg";
                msg.textContent = "No main gallery images.";
                Object.assign(msg.style, {
                    padding: "18px",
                    color: "#444",
                    width: "100%",
                    textAlign: "center",
                });
                galleryArea.appendChild(msg);
            } else {
                mainImg.style.display = "";
                mainImg.src = imgs[0];
                mainImg.alt = headerTitle || "Documentation image";
                caption.textContent = `${imgs.length} item(s)`;
            }

            // thumbnails
            imgs.forEach((item, idx) => {
                const src = typeof item === "string" ? item : item.src;
                const title = typeof item === "object" ? item.title || "" : "";

                const thumb = document.createElement("img");
                thumb.src = src;
                thumb.alt = `${headerTitle || "doc"} ${idx + 1}`;
                Object.assign(thumb.style, {
                    width: "100%",
                    cursor: "pointer",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border:
                        idx === 0
                            ? "3px solid #1976d2"
                            : "2px solid transparent",
                    maxHeight: "160px",
                });

                thumb.addEventListener("click", () => setCurrent(idx));
                thumbsArea.appendChild(thumb);
            });

            // sections populate helper
            function populate(box, list) {
                const wrap = box.querySelector(".section-items");
                wrap.innerHTML = "";
                if (!list || list.length === 0) {
                    const note = document.createElement("div");
                    note.textContent = "No items";
                    Object.assign(note.style, {
                        color: "#666",
                        fontSize: "13px",
                        cursor: "pointer",
                    });
                    note.addEventListener("click", () => {
                        const popup = createImagePopup(
                            "Placeholder for documentation"
                        );
                        document.body.appendChild(popup);
                    });
                    wrap.appendChild(note);
                    return;
                }
                list.forEach((item) => {
                    const t = (item || "").trim();
                    if (!t) return;
                    const el = document.createElement("div");
                    el.textContent = t || "Placeholder Image";
                    Object.assign(el.style, {
                        padding: "6px 8px",
                        background: "#ddd",
                        borderRadius: "6px",
                        border: "1px solid #eee",
                        fontSize: "13px",
                        cursor: "pointer",
                    });
                    el.addEventListener("click", () => {
                        const imgPopup = createImagePopup(t);
                        document.body.appendChild(imgPopup);
                    });
                    wrap.appendChild(el);
                });
            }

            populate(
                activityBox,
                (sectionsData && sectionsData.activity) || []
            );
            populate(
                performanceBox,
                (sectionsData && sectionsData.performance) || []
            );
            populate(eventBox, (sectionsData && sectionsData.event) || []);
        }

        function createImagePopup(src) {
            const popup = document.createElement("div");
            popup.style.position = "fixed";
            popup.style.inset = "0";
            popup.style.background = "rgba(0,0,0,0.8)";
            popup.style.display = "flex";
            popup.style.alignItems = "center";
            popup.style.justifyContent = "center";
            popup.style.zIndex = "99999";

            const img = document.createElement("img");
            img.src = src;
            img.style.maxWidth = "90%";
            img.style.maxHeight = "90%";
            img.style.objectFit = "contain";

            const closeBtn = document.createElement("button");
            closeBtn.textContent = "Close";
            closeBtn.style.position = "absolute";
            closeBtn.style.top = "20px";
            closeBtn.style.right = "20px";
            closeBtn.style.background = "#e53935";
            closeBtn.style.color = "#fff";
            closeBtn.style.border = "none";
            closeBtn.style.padding = "8px 12px";
            closeBtn.style.borderRadius = "6px";
            closeBtn.style.cursor = "pointer";

            closeBtn.addEventListener("click", () => {
                popup.remove();
            });

            popup.appendChild(img);
            popup.appendChild(closeBtn);
            return popup;
        }

        function setCurrent(i) {
            if (!imgs || imgs.length === 0) return;
            current = (i + imgs.length) % imgs.length;
            mainImg.src = imgs[current];
            caption.textContent = `${current + 1} / ${imgs.length}`;
            Array.from(thumbsArea.children).forEach((c, idx) => {
                c.style.border =
                    idx === current
                        ? "3px solid #1976d2"
                        : "2px solid transparent";
            });
        }

        function showPrev() {
            if (imgs && imgs.length)
                setCurrent((current - 1 + imgs.length) % imgs.length);
        }
        function showNext() {
            if (imgs && imgs.length) setCurrent((current + 1) % imgs.length);
        }

        navLeft.addEventListener("click", (e) => {
            e.stopPropagation();
            showPrev();
        });
        navRight.addEventListener("click", (e) => {
            e.stopPropagation();
            showNext();
        });

        overlay._render = render;
        overlay._open = function () {
            document.body.appendChild(overlay);
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", keyHandler);
        };

        return overlay;
    }

    let modalOverlay = null;
    function openDocModalLarge(images, titleStr, actStr, sectionsData) {
        if (modalOverlay) modalOverlay.remove();
        modalOverlay = createLargeModal();
        modalOverlay._render(images, titleStr, actStr, sectionsData);
        modalOverlay._open();
    }

    // parse helper
    function parseAttrList(el, name) {
        const raw = el.dataset[name] || el.getAttribute("data-" + name) || "";
        if (!raw) return [];
        try {
            if (raw.trim().startsWith("[")) return JSON.parse(raw);
            return raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        } catch {
            return raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        }
    }

    // attach click handlers
    dropdownMembers.forEach((el) => {
        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const titleStr =
                (el.querySelector("h5") &&
                    el.querySelector("h5").innerText.trim()) ||
                "Member";
            const actStr =
                (el.querySelector("p") &&
                    el.querySelector("p").innerText.trim()) ||
                "";

            // main images
            let images = parseAttrList(el, "doc");
            if ((!images || images.length === 0) && el.querySelectorAll) {
                const imgs = el.querySelectorAll("img");
                if (imgs.length) images = Array.from(imgs).map((i) => i.src);
            }

            // sections: data-activity, data-performance, data-event
            const sectionsData = {
                activity: parseAttrList(el, "activity"),
                performance: parseAttrList(el, "performance"),
                event: parseAttrList(el, "event"),
            };

            openDocModalLarge(images, titleStr, actStr, sectionsData);
        });
    });
})();

// --- Simple Documentation popup / gallery for member cards ---
(function () {
    const memberSelectors = ".member, .member-card, [data-member]";
    const members = document.querySelectorAll(memberSelectors);

    if (!members || members.length === 0) return;

    function createModal() {
        // remove existing if present
        const existing = document.getElementById("docModalOverlay");
        if (existing) existing.remove();

        const overlay = document.createElement("div");
        overlay.id = "docModalOverlay";
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "rgba(0,0,0,0.7)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        overlay.style.padding = "20px";

        const modal = document.createElement("div");
        modal.id = "docModal";
        modal.style.background = "#fff";
        modal.style.maxWidth = "1000px";
        modal.style.width = "100%";
        modal.style.maxHeight = "90vh";
        modal.style.overflow = "hidden";
        modal.style.borderRadius = "8px";
        modal.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";

        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.alignItems = "center";
        header.style.justifyContent = "space-between";
        header.style.padding = "12px 16px";
        header.style.borderBottom = "1px solid #eee";

        const title = document.createElement("div");
        title.id = "docModalTitle";
        title.style.fontWeight = "600";
        title.style.fontSize = "16px";

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.style.border = "none";
        closeBtn.style.background = "#f44336";
        closeBtn.style.color = "#fff";
        closeBtn.style.padding = "6px 10px";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.borderRadius = "4px";

        header.appendChild(title);
        header.appendChild(closeBtn);

        const content = document.createElement("div");
        content.style.display = "flex";
        content.style.gap = "12px";
        content.style.padding = "12px";
        content.style.flex = "1";
        content.style.overflow = "hidden";

        const mainArea = document.createElement("div");
        mainArea.style.flex = "1 1 70%";
        mainArea.style.display = "flex";
        mainArea.style.alignItems = "center";
        mainArea.style.justifyContent = "center";
        mainArea.style.background = "#fafafa";
        mainArea.style.borderRadius = "6px";
        mainArea.style.overflow = "hidden";
        mainArea.style.position = "relative";

        const mainImg = document.createElement("img");
        mainImg.id = "docModalMainImg";
        mainImg.style.maxWidth = "100%";
        mainImg.style.maxHeight = "70vh";
        mainImg.style.objectFit = "contain";
        mainImg.alt = "";

        // navigation arrows
        const navLeft = document.createElement("button");
        navLeft.textContent = "<";
        const navRight = document.createElement("button");
        navRight.textContent = ">";
        [navLeft, navRight].forEach((btn) => {
            btn.style.position = "absolute";
            btn.style.top = "50%";
            btn.style.transform = "translateY(-50%)";
            btn.style.background = "rgba(0,0,0,0.4)";
            btn.style.color = "#fff";
            btn.style.border = "none";
            btn.style.padding = "8px 12px";
            btn.style.cursor = "pointer";
            btn.style.borderRadius = "4px";
        });
        navLeft.style.left = "8px";
        navRight.style.right = "8px";

        mainArea.appendChild(mainImg);
        mainArea.appendChild(navLeft);
        mainArea.appendChild(navRight);

        const side = document.createElement("div");
        side.style.width = "220px";
        side.style.flex = "0 0 220px";
        side.style.overflowY = "auto";
        side.style.display = "flex";
        side.style.flexDirection = "column";
        side.style.gap = "8px";
        side.style.paddingRight = "4px";

        content.appendChild(mainArea);
        content.appendChild(side);

        const footer = document.createElement("div");
        footer.style.padding = "8px 12px";
        footer.style.borderTop = "1px solid #eee";
        footer.style.fontSize = "13px";
        footer.style.color = "#555";
        footer.textContent = "Click thumbnails to view. Press ← → to navigate.";

        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        overlay.appendChild(modal);

        // close handlers
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeModal();
        });
        closeBtn.addEventListener("click", closeModal);

        function closeModal() {
            overlay.remove();
            document.removeEventListener("keydown", keyHandler);
            document.body.style.overflow = "";
        }

        function keyHandler(e) {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        }

        // gallery state
        let imgs = [];
        let current = 0;

        function renderGallery(images, headerTitle) {
            imgs = images.slice();
            current = 0;
            title.textContent = headerTitle || "Documentation";
            side.innerHTML = "";
            if (!imgs || imgs.length === 0) {
                mainImg.src = "";
                mainImg.alt = "";
                mainArea.style.display = "flex";
                mainImg.style.display = "none";
                const msg = document.createElement("div");
                msg.textContent = "No documentation images provided.";
                msg.style.padding = "20px";
                mainArea.appendChild(msg);
                return;
            }
            mainImg.style.display = "";
            mainImg.src = imgs[0];
            mainImg.alt = headerTitle || "Documentation image";

            imgs.forEach((src, idx) => {
                const thumb = document.createElement("img");
                thumb.src = src;
                thumb.alt = `${headerTitle || "doc"} ${idx + 1}`;
                thumb.style.width = "100%";
                thumb.style.cursor = "pointer";
                thumb.style.objectFit = "cover";
                thumb.style.borderRadius = "4px";
                thumb.style.border =
                    idx === 0 ? "2px solid #1976d2" : "2px solid transparent";
                thumb.addEventListener("click", () => {
                    setCurrent(idx);
                });
                side.appendChild(thumb);
            });
        }

        function setCurrent(i) {
            if (!imgs || imgs.length === 0) return;
            current = (i + imgs.length) % imgs.length;
            mainImg.src = imgs[current];
            // update thumbnails highlight
            Array.from(side.children).forEach((c, idx) => {
                c.style.border =
                    idx === current
                        ? "2px solid #1976d2"
                        : "2px solid transparent";
            });
        }

        function showPrev() {
            setCurrent((current - 1 + imgs.length) % imgs.length);
        }
        function showNext() {
            setCurrent((current + 1) % imgs.length);
        }

        navLeft.addEventListener("click", (e) => {
            e.stopPropagation();
            showPrev();
        });
        navRight.addEventListener("click", (e) => {
            e.stopPropagation();
            showNext();
        });

        // expose methods
        overlay._renderGallery = renderGallery;
        overlay._open = function () {
            document.body.appendChild(overlay);
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", keyHandler);
        };

        return overlay;
    }

    let modalOverlay = null;

    function openDocModal(images, title) {
        if (modalOverlay) modalOverlay.remove();
        modalOverlay = createModal();
        modalOverlay._renderGallery(images, title);
        modalOverlay._open();
    }

    // attach click handlers to members
    members.forEach((el) => {
        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const title =
                el.dataset.member ||
                el.getAttribute("data-member") ||
                (el.querySelector(".name") &&
                    el.querySelector(".name").innerText) ||
                el.innerText.split("\n")[0].trim();
            // images/data-doc can be comma separated list of paths or JSON array in data-doc
            let imagesRaw =
                el.dataset.doc ||
                el.getAttribute("data-doc") ||
                el.dataset.images ||
                el.getAttribute("data-images") ||
                "";
            imagesRaw = imagesRaw.trim();

            let images = [];
            if (imagesRaw) {
                try {
                    if (imagesRaw.startsWith("[")) {
                        images = JSON.parse(imagesRaw);
                    } else {
                        images = imagesRaw
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                    }
                } catch (err) {
                    images = imagesRaw
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                }
            }

            // If no images were supplied, try to find img tags inside the element
            if ((!images || images.length === 0) && el.querySelectorAll) {
                const imgs = el.querySelectorAll("img");
                if (imgs.length) {
                    images = Array.from(imgs).map((i) => i.src);
                }
            }

            openDocModal(images, title || "Documentation");
        });
    });
})();

// === Section popup functions ===
function openSection(title, content) {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    const box = document.createElement("div");
    box.className = "popup-box";
    box.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        <button class="close-btn">Close</button>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Close popup
    box.querySelector(".close-btn").onclick = () => overlay.remove();
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}

// --- Assign functions to nav links ---
document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "academics.html") {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            openSection(
                "Academics",
                "Explore our academic programs, subjects, and learning pathways designed for excellence."
            );
        });
    } else if (href === "certificate.html") {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            openSection(
                "Certificate",
                "View and verify issued certificates for student achievements and completed programs.<br><br><img id='certificateImg' src='../function/REDCROSS CERTIFICATE.jpg' alt='Certificate Photo' style='max-width:100%; height:auto; border:1px solid #ccc; padding:10px;'>"
            );
        });
    } else if (href === "teachers.html") {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const teachers = [
                { name: "Sir Rowel Malubay", img: "Sir, Malubay.png" },
                {
                    name: "Ma’am Maria Luisa Delos Santos",
                    img: "Media (9).jpg",
                },
                {
                    name: "Sir Luis Benito Espiritu",
                    img: "Media (8).jpg",
                },
                {
                    name: "Sir Paulo Carlo Victoria",
                    img: "Media (7).jpg",
                },
                {
                    name: "Sir John Richard Santos",
                    img: "Media (4-5).jpg",
                },
                {
                    name: "Ma'am Leonessa Cortes",
                    img: "Leonessa.jpg",
                },
            ];
            document.querySelectorAll(".teacher-btn").forEach((btn, i) => {
                btn.onclick = () => {
                    const t = teachers[i];
                    const div = document.createElement("div");
                    div.className = "popup";
                    div.innerHTML = `
      <div class="popup-content">
        <button class="close-btn">Close</button>
        <img src="${t.img}" alt="${t.name}">
        <h2>${t.name}</h2>
      </div>`;
                    document.body.appendChild(div);
                    div.querySelector(".close-btn").onclick = () =>
                        div.remove();
                };
            });

            // about us popup
            document.querySelectorAll(".about-btn").forEach((btn) => {
                btn.onclick = () => {
                    const popup = document.createElement("div");
                    popup.className = "popup";
                    popup.innerHTML = `
      <div class="popup-content about">
        <button class="close-btn">Close</button>
        <img src="Media (4-3).jpg" class="about-img" alt="Team Overview">
        <p>We are four dedicated IT students focused on building web solutions and improving academic systems through technology.</p>
      </div>`;
                    document.body.appendChild(popup);
                    popup.querySelector(".close-btn").onclick = () =>
                        popup.remove();
                };
            });

            // member documentation popup
            const memberDocs = {
                1: [
                    "./images/doc1.jpg",
                    "./images/doc2.jpg",
                    "./images/doc3.jpg",
                ],
                2: [
                    "./images/doc4.jpg",
                    "./images/doc5.jpg",
                    "./images/doc6.jpg",
                ],
                3: [
                    "./images/doc7.jpg",
                    "./images/doc8.jpg",
                    "./images/doc9.jpg",
                ],
                4: [
                    "./images/doc10.jpg",
                    "./images/doc11.jpg",
                    "./images/doc12.jpg",
                ],
            };

            document.querySelectorAll(".member-card").forEach((card) => {
                card.onclick = () => {
                    const id = card.dataset.member;
                    const images = memberDocs[id];
                    if (!images) return;

                    // create popup
                    const overlay = document.createElement("div");
                    overlay.className = "doc-popup";

                    // build slides
                    let slidesHTML = "";
                    images.forEach((src) => {
                        const name = src.split("/").pop().split(".")[0];
                        const caption = name
                            .replace(/\d+/g, (num) => ` ${num}`)
                            .replace(/_/g, " ");
                        const isPortrait = Math.random() < 0.5;
                        slidesHTML += `
        <div class="doc-slide ${isPortrait ? "portrait" : "landscape"}">
          <img src="${src}" alt="${caption}">
          <p>${caption}</p>
        </div>`;
                    });

                    // popup layout
                    overlay.innerHTML = `
      <div class="doc-box">
        <button class="close-doc">Close</button>
        <div class="doc-slider">
          <button class="nav-btn prev">◀</button>
          <div class="doc-track">${slidesHTML}</div>
          <button class="nav-btn next">▶</button>
        </div>
      </div>`;

                    document.body.appendChild(overlay);

                    // get elements
                    const slides = overlay.querySelectorAll(".doc-slide");
                    const track = overlay.querySelector(".doc-track");
                    const prev = overlay.querySelector(".prev");
                    const next = overlay.querySelector(".next");
                    const close = overlay.querySelector(".close-doc");

                    let index = 0;
                    let auto;

                    // change slide
                    function update() {
                        track.style.transform = `translateX(-${index * 100}%)`;
                    }

                    // start auto slide
                    function startAuto() {
                        auto = setInterval(() => {
                            index = (index + 1) % slides.length;
                            update();
                        }, 4000);
                    }

                    // manual next
                    next.onclick = () => {
                        clearInterval(auto);
                        index = (index + 1) % slides.length;
                        update();
                        startAuto();
                    };

                    // manual prev
                    prev.onclick = () => {
                        clearInterval(auto);
                        index = (index - 1 + slides.length) % slides.length;
                        update();
                        startAuto();
                    };

                    // close popup
                    close.onclick = () => {
                        clearInterval(auto);
                        overlay.remove();
                    };

                    // click outside to close
                    overlay.onclick = (e) => {
                        if (e.target === overlay) {
                            clearInterval(auto);
                            overlay.remove();
                        }
                    };

                    startAuto();
                };
            });

            // space for member cards
            const members = document.querySelectorAll(".member-card");
            if (members.length > 0) {
                members.forEach((m) => (m.style.margin = "10px 25px"));
            }
            let teacherHTML = '<div class="teacher-grid">';
            teachers.forEach((t) => {
                teacherHTML += `
                <div class="teacher-card">
                    <div class="teacher-pic">
                        <img src="${t.img}" alt="${t.name}">
                    </div>
                    <p>${t.name}</p>
                </div>
            `;
            });
            teacherHTML += "</div>";

            openSection("Teachers", teacherHTML);
        });
    } else if (href === "about-us.html") {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const aboutHTML = `
            <div class="about-us-popup">
                <img src="Media (4-3).jpg" alt="Our Team" class="about-photo">
                <p class="about-text">
                    We are a team of four passionate IT students from FEU Roosevelt.
                    Our goal is to document and showcase school events, projects, and
                    achievements through this digital platform. Each member contributes
                    creativity, coding skills, and teamwork to bring our site to life.
                </p>
            </div>
        `;
            openSection("About Us", aboutHTML);
        });
    }
    // --- New Global Function for Read More/Less Toggle ---
    function toggleOverview() {
        const contentContainer = document.getElementById("tamsOverviewContent");
        const toggleButton = document.getElementById("toggleOverviewBtn");

        if (contentContainer && toggleButton) {
            // Toggles the 'expanded' class
            contentContainer.classList.toggle("expanded");

            // Updates the button text
            if (contentContainer.classList.contains("expanded")) {
                toggleButton.textContent = "Read Less";
            } else {
                toggleButton.textContent = "Read More";
            }
        }
    }
    // --- Member Profile Pop-up Modal (About Us Section) ---
    const memberProfiles = document.querySelectorAll(
        ".feature-post-item.member-profile"
    );
    const modalOverlay = document.getElementById("memberModalOverlay");
    const closeBtn = document.getElementById("closeMemberModal");
    const modalName = document.getElementById("modalName");
    const modalContribution = document.getElementById("modalContribution");
    const modalSkillsList = document.getElementById("modalSkills");

    if (memberProfiles.length > 0 && modalOverlay) {
        // Function to open the modal
        function openMemberModal(name, contribution, skills) {
            modalName.textContent = name;
            modalContribution.textContent = contribution;

            // Populate skills list
            modalSkillsList.innerHTML = "";
            if (skills) {
                skills
                    .split(",")
                    .map((s) => s.trim())
                    .forEach((skill) => {
                        if (skill) {
                            const li = document.createElement("li");
                            li.textContent = skill;
                            modalSkillsList.appendChild(li);
                        }
                    });
            }

            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }

        // Function to close the modal
        function closeMemberModal() {
            modalOverlay.classList.remove("active");
            document.body.style.overflow = ""; // Restore background scroll
        }

        // Attach click listener to each profile box
        memberProfiles.forEach((profile) => {
            profile.addEventListener("click", (e) => {
                // Check if the click was on the link itself, if so, prevent default link behavior
                if (e.target.closest("a")) {
                    e.preventDefault();
                }

                const name = profile.getAttribute("data-name");
                const contribution = profile.getAttribute("data-contribution");
                const skills = profile.getAttribute("data-skills");

                if (name && contribution && skills) {
                    openMemberModal(name, contribution, skills);
                }
            });
        });

        // Close button handler
        closeBtn.addEventListener("click", closeMemberModal);

        // Close on overlay click
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeMemberModal();
            }
        });

        // Close on Escape key press
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "Escape" &&
                modalOverlay.classList.contains("active")
            ) {
                closeMemberModal();
            }
        });
    }
});

document.querySelectorAll(".courses-links a").forEach((link) => {
    const memberList = link.nextElementSibling;

    if (memberList && memberList.classList.contains("member-list")) {
        // Show when link is hovered
        link.addEventListener("mouseenter", () => {
            memberList.style.display = "flex";
        });

        // Hide when leaving both link & list
        link.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!memberList.matches(":hover")) {
                    memberList.style.display = "none";
                }
            }, 100);
        });

        // Keep visible when hovering inside the list
        memberList.addEventListener("mouseenter", () => {
            memberList.style.display = "flex";
        });

        // Hide when leaving the list (and not on the link)
        memberList.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!link.matches(":hover")) {
                    memberList.style.display = "none";
                }
            }, 100);
        });
    }
});
