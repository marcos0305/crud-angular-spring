package enums.converters;

import ch.qos.logback.core.status.Status;
import enums.Category;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter <Status, String> {

    @Override
    public String convertToDatabaseColumn(Status category) {
        if (category == null){
            return null;
        }
        return category.getMessage();
    }

    @Override
    public Status convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return Stream.of(Status.values())
            //.filter(c -> c.getValue().equals(value))
            //.findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada para o valor: " + value));
    }

}

