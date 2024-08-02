// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Aqui va los errores

export const messageErrorHelper = (error: any) => {
  console.log(error);
  if (error.status === 'FETCH_ERROR') return 'TypeError: Failed to fetch, consult with the administrator.';
  return 'consult with the administrator.';
}