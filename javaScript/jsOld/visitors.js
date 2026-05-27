


let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
function saveVisitors() {
    localStorage.setItem('visitors', JSON.stringify(visitors));
}



//-----------------------------------CRUD------------------------//
function addVisitor() {
    const name = document.getElementById('visitorName').value.trim();
    const contact = document.getElementById('visitorContact').value.trim();

    if (!name || !contact) {
        alert("Заповніть всі поля!");
        return;
    }

    visitors.push({ name, contact });

    saveVisitors();
    renderVisitors();
    hideAddVisitorModal();

    document.getElementById('visitorName').value = '';
    document.getElementById('visitorContact').value = '';
}

function deleteVisitor(index) {
    if (confirm(`Видалити ${visitors[index].name}?`)) {
        visitors.splice(index, 1);
        saveVisitors();
        renderVisitors();
    }
}

//------------------------------------UI-------------------------//
function renderVisitors() {
    const tbody = document.getElementById('visitorsTable');
    tbody.innerHTML = '';

    if (visitors.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="px-6 py-8 text-center text-gray-500">
                    Немає відвідувачів
                </td>
            </tr>`;
        return;
    }

    visitors.forEach((v, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="px-6 py-4">${v.name}</td>
            <td class="px-6 py-4">${v.contact}</td>
            <td class="px-6 py-4 text-center">
                <button onclick="deleteVisitor(${index})"
                    class="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}



//----------------------------------модалки----------------------//
function showAddVisitorModal() {
    document.getElementById('addVisitorModal').classList.remove('hidden');
}

function hideAddVisitorModal() {
    document.getElementById('addVisitorModal').classList.add('hidden');
}


