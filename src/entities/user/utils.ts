export function isAdult(birthdate: Date) {
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthdate.getFullYear();

  return currentDate.getMonth() < birthdate.getMonth() ? age > 16 : age >= 16;
}
