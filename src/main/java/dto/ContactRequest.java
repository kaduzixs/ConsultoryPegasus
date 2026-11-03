
package dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(

        @NotBlank(message = "Informe seu nome.")
        @Size(max = 100)
        String name,

        @NotBlank(message = "Informe seu telefone.")
        @Size(max = 20)
        String phone,

        @NotBlank(message = "Escreva sua mensagem.")
        @Size(max = 4000)
        String message,

        @Size(max = 200)
        String website

) {}
