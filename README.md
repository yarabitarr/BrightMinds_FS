#BrightMinds Learning Center

# Student Information
Name: Yara Bitar 

# Links
Live URL: https://brightminds-learning-center-fs.netlify.app/
GitHub Repositry: https://github.com/yarabitarr/BrightMinds_FS

# Project Description
BrightMinds Learning Center is an after-school tutoring center website built as final project for the 
Full Stack Development course at the Lebanese University, Faculty of Engineering, Branch 2.

The website represents a tutoring center in Beirut (Mar Roukoz) offering academic support 
across Math and Sciences, Languages, Sociology and Economics for students from age 3 to 18,
as well as extracurricular plus activities including Arduino, Coding, Robotics,
Art, and Chess.

## What the site includes:
- 8 pages with consistent sticky navigation
- 18 tutor profiles with names, live search and category filtering
- Weekly lunch menu - plat du jour (Monday through Friday)
- Bus transportation routes covering 8 areas in Beirut with schedule
- 3-step student registration form with step-by-step validation
- Placement test request form with date picker
- Contact form with real-time validation (unique UI requirement)
- Activities page: Arduino, Coding, Robotics, Art, Chess
- Daily educational fact fetched from API Ninjas Facts API
- Animated stats counter on homepage
- Parent testimonials section with star ratings
- Google Maps on contact page
- Fully responsive across mobile, tablet, and desktop

## API Used
API Ninjas - Facts API
- Endpoint: 'https://api.api-ninjas.com/v1/facts'  
- Requires registration and a personal API key  
- Displays a random educational fact on the Home page  
- "New Fact" button fetches a new fact each time it is clicked  
- Handles loading state, error state, and empty state properly  
- Falls back to 15 curated local facts if API is unavailable

## Unique UI Requirement
"Add a contact form with styled inputs and real-time validation"
- Validation fires in real time as the user types ('input`' event)
- Validation also fires when the user leaves a field ('blur' event)
- Invalid fields show a red border + descriptive error message instantly
- Valid fields show a green border + green checkmark icon inside the field
- Message textarea has a live character counter that updates (0/500)
- On submit, button shows "Sending..." animation for 1.5 seconds
- A success screen replaces the form after submission
- "Send Another Message" button fully resets the entire form
- All logic is inside the 'ContactForm' ES6 class in 'js/contact.js'

# AI Use Appendix

## Tool Used
claude.ai
Used throughout the entire project for planning, HTML structure, CSS design system and JavaScript classes.

## What I used Claude for (prompts)
A. "Two quick confirmations before step 1:
   1.Name of your tutoring center — should I call it "BrightPath" or 
   do you have a name in mind?
   2.Color palette — for friendly & colorful I'm thinking warm yellow + purple + white. 
   Want that, or different colors?"
   -> 1. BrightMinds Learning Center
      2. white , Cherry Color - monochrome
      can we add also Student Registration and Placement Request

B. Q: For the required public API, which fits best for a tutoring center site?
   A: API Ninjas - Facts or Trivia (fun daily facts for students)

C. -> in the Home page replace the graduation cap icon inside the large pink circle on the right by an image

## What the AI got wrong and how I fixed it

Problem 1 - API error  
Claude generated a direct API fetch that returned an error when the site was opened from the filesystem using 'file://'.
How I fixed it: Installed the Live Server extension in VS Code.
Also added 15 fallback facts so the "Did You Know?" section always shows something even if the API fails,
without showing an error to the user.

Problem 2 - Navbar Activities link missing on other pages
After creating the Activities page and adding the navbar link, the Activities button only showed 
in the Home page. On all other pages the link was missing from the navigation bar.
How I fixed it: I realized I had only added the new navbar link to index.html and forgotten
to update the other 7 pages. 


# Evidence - Screenshots
View File: 'evidence'
