'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import command from './modules/command';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';

//Timer
countTimer('22 july 2020');
//Burger-menu
toggleMenu();
//Popup
togglePopUp();
//Tabs
tabs();
// Slider
slider();
//Command
command();
//Сalculator
calculator(100);
// send_ajax_form
sendForm();