document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.querySelector('.user-icon');
    const dropdown = document.querySelector('.dropdown-content');

    userIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // evita que o clique feche imediatamente
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener('click', function() {
        dropdown.style.display = 'none';
    });
});

