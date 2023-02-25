# 🐬Exam Manager Web Application 🐬

This is a web application designed to manage exams for different departments of an educational institution. The application allows staff to register and choose subjects of their respective departments and create exams for the students. Students can sign up and select their respective departments and can view notifications about the created exams of their departments available for 24hrs and can view their hall tickets which is dynamically created upon exam creation. Both students and staff can update their profiles and email are validated using OTP method upon signing up.

## Features

* Staff can register and choose their respective departments.
* Staff can create exams for the subjects of their respective departments.
* Students can sign up and select their respective departments.
* Students can view notifications about the created exams of their departments which is available for 24hrs.
* Students can view their hall tickets which is dynamically created upon exam creation.
* Both students and staff can update their profiles.
* Email validation using OTP method upon signing up.

## Prerequisites

To run this project, you will need:

* [Node.js](https://nodejs.org/) installed on your machine.
* A package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).
* A MongoDB instance running on your machine or a cloud-based service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* MongoDB

## Installation

1. Clone the repository:

<pre><div class="bg-black mb-4 rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">https://github.com/Pr454th/Xam-Manager.git
</code></div></div></pre>

2. Install dependencies:

<pre><div class="bg-black mb-4 rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs">npm install
</code></div></div></pre>

3. Create a `.env` file in the root directory of the project and add the following variables:

<pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class="">makefile</span></div></div></pre>

<pre><div class="bg-black mb-4 rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-makefile">MONGO_URL=<your-mongodb-connection-string>
PORT=<your-secret-key>
MAILER_EMAIL=<your-email-address>
MAILER_PASSWORD=<your-email-password>
</code></div></div></pre>

4. Start the server:

<pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><span class="">sql</span></div></div></pre>

<pre><div class="bg-black mb-4 rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sql">npm start
</code></div></div></pre>

5. Open the web application in your browser at `http://localhost:3000`.

## Usage

1. Staff can register by providing their details including their department and subject.
2. Upon signing up, staff can log in and create exams for the subjects of their respective departments.
3. Students can sign up by providing their details including their department.
4. Upon signing up, students can log in and view notifications about the created exams of their departments available for 24hrs.
5. Students can also view their hall tickets which is dynamically created upon exam creation.
6. Both staff and students can update their profiles.

## Credits

* Developed by [Prabakaran P](https://github.com/Prabakaran2712) and [Prasath K](https://github.com/Pr454th)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
