
package Controller;



import Service.EmailService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> send(@Valid @RequestBody ContactRequest request) {

        if (request.website() != null && !request.website().isBlank()) {

            return ResponseEntity.ok(Map.of("message", "Mensagem recebida."));
        }

        emailService.sendContactMessage(request);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Mensagem enviada com sucesso."));
    }
}
