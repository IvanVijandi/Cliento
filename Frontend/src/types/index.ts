export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  type: 'initial-consultation' | 'therapy-session' | 'follow-up' | 'other';
  location?: 'in-person' | 'video' | 'phone';
  createdAt: string;
  updatedAt: string;
}

export interface SessionNote {
  id: string;
  clientId: string;
  appointmentId?: string;
  date: string;
  content: string;
  mood?: string;
  progress?: string;
  plan?: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'practitioner';
}

export interface Note {
  id: number;
  contenido: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  consulta: number;
  paciente_nombre: string;
  paciente_apellido: string;
  paciente_id: number;
  fecha_consulta: string;
}

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Consulta {
  id: number;
  fecha: string;
  profesional: number;
  consultorio: number;
  paciente: number;
  virtual: boolean;
}