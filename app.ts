declare const html2pdf: any;

const workExperienceContainer = document.getElementById(
  "work-experience"
) as HTMLElement;
const educationContainer = document.getElementById("education") as HTMLElement;
const skillsContainer = document.getElementById("skills") as HTMLElement;
const cvOutput = document.getElementById("cv-output") as HTMLElement;

let profilePicURL: string = "";

// Event listener for image upload
document
  .getElementById("profile-pic")
  ?.addEventListener("change", handleImageUpload);

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const imagePreview = document.getElementById(
    "image-preview"
  ) as HTMLImageElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicURL = e.target?.result as string;
      imagePreview.src = profilePicURL; 
      updateCV(); 
    };
    reader.readAsDataURL(file);
  }
}

// Get the email input element
const emailInput = document.getElementById("email") as HTMLInputElement;

// Regular expression for validating email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if (emailInput) {
  emailInput.addEventListener("input", (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!emailPattern.test(input.value)) {
      input.setCustomValidity("Please enter a valid email address.");
      input.reportValidity(); 
    } else {
      input.setCustomValidity(""); 
    }
  });
}

// Function to generate the title and description dynamically
const updateTitleAndDescription = () => {
  const titleInput = (document.getElementById("title") as HTMLInputElement)
    .value;
  const descriptionInput = (
    document.getElementById("description") as HTMLInputElement
  ).value;

  // Validate inputs
  if (!titleInput || !descriptionInput) {
    alert("Don’t forget to add a title and description!");
    return;
  }

  // Select the container where you want to display the data
  const titleContainer = document.getElementById("generated-title");
  const descriptionContainer = document.getElementById("generated-description");

  // Update content dynamically
  if (titleContainer) {
    titleContainer.textContent = titleInput;
  }
  if (descriptionContainer) {
    descriptionContainer.textContent = descriptionInput;
  }
};

// Add event listener to your form submission or button
const form = document.getElementById("resume-form");
if (form) {
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Prevent page reload
    updateTitleAndDescription(); // Call the function
  });
}

// Add work experience dynamically
function addWorkExperience() {
  const workDiv = document.createElement("div");
  workDiv.innerHTML = `
    <label>Job Title:</label>
    <input type="text" class="job-title" />
    <label>Company:</label>
    <input type="text" class="company" />
    <label>Start Date:</label>
    <input type="month" class="start-date" />
    <label>End Date:</label>
    <input type="month" class="end-date" />
    <hr />
  `;
  workExperienceContainer.appendChild(workDiv);
  updateCV();
}

// Add education dynamically
function addEducation() {
  const educationDiv = document.createElement("div");
  educationDiv.innerHTML = `
    <label>Degree:</label>
    <input type="text" class="degree" />
    <label>Institution:</label>
    <input type="text" class="institution" />
    <label>Start Date:</label>
    <input type="month" class="start-date" />
    <label>End Date:</label>
    <input type="month" class="end-date" />
    <hr />
  `;
  educationContainer.appendChild(educationDiv);
  updateCV();
}

// Add skill dynamically
function addSkill() {
  const skillDiv = document.createElement("div");
  skillDiv.innerHTML = `
    <label>Skill:</label>
    <input type="text" class="skill"  placeholder="Enter a skill" />
    <hr />
  `;
  skillsContainer.appendChild(skillDiv);
  updateCV();
}

// Add language dynamically
function addLanguage() {
  const languageDiv = document.createElement("div");
  languageDiv.innerHTML = `
    <label>Language:</label>
    <input type="text" class="language" placeholder="Enter a language" />
    <hr />
  `;
  const languagesContainer = document.getElementById(
    "languages"
  ) as HTMLElement;
  if (languagesContainer) {
    languagesContainer.appendChild(languageDiv);
    updateCV();
  }
}

// print cv
function printCV() {
  window.print();
}

// Update the CV preview
function updateCV() {
  const titleInput = (document.getElementById("title") as HTMLInputElement)
    .value;
  const descriptionInput = (
    document.getElementById("description") as HTMLTextAreaElement
  ).value;
  const linkedinInput = (
    document.getElementById("linkedin") as HTMLInputElement
  )?.value;

  cvOutput.innerHTML = `
    <div class="cv-professional-layout">
      <!-- Header Section -->
      <div class="cv-header">
      <div class="preview-img">
        ${
          profilePicURL
            ? `<img src="${profilePicURL}" alt="Profile" class="cv-profile-img"/>`
            : ""
        }
        </div>
        <div class="cv-header-content">
          <h1 class="name">${
            (document.getElementById("name") as HTMLInputElement).value
          }</h1>
          <div class="cv-contact-info">
            <p><i class="fas fa-envelope"></i> ${
              (document.getElementById("email") as HTMLInputElement).value
            }</p>
            <p><i class="fas fa-phone"></i> ${
              (document.getElementById("phone") as HTMLInputElement).value
            }</p>
            ${
              linkedinInput
                ? `<p style="font-size:20px;color: silver;"><i class="fab fa-linkedin"></i> <a href="${linkedinInput}" target="_blank" style="text-decoration: none; color: silver;">${linkedinInput}</a></p>`
                : ""
            }
          </div>
        </div>
      </div>

      <!-- Title and Description Section -->
      <div class="cv-title-description">
        <h2>${titleInput ? titleInput : "Your Title Here"}</h2>
        <p style=" word-wrap: break-word;
                   width: auto;  
                   margin-right: .8rem;  ">
                   ${
                     descriptionInput
                       ? descriptionInput
                       : "Your description here"
                   }</p>
      </div>

      <!-- Work Experience Section -->
      <div class="cv-section">
        <h2><i class="fas fa-briefcase"></i> Work Experience</h2>
        ${Array.from(workExperienceContainer.querySelectorAll("div"))
          .map((div) => {
            const jobTitle = (
              div.querySelector(".job-title") as HTMLInputElement
            )?.value;
            const company = (div.querySelector(".company") as HTMLInputElement)
              ?.value;
            const startDate = (
              div.querySelector(".start-date") as HTMLInputElement
            )?.value;
            const endDate = (div.querySelector(".end-date") as HTMLInputElement)
              ?.value;

            if (jobTitle && company) {
              return `
              <div class="cv-item">
                <div class="cv-item-header">
                  <h3>${jobTitle}</h3>
                  <p class="cv-company">${company}</p>
                </div>
                <p class="cv-date">${formatDate(startDate)} - ${formatDate(
                endDate
              )}</p>
              </div>
            `;
            }
            return "";
          })
          .join("")}
      </div>

      <!-- Education Section -->
      <div class="cv-section">
        <h2><i class="fas fa-graduation-cap"></i> Education</h2>
        ${Array.from(educationContainer.querySelectorAll("div"))
          .map((div) => {
            const degree = (div.querySelector(".degree") as HTMLInputElement)
              ?.value;
            const institution = (
              div.querySelector(".institution") as HTMLInputElement
            )?.value;
            const startDate = (
              div.querySelector(".start-date") as HTMLInputElement
            )?.value;
            const endDate = (div.querySelector(".end-date") as HTMLInputElement)
              ?.value;

            if (degree && institution) {
              return `
              <div class="cv-item">
                <div class="cv-item-header">
                  <h3>${degree}</h3>
                  <p class="cv-institution">${institution}</p>
                </div>
                <p class="cv-date">${formatDate(startDate)} - ${formatDate(
                endDate
              )}</p>
              </div>
            `;
            }
            return "";
          })
          .join("")}
      </div>

      <!-- Languages Section -->
      <div class="cv-section">
        <h2 style="font-size: 1.6em;"><i style="margin-right: .2em; font-size: .9em" class="fas fa-language"></i>Languages</h2>
        ${Array.from(
          document.getElementById("languages")?.querySelectorAll("div") || []
        )
          .map((div) => {
            const language = (
              div.querySelector(".language") as HTMLInputElement
            )?.value;
            return language ? `<p>${language}</p>` : "";
          })
          .join("")}
      </div>

      <!-- Skills Section -->
      <div class="cv-section">
        <h2><i class="fas fa-tools"></i> Skills</h2>
        <div class="cv-skills">
          ${Array.from(skillsContainer.querySelectorAll("div"))
            .map((div) => {
              const skill = (div.querySelector(".skill") as HTMLInputElement)
                ?.value;
              if (skill) {
                return `<span class="cv-skill-item">${skill}</span>`;
              }
              return "";
            })
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}


// Generate the CV in a new window
function generateCV() {
  const linkedinInput = (
    document.getElementById("linkedin") as HTMLInputElement
  )?.value;
  const cvHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated CV</title>
    <style>

body {
    font-family: "Roboto", sans-serif;
    color: #ffffe0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #ffffff;
    padding: 30px 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.container {
    background-color: #ffd700; 
    box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
    height: auto;
    width: 800px;
    display: flex;
    overflow: hidden;
}

.leftside {
    background-color: #333333; 
    box-shadow: 5px 5px 20px rgba(51, 51, 51, 0.819);
    width: 300px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    place-items: center;
    color: #ffd700; 
}

.rigtside {
    flex-grow: 1;
    padding: 20px;
    border-radius: 10px;
    color: #333333;
    height: 100%;
    width: 500px;
    margin-left: 20px;
    margin-top: 40px;
    font-size: 18px;
}

.image {
    background-image: url(/girl.jpeg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 80px;
    width: 200px;
    height: 180px;
    border-top-left-radius: 5px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.innerimg{
    width: 100%; 
    border-top-left-radius: 5px; 
    border-top-right-radius: 50px; 
    border-bottom-right-radius: 50px; 
    border-bottom-left-radius: 50px;
}

.contact {
    width: 250px;
    margin-top: 30px;
    margin-right: 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    white-space: nowrap;
}

.conth2{
     font-size: 1.5rem; 
     margin-left: 2rem;
}

.contline{
     width: 234px;
     height: .5px; 
     background-color: #ffffe0;
     margin-top: -18px; 
     margin-left: 2rem;
}

.phone{
    font-size: .8rem; 
    color: #ffffe0;
     margin-left: 2rem; 
     margin-top: 1.2rem;
 }

.fas fa-phone{
    margin-right: 4px;
}

.email{
  font-size: .8rem; 
  color: #ffffe0; margin-left: 2rem;
  }

.fas fa-envelope{
    margin-right: 4px;
}

.linkdin{
    font-size: .8rem; 
    color: #ffffe0;
    margin-left: 2rem;
    display: flex;
    gap: 2px;
}

.fab fa-linkedin{
      font-size: 15px; 
      margin-right: 4px;
}

.link {
    color: #ffffe0;
    text-decoration: none;
    font-size: 11px;
    width: 220px;
     margin-top: .5px;
    word-wrap: break-word;
    display: inline-block;
    overflow-wrap: break-word;
    white-space: normal;
    text-align: left;
    padding: 1px;
    box-sizing: border-box;
}

.education {
    width: 65%;
    place-items: left;
    align-items: flex-start;
    margin-right: 3.2rem;
}

.eduh2{
  font-size: 1.5rem; 
  margin-top: 1rem;
   margin-left: 1px;
}

.eduline{
    width: 232px;
    height: .5px;
    background-color: #ffffe0;
    margin-top: -18px;
}

.edudatesection{
    color: #ffffe0;
    margin-left: 0px;
    margin-top: -.2rem;
}

.edudate{
   font-size: 12px; 
   color: #ffffe0; 
   margin-top: 1.5rem;
   margin-left: 1px;
}

.eduinst{
     font-size: 18px;
     margin-top: -1.4rem; 
     margin-left: 2px; 
     color: #ffffe0;
     font-weight: 500;
}

.edu-ul{
    margin-top: 5px;
    margin-left: 20px;
}

.edudegree{
      font-size: 18px;
      color: #ffffe0; 
      margin-left: -2.6rem;
      margin-top: -2rem;
}

.languages{
      margin-right: .9rem;
}

.lang-h2{
  color: gold; 
  font-size: 1.5rem;
}

.lang-line{
      width: 232px;
       height: .5px;
       background-color: #ffffe0; 
       margin-top: -14px;
}

.lang-ul{
    margin-top: 5px; 
    margin-left: 20px;
}

.lang-ul li {
    font-size: 18px;
    color: #ffffe0;
    margin-left: -2.3em;
    margin-top: 1rem;
}

.name{
    color: #333333; 
    margin-left: -1.4rem; 
    padding: 10px 20px; 
    border: none; 
    border-radius: 5px; 
    white-space: nowrap; 
    font-size: 2.5rem; 
    margin-top: -10px; 
    display: flex; 
    justify-content: left;
}

.title {
    font-size: 1.5rem; 
    margin-top: -2rem; 
    font-weight: 600;
}


.profile{
  font-size: 1.3rem; 
  margin-top: -1rem; 
  font-weight: 600;
}

.profile-line{
   width: 430px; 
   height: .5px; 
   background-color: #333333;
   margin-top: -5px;
}

.description {
    color: #333333;
    word-wrap: break-word;
    width: 27rem;
}


.work-h2{
    font-size: 1.3rem; 
    font-weight: 600; 
    margin-top: 1.5rem;
}

.work-line{
    width: 430px; 
    height: .5px; 
    background-color: #333333; 
    margin-top: -5px;
}

.work-para{
    color:#4a4a4a; 
    margin-bottom: 10px;
}

.jobdate {
    font-size: 14px;
    margin-left: 30px;
}

.jobtitle {
    font-weight: bold; 
    font-size: 18px;
}

.company {
    font-size: 18px; 
    display: block; 
    margin-top: 5px;
}


.info2 {
    margin: 30px 50px 50px 50px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}

.skill-h2{
      font-size: 1.3rem;
       font-weight: 600;
        margin-top: 1.5rem;
}

.skill-line{
        width: 430px; 
        height: .5px; 
        background-color: #333333;
        margin-top: -5px;
}

.skills {
    width: 430px;
    height: 350px;
    margin-top: 1.5rem;
}

.skills span {
    display: block; 
    margin: 5px 0; 
      background-color: #333333;
    font-size: 18px;
    color: #ffffe0; 
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
}

.edit-cv{
     padding: 10px 10rem; 
     margin-right: 10px;
     font-weight: bolder;
     background-color: #333333;
     color: white;
     border-top: 2px solid rgb(242, 0, 255);
     border-right: 2px solid rgb(0, 166, 255);
     border-bottom: 2px solid rgb(0, 255, 0);
     border-left: 2px solid rgb(255, 119, 0);
     border-radius: 5px;
     cursor: pointer;
     transition: all 0.4s ease;
}

.edit-cv:hover{
     background-color:rgb(167, 2, 2);
     color: white;
}

.pdf{
    padding: 10px 9rem;
    font-weight: bolder;
    background-color: #333333;
    color: white;
    border-top: 2px solid rgb(242, 0, 255);
    border-right: 2px solid rgb(0, 166, 255);
    border-bottom: 2px solid rgb(0, 255, 0);
    border-left: 2px solid rgb(255, 119, 0);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.pdf:hover{
  background-color:rgb(167, 2, 2);
  color: white;
}

.print{
    background-color: #333333;
    width: 45.5rem;
    padding: 1rem;
    border-top: 2px solid rgb(242, 0, 255);
    border-right: 2px solid rgb(0, 166, 255);
    border-bottom: 2px solid rgb(0, 255, 0);
    border-left: 2px solid rgb(255, 119, 0);

}

.print ul{
   font-size: 16px ;
}



@media (max-width: 768px) {
.container {
     background-color: #ffd700;
     box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
     height: 1200px;
     width: 700px;
     display: flex;
     overflow: hidden;
}

.leftside {
  width: 230px; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  place-items: center;
  margin-top: 0; 
}

.rigtside{
   width: 400px; 
   margin: 10px;
   display: flex; 
   flex-direction: column; 
   align-items: center; 
   padding: 10px;
}

.image {
   margin-top: 60px;
   width: 160px;
   height: 140px;
}

.contact {
    width: 200px;
}

.conth2{
font-size: 1.3rem; 
}

.contline{
 width: 204px;
}
.phone{
 font-size: .8em; 
}

.email{
 font-size: .8em; 
 color: #ffffe0; margin-left: 2rem;
}

.linkdin{
    display: flex;
}

.fa-brands, .fab {
  margin-right: 3px;
}

.link{
  color: #ffffe0;
        text-decoration: none;
        font-size: 10.8px;
        width: 200px;
        margin-top: -.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }

.eduh2{
  font-size: 1.3rem; 
}

.eduline{
    width: 204px;
}

.edudate{
  font-size: 10.7px; 
}

.eduinst{
    font-size: 16px;
}

.edudegree{
      font-size: 15px;
}

.languages {
  margin-right: 0rem;
  margin-left: 0rem;
}

.lang-h2{
  font-size: 1.3rem;
}

.lang-line{
      width: 202px;
} 

.lang-ul {
margin-left: 12px;
}

.lang-ul li {
font-size: 15px;
}

.name {
margin-right: 8.8rem;
margin-top: 30px;
}

.title {
font-size: 1.5rem;
margin-right: 12rem;
}    

.profile {
font-size: 1.3rem;
margin-right: 21.5rem;
}

.description {
font-size: 18px;
}

.work-h2{
    font-size: 1.3rem; 
}

.edit-cv{
padding: 10px 9rem; 
}

.pdf{
 padding: 10px 7.8rem; 
}

.skills span {
    font-size: 17px;
    padding: 5px 10px;
}

.print{
    background-color: #333333;
    width: 41.4rem;
    padding: 1rem;
    border-top: 2px solid rgb(242, 0, 255);
    border-right: 2px solid rgb(0, 166, 255);
    border-bottom: 2px solid rgb(0, 255, 0);
    border-left: 2px solid rgb(255, 119, 0);

}

.print ul{

font-size: 15px ;

}


}




@media (max-width: 640px) {
.container {
  background-color: #ffd700;
  box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
  height: 1200px;
  width: 620px;
  display: flex;
  overflow: hidden;

}

.leftside {
  width: 230px; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  place-items: center;
  margin-top: 0; 
}

.linkdin{
    display: flex;
}

.fa-brands, .fab {
  margin-right: 3px;
}

.link{
  color: #ffffe0;
        text-decoration: none;
        font-size: 10.8px;
        width: 190px;
        margin-top: -.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }

.languages {
    margin-left: .5rem;
}

.rigtside{
  width: 400px; 
  margin: 10px;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  padding: 10px;
}

.edudate {
    font-size: 10.2px;
}

.name {
    margin-right: 10rem;
    font-size: 32px;
    margin-top: 25px;
}

.title {
   font-size: 1.4rem;
   margin-top: -1.8rem;
   margin-right: 11rem;
   white-space: nowrap;
}
.profile {
    font-size: 1.2rem;
    margin-right: 19.9rem;
    margin-top: -1rem;
}

.profile-line {
   width: 365px;
   margin-right: 2rem;
}

.description {
   width: 23rem;
   font-size: 15px;
   margin-right: 1rem;
}

.work-experience {
  width: 21em;
  margin-right: 1.1rem;
}
.work-line {
  width: 365px;
}

.jobtitle {
  font-size: 16px;
}

.jobdate {
  font-size: 12px;
}
.company {
font-size: 16px;
}

.skills-div {
width: 23.5rem;
margin-right: 1.5rem;
}

.skill-h2 {
font-size: 1.2rem;
}

.skill-line {
width: 365px;
margin-top: -5px;
}
.skills {
width: 365px;
}

.skills span {
    font-size: 16px;
    padding: 4px 0px;
}

.edit-cv{
padding: 10px 7rem; 
}

.pdf{
 padding: 10px 5.8rem; 
}

.print{
    background-color: #333333;
    width: 33.4rem;
    padding: 1rem;
    border-top: 2px solid rgb(242, 0, 255);
    border-right: 2px solid rgb(0, 166, 255);
    border-bottom: 2px solid rgb(0, 255, 0);
    border-left: 2px solid rgb(255, 119, 0);

}

.print ul{

font-size: 14px ;

}

}


@media (max-width: 480px) {

    .container {
    background-color: #ffd700;
    box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
    height: 100%;
    width: 460px;
    display: flex;
    overflow: hidden;
    }
    
    .leftside {
    width: 165px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    place-items: center;
    padding-top: 2rem;
    margin-top: 0; 
    }
    
      .image {
        margin-top: 10px;
        margin-left: .6rem;
        width: 110px;
        height: 90px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    
    .innerimg {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    
    .contact {
        width: 130px;
    }
    .conth2 {
        font-size: 1rem;
    }
    .contline {
        width: 130px;
        margin-top: -12px;
    }
    .fas fa-phone{
    font-size: 10px;
    margin-right: 2px;
    }    
    .phone {
        font-size: .7em;
    }
    
    .email {
        font-size: 9.3px;
    }
    .linkdin {
    font-size: .7rem;
    display: flex;
    }
  .fa-brands, .fab {
  margin-right: 0px;
}
.link{
  color: #ffffe0;
        text-decoration: none;
        font-size: 9px;
        width: 120px;
        margin-top: -.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }
    .education {
    margin-right: 2.2rem;
    }
    .eduline {
      width: 132px;
      margin-top: -12px;
    }
    .edudate {
            width: 135px;
            font-size: 8px;
            margin-top: 1rem;
        }
    
    .eduinst {
        font-size: 14px;
    }
    
    .edudegree {
        font-size: 14px;
    }
    
    .languages {
    margin-left: .4rem;
    }
    .lang-h2 {
        font-size: 1rem;
    }
    .lang-line {
            width: 135px;
            margin-top: -6px;
    }
    
    .lang-ul li {
        font-size: 14px;
        margin-left: -2.5em;
    }       
    
    .rigtside{
    width: 270px; 
    margin: 0px;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 10px;
    }
    
    .name {
        margin-right: 3.5rem;
        font-size: 28px;
    }
    .title {
        font-size: 1.1rem;
        margin-top: -1.8rem;
        margin-right: 5.8rem;
        white-space: nowrap;
    }
    
    .profile {
        font-size: 1rem;
        margin-right: 12.6rem;
    }
    
  .profile-line {
        display: block;
        visibility: visible;
        width: 230px;
        height: .5px;
        background-color: #333333;
        margin-top: -.5rem;
        margin-bottom: 1rem;
    }
    
    .description {
        width: 17rem;
        font-size: 13px;
        margin-right: -.5rem;
        margin-top: -.1rem;
    }
    
    .work-experience {
        width: 10em;
        margin-right: 5.4rem;
    }
    
    .work-h2 {
        font-size: 1rem;
    }  
        
    .work-line {
        width: 275px;
    }
    .work-para {
        color: #4a4a4a;
        margin-bottom: 10px;
        width: 280px;
    }    
    .jobtitle {
        font-size: 12px;
    }      
    .jobdate {
        font-size: 10px;
        margin-left: 10px;
        white-space: nowrap;
    }
    .company {
        font-size: 14px;
    }
    
    .skills-div {
        width: 10rem;
        margin-right: 6.6rem;
    }
    
    .skill-h2 {
        font-size: 1rem;
    }
    .skill-line {
        width: 275px;
    }
    
    .skills {
        width: 275px;
    }
 
 .skills span {
    font-size: 14px;
    padding: 4px 0px;
}   

.edit-cv{
padding: 10px 5rem; 
}

.pdf{
 padding: 10px 3.5rem; 
}


.print{
    background-color: #333333;
    width: 25rem;
    padding: 1rem;
    border-top: 2px solid rgb(242, 0, 255);
    border-right: 2px solid rgb(0, 166, 255);
    border-bottom: 2px solid rgb(0, 255, 0);
    border-left: 2px solid rgb(255, 119, 0);

}

.print ul{

font-size: 12px ;

}

    
    }
    
    
    @media (max-width: 391px) {
    .container {
    background-color: #ffd700;
    box-shadow: 20px 20px 20px rgba(51, 51, 51, 0.7);
    height: 100%;
    width: 385px;
    display: flex;
    overflow: hidden;
    
    }
    
    .leftside {
    width: 160px; 
    display: flex;
    flex-direction: column;
    gap: 10px;
    place-items: center;
    margin-top: 0; 
    }
    
    
      .image {
        margin-top: 10px;
        margin-left: .6rem;
        width: 110px;
        height: 90px;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    
    .innerimg {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    
    .contact {
        width: 130px;
    }
    .conth2 {
        font-size: 1rem;
    }
    .contline {
        width: 130px;
        margin-top: -12px;
    }
    .fas fa-phone{
    font-size: 10px;
    margin-right: 2px;
    }    
    .phone {
        font-size: .7em;
    }
    
    .email {
        font-size: 9.3px;
    }
    .linkdin {
    font-size: .7rem;
    display: flex;
    }
    .fa-brands, .fab {
  margin-right: 0px;
}
.link{
  color: #ffffe0;
        text-decoration: none;
        font-size: 8.5px;
        width: 130px;
        margin-top: -.1px;
        display: inline-block;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: left;
        padding: 1px;
        box-sizing: border-box;
    }
    .education {
    margin-right: 2.2rem;
    }
    .eduline {
      width: 132px;
      margin-top: -12px;
    }
    .edudate {
            width: 135px;
            font-size: 8px;
            margin-top: 1rem;
        }
    
    .eduinst {
        font-size: 14px;
    }
    
    .edudegree {
        font-size: 14px;
    }
    
    .languages {
    margin-left: .4rem;
    }
    .lang-h2 {
        font-size: 1rem;
    }
    .lang-line {
            width: 135px;
            margin-top: -6px;
    }
    
    .lang-ul li {
        font-size: 14px;
        margin-left: -2.5em;
    }       
    
    
    .rigtside{
    width: 270px; 
    margin: 0px;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 10px;
    }
    
    .name {
            margin-right: 5rem;
            font-size: 24px;
        }
    .title {
            font-size: 1rem;
            margin-top: -1.6rem;
            margin-right: 6.6rem;
            white-space: nowrap;
        }
    
    .profile {
            font-size: .9rem;
            margin-right: 12.8rem;
        }
    
    .profile-line {
        display: block;
        visibility: visible;
        width: 203px;
        margin-right: 4rem;
        height: .5px;
        background-color: #333333;
        margin-top: -.5rem;
        margin-bottom: 1rem;
    }
        
    .description {
            width: 12.2rem;
            font-size: 13px;
            margin-right: 4rem;
            margin-top: -.1rem;
        }
    
    .work-experience {
        width: 10em;
        margin-right: 5.4rem;
    }
    
    .work-h2 {
        font-size: .9rem;
    }  
        
    .work-line {
        width: 205px;
    }
    .work-para {
        color: #4a4a4a;
        margin-bottom: 10px;
        width: 280px;
    }    
    .jobtitle {
        font-size: 10px;
    }      
    .jobdate {
            font-size: 8px;
            margin-left: 0px;
            white-space: nowrap;
        }
    .company {
          font-size: 10px;
    }
    
    .skills-div {
        width: 10rem;
        margin-right: 6.6rem;
    }
    
    .skill-h2 {
        font-size: .9rem;
    }
    .skill-line {
       width: 205px;
    } 
    .skills {
            width: 205px;
        }
      
.skills span {
    font-size: 14px;
    padding: 4px 0px;
}

    .edit-cv{
    padding: 10px 4rem; 
}

.pdf{
 padding: 10px 2.8rem; 
}

   .print{
    background-color: #333333;
    width: 21.5rem;
    padding: 1rem;
    border-top: 2px solid rgb(242, 0, 255);
    border-right: 2px solid rgb(0, 166, 255);
    border-bottom: 2px solid rgb(0, 255, 0);
    border-left: 2px solid rgb(255, 119, 0);

}

.print ul{

font-size: 12px ;

}
    
    }


/* Print adjustments to preserve backgrounds and colors */
@media print {
  body, .container, .leftside, .rigtside, .image {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  /* Optionally remove any unwanted margins for a full-bleed look: */
  @page {
    margin: 0;
  }
}



    </style>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="leftside">
            <div class="image">
                ${
                  profilePicURL
                    ? `<img src="${profilePicURL}" alt="Profile" class="innerimg" />`
                    : ""
                }
            </div>
            <div class="contact">
                <h2 class="conth2">Contact</h2>
                <div class="contline"></div>
                <p class="phone"><i class="fas fa-phone"></i> ${
                  (document.getElementById("phone") as HTMLInputElement).value
                }</p>
                <p class="email"><i class="fas fa-envelope"></i> ${
                  (document.getElementById("email") as HTMLInputElement).value
                }</p>
                ${
                  linkedinInput
                    ? `<p class="linkdin"><i class="fab fa-linkedin"></i> <a href="${linkedinInput}" target="_blank" class="link">${linkedinInput}</a></p>`
                    : ""
                }
            </div>
            <div class="education">
                <h2 class="eduh2">Education</h2>
                <div class="eduline"></div>
                ${Array.from(educationContainer.querySelectorAll("div"))
                  .map((div) => {
                    const degree = (
                      div.querySelector(".degree") as HTMLInputElement
                    )?.value;
                    const institution = (
                      div.querySelector(".institution") as HTMLInputElement
                    )?.value;
                    const startDate = (
                      div.querySelector(".start-date") as HTMLInputElement
                    )?.value;
                    const endDate = (
                      div.querySelector(".end-date") as HTMLInputElement
                    )?.value;

                    if (degree && institution) {
                      return `
                                <p class="edudatesection">
                                    <p class="edudate">${formatDate(
                                      startDate
                                    )} - ${formatDate(endDate)}</p> <br/>
                                    <p class="eduinst">${institution}</p> <br/>
                                    <ul class="edu-ul">
                                        <li class="edudegree">${degree}</li>
                                    </ul>
                                </p>
                            `;
                    }
                    return "";
                  })
                  .join("")}
            </div>
            <div class="languages">
                <h2 class="lang-h2">Languages</h2>
                <div class="lang-line"></div>
                ${Array.from(
                  document
                    .getElementById("languages")
                    ?.querySelectorAll("div") || []
                )
                  .map((div) => {
                    const languageInput = div.querySelector(
                      ".language"
                    ) as HTMLInputElement;
                    const language = languageInput?.value.trim();
                    return language
                      ? `<ul class="lang-ul" >
                                  <li>${language}</li>
                              </ul>`
                      : "";
                  })
                  .join("")}
            </div>
        </div>

        
        <div class="rigtside">
            <h1 class="name">${
              (document.getElementById("name") as HTMLInputElement).value
            }</h1>
            <h3 class="title">${
              (document.getElementById("title") as HTMLInputElement)?.value ||
              "Web Developer"
            }</h3>
            <br/>
            <h2 class="profile">PROFILE</h2>  
            <div class="profile-line"></div>          
            <p class="description">${
              (document.getElementById("description") as HTMLTextAreaElement)
                ?.value || ""
            }</p>
            <div class="work-experience">
                <h2 class="work-h2">Work Experience</h2>
                <div class="work-line"></div> 
                ${Array.from(workExperienceContainer.querySelectorAll("div"))
                  .map((div) => {
                    const jobTitle = (
                      div.querySelector(".job-title") as HTMLInputElement
                    )?.value;
                    const company = (
                      div.querySelector(".company") as HTMLInputElement
                    )?.value;
                    const startDate = (
                      div.querySelector(".start-date") as HTMLInputElement
                    )?.value;
                    const endDate = (
                      div.querySelector(".end-date") as HTMLInputElement
                    )?.value;

                    if (jobTitle && company) {
                      return `
                                <p class="work-para">
                                    <span class="jobtitle">${jobTitle}</span>
                                    <span class="jobdate">${formatDate(
                                      startDate
                                    )} - ${formatDate(endDate)}</span>
                                    <br/>
                                    <span class="company">${company}</span>
                                </p>
                            `;
                    }
                    return "";
                  })
                  .join("")}
            </div>
            <div class="skills-div">
                <h2 class="skill-h2">Skills</h2>
                <div class="skill-line"></div> 
                <div class="skills">
                    ${Array.from(skillsContainer.querySelectorAll("div"))
                      .map((div) => {
                        const skill = (
                          div.querySelector(".skill") as HTMLInputElement
                        )?.value;
                        return skill ? `<span>${skill}</span>` : "";
                      })
                      .join("")}
                </div>
            </div>
        </div>
    </div>
  


        <!-- jquery cdn -->
        <script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossorigin="anonymous"></script>
        <!-- jquery repeater cdn -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.repeater/1.2.1/jquery.repeater.js" integrity="sha512-bZAXvpVfp1+9AUHQzekEZaXclsgSlAeEnMJ6LfFAvjqYUVZfcuVXeQoN5LhD7Uw0Jy4NCY9q3kbdEXbwhZUmUQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
<script>
function printCV(){
  window.print();
}
</script>



 <div style="text-align: center; margin-top: 20px;">
        <button class="edit-cv" onclick="window.close();">Edit CV</button>
        <button onclick="printCV()" class="pdf">Download PDF</button>
</div>



    <div class="print">
      <h2>Print Settings</h2>
      <ul>
        <li>Printer: Select "Save as PDF."</li>
        <li>Layout: Choose "Portrait."</li>
        <li>Pages: Set the option to "1."</li>
        <li>Paper Size: Select "Letter."</li>
        <li>Scale (%): Set it to "Custom (According to your Screen)"</li>
        <li>Pages per Sheet: Set to "1."</li>
        <li>Margins: Select "Default."</li>
        <li>Options: Enable the checkbox for "Background Graphics."</li>
      </ul>
    </div>
    



</body>
</html>`;

  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(cvHTML);
    newWindow.document.close();
  } else {
    console.error(
      "Failed to open new window. Please check if pop-ups are blocked."
    );
  }
}
