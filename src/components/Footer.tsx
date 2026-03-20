import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#2a2a4a] bg-[#12121e] mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl" aria-hidden="true">🌙</span>
              <span className="font-semibold text-[#e8e6f0]">entiendetusueno.com</span>
            </Link>
            <p className="text-sm text-[#8b87a0] leading-relaxed">
              No te decimos qué significa tu sueño. Te ayudamos a entender qué está
              pasando en ti cuando lo tienes. Psicología real, sin superstición.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#e8e6f0] mb-3 uppercase tracking-wider">
              Explorar
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Todos los artículos
                </Link>
              </li>
              <li>
                <Link href="/interpretador" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Entender mi sueño (IA)
                </Link>
              </li>
              <li>
                <Link href="/categoria/animales" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Sueños con animales
                </Link>
              </li>
              <li>
                <Link href="/categoria/emociones" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Sueños emocionales
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#e8e6f0] mb-3 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/condiciones" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Condiciones de servicio
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-sm text-[#8b87a0] hover:text-[#7c6af7] transition-colors">
                  Política de devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a4a] mt-10 pt-6 text-center">
          <p className="text-xs text-[#4a4760]">
            © {year} entiendetusueno.com — Todos los derechos reservados
          </p>
          <p className="text-xs text-[#4a4760] mt-1">
            La interpretación de sueños es de carácter orientativo. No sustituye el consejo de un profesional de salud mental.
          </p>
        </div>
      </div>
    </footer>
  );
}
