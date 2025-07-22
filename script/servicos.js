// Alternar abas laterais
document.querySelectorAll('.categoria').forEach(cat => {
    cat.addEventListener('click', () => {
        document.querySelectorAll('.categoria').forEach(c => c.classList.remove('active'));
        cat.classList.add('active');

        const categoria = cat.dataset.categoria;
        document.querySelectorAll('.conteudo').forEach(conteudo => {
            conteudo.style.display = conteudo.dataset.categoria === categoria || categoria === 'todos' ? 'block' : 'none';
        });
    });
});

// Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});
