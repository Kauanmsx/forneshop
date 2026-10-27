export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, password } = req.body;

  // Credenciais de administrador provisórias/diretas para garantires acesso imediato hoje
  if (email === "admin@forneshop.com" && password === "admin123") {
    return res.status(200).json({
      success: true,
      user: { name: "Administrador Forneshop", email: email, role: "admin" }
    });
  }

  return res.status(401).json({ error: "E-mail ou senha incorretos." });
}