// Middleware 404
export default function pageNotfound(req, res) {
  res.status(404).json({ error: "Ressource not found" });
}
