// @ts-ignore
/* eslint-disable */

declare namespace API {
  type AppointmentDto = {
    id?: number;
    user?: UserDto;
    physician?: PhysicianDto;
    time?: string;
    description?: string;
    medicalRecord?: MedicalRecordDto;
  };

  type AppointmentForm = {
    physicianId?: number;
    time?: string;
    description?: string;
  };

  type DepartmentCreationForm = {
    hospitalId?: number;
    name: string;
    section?: string;
  };

  type DepartmentDto = {
    id?: number;
    name?: string;
    section?: string;
    hospitalId?: number;
  };

  type Gender = 'Male' | 'Female' | 'Other';

  type HospitalCreationForm = {
    name: string;
    address: string;
  };

  type HospitalDto = {
    id?: number;
    name?: string;
    address?: string;
  };

  type LoginForm = {
    username: string;
    password: string;
  };

  type LoginResult = {
    token?: string;
    user?: UserDto;
  };

  type MedicalRecordDto = {
    id?: number;
    appointmentId?: number;
    symptom?: string;
    pastMedicalHistory?: string;
    diagnosis?: string;
  };

  type MedicalRecordForm = {
    appointmentId?: number;
    symptom?: string;
    pastMedicalHistory?: string;
    diagnosis?: string;
  };

  type PhysicianDto = {
    id?: number;
    name?: string;
    department?: DepartmentDto;
  };

  type PhysicianRegisterForm = {
    userId?: number;
    departmentId?: number;
  };

  type ProblemDetails = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
  };

  type RegisterForm = {
    username: string;
    password: string;
    name?: string;
    gender?: Gender;
    birthday?: string;
    phone?: string;
    email?: string;
  };

  type UpdateUserForm = {
    username?: string;
    password?: string;
    name?: string;
    gender?: Gender;
    birthday?: string;
    phone?: string;
    email?: string;
  };

  type UpdateUserFormAdmin = {
    username?: string;
    password?: string;
    name?: string;
    gender?: Gender;
    birthday?: string;
    phone?: string;
    email?: string;
    role?: string;
  };

  type UserDto = {
    id?: number;
    username?: string;
    name?: string;
    gender?: Gender;
    birthday?: string;
    age?: number;
    phone?: string;
    email?: string;
    role?: string;
  };
}
