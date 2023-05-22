/* eslint-disable no-useless-escape */
export const avatarRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
export const emailRegex = /^\S+@\S+\.\S+$/;
export const nameRegex = /^[A-Za-záéíóúñÑ\s]+$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*\s).{6,15}$/;
