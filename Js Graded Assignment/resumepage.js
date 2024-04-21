let applicantsData;
let filteredApplicants;
let currentIndex = 0;
const applicantDetails = document.getElementById('applicant-details');
const jobSearchInput = document.getElementById('job-search');
const searchError = document.getElementById('search-error');
const searchError1 = document.getElementById('search-error-img');
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');

async function loadApplicantsData() {
    try {
        const response = await fetch('http://localhost:3000/resume');
        applicantsData = await response.json();
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}
loadApplicantsData();

function displayApplicant() {
    applicantDetails.innerHTML = '';
    if (filteredApplicants.length === 0) {
        searchError.innerHTML = '';
        searchError1.innerHTML = '';

        const profileIcon = document.createElement('img');
        profileIcon.classList.add('profile-icon');
        profileIcon.src = 'sademoji.png';
        searchError.appendChild(profileIcon);
        searchError1.textContent = 'Invalid search or No applications for this job';
        return;
    }
    searchError.innerHTML = '';
    searchError1.innerHTML = '';
    var applicant = filteredApplicants[currentIndex];
    const totalApplicants = filteredApplicants.length;

    previousBtn.classList.toggle('hide', currentIndex === 0 || totalApplicants === 1);
    nextBtn.classList.toggle('hide', currentIndex === totalApplicants - 1 || totalApplicants === 1);

    const container = document.createElement('div');
    container.classList.add('container');

    const header = document.createElement('div');
    header.classList.add('header');

    const profileIcon = document.createElement('img');
    profileIcon.classList.add('profile-icon');
    if (applicant.basics.image == "") {
        profileIcon.src = 'defaultUserImage.png';
    }
    else {
        profileIcon.src = applicant.basics.image;
    }

    const nameHeading = document.createElement('h1');
    nameHeading.textContent = applicant.basics.name;

    const jobParagraph = document.createElement('p');
    jobParagraph.textContent = "Applied For: " + applicant.basics.AppliedFor;

    header.appendChild(profileIcon);
    header.appendChild(nameHeading);
    header.appendChild(jobParagraph);

    const leftSection = document.createElement('div');
    leftSection.classList.add('left-section');

    const personalInfoSection = createSection('Personal Information', [
        `Phone: ${applicant.basics.phone}`,
        `Email: ${applicant.basics.email}`
    ]);

    const hobbiesSection = createSection('Hobbies', applicant.interests.hobbies);

    const skillsSection = createSection('Technical Skills', applicant.skills.keywords);

    leftSection.appendChild(personalInfoSection);
    leftSection.appendChild(hobbiesSection);
    leftSection.appendChild(skillsSection);

    const rightSection = document.createElement('div');
    rightSection.classList.add('right-section');

    const workExperienceSection = createSection('Work Experience', [
        `${applicant.work['Company Name']} (${applicant.work['Start Date']} to ${applicant.work['End Date']})`,
        `${applicant.work.Position}`,
        `${applicant.work.Summary}`
    ]);

    const internshipSection = createSection('Internship', [
        `${applicant.Internship['Company Name']} (${applicant.Internship['Start Date']} to ${applicant.Internship['End Date']})`,
        `${applicant.Internship.Position}`,
        `${applicant.Internship.Summary}`
    ]);

    const projectsSection = createSection('Projects', [`${applicant.projects.name}: ${applicant.projects.description}`]);

    const educationSection = createSection('Education', [
        `UG: ${applicant.education.UG.institute}, ${applicant.education.UG.course}`,
        `CGPA: ${applicant.education.UG.cgpa}`,
        `Senior Secondary: ${applicant.education['Senior Secondary'].institute}`,
        `CGPA: ${applicant.education['Senior Secondary'].cgpa}`,
        `High School: ${applicant.education['High School'].institute}`,
        `CGPA: ${applicant.education['High School'].cgpa}`
    ]);

    const achievementsSection = createSection('Achievements', applicant.achievements.Summary);

    rightSection.appendChild(workExperienceSection);
    rightSection.appendChild(internshipSection);
    rightSection.appendChild(projectsSection);
    rightSection.appendChild(educationSection);
    rightSection.appendChild(achievementsSection);

    container.appendChild(header);
    container.appendChild(leftSection);
    container.appendChild(rightSection);

    applicantDetails.appendChild(container);
}

function createSection(title, content) {
    const section = document.createElement('div');
    section.classList.add('section');

    const heading = document.createElement('h2');
    heading.textContent = title;

    const list = document.createElement('ul');

    if (Array.isArray(content)) {
        content.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = content;
        list.appendChild(listItem);
    }

    section.appendChild(heading);
    section.appendChild(list);

    return section;
}

function previousApplicant() {
    if (currentIndex > 0) {
        currentIndex--;
        displayApplicant();
    }
}

function nextApplicant() {
    if (currentIndex < filteredApplicants.length - 1) {
        currentIndex++;
        displayApplicant();
    }
}

function searchJob() {
    const searchValue = jobSearchInput.value.toLowerCase();
    filteredApplicants = applicantsData.filter(applicant => applicant.basics.AppliedFor.toLowerCase() === searchValue);
    currentIndex = 0;
    displayApplicant();
}

function logout() {
    localStorage.clear();
    window.location.href = 'loginpage.html';
}
