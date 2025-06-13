import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div id="testimonialls" className="max-w-2xl mx-auto mt-10">
      <Slider {...settings}>
        {testimonials.map(t => (
          <div key={t._id} className="px-4">
            <div className="p-6 border bg-white rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
             <div className="flex justify-center mt-2">
                <ReactStars count={5} value={t.rating} size={24} edit={false} color2={'#ffd700'} />
              </div>
              <p className="mt-4 text-gray-700 italic">“{t.message}”</p>
              <span className="text-sm text-gray-500 block mt-3">{new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialList;
