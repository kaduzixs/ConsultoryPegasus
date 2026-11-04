package dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(

        @NotBlank(message = "Informe seu e-mail.")
        @Email(message = "Informe um e-mail válido.")
        @Size(max = 200)
        String email,

        @NotBlank(message = "Informe seu telefone.")
        @Size(max = 20)
        String phone,

        @NotBlank(message = "Escreva sua mensagem.")
        @Size(max = 4000)
        String message,

        @Size(max = 200)
        String website

) {}