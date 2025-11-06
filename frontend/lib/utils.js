import { format, formatDistance, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Formatear fecha completa
export const formatDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, "d 'de' MMMM, yyyy", { locale: es });
};

// Formatear fecha corta
export const formatShortDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'dd/MM/yyyy', { locale: es });
};

// Formatear hora
export const formatTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'HH:mm', { locale: es });
};

// Formatear tiempo relativo
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(parsedDate, new Date(), { 
    addSuffix: true,
    locale: es 
  });
};

// Obtener estado del partido
export const getMatchStatus = (status) => {
  const statusMap = {
    'NS': 'Programado',
    'TBD': 'Por definir',
    '1H': 'Primer Tiempo',
    'HT': 'Medio Tiempo',
    '2H': 'Segundo Tiempo',
    'ET': 'Tiempo Extra',
    'P': 'Penales',
    'FT': 'Finalizado',
    'AET': 'Finalizado (Tiempo Extra)',
    'PEN': 'Finalizado (Penales)',
    'SUSP': 'Suspendido',
    'INT': 'Interrumpido',
    'PST': 'Pospuesto',
    'CANC': 'Cancelado',
    'ABD': 'Abandonado',
    'AWA': 'Technical Loss',
    'WO': 'WalkOver',
    'LIVE': 'En Vivo'
  };

  return statusMap[status] || status;
};

// Verificar si el partido está en vivo
export const isMatchLive = (status) => {
  const liveStatuses = ['1H', '2H', 'HT', 'ET', 'P', 'BT', 'LIVE'];
  return liveStatuses.includes(status);
};

// Obtener clase de badge según estado
export const getStatusBadgeClass = (status) => {
  if (isMatchLive(status)) return 'badge-live';
  if (status === 'FT' || status === 'AET' || status === 'PEN') return 'badge-finished';
  return 'badge-scheduled';
};

// Truncar texto
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Generar slug desde título
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Formatear número con separador de miles
export const formatNumber = (num) => {
  return new Intl.NumberFormat('es-MX').format(num);
};

export default {
  formatDate,
  formatShortDate,
  formatTime,
  formatRelativeTime,
  getMatchStatus,
  isMatchLive,
  getStatusBadgeClass,
  truncateText,
  generateSlug,
  formatNumber
};
