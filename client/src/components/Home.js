import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqloperations/queries";

const Home = () => {

  const {loading,error,data} = useQuery(GET_ALL_QUOTES,{
    fetchPolicy:"network-only"
    })

   if(loading) return <h1>Loading</h1>
   if(error){
       console.log(error.message)
   }
   if(data.quotes.length === 0){
    return  <h2>No Quotes available</h2>
   }


  /** following code is for making network call using useEffect hook & without using apollo client */
  /** 
  useEffect(()=>{
    fetch("http://localhost:4000",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query:`
        query getAllQuotes{
          quotes{
            name
            by{
              _id
              firstName
            }
          }
        }
        `,
        // variables:{}  - for adding variables here
      })
    })
    .then(res=>res.json())
        .then(data=>console.log(data))
  },[])
*/

  return (
    <div className="container">
      {data.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
            {/*<Link to={`/profile/${quote.by._id}`}>*/}
            <p className="right-align">~{quote.by.firstName}</p>
            {/*</Link>*/}
          </blockquote>
        );
      })}
      {/** 
      <blockquote>
        <h6>If it works, don't delete it</h6>
        <p className='right-align'>~username</p>
      </blockquote>
      <blockquote>
        <h6>If it works, don't delete it</h6>
        <p className='right-align'>~username</p>
      </blockquote>
    */}
    </div>
  );
};

export default Home;
