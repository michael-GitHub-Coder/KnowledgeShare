import React, { useEffect, useState } from 'react'
import Card from './Card'

const Dash = () => {

  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const response = await fetch("http://localhost:3001/api/v1/guide/latestGuides");
      const data = await response.json();
      setGuides(data.sortedByLatestDate);
    };
    fetchGuides();
  }, []);

  console.log(guides)

  return (
    <div>
        <p>Lates guides</p>
        <div className="grid grid-cols-4 -mt-20">
        {  guides.map(data=>( 
            <Card image={data.media} title={data.title} content={data.content} Author={data.userId.username} />
          )).slice(0,4)
        }
      </div> 
    </div>
  )
}

export default Dash