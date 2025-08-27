const QUESTIONS = {
  sports: [
    { type: 'single', q: 'Which country won the FIFA World Cup in 2018?', options: ['Brazil','France','Germany','Argentina'], answer: 1 },
    { type: 'single', q: 'How many players are there in a cricket team on the field?', options: ['9','10','11','12'], answer: 2 },
    { type: 'single', q: 'Which sport uses the terms "love" and "deuce"?', options: ['Table Tennis','Badminton','Tennis','Squash'], answer: 2 },
    { type: 'single', q: 'In which sport is the term "hat-trick" used?', options: ['Football','Cricket','Hockey','All of the above'], answer: 3 },
    { type: 'single', q: 'How long is an Olympic swimming pool (standard)?', options: ['25m','50m','100m','200m'], answer: 1 }
  ],

  aptitude: [
    { type: 'single', q: 'If 5x - 3 = 2, what is x?', options: ['0.6','1','1.2','2'], answer: 2 }, // x=1
    { type: 'single', q: 'What is the next number in the series: 2, 4, 8, 16, ? ', options: ['18','20','32','24'], answer: 2 },
    { type: 'single', q: 'If a product costs $200 and is discounted 25%, the sale price is?', options: ['$150','$160','$140','$145'], answer: 1 },
    { type: 'single', q: 'Which shape has 4 equal sides and 4 right angles?', options: ['Rectangle','Rhombus','Square','Kite'], answer: 2 },
    { type: 'single', q: 'What is 15% of 200?', options: ['25','30','35','40'], answer: 1 }
  ],

  engineering: [
    { type: 'single', q: 'Which language is primarily used for Android native apps?', options: ['Swift','Kotlin','JavaScript','C#'], answer: 1 },
    { type: 'single', q: 'OSI model has how many layers?', options: ['5','6','7','8'], answer: 2 },
    { type: 'single', q: 'What does CPU stand for?', options: ['Central Process Unit','Central Processing Unit','Core Processing Unit','Central Peripheral Unit'], answer: 1 },
    { type: 'single', q: 'Which sorting algorithm has average O(n log n) time?', options: ['Bubble Sort','Insertion Sort','Merge Sort','Selection Sort'], answer: 2 },
    { type: 'single', q: 'Which data structure uses FIFO?', options: ['Stack','Queue','Tree','Graph'], answer: 1 }
  ],

  politics: [
    { type: 'single', q: 'Which body makes laws at the national level in India?', options: ['Supreme Court','Parliament','State Assembly','Rajya Sabha'], answer: 1 },
    { type: 'single', q: 'What is the minimum age to become the President of India?', options: ['35','40','45','50'], answer: 0 },
    { type: 'single', q: 'Which system divides power between central and state governments?', options: ['Unitary','Federal','Confederal','Autocratic'], answer: 1 },
    { type: 'single', q: 'What is the upper house of the Indian Parliament called?', options: ['Lok Sabha','Rajya Sabha','Legislative Council','Assembly'], answer: 1 },
    { type: 'single', q: 'What is universal adult suffrage?', options: ['Voting for adults','Voting for property owners','Voting for men only','None'], answer: 0 }
  ],

  'current affairs': [
    { type: 'single', q: 'Which global event occurs every 4 years and includes many sports?', options: ['Olympics','World Cup of Cricket','Commonwealth Games','Asian Games'], answer: 0 },
    { type: 'single', q: 'COP is usually associated with which topic?', options: ['Finance','Climate Change','Sports','Education'], answer: 1 },
    { type: 'single', q: 'The G7 is a group of how many countries?', options: ['5','6','7','8'], answer: 2 },
    { type: 'single', q: 'Which technology is commonly used for AI acceleration?', options: ['Blockchain','GPU','HTTP','SMTP'], answer: 1 },
    { type: 'single', q: 'Which organisation releases the World Development Report?', options: ['UN','World Bank','IMF','WHO'], answer: 1 }
  ]
};
