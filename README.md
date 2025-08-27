# Qurious 🧠 - Interactive Quiz App

Qurious 🧠 is a **web-based multiple-choice quiz application** built with **HTML, CSS, and JavaScript**.  
It allows users to **sign up, log in, choose quiz categories, answer questions, and track scores on a leaderboard**.  
This project was developed as part of a **third-year Computer Science Engineering course** focused on **mobile & web application development**.

---

## Features

- **User Authentication**
  - Sign up with username and password stored locally in browser storage.
  - Login validation.
  - Logout functionality.

- **Quiz Flow**
  - Multiple categories: Sports, Aptitude, Engineering, Politics, Current Affairs.
  - Each category contains **5 multiple-choice questions**.
  - All questions are **multiple-choice with a single correct answer**.
  - **Timer per question:** 15 seconds with a dynamic time bar.
  - Shows correct/wrong highlights after answering.
  - **Handles timeout** and automatically moves to next question.
  - Options are displayed in **fixed order** (no shuffling).

- **Leaderboard**
  - Save score after completing a quiz.
  - Leaderboard sorted by **highest score and timestamp**.
  - Medals 🥇🥈🥉 for top 3 users.
  - Clear leaderboard option.

- **UI/UX**
  - Modern card-based interface with **dark theme**.
  - Smooth hover effects for buttons, categories, and options.
  - Fixed layout for all screens (login, signup, home, quiz, results, leaderboard).
  - Responsive design for mobile devices.

- **Other Functionalities**
  - Exit quiz anytime.
  - Play again option after finishing a quiz.
  - Fully **client-side, no server required**.

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/SanviSK/SCT_WD_3.git
cd qurious-quiz

Open `index.html` in a web browser (Chrome/Firefox recommended).

No additional dependencies required. All data is stored in the browser's localStorage.

---

## Usage

### Sign Up / Login
- Enter a username and password to create an account.
- Login to access quiz categories.

### Select Category
- Choose one of the available categories: Sports, Aptitude, Engineering, Politics, Current Affairs.

### Answer Questions
- Each question has a 15-second timer.
- Select **one option** for each multiple-choice question.
- Correct/wrong feedback is shown visually.
- Timeouts automatically highlight the correct answer and move to the next question.

### Results & Leaderboard
- Score is displayed at the end of the quiz.
- Save your score to the leaderboard.
- Leaderboard shows top performers with medals.
- Option to clear leaderboard and start fresh.

---

## File Structure

qurious-quiz/
├─ index.html # Main HTML file
├─ style.css # CSS styling for UI
├─ script.js # Quiz logic and flow
├─ questions.js # Multiple-choice questions
└─ README.md # Project documentation


---

## Technologies Used

- **HTML5** – Structure and layout
- **CSS3** – Styling and responsive design
- **JavaScript (ES6)** – Quiz logic, timer, leaderboard, and interactivity
- **LocalStorage** – For user accounts and leaderboard persistence

---

## Future Improvements

- Add dynamic time bar color transition (green → orange → red).
- Add fun facts or explanations after each question.
- Expand to support other question types (text input, multiple correct answers).
- Include backend support for persistent user accounts and a global leaderboard.

---
