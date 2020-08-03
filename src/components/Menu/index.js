import React from 'react'
import logo from '../../assets/img/logo.png'
import './Menu.css'
import Button from '../Button'
import ButtonLink from '../ButtonLink'


function Menu() {
    return (
        <nav className="Menu">
            <a href="/">
                <img className="logo" src={logo} alt="css-logo" />
            </a>

            <Button as="a"className="ButtonLink" href="/">
                Novo Video
            </Button>
        </nav>


    )
}

export default Menu