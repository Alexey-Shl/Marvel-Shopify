let activeElement = null
let hasActiveElementChanged = false

const isElementVisible = (elementId) => {
    const windowHeight = window.innerHeight
    const el = document.getElementById(elementId)
    const elementPositionTop = el.getBoundingClientRect().top
    return (elementPositionTop >= -windowHeight / 2) && (elementPositionTop < windowHeight / 2)
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

            if (isElementVisible(sectionElement.id) && sectionElement.id !== activeElement) {
                activeElement = sectionElement.id
                listElementContent.innerText = sectionElement.id
                listElementContent.classList.add("scroll-menu-item-active")
            } else {
                listElementContent.innerText = " "
            }

            if (activeElement === "Home" || activeElement === "Contact") {
                listElementContent.classList.add("scroll-menu-item-white")
            } else {
                listElementContent.classList.remove("scroll-menu-item-white")
            }

            listElement.append(listElementContent)
            scrollMenu.append(listElement)
        }
    }

    // if (activeElement === "Home" || activeElement === "Contact") {
    //     scrollMenu.classList.add("scroll-menu-container-white")
    // } else {
    //     scrollMenu.classList.remove("scroll-menu-container-white ")
    // }
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

                if (activeElement === "Home" || activeElement === "Contact") {
                    listElement.children[0].classList.add("scroll-menu-item-white")
                } else {
                    listElement.children[0].classList.remove("scroll-menu-item-white")
                }
            }
        }

        // if (activeElement === "Home" || activeElement === "Contact") {
        //     scrollMenu.classList.add("scroll-menu-container-white")
        // } else {
        //     scrollMenu.classList.remove("scroll-menu-container-white")
        // }
    }

    hasActiveElementChanged = false
}

window.addEventListener("load", handleLoad);
window.addEventListener("scroll", handleScroll);