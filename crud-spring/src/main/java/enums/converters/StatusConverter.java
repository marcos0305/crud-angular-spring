package enums.converters;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.stream.Stream;


@Converter
public class StatusConverter implements AttributeConverter<enums.Status, String> {
    @Override
    public String convertToDatabaseColumn(enums.Status status) {
        if (status == null) {
            return null;
        }
        return status.getValue();
    }

    @Override
    public enums.Status convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }
        return Stream.of(enums.Status.values())
            .filter(c -> c.getValue().equals(value))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Status não encontrado para o valor: " + value));
    }
}

