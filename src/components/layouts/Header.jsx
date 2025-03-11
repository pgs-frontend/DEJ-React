import { Link } from "@tanstack/react-router"
import Container from "./Container"
import { LuMail } from "react-icons/lu";
import { useEffect, useState } from "react";
import logoImage from "@/assets/images/logo.png"

const navList = [
    {
        id: 'nav-01',
        title: 'Find Jobs',
        link: '/'
    },
    // {
    //     id: 'nav-02',
    //     title: 'About',
    //     link: '/about'
    // },
    // {
    //     id: 'nav-03',
    //     title: 'Contact',
    //     link: '/contact'
    // }
]

const Header = () => {

    const [scrolled, setScrolled] = useState(false)
    const [isScrollUp, setIsScrollUp] = useState(false)
    let scrollOffset = 0

    useEffect(()=> {
        window.addEventListener('scroll', ()=> {
            
            window.scrollY > 5 ? setScrolled(true) : setScrolled(false)

            scrollOffset > window.scrollY ? setIsScrollUp(true) : setIsScrollUp(false)

            scrollOffset = window.scrollY

        })
    }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${scrolled ? 'scrolled' : ''} ${isScrollUp ? 'scroll_up' : ''}`}>
        <Container>
            <div className="w-full flex flex-row gap-6 items-center justify-between h-[6rem] transition-all">

                <Link href="/" title="Digital Economy Jobs" className="inline-block w-auto h-[2.3rem] sm:h-[3rem]">
                    <img src={logoImage} alt="Digital Economy Jobs Logo" className="w-auto h-full object-contain object-center" />
                </Link>

                <nav className="inline-block">
                    <ul className="inline-flex gap-2 items-center">
                        {
                            navList?.map(item=> (
                                <li className="inline-block relative" key={item.id}>
                                    <Link to={item.link} title={item.title} className="font-medium inline-flex !text-[var(--text-color)] items-center justify-center h-[2.25rem] rounded-[1.25rem] px-4 relative hover:bg-[#ffffff91] [&.active]:bg-white ![&.active]:text-text ">
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="inline-block relative">
                            <Link to={'mailto:info@jobs.ae'} className="text-lg">
                                <LuMail />
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </Container>
    </header>
  )
}

export default Header