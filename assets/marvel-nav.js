let activeSectionElement = null
let hasActiveSectionChanged = false
let isMenuOpen = false

const isElementAtTheTop = (el) => {
    const elementPositionTop = el.getBoundingClientRect().top

    return elementPositionTop === 0
}

const isSectionVisible = (elementId) => {
    const windowHeight = window.innerHeight
    const el = document.getElementById(elementId)
    if (el) {
        const elementPositionTop = el.getBoundingClientRect().top
        const elementPositionBottom = el.getBoundingClientRect().bottom
        const halfWindowHeight = windowHeight / 2
        const res = halfWindowHeight > elementPositionTop && halfWindowHeight < elementPositionBottom

        return res
    } else {
        return false
    }
}

const toggleNavMenu = () => {
    const navElementContainer = document.getElementById("marvel_nav")
    navElementContainer.children[1].classList.toggle("marvel-nav-show-element")
    const homeElement = document.getElementById("Home")
    if (!homeElement || (!isElementAtTheTop(homeElement) && !isMenuOpen)) {
        navElementContainer.classList.add("marvel-nav-container-fill")
    }
    navElementContainer.classList.toggle("marvel-nav-container-fill-dark")

    const menuLogo = navElementContainer.children[0].children[0]
    menuLogo.classList.toggle("marvel-nav-logo-dark-mode")

    const menuButton = navElementContainer.children[0].children[2]
    menuButton.classList.toggle("marvel-nav-burger-menu-button")
    menuButton.classList.toggle("marvel-nav-burger-menu-close")

    isMenuOpen = !isMenuOpen
}

const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    const el = document.querySelector(href)

    if (el) {
        const offsetTop = el.offsetTop;

        if (window.innerWidth <= 768.98 && isMenuOpen) {
            toggleNavMenu()
        }

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }
}

const handleNavMenuClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    const el = document.querySelector(href)

    if (el) {
        const offsetTop = el.offsetTop;

        toggleNavMenu()

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }
}

const handleBurgerMenuClick = (e) => {
    toggleNavMenu()
    handleNavScroll()
}

const fillNavBackground = (navElement) => {
    const homeElement = document.getElementById("Home")
    if (homeElement) {
        const isAtTheTop = isElementAtTheTop(homeElement)

        if (isAtTheTop) {
            navElement.classList.remove("marvel-nav-container-fill")
        } else {
            navElement.classList.add("marvel-nav-container-fill")
        }
    } else {
        navElement.classList.add("marvel-nav-container-fill")
    }
}

const handleNavLoad = () => {
    const sectionList = document.getElementById("MainContent")
    const navElementContainer = document.getElementById("marvel_nav")
    const navElement = navElementContainer.children[0]
    navElement.children[0].addEventListener("click", handleNavClick)

    for (const listItem of navElement.children[1].children) {
        listItem.children[0].addEventListener("click", handleNavClick)
    }

    fillNavBackground(navElementContainer)

    const burgerMenuButton = document.getElementById("burger_menu_button")
    burgerMenuButton.addEventListener("click", handleBurgerMenuClick)

    for (const navMenuItem of navElementContainer.children[1].children[0].children) {
        navMenuItem.children[0].addEventListener("click", handleNavMenuClick)
    }

    for (const section of sectionList.children) {
        const childrenLength = section.children.length
        const sectionElement = section.children[childrenLength - 1]

        if (sectionElement.id !== "ScrollMenu" && isSectionVisible(sectionElement.id)) {
            activeSectionElement = sectionElement.id
            hasActiveSectionChanged = true

            for (const navItem of navElement.children[1].children) {

                if (navItem.getAttribute("name") === activeSectionElement) {
                    navItem.children[0].classList.add("marvel-nav-active-element")
                } else {
                    navItem.children[0].classList.remove("marvel-nav-active-element")
                }
            }
        }
    }

    hasActiveSectionChanged = false
}

const handleNavScroll = () => {
    const sectionList = document.getElementById("MainContent")
    const navElementContainer = document.getElementById("marvel_nav")
    const navElement = navElementContainer.children[0]

    fillNavBackground(navElementContainer)

    for (const section of sectionList.children) {
        const childrenLength = section.children.length
        const sectionElement = section.children[childrenLength - 1]

        if (sectionElement.id !== "ScrollMenu" && isSectionVisible(sectionElement.id) && sectionElement.id !== activeSectionElement && !hasActiveSectionChanged) {
            activeSectionElement = sectionElement.id
            hasActiveSectionChanged = true

            for (const navItem of navElement.children[1].children) {

                if (navItem.getAttribute("name") === activeSectionElement) {
                    navItem.children[0].classList.add("marvel-nav-active-element")
                } else {
                    navItem.children[0].classList.remove("marvel-nav-active-element")
                }

            }
        }
    }

    hasActiveSectionChanged = false
}

window.addEventListener("load", handleNavLoad);
window.addEventListener("scroll", handleNavScroll)