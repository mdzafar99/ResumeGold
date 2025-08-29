// Global variables
let experienceCount = 1;
let educationCount = 1;
let projectCount = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSplashScreen();
    initializeEventListeners();
    initializeFormHandlers();
    updatePreview(); // Initial preview update
});

// Splash screen functionality
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    // Show main content after splash screen animation
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 4000);
}

// Initialize event listeners
function initializeEventListeners() {
    // PDF download button
    document.getElementById('download-pdf').addEventListener('click', generatePDF);
    
    // Add dynamic form buttons
    document.getElementById('add-experience').addEventListener('click', addExperience);
    document.getElementById('add-education').addEventListener('click', addEducation);
    document.getElementById('add-project').addEventListener('click', addProject);
    
    // Form input change listeners for live preview
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 300));
    });
}

// Initialize form handlers
function initializeFormHandlers() {
    // Validate email input
    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value;
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#ff4757';
            showToast('Please enter a valid email address', 'error');
        } else {
            this.style.borderColor = '#e1e8ed';
        }
    });
    
    // Validate phone input
    document.getElementById('phone').addEventListener('input', function() {
        // Allow only numbers, spaces, hyphens, and parentheses
        this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, '');
    });
}

// Utility function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add new experience entry
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experience-container');
    
    const experienceHTML = `
        <div class="experience-item" style="animation: slideInUp 0.5s ease-out;">
            <input type="text" class="job-title" placeholder="Job Title">
            <input type="text" class="company" placeholder="Company Name">
            <div class="date-range">
                <input type="text" class="start-date" placeholder="Start Date (e.g., Jan 2020)">
                <input type="text" class="end-date" placeholder="End Date (or 'Present')">
            </div>
            <textarea class="job-description" placeholder="Describe your responsibilities and achievements" rows="3"></textarea>
            <button type="button" class="btn-remove" onclick="removeExperience(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', experienceHTML);
    
    // Add event listeners to new inputs
    const newItem = container.lastElementChild;
    const inputs = newItem.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 300));
    });
    
    showToast('Experience entry added', 'success');
}

// Remove experience entry
function removeExperience(button) {
    const item = button.closest('.experience-item');
    item.style.animation = 'slideOutUp 0.3s ease-in';
    setTimeout(() => {
        item.remove();
        updatePreview();
        showToast('Experience entry removed', 'info');
    }, 300);
}

// Add new education entry
function addEducation() {
    educationCount++;
    const container = document.getElementById('education-container');
    
    const educationHTML = `
        <div class="education-item" style="animation: slideInUp 0.5s ease-out;">
            <input type="text" class="degree" placeholder="Degree">
            <input type="text" class="institution" placeholder="Institution">
            <div class="date-range">
                <input type="text" class="edu-start-date" placeholder="Start Year">
                <input type="text" class="edu-end-date" placeholder="End Year">
            </div>
            <input type="text" class="gpa" placeholder="GPA (Optional)">
            <button type="button" class="btn-remove" onclick="removeEducation(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', educationHTML);
    
    // Add event listeners to new inputs
    const newItem = container.lastElementChild;
    const inputs = newItem.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 300));
    });
    
    showToast('Education entry added', 'success');
}

// Remove education entry
function removeEducation(button) {
    const item = button.closest('.education-item');
    item.style.animation = 'slideOutUp 0.3s ease-in';
    setTimeout(() => {
        item.remove();
        updatePreview();
        showToast('Education entry removed', 'info');
    }, 300);
}

// Add new project entry
function addProject() {
    projectCount++;
    const container = document.getElementById('projects-container');
    
    const projectHTML = `
        <div class="project-item" style="animation: slideInUp 0.5s ease-out;">
            <input type="text" class="project-name" placeholder="Project Name">
            <input type="url" class="project-url" placeholder="Project URL (Optional)">
            <textarea class="project-description" placeholder="Describe the project and technologies used" rows="2"></textarea>
            <button type="button" class="btn-remove" onclick="removeProject(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', projectHTML);
    
    // Add event listeners to new inputs
    const newItem = container.lastElementChild;
    const inputs = newItem.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 300));
    });
    
    showToast('Project entry added', 'success');
}

// Remove project entry
function removeProject(button) {
    const item = button.closest('.project-item');
    item.style.animation = 'slideOutUp 0.3s ease-in';
    setTimeout(() => {
        item.remove();
        updatePreview();
        showToast('Project entry removed', 'info');
    }, 300);
}

// Update the resume preview in real-time
function updatePreview() {
    const preview = document.getElementById('resume-preview');
    
    // Get form data
    const data = {
        fullName: document.getElementById('fullName').value || 'Your Name',
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value,
        linkedin: document.getElementById('linkedin').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value
    };
    
    // Update header
    updateResumeHeader(data);
    
    // Update sections
    updateSummarySection(data.summary);
    updateExperienceSection();
    updateEducationSection();
    updateSkillsSection(data.skills);
    updateProjectsSection();
}

// Update resume header
function updateResumeHeader(data) {
    const nameElement = document.querySelector('.resume-name');
    const contactElement = document.querySelector('.resume-contact');
    
    nameElement.textContent = data.fullName;
    
    const contactItems = [];
    if (data.email) contactItems.push(data.email);
    if (data.phone) contactItems.push(data.phone);
    if (data.location) contactItems.push(data.location);
    if (data.website) contactItems.push(`🌐 ${data.website}`);
    if (data.linkedin) contactItems.push(`💼 LinkedIn`);
    
    contactElement.innerHTML = contactItems.map(item => 
        `<span class="contact-item">${item}</span>`
    ).join('');
}

// Update summary section
function updateSummarySection(summary) {
    const summaryElement = document.querySelector('.summary-text');
    if (summary.trim()) {
        summaryElement.textContent = summary;
        summaryElement.classList.remove('placeholder-text');
    } else {
        summaryElement.textContent = 'Your professional summary will appear here...';
        summaryElement.classList.add('placeholder-text');
    }
}

// Update experience section
function updateExperienceSection() {
    const experienceList = document.querySelector('.experience-list');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    let hasContent = false;
    let html = '';
    
    experienceItems.forEach(item => {
        const jobTitle = item.querySelector('.job-title').value;
        const company = item.querySelector('.company').value;
        const startDate = item.querySelector('.start-date').value;
        const endDate = item.querySelector('.end-date').value;
        const description = item.querySelector('.job-description').value;
        
        if (jobTitle || company) {
            hasContent = true;
            html += `
                <div class="experience-entry">
                    <div class="entry-header">
                        <div>
                            <div class="entry-title">${jobTitle || 'Job Title'}</div>
                            <div class="entry-company">${company || 'Company Name'}</div>
                        </div>
                        <div class="entry-date">${startDate || 'Start'} - ${endDate || 'End'}</div>
                    </div>
                    ${description ? `<div class="entry-description">${description}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasContent) {
        experienceList.innerHTML = html;
    } else {
        experienceList.innerHTML = '<p class="placeholder-text">Your work experience will appear here...</p>';
    }
}

// Update education section
function updateEducationSection() {
    const educationList = document.querySelector('.education-list');
    const educationItems = document.querySelectorAll('.education-item');
    
    let hasContent = false;
    let html = '';
    
    educationItems.forEach(item => {
        const degree = item.querySelector('.degree').value;
        const institution = item.querySelector('.institution').value;
        const startDate = item.querySelector('.edu-start-date').value;
        const endDate = item.querySelector('.edu-end-date').value;
        const gpa = item.querySelector('.gpa').value;
        
        if (degree || institution) {
            hasContent = true;
            html += `
                <div class="education-entry">
                    <div class="entry-header">
                        <div>
                            <div class="entry-title">${degree || 'Degree'}</div>
                            <div class="entry-institution">${institution || 'Institution'}</div>
                        </div>
                        <div class="entry-date">${startDate || 'Start'} - ${endDate || 'End'}</div>
                    </div>
                    ${gpa ? `<div class="entry-description">GPA: ${gpa}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasContent) {
        educationList.innerHTML = html;
    } else {
        educationList.innerHTML = '<p class="placeholder-text">Your education will appear here...</p>';
    }
}

// Update skills section
function updateSkillsSection(skills) {
    const skillsList = document.querySelector('.skills-list');
    
    if (skills.trim()) {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        const skillsHTML = skillsArray.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
        skillsList.innerHTML = skillsHTML;
    } else {
        skillsList.innerHTML = '<p class="placeholder-text">Your skills will appear here...</p>';
    }
}

// Update projects section
function updateProjectsSection() {
    const projectsList = document.querySelector('.projects-list');
    const projectItems = document.querySelectorAll('.project-item');
    
    let hasContent = false;
    let html = '';
    
    projectItems.forEach(item => {
        const projectName = item.querySelector('.project-name').value;
        const projectUrl = item.querySelector('.project-url').value;
        const description = item.querySelector('.project-description').value;
        
        if (projectName) {
            hasContent = true;
            html += `
                <div class="project-entry">
                    <div class="entry-header">
                        <div class="entry-title">
                            ${projectUrl ? `<a href="${projectUrl}" class="project-link" target="_blank">${projectName}</a>` : projectName}
                        </div>
                    </div>
                    ${description ? `<div class="entry-description">${description}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasContent) {
        projectsList.innerHTML = html;
    } else {
        projectsList.innerHTML = '<p class="placeholder-text">Your projects will appear here...</p>';
    }
}

// Generate and download PDF
async function generatePDF() {
    const downloadBtn = document.getElementById('download-pdf');
    const originalText = downloadBtn.innerHTML;
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    try {
        // Get the resume preview element
        const element = document.getElementById('resume-preview');
        
        // Create canvas from the element
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Calculate dimensions
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // Get user's name for filename
        const fileName = document.getElementById('fullName').value || 'resume';
        const sanitizedFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        
        // Save the PDF
        pdf.save(`${sanitizedFileName}_resume.pdf`);
        
        showToast('Resume downloaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showToast('Error generating PDF. Please try again.', 'error');
    } finally {
        // Reset button state
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    toast.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast and form items
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideOutUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Form validation before PDF generation
function validateForm() {
    const requiredFields = [
        { id: 'fullName', name: 'Full Name' },
        { id: 'email', name: 'Email' }
    ];
    
    let isValid = true;
    const errors = [];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        const value = element.value.trim();
        
        if (!value) {
            isValid = false;
            errors.push(field.name);
            element.style.borderColor = '#ff4757';
        } else {
            element.style.borderColor = '#e1e8ed';
        }
    });
    
    // Validate email format if provided
    const email = document.getElementById('email').value.trim();
    if (email && !isValidEmail(email)) {
        isValid = false;
        errors.push('Valid Email');
        document.getElementById('email').style.borderColor = '#ff4757';
    }
    
    if (!isValid) {
        showToast(`Please fill in: ${errors.join(', ')}`, 'error');
    }
    
    return isValid;
}

// Override PDF generation to include validation
const originalGeneratePDF = generatePDF;
window.generatePDF = function() {
    if (validateForm()) {
        originalGeneratePDF();
    }
};

// Auto-save functionality (optional)
let autoSaveTimer;
function autoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            website: document.getElementById('website').value,
            linkedin: document.getElementById('linkedin').value,
            summary: document.getElementById('summary').value,
            skills: document.getElementById('skills').value
        };
        
        // Save to localStorage
        localStorage.setItem('resumeGoldData', JSON.stringify(formData));
    }, 2000);
}

// Load saved data on page load
function loadSavedData() {
    const savedData = localStorage.getItem('resumeGoldData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const element = document.getElementById(key);
                if (element && data[key]) {
                    element.value = data[key];
                }
            });
            updatePreview();
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Initialize auto-save and load saved data
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSavedData, 100);
    
    // Add auto-save listeners
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', autoSave);
    });
});
