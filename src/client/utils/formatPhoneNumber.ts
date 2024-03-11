export const formatPhoneNumber = (value: string) => {
    // Remove qualquer caracter que não seja dígito
    const cleanedValue = value.replace(/\D/g, '');
    // Aplica a máscara do telefone
    const match = cleanedValue.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };