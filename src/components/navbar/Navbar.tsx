import { FC } from 'react'
import './Navbar.css'
import Logo from './Logo'

interface NavbarProps {
    children: React.ReactNode
}

const Navbar: FC<NavbarProps> = ({ children }) => {
    return (
        <div className='cp-nav'>
            <Logo />
            {children}
        </div>
    )
}

export default Navbar;