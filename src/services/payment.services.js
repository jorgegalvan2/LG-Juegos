async function payment(data) {
  try {
    const response = await fetch(`https://lg-juegos-api.vercel.app/api/payment`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return response.json();
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'La contraseña o el email son incorrectos. Por favor ingrese una cuenta válida.');
    }
  } catch (error) {
    throw error;
  }
}

export {
  payment
}