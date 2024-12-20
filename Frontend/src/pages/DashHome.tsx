import React, { useEffect, useState } from 'react'
import ArticleInDash from '../Components/ArticleInDash'
import Card from '../Components/Card';

const DashHome = () => {

    const [guides, setGuides] = useState<[]>([]);

    useEffect(() => {
      const fetchGuides = async () => {
        const response = await fetch("http://localhost:3001/api/v1/guide/latestGuides");
        const data = await response.json();
        setGuides(data.sortedByLatestDate);
      };
      fetchGuides();
    }, []);
  
  
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
  return (
    <div>
        <p className="px-5">Lates guides</p>
        <div className="grid grid-cols-3 -mt-20">
        {guides.map(data=>( 
            
            <Card _id={data._id} image={data.media} title={data.title} content={data.content} Author={data.userId.username} day={data.createdAt.substring(8,10)} month={months[parseInt(data.createdAt.substring(5, 7), 10) - 1]}/>
            )).slice(0,3) 
        }
        </div> 
    </div>
  )
}

export default DashHome