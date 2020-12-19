import React, { useState, useEffect } from 'react';
import './App.css';

import CoursesList from './CoursesList';
import Search from './Search';

const courses_data = [
  {
    id: 1,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    author: "Maximilian Schwarzmülller",
    hours_video: 40.5,
    number_of_lectures: 490,
    rating: 4.6,
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
  },
  {
    id: 2,
    title: "Modern React with Redux",
    author: "Stephen Grider",
    hours_video: 47.5,
    number_of_lectures: 488,
    rating: 4.6,
    url: "https://codingthesmartway.com/courses/modern-react-with-redux/"
  },
  {
    id: 3,
    title: "The Complete React Developer Course (w/ Hooks and Redux)",
    author: "Andrew Mead",
    hours_video: 39,
    number_of_lectures: 200,
    rating: 4.7,
    url: "http://codingthesmartway.net/courses/complete-react-web-app-developer/"
  }
];


const App = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCourses = courses.filter( (course) => {
    return course.title.includes(searchText) || course.author.includes(searchText);
  });

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  }

  // const getCoursesAsync = () => {
  //   new Promise( (resolve) => {
  //     setTimeout( () => {
  //         resolve({
  //           courses: courses_data
  //         }), 2000
  //       }
  //     )
  //   })
  // }

  const getCoursesAsync = () => 
  new Promise(resolve => 
      setTimeout(
        () => resolve({ courses: courses_data }),
        2000
      )
    );

  useEffect(() => {
    localStorage.setItem('searchText', searchText);
  }, [searchText]);

  useEffect(() => {
    setIsLoading(true);
    getCoursesAsync().then( (result) => {
      setCourses(result.courses);
      setIsLoading(false);
    })
  }, [])

  return (
    <div>
      <h1>List of Courses</h1>
      <hr/>

      <Search value={searchText} onSearch={handleSearch} />

      {isLoading ? (
        <p>Loading Courses ...</p>
      ) : (
        <CoursesList courses={filteredCourses} />
      )}

      {/* <CoursesList courses={filteredCourses} /> */}
    </div>
  );
}

export default App;
