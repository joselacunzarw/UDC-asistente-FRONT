export const mockResponses = {
  health: {
    overall_status: 'healthy',
    timestamp: new Date().toISOString(),
  },
  chat: [
    {
      reply: "¡Hola! Soy el Asistente UDC, tu guía virtual de la Universidad del Chubut. ¿En qué puedo ayudarte hoy?",
    },
    {
      reply: `# Universidad del Chubut

La Universidad del Chubut (UDC) es una institución de educación superior pública argentina, con sede central en Rawson, provincia del Chubut.

## Carreras Destacadas

### Tecnicaturas
- Desarrollo de Software
- Enfermería
- Gestión Ambiental

### Licenciaturas
- Enfermería
- Administración

> Para más información sobre nuestras carreras, visita [www.udc.edu.ar](https://udc.edu.ar)

### Proceso de Inscripción
1. Completar formulario online
2. Presentar documentación
3. Entrevista inicial
4. Confirmación de inscripción`,
    },
    {
      reply: `## Información de Contacto

| Sede      | Dirección               | Teléfono      |
|-----------|------------------------|---------------|
| Rawson    | Lewis Jones 248        | (0280) 4481866|
| Trelew    | 9 de Julio 397        | (0280) 4420549|
| Esquel    | Sarmiento 940         | (02945) 451439|

### Enlaces Importantes
- 📚 [Campus Virtual](https://campus.udc.edu.ar)
- 📧 [Contacto](mailto:info@udc.edu.ar)
- 📱 [Redes Sociales](https://facebook.com/UniversidadDelChubut)`,
    },
  ],
};

export const getMockResponse = (type: 'health' | 'chat'): any => {
  if (type === 'health') return mockResponses.health;
  
  const randomIndex = Math.floor(Math.random() * mockResponses.chat.length);
  return mockResponses.chat[randomIndex];
};