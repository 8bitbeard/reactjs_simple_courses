import React, { useState, useEffect, useReducer } from 'react';
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

const coursesReducer = (state, action) => {
  switch(action.type) {
    case 'SET_COURSES':
      return action.payload;
    case 'REMOVE_COURSE':
      return state.filter(
        course => action.payload.id !== course.id
      );
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  // const [courses, setCourses] = useState([]);
  const [courses, dispatchCourses] = useReducer(coursesReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCourses = courses.filter( (course) => {
    return course.title.includes(searchText) || course.author.includes(searchText);
  });

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  }

  const handleRemoveCourse = (course) => {
    dispatchCourses({
      type: 'REMOVE_COURSE',
      payload: course
    });
  }

  const getCoursesAsync = () =>
    new Promise(resolve =>
      setTimeout( () =>
        resolve({
          courses: courses_data
        }), 2000
      )
    );

  useEffect(() => {
    localStorage.setItem('searchText', searchText);
  }, [searchText]);

  useEffect(() => {
    setIsLoading(true);
    getCoursesAsync().then( (result) => {
      dispatchCourses({
        type: 'SET_COURSES',
        payload: result.courses
      });
      // setCourses(result.courses);
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
        <CoursesList courses={filteredCourses} handleRemoveCourse={handleRemoveCourse}/>
      )}

      {/* <CoursesList courses={filteredCourses} /> */}
    </div>
  );
}

export default App;
