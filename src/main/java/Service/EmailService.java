package Service;

import dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String recipient;

    @Value("${spring.mail.username}")
    private String sender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactMessage(ContactRequest request) {

        SimpleMailMessage email = new SimpleMailMessage();

        email.setFrom(sender);
        email.setTo(recipient);

        // Permite responder diretamente ao visitante.
        email.setReplyTo(request.email().trim());

        email.setSubject("Novo contato pelo site Pegasus");

        email.setText("Uma nova mensagem foi enviada pelo site Pegasus.\n\n" + "E-mail do visitante: " + request.email().trim() + "\n" + "Telefone: " + request.phone().trim() + "\n\n" + "Mensagem:\n" + request.message().trim());

        mailSender.send(email);
    }
}