# Qurious 🧠 - Interactive Quiz App

Qurious 🧠 is a **web-based multiple-choice quiz application** built with **HTML, CSS, and JavaScript**.  
It allows users to **sign up, log in, choose quiz categories, answer questions, and track scores on a leaderboard**.  

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

1. **Clone this repository**:  
   [https://github.com/SanviSK/SCT_WD_3.git](https://github.com/SanviSK/SCT_WD_3.git)

2. Navigate to the project folder:

   ```bash
   cd qurious-quiz
