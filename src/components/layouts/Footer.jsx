import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"

const Footer = () => {

  const {t} = useTranslation()

  return (
    <footer className="w-full p-5 flex flex-col items-center justify-center gap-5 bg-[var(--bg-color)] z-10">
        {/* <ul className="flex items-center justify-center gap-8">
            <li className="relative inline-block">
                <Link href="/privacy-policy" title="Privacy Policy">Privacy Policy</Link>
            </li>
            <li className="relative inline-block">
                <Link href="/terms-service" title="Terms of Service">Terms of Service</Link>
            </li>
        </ul> */}
        <p>© {new Date().getFullYear()} {t('footer_copyright')}</p>
    </footer>
  )
}

export default Footer