import React from 'react'
import HomeLayout from './layout'
import Curso from '../componentes/Curso'


export default function home() {
  return (
    
    <div className='w-screen h-screen bg-gray-800 flex items-center justify-center flex overflow-x-auto'>
      
     <Curso title={'C++'} description={'Curso Basico de C++'} category={'Programacion'} instructor={'Juan Perez'} duration={5} requirement={'Ninguno'}/>
     <Curso title={'Python'} description={'Curso Basico de Python'} category={'Programacion'} instructor={'Jose Gonzalez'} duration={4} requirement={'Ninguno'}/>
     <Curso title={'Javascript'} description={'Curso Basico de Javascript'} category={'Desarrollo Web'} instructor={'Maria Diaz'} duration={7} requirement={'Ninguno'}/>
     <Curso title={'React'} description={'Curso Basico de React'} category={'Desarrollo Web'} instructor={'Raul Gomez'} duration={10} requirement={'Ninguno'}/>
     <Curso title={'HTML - CSS'} description={'Curso Basico de HTML y CSS'} category={'Desarrollo Web'} instructor={'Felipe Marcos'} duration={4} requirement={'Ninguno'}/> 

    </div>
    
  )
}
