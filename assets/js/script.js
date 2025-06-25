
const toggleIcon = document.querySelectorAll(".togglePassword");
let paswordType = document.querySelectorAll('#inputPassword4');

const accordionButton = document.querySelectorAll(".accordion-button");

const tableBody = document.getElementById("table-body");
const numRows = 7;
const numCols = 45;

toggleIcon.forEach((icon) => {
    icon.addEventListener("click", function () {

        const input = this.parentElement.querySelector('input');

        const type = input.getAttribute("type") === "password" ? "text" : "password";
        input.setAttribute("type", type);

        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    })
});

accordionButton.forEach((button) => {
    button.addEventListener("click", function () {
        const downArrow = this.parentElement.querySelector(".down-arrow");

        if (downArrow) {
            downArrow.classList.toggle("rotate-90");
        }
    })
})

for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < numCols; j++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
    }
    tableBody.appendChild(row);
}

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');

    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });

            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const target = document.querySelector(this.dataset.bsTarget);
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            target.classList.add('show', 'active');
        });
    });

    document.getElementById('all-tab').click();
});

const menuOpen = document.getElementsByClassName("menu-open")[0];
const menuClose = document.getElementsByClassName("menu-close")[0];
const sidebar = document.getElementsByClassName("sidebar")[0];

const openMenu = () => {
    sidebar.classList.add("activeSidebar");
    menuOpen.style.display = "none"
    setTimeout(() => {
        menuClose.style.display = "block"
    }, 350);
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuOpen.style.display = 'none';
        menuClose.style.display = "none"
    }
})
const closeMenu = () => {
    sidebar.classList.remove("activeSidebar");
    menuOpen.style.display = "block"
    menuClose.style.display = "none"
}

