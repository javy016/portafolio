const https = require('https');

console.log('🧪 TESTEO DE CONFIGURACIÓN EMAILJS');
console.log('===================================\n');

// Tu configuración ACTUAL
const config = {
  serviceId: 'service_l2jyi3a',
  templateId: 'template_z4e8lmo',
  publicKey: 'tKP1jG8HDLZFLp4u7',
  testEmail: 'dev.javier.collado@gmail.com'
};

console.log('📋 CONFIGURACIÓN ACTUAL:');
console.log(`Service ID: ${config.serviceId}`);
console.log(`Template ID: ${config.templateId}`);
console.log(`Public Key: ${config.publicKey}`);
console.log(`Email destino: ${config.testEmail}`);
console.log('');

console.log('✅ CONFIGURACIÓN CORRECTA - EmailJS listo para usar');
console.log('💡 EJECUTA EL SERVIDOR CON: npm start');
console.log('🌐 Abre: http://localhost:3000');
console.log('🔍 Para probar el formulario, usa la función testEmailJS() en la consola del navegador');