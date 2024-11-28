const apiUrl = "https://sheetdb.io/api/v1/mqkegcyitfcl3";

// Tarefas fixas para cada dia da semana
const tasksByDay = {
  Segunda: [
    "8:00 - Água no Fogo",
    "8:10 - Recepção",
    "9:00 - Café",
    "9:30 - Diretoria + RH + Banheiro",
    "10:30 - Cobrança + Qualidade",
    "11:30 - Estoque",
    "12:00 - Sala de Atendimento",
    "12:30 - Almoço",
    "13:35 - Supervisão técnica",
    "14:30 - Limpeza Vidros das Casas",
    "15:25 - Banheiros, Estoque/Recepção",
    "16:00 - Escada + Salão",
    "16:30 - Recolher o Lixo",
    "17:00 - Saída"
  ],
  Terça: [
    "8:00 - Água no Fogo",
    "8:10 - Recepção",
    "9:00 - Café",
    "9:30 - Diretoria + RH + Banheiro",
    "10:30 - Cobrança + Qualidade",
    "11:30 - Estoque",
    "12:00 - Sala de Atendimento",
    "12:30 - Almoço",
    "13:35 - Supervisão técnica",
    "14:30 - Limpeza Vidros Recepção",
    "15:25 - Banheiros, Casas",
    "16:00 - Lavar Escadas",
    "16:30 - Recolher o Lixo",
    "17:00 - Saída"
  ],
  Quarta: [
    "8:00 - Água no Fogo",
    "8:10 - Recepção",
    "9:00 - Café",
    "9:30 - Diretoria + RH + Banheiro",
    "10:30 - Cobrança + Qualidade",
    "11:30 - Estoque",
    "12:00 - Sala de Atendimento",
    "12:30 - Almoço",
    "13:35 - Supervisão técnica",
    "14:30 - Limpeza Vidros das Casas",
    "15:25 - Banheiros, Estoque/Recepção",
    "16:00 - Escada + Salão",
    "16:30 - Recolher o Lixo",
    "17:00 - Saída"
  ],
  Quinta: [
    "8:00 - Água no Fogo",
    "8:10 - Recepção",
    "9:00 - Café",
    "9:30 - Diretoria + RH + Banheiro",
    "10:30 - Cobrança + Qualidade",
    "11:30 - Estoque",
    "12:00 - Sala de Atendimento",
    "12:30 - Almoço",
    "13:35 - Supervisão técnica",
    "14:30 - Limpeza Vidros Recepção",
    "15:25 - Banheiros, Casas",
    "16:00 - Lavar Escadas",
    "16:30 - Recolher o Lixo",
    "17:00 - Saída"
  ],
  Sexta: [
    "8:00 - Água no Fogo",
    "8:10 - Recepção",
    "9:00 - Café",
    "9:30 - Diretoria + RH + Banheiro",
    "10:30 - Cobrança + Qualidade",
    "11:30 - Estoque",
    "12:00 - Sala de Atendimento",
    "12:30 - Almoço",
    "13:35 - Supervisão técnica",
    "14:30 - Limpeza Vidros das Casas",
    "15:25 - Banheiros, Estoque/Recepção",
    "16:00 - Escada + Salão",
    "16:30 - Recolher o Lixo",
    "17:00 - Saída"
  ],
  Sábado: [
    "8:00 - Água no Fogo",
    "8:10 - Recepção",
    "9:00 - Café",
    "9:30 - -",
    "10:30 - Sala de Atendimento",
    "11:30 - Recolher o Lixo",
    "12:00 - Saída"
  ],
  Domingo: ["Folga"]
};

// Elemento onde as tarefas serão renderizadas
const taskListContainer = document.getElementById("taskList");

// Função para renderizar tarefas fixas
function renderTasks() {
  for (const day in tasksByDay) {
    const dayContainer = document.createElement("div");
    dayContainer.className = "task-day";

    // Adiciona título do dia
    const dayTitle = document.createElement("h2");
    dayTitle.textContent = day;
    dayTitle.onclick = function () {
      toggleTaskList(day);
    };

    dayContainer.appendChild(dayTitle);

    // Lista de tarefas
    const taskList = document.createElement("ul");
    taskList.className = "task-list";
    taskList.id = `taskList-${day}`; // ID único para cada lista de tarefas

    tasksByDay[day].forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span>${task}</span>
        <button onclick="sendTask('${day}', '${task}')">Enviar</button>
      `;
      taskList.appendChild(taskItem);
    });

    dayContainer.appendChild(taskList);
    taskListContainer.appendChild(dayContainer);
  }
}

// Função para alternar a exibição das tarefas
function toggleTaskList(day) {
  const taskList = document.getElementById(`taskList-${day}`);
  taskList.style.display = taskList.style.display === "none" || taskList.style.display === "" ? "block" : "none";
}

// Função para enviar uma tarefa para a API
async function sendTask(day, task) {
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const formattedTime = now
    .toLocaleTimeString("pt-BR", { hour12: false })
    .padStart(8, "0"); // HH:mm:ss

  const dataToSend = {
    Horário: formattedTime,
    Data: formattedDate,
    Tarefa: task,
    Status: `Concluído (${day})`,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [dataToSend] }),
    });

    if (response.ok) {
      alert(`Tarefa "${task}" enviada com sucesso!`);
    } else {
      alert("Erro ao enviar a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao enviar a tarefa:", error);
    alert("Erro ao enviar a tarefa.");
  }
}

// Renderizar as tarefas ao carregar a página
renderTasks();
