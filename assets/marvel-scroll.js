let activeElement = null
let hasActiveElementChanged = false
const isElementVisible = (elementId) => {
    const windowHeight = window.innerHeight
    const el = document.getElementById(elementId)
    const elementPosition = el.getBoundingClientRect().top
    return (elementPosition >= -windowHeight / 2) && (elementPosition < windowHeight / 2)
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
            const listElementContent = document.createElement("div")
            listElementContent.classList.add("scroll-menu-element")
            const listElementLine = document.createElement("div")
            const elementContentText = document.createElement("div")
            if (isElementVisible(sectionElement.id) && sectionElement.id !== activeElement) {
                activeElement = sectionElement.id
                elementContentText.innerText = sectionElement.id
                listElementLine.classList.add("scroll-menu-line-active")
            } else {
                listElementLine.classList.add("scroll-menu-element-line")
            }
            if (activeElement === "Home" || activeElement === "Contact") {
                listElementLine.classList.add("scroll-menu-line-white")
            } else {
                listElementLine.classList.remove("scroll-menu-line-white")
            }
            listElementContent.append(elementContentText)
            listElementContent.append(listElementLine)
            listElement.append(listElementContent)
            scrollMenu.append(listElement)
        }
    }
    if (activeElement === "Home" || activeElement === "Contact") {
        scrollMenu.classList.add("scroll-menu-white")
    } else {
        scrollMenu.classList.remove("scroll-menu-white")
    }
}
const handleScroll = () => {
    const sectionList = document.getElementById("MainContent")
    const scrollMenu = document.getElementById("ScrollMenu")
    for (const section of sectionList.children) {
        const childrenLength = section.children.length
        const sectionElement = section.children[childrenLength - 1]
        if (sectionElement.id !== "ScrollMenu") {
            if (isElementVisible(sectionElement.id) && sectionElement.id !== activeElement && !hasActiveElementChanged) {
                activeElement = sectionElement.id
                hasActiveElementChanged = true
                for (const listElement of scrollMenu.children) {
                    if (listElement.name === activeElement) {
                        listElement.children[0].children[0].innerText = activeElement
                        listElement.children[0].children[1].classList.replace("scroll-menu-element-line", "scroll-menu-line-active")
                    } else {
                        listElement.children[0].children[0].innerText = ""
                        listElement.children[0].children[1].classList.replace("scroll-menu-line-active", "scroll-menu-element-line")
                    }
                    if (activeElement === "Home" || activeElement === "Contact") {
                        listElement.children[0].children[1].classList.add("scroll-menu-line-white")
                    } else {
                        listElement.children[0].children[1].classList.remove("scroll-menu-line-white")
                    }
                }
            }
            if (activeElement === "Home" || activeElement === "Contact") {
                scrollMenu.classList.add("scroll-menu-white")
            } else {
                scrollMenu.classList.remove("scroll-menu-white")
            }
        }
    }
    hasActiveElementChanged = false
}
window.addEventListener("load", handleLoad);
window.addEventListener("scroll", handleScroll);