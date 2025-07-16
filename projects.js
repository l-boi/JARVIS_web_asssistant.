
const newProjectBtn = document.getElementById('newProjectBtn');
const projectImageInput = document.getElementById('projectImage');
const projectNameInput = document.getElementById('projectName');
const saveProjectBtn = document.getElementById('saveProjectBtn');
const container = document.getElementById('projects-container');

let projects = JSON.parse(localStorage.getItem('projects') || "[]");
renderProjects();

newProjectBtn.addEventListener('click', () => {
    projectImageInput.style.display = 'block';
    projectNameInput.style.display = 'block';
    saveProjectBtn.style.display = 'block';
});

saveProjectBtn.addEventListener('click', () => {
    const file = projectImageInput.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        const newProj = {
            name: projectNameInput.value,
            image: reader.result
        };
        projects.push(newProj);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
        projectImageInput.style.display = 'none';
        projectNameInput.style.display = 'none';
        saveProjectBtn.style.display = 'none';
        projectNameInput.value = '';
        projectImageInput.value = '';
    };
    if(file){
        reader.readAsDataURL(file);
    }
});

function renderProjects(){
    container.innerHTML = '';
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `<img src="${p.image}" alt=""><div>${p.name}</div>`;
        container.appendChild(card);
    });
}
