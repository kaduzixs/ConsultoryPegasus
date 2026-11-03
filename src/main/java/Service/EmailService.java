package Service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;


@Getter
@Setter
@Service
public class EmailService{
    String name;
    String email;
    String mensage;

    public EmailService (String name, String email, String mensage) {
        this.name = name;
        this.email = email;
        this.mensage = mensage;
    }

    public EmailService() {
    }
}
