import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import "../css/Home.css"
import { searchMovies,getPopularMovies } from '../services/api'


const Home = () => {
    

    const [searchQuery, setsearchQuery] = useState("");
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

     useEffect(() => {
        const loadPopularMovies = async()=>{
            try{
                const populareMovies=await getPopularMovies()
                setMovies(populareMovies)
            }
            catch(err){
                setError("Failed to load Movies...")
            }
            finally{
                setLoading(false)
            }
        }

        loadPopularMovies()
     }, [])
      

     const handleSearch= async(e)=>{
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }
        catch(err){
            console.log(err)
            setError("Failed to search movies...")
           
        }
        finally{
            setLoading(false)
        }
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

        {error && <div className='error-message'>{error}</div>}


        {loading?
        <div className='loading'>Loading..</div>
        :
         <div className='movies-grid'>
            {movies.map(movie=>
            <MovieCard movie={movie} key={movie.id}/>)}
        </div>}
       
    </div>
  )
}

export default Home