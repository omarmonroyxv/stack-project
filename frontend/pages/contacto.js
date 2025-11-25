import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setStatus({ type: 'error', message: 'Por favor, completa todos los campos obligatorios.' });
      setIsSubmitting(false);
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Por favor, ingresa un email válido.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Aquí puedes agregar la lógica para enviar el email
      // Por ahora solo simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus({
        type: 'success',
        message: 'Tu mensaje ha sido enviado correctamente. Te responderemos pronto.'
      });

      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Contacto</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '1.1em' }}>
          ¿Tienes alguna pregunta, sugerencia o comentario? Nos encantaría escucharte.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px',
          marginBottom: '50px'
        }} className="md:grid-cols-2">
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ fontSize: '1.3em', marginBottom: '15px', color: '#333' }}>
              📧 Email
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Para consultas generales o propuestas de colaboración:
              <br />
              <strong>contacto@stacklive.site</strong>
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ fontSize: '1.3em', marginBottom: '15px', color: '#333' }}>
              🕒 Tiempo de Respuesta
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Intentamos responder todas las consultas en un plazo de 24-48 horas laborables.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '25px', color: '#333' }}>Envíanos un Mensaje</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Nombre <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1em',
                  boxSizing: 'border-box'
                }}
                placeholder="Tu nombre completo"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Email <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1em',
                  boxSizing: 'border-box'
                }}
                placeholder="tu@email.com"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Asunto
              </label>
              <input
                type="text"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1em',
                  boxSizing: 'border-box'
                }}
                placeholder="¿De qué se trata tu mensaje?"
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Mensaje <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1em',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            {status.message && (
              <div style={{
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '4px',
                backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                color: status.type === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
              }}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
                color: 'white',
                padding: '14px 30px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1em',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                width: '100%',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = '#0056b3';
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = '#007bff';
              }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>

        <div style={{
          marginTop: '50px',
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          borderLeft: '4px solid #007bff'
        }}>
          <h3 style={{ fontSize: '1.4em', marginBottom: '15px', color: '#333' }}>Otros Motivos de Contacto</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '2', color: '#666' }}>
            <li><strong>Reportar contenido:</strong> Si encuentras algún error o contenido inapropiado</li>
            <li><strong>Colaboraciones:</strong> Propuestas de colaboración o patrocinio</li>
            <li><strong>Derechos de autor:</strong> Reclamaciones de propiedad intelectual</li>
            <li><strong>Sugerencias:</strong> Ideas para mejorar el sitio web</li>
            <li><strong>Soporte técnico:</strong> Problemas técnicos o de navegación</li>
          </ul>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
          <p>
            Revisa también nuestra{' '}
            <a href="/politica-privacidad" style={{ color: '#007bff', textDecoration: 'none' }}>Política de Privacidad</a>
            {' '}para saber cómo tratamos tus datos personales.
          </p>
        </div>
      </div>
    </Layout>
  );
}
