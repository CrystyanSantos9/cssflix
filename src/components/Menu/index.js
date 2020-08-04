import React from 'react'
import logo from '../../assets/img/logo.png'
import './Menu.css'
import Button from '../Button'

import {Link} from 'react-router-dom'


function Menu() {
    return (
        <nav className="Menu">
            <Link to="/">
                <img className="logo" src={logo} alt="CSSFLIX Logo" />
            </Link>
            <Button as={Link} className="ButtonLink" to="/cadastro/video">
                Novo Video
            </Button>
        </nav>
    )
}

export default Menu