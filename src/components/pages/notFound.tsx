import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { client } from "../../utils/client";
import { newsDetailMoreQuery } from "../../utils/data";

import Footer from "../reuseables/footer";
import Navbar from "../reuseables/navbar";

interface NewInfo{
  _id: string;
  title: string;
  subtitle: string;
  duration: string;
  mainImageUrl: string;
  body: Object;
  _createdAt: string;
}


const NotFound = () => {
  const [postDetailMore, setPostDetailMore] = useState<NewInfo[]>([]);

  useEffect(() => {    

    const getMorePostquery = newsDetailMoreQuery('');
  
    client.fetch(getMorePostquery)
    .then((data) => {
      setPostDetailMore(data);
    })
    
  })
  
  return (
    <div className='flex flex-col lg:gap-[3rem] gap-10 w-full'>
      <div className='w-full'>
        <Navbar/>
        <div className='flex flex-col w-full items-center px-5 lg:mt-[5rem] mt-10 lg:mb-20'>
          <div className={`leading-relaxed text-white  lg:text-[3.5rem] text-2xl my-3 font-bold text-center`}>
            Oops! It looks like you've wandered off right path
          </div>
          <div className='text-white lg:text-lg text-sm lg:w-2/5 w-full text-center'>Oops! It seems you've stumbled upon a page that doesn't exist. Don't worry, it happens to the best of us. Here are a few things you can try:</div>

          <div className='flex flex-col text-white lg:text-lg text-sm lg:w-2/5 w-full gap-2 mt-10 lg:mb-20 mb-10'>
            <div className='flex flex-row gap-3'>
              <span>1.</span>
              <span>Double-check the URL: Ensure that you've entered the correct web address. Sometimes, a simple typo can lead you astray.</span>
            </div>
            <div className='flex flex-row gap-3'>
              <span>2.</span>
              <span>Navigate Back: Use the navigation menu or browser back button to return to the previous page.</span>
            </div>
            <div className='flex flex-row gap-3'>
              <span>3.</span>
              <span>Explore Our Site: Take this opportunity to explore our website. We have a lot to offer, from informative articles and updates to exciting products and services.</span>
            </div>
            <div className='flex flex-row gap-3'>
              <span>4.</span>
              <span>Contact Us: If you're still having trouble finding what you need, feel free to reach out to our support team. We're here to help!</span>
            </div>
          </div>

          <NavLink to={'/'} className='bg-[#B39659] p-3 px-5 text-white font-semibold lg:text-xl text-sm gap-2 tracking-wider uppercase flex flex-row items-center'>
            <i className="fi fi-rr-angle-small-left mb-[-.3rem]"></i>
            Back to homepage
          </NavLink>
        </div>
      </div>

      
      <div className='flex lg:flex-row flex-col gap-5 justify-between items-start w-full lg:px-[20rem] px-5'>
        <div className='flex flex-col gap-3 lg:text-lg text-sm'>
          <div className='text-white  text-center lg:text-[3rem] text-[1.7rem] leading-relaxed tracking-wider font-bold'>
            News
          </div>
          <div className='grid lg:grid-cols-3 lg:gap-[4rem] gap-5 lg:mt-10 mt-5'>
            {postDetailMore?.map((post) => (
              <div className='bg-[#383838]' key={post._id}>
                <div className='flex flex-col gap-4 lg:p-10 p-5'>
                  <div className='text-white  lg:text-[1.5rem] text-lg mb-3 font-bold line-clamp-2'>
                    {post?.title}
                  </div>
                  <div className='text-white lg:w-4/5 lg:text-lg text-sm line-clamp-5'>
                    {post?.subtitle}
                  </div>
                </div>

                <div className='flex flex-col items-center lg:gap-3 gap-1 border-t lg:py-5 py-3'>
                  <NavLink to={`/updates/${post?._id}`} className='text-[#B39659] lg:text-xl font-semibold gap-2 flex flex-row items-center'>
                    READ ARTICLE
                    <i className="fi fi-rr-angle-small-right mb-[-.3rem]"></i>
                  </NavLink>
                  <div className='text-white lg:text-lg text-sm gap-2 flex flex-row items-center'>
                    <i className="fi fi-rr-hourglass-end mb-[-.3rem]"></i>
                    {post?.duration} mins read
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`${postDetailMore.length !== 0 ? 'hidden' : ''} w-full flex flex-col gap-3 items-center justify-center text-white my-[5rem]`}>
            <div className='text-2xl  font-semibold mb-3'>No news found</div>
          </div>
          <div className='flex flex-col items-center gap-8 mt-10'>
            <NavLink to={'/updates'} className='bg-[#B39659] p-3 px-5 text-white font-semibold lg:text-xl text-sm gap-2 tracking-wider uppercase flex flex-row items-center'>
              View all articles
              <i className="fi fi-rr-angle-small-right mb-[-.3rem]"></i>
            </NavLink>
          </div>
        </div>
      </div>
        
      <Footer/>
    </div>
  )
}

export default NotFound;
