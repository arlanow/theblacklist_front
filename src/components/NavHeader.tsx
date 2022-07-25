import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from "react-router-dom";
import logo from '../logo.svg'

const NavHeader = () => {
    const navigate = useNavigate();
    const start = <Link to='/'><img alt="Логотип" src={logo} height="40" className="mr-2 ml-3 cursor-pointer"></img></Link>;
    const end = <InputText placeholder="Найти" type="text" />;

    const items = [
        {
            label: 'Новости',
            command: () => {
                navigate('/news')
            }
        },
        {
            label: 'Все',
            command: () => {
                navigate('/units')
            }
        },
        {
            label: 'Компании',
            command: () => {
                navigate('/units/companies')
            }
        },
        {
            label: 'Блогеры',
            command: () => {
                navigate('/units/bloggers')
            }
        }
    ];

    return (
        <div>
            <div className="card z-5" style={{ position: 'relative' }}>
                <Menubar model={items} start={start} end={end} />
            </div>
        </div>
    )
};

export default NavHeader;