document.addEventListener("DOMContentLoaded", () => {
    const imagens = document.querySelectorAll(".contato-img");

    imagens.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add("show");
        }, index * 150); // atraso progressivo
    });
});
