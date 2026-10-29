const FORM_ENDPOINT = 'https://formsubmit.co/ajax/lisboasnery@gmail.com';

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
      ? digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2')
      : digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  } else if (digits.length < 3) {
    phoneInput.value = digits;
  } else {
    phoneInput.value = '+' + digits;
  }
});

// Envia nome, telefone e mensagem ao endereço configurado usando o serviço FormSubmit.
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.textContent = '';
  statusMessage.classList.remove('error');

  if (!form.reportValidity()) return;

  const phoneDigits = phoneInput.value.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    statusMessage.textContent = 'Informe um número de telefone válido com DDD.';
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
    _subject: 'Novo contato pelo site Pegasus',
    _template: 'table',
    _captcha: 'true'
  };

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok || result.success === 'false' || result.success === false) {
      throw new Error('O serviço não confirmou o envio.');
    }

    statusMessage.textContent = 'Mensagem enviada! Obrigado por entrar em contato com a Pegasus.';
    form.reset();
  } catch (error) {
    statusMessage.textContent = 'Não foi possível confirmar o envio. Tente novamente ou envie um e-mail para lisboasnery@gmail.com.';
    statusMessage.classList.add('error');
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = 'Enviar mensagem';
  }
});
