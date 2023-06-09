let activeElement = null
let hasActiveElementChanged = false
const darkModeSections = []

const isElementVisible = (elementId) => {
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

const clickHandler = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    const el = document.querySelector(href)

    if (el) {
        const offsetTop = el.offsetTop;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }
}

const handleLoad = () => {
    const sectionList = document.getElementById("MainContent")
    const scrollMenu = document.getElementById("ScrollMenu")

    for (const section of sectionList.children) {
        const childrenLength = section.children.length
        const sectionElement = section.children[childrenLength - 1]

        if (sectionElement.id !== "ScrollMenu") {
            const listElement = document.createElement("li")
            listElement.name = sectionElement.id
            const listElementContent = document.createElement("a")
            listElementContent.classList.add("scroll-menu-item")
            listElementContent.href = "#" + sectionElement.id

            if (isElementVisible(sectionElement.id)) {
                activeElement = sectionElement.id
                listElementContent.innerText = sectionElement.id
                listElementContent.classList.add("scroll-menu-item-active")
            } else {
                listElementContent.innerText = " "
            }

            if (sectionElement.getAttribute("dark") === "true") {
                darkModeSections.push(sectionElement.id)
            }

            listElement.append(listElementContent)
            scrollMenu.append(listElement)
        }
    }

    for (const listElement of scrollMenu.children) {

        if (darkModeSections.includes(activeElement)) {
            listElement.children[0].classList.add("scroll-menu-item-white")
        } else {
            listElement.children[0].classList.remove("scroll-menu-item-white")
        }

        listElement.children[0].addEventListener("click", clickHandler)
    }
}

const handleScroll = () => {
    const sectionList = document.getElementById("MainContent")
    const scrollMenu = document.getElementById("ScrollMenu")

    for (const section of sectionList.children) {
        const childrenLength = section.children.length
        const sectionElement = section.children[childrenLength - 1]

        if (sectionElement.id !== "ScrollMenu" && isElementVisible(sectionElement.id) && sectionElement.id !== activeElement && !hasActiveElementChanged) {
            activeElement = sectionElement.id
            hasActiveElementChanged = true

            for (const listElement of scrollMenu.children) {

                if (listElement.name === activeElement) {
                    listElement.children[0].innerText = activeElement
                    listElement.children[0].classList.add("scroll-menu-item-active")
                } else {
                    listElement.children[0].innerText = " "
                    listElement.children[0].classList.remove("scroll-menu-item-active")
                }

                if (darkModeSections.includes(activeElement)) {
                    listElement.children[0].classList.add("scroll-menu-item-white")
                } else {
                    listElement.children[0].classList.remove("scroll-menu-item-white")
                }
            }
        }
    }

    hasActiveElementChanged = false
}

window.addEventListener("load", handleLoad);
window.addEventListener("scroll", handleScroll);