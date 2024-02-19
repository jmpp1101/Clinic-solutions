document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".image-item");
  
    function handleScroll() {
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                item.classList.add("show");
            }
        });
    }
  
    window.addEventListener("scroll", handleScroll);
});

const modal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");

// Verifica si la cookie ya está establecida para evitar que el modal se muestre nuevamente
if (!getCookie("modalShown")) {
    // Abre el modal cuando te desplazas al centro de la página
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const screenHeight = window.innerHeight;
        if (scrollPosition >= screenHeight / 2) {
            modal.style.display = "block";
        }
    });
}

// Cierra el modal al hacer clic en la "X" y establece una cookie
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    setCookie("modalShown", "true", 365); // Establece una cookie que dura 365 días
});

// Función para establecer una cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
}

// Función para obtener el valor de una cookie
function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

