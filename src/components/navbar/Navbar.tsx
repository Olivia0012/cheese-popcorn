import { FC } from 'react'
import './Navbar.css'

interface NavbarProps {
    children: React.ReactNode
}

const Navbar: FC<NavbarProps> = ({ children }) => {
    return (
        <div className='cp-nav'>
            {children}
        </div>
    )
}

export default Navbar;