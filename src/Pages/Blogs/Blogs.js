import React from 'react';

const Blogs = () => {
    return (
        <div className='text-white w-2/3 mx-auto '>
            <div className='border border-primary w-50 shadow mb-4 m-auto p-3 rounded shadow-lg shadow-400blue- my-7'>
                <h3>Q1 :What are the different ways to manage a state in a React application?</h3>
                <p ><strong>Ans :</strong>When we talk about state in our applications, it’s important to be clear about what types of state actually matter.
                    There are four main types of state you need to properly manage in your React apps:Local state,Global state,Server stat,URL state </p>
            </div>
            <div className='border border-primary w-50 shadow mb-4 m-auto p-3 rounded shadow-lg shadow-blue-400 my-7'>
                <h3>Q2 : How does prototypical inheritance work?</h3>
                <p><strong>Ans :</strong> The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object  </p>
            </div>
            <div className='border border-primary w-50 shadow mb-4 m-auto p-3 rounded shadow-lg shadow-blue-400 my-7'>
                <h3>Q3 :What is a unit test? Why should we write unit tests?</h3>
                <p><strong>Ans :</strong> A unit can be almost anything you want it to be -- a line of code, a method, or a class. Generally though, smaller is better. Smaller tests give you a much more granular view of how your code is performing. There is also the practical aspect that when you test very small units, your tests can be run fast; like a thousand tests in a second fast.

                    Developers write unit tests for their code to make sure that the code works correctly. This helps to detect and protect against bugs in the future. Sometimes developers write unit tests first, then write the code. This approach is also known as test-driven development</p>
            </div>
            <div className='border border-primary w-50 shadow mb-4 m-auto p-3 rounded shadow-lg shadow-blue-400 my-7'>
                <h3>Q4 :React vs. Angular vs. Vue?</h3>
                <p><strong>Ans : </strong>The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either.
                    In most cases, you probably wouldn’t be deciding between only Angular and Vue. They are vastly different libraries with very different feature sets and learning curves. Vue is the clear choice for less experienced developers, and Angular would be preferred for those working on larger apps.</p>
            </div>
        </div>
    );
};

export default Blogs;