
const API_ENDPOINT = 'http://localhost:8080/api/contact';

const form = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');
const buttonLabel = submitButton.querySelector('.button-label');
const phoneInput = document.querySelector('#phone');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

// Mostra o ano atual automaticamente no rodapé.
document.querySelector('#year').textContent = new Date().getFullYear();

// Mantém o menu móvel acessível pelo teclado e informa seu estado ao leitor de tela.
menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
    mobileNav.hidden = isExpanded;
});

mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mobileNav.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
});

// Aplica uma máscara simples ao telefone sem impedir a digitação de números internacionais.
phoneInput.addEventListener('input', () => {
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 13);

    if (digits.length <= 11 && digits.length >= 3) {
        phoneInput.value = digits.length <= 10
            ? digits.replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
            : digits.replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    } else if (digits.length < 3) {
        phoneInput.value = digits;
    } else {
        phoneInput.value = '+' + digits;
    }
});

// Envia os dados do formulário para o backend Spring Boot.
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    statusMessage.textContent = '';
    statusMessage.classList.remove('error');

    if (!form.reportValidity()) return;

    const phoneDigits = phoneInput.value.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
        statusMessage.textContent =
            'Informe um número de telefone válido com DDD.';

        statusMessage.classList.add('error');
        phoneInput.focus();
        return;
    }

    submitButton.disabled = true;
    buttonLabel.textContent = 'Enviando...';

    const payload = {
        name: document.querySelector('#name').value.trim(),
        phone: phoneInput.value.trim(),
        message: document.querySelector('#message').value.trim(),
        website: ''
    };

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorDetails = await response.text();

            console.error('Status HTTP:', response.status);
            console.error('Resposta do servidor:', errorDetails);

            throw new Error(`Erro HTTP ${response.status}: ${errorDetails}`);
        }

        statusMessage.textContent =
            'Mensagem enviada! Obrigado por entrar em contato com a Pegasus.';

        form.reset();

    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);

        statusMessage.textContent =
            'Não foi possível enviar sua mensagem. Tente novamente mais tarde.';

        statusMessage.classList.add('error');

    } finally {
        submitButton.disabled = false;
        buttonLabel.textContent = 'Enviar mensagem';
    }
});
