import './App.css'
import Card from './Components/Card'
import Login from './Components/Login'
import Register from './Components/Register'

const App = () => {
  const data = [
    {
      "image": "https://www.topgear.com/sites/default/files/2022/07/9_1.jp",
      "title": "The Ultimate Guide to React",
      "content": "Learn the fundamentals of React and how to build dynamic web applications using this popular JavaScript library."
    },
    {
      "image": "https://www.topgear.com/sites/default/files/2022/07/9_1.jp",
      "title": "Mastering JavaScript ES6",
      "content": "Dive deep into the new features of JavaScript ES6 and how they improve the development process."
    },
    {
      "image": "https://www.topgear.com/sites/default/files/2022/07/9_1.jp",
      "title": "Understanding TypeScript",
      "content": "A comprehensive guide to TypeScript, offering better code quality and development experience with its type system."
    }
  ];
  
  return (
    <>
      {/* <Login /> */}
      {/* <Register /> */}
      <div className="flex justify-center gap-4">
        {  data.map(data=>( 
            <Card image={data.image} title={data.title} content={data.content}/>
          ))  
        }
      </div>
    </>
  )
}

export default App
