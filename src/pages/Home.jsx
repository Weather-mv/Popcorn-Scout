import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import "../css/Home.css"


const Home = () => {

    const [searchQuery, setsearchQuery] = useState("");


     const movies=[
        {id:1,title:"John Wick", release_date:"2024"},
        {id:2,title:"Terminator", release_date:"1990"},
        {id:3,title:"The Matrix", release_date:"2000"},

     ]

     const handleSearch=(e)=>{
        e.preventDefault()
        alert(searchQuery)
    
     }
    
    
  return (
    <div className='home'>

        <form onSubmit={handleSearch} className='search-form'>
            <input 
            type="text" 
            placeholder='Search for Movies' 
            className='search-input'
            value={searchQuery}
            onChange={(e)=>{setsearchQuery(e.target.value)}}/>
            <button type='submit' className='search-button'>Search</button>
        </form>


        <div className='movies-grid'>
            {movies.map(movie=>
            <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>
  )
}

export default Home