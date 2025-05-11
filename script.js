let config = {};
let currentDate = new Date();
let calendarYear = currentDate.getFullYear();
let calendarMonth = currentDate.getMonth();
let lastRenderedDate = null;

async function loadConfig() {
    try {
        console.log('[JS] Tentando carregar services.yaml...');
        const response = await fetch('services.yaml');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        config = jsyaml.load(text);
        console.log('[JS] Configuração YAML carregada:', config);
        return config;
    } catch (error) {
        console.error('[JS] Erro ao carregar services.yaml:', error);
        const sidebarError = document.getElementById('sidebar-error');
        if (sidebarError) {
            sidebarError.textContent = 'Erro ao carregar configuração. Usando fallback...';
            sidebarError.style.display = 'block';
        }
        return { groups: [] };
    }
}

function renderSidebar(groups) {
    console.log('[JS] Renderizando sidebar...');
    const groupList = document.getElementById('group-list');
    const sidebarError = document.getElementById('sidebar-error');
    
    if (!groupList) {
        console.error('[JS] Elemento #group-list não encontrado');
        if (sidebarError) {
            sidebarError.textContent = 'Erro: Sidebar não encontrada.';
            sidebarError.style.display = 'block';
        }
        return;
    }

    groupList.innerHTML = '';
    const fallbackGroups = (groups && groups.length > 0) ? groups : [
        {
            name: 'Home',
            services: [
                { name: 'Relógio', type: 'clock' }
            ]
        }
    ];

    fallbackGroups.forEach(group => {
        console.log(`[JS] Adicionando grupo: ${group.name}`);
        const li = document.createElement('li');
        li.textContent = group.name;
        li.dataset.group = group.name;
        li.addEventListener('click', () => {
            document.querySelectorAll('#group-list li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            renderServices(group.name);
        });
        groupList.appendChild(li);
    });

    groupList.firstChild.classList.add('active');
    renderServices('Home');
    console.log('[JS] Sidebar renderizada com sucesso');
}

function renderServices(groupName) {
    console.log(`[JS] Renderizando serviços para ${groupName}...`);
    const servicesArea = document.getElementById('services-area');
    if (!servicesArea) {
        console.error('[JS] Elemento #services-area não encontrado');
        return;
    }
    servicesArea.innerHTML = '';

    try {
        const group = config.groups.find(g => g.name === groupName) || { services: [] };

        if (groupName === 'Home') {
            const clockDiv = document.createElement('div');
            clockDiv.id = 'clock';
            clockDiv.className = 'clock';
            clockDiv.innerHTML = `
                <div id="clock-time">Carregando...</div>
                <div id="clock-date">Carregando...</div>`;
            servicesArea.appendChild(clockDiv);

            const calendarDiv = document.createElement('div');
            calendarDiv.id = 'calendar';
            calendarDiv.className = 'calendar';
            servicesArea.appendChild(calendarDiv);

            const searchBarDiv = document.createElement('div');
            searchBarDiv.className = 'search-bar';
            searchBarDiv.innerHTML = `
                <form action="https://www.google.com/search" method="get" target="_blank">
                    <input type="text" name="q" placeholder="Pesquisar no Google..." />
                    <button type="submit"><img src="icons/google.png" alt="Google"></button>
                </form>`;
            servicesArea.appendChild(searchBarDiv);

            updateClock();
            renderCalendar();
            setInterval(() => {
                updateClock();
                renderCalendar();
            }, 1000);
        } else {
            const section = document.createElement('section');
            section.className = 'area';
            const title = document.createElement('h2');
            title.className = 'title';
            title.textContent = group.name;
            const shortcuts = document.createElement('div');
            shortcuts.className = 'shortcuts';
            section.appendChild(title);
            section.appendChild(shortcuts);

            group.services.forEach(service => {
                console.log(`[JS] Renderizando serviço: ${service.name}`);
                const card = document.createElement('a');
                card.href = service.url || '#';
                card.target = '_blank';
                card.className = 'card';

                if (service.icon === 'none') {
                    const noIcon = document.createElement('span');
                    noIcon.className = 'no-icon';
                    noIcon.textContent = service.name.split(' ')[0];
                    card.appendChild(noIcon);
                } else {
                    const img = document.createElement('img');
                    img.src = `icons/${service.icon}`;
                    img.alt = service.name;
                    img.onerror = () => {
                        img.alt = 'Ícone não encontrado';
                        img.style.display = 'none';
                    };
                    card.appendChild(img);
                }

                const nameSpan = document.createElement('span');
                nameSpan.textContent = service.name;
                card.appendChild(nameSpan);

                shortcuts.appendChild(card);
            });

            servicesArea.appendChild(section);
        }
        console.log(`[JS] Serviços renderizados para ${groupName}`);
    } catch (error) {
        console.error(`[JS] Erro ao renderizar serviços para ${groupName}:`, error);
        servicesArea.innerHTML = `<p style="color: red;">Erro ao renderizar serviços. Verifique o console.</p>`;
    }
}

function updateClock() {
    try {
        const date = new Date();
        const time = date.toLocaleTimeString('pt-BR');
        const day = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/ de /g, '/').replace(/^\w/, c => c.toUpperCase());
        const clockTime = document.getElementById('clock-time');
        const clockDate = document.getElementById('clock-date');
        if (clockTime && clockDate) {
            clockTime.textContent = time;
            clockDate.textContent = day;
        }
        console.log('[JS] Relógio atualizado');
    } catch (error) {
        console.error('[JS] Erro ao atualizar relógio:', error);
    }
}

function renderCalendar() {
    try {
        const calendarDiv = document.getElementById('calendar');
        if (!calendarDiv) return;

        const now = new Date();
        const today = now.getDate();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Verificar se o dia mudou
        const dateChanged = !lastRenderedDate || 
                           lastRenderedDate.getDate() !== now.getDate() ||
                           lastRenderedDate.getMonth() !== now.getMonth() ||
                           lastRenderedDate.getFullYear() !== now.getFullYear();
        lastRenderedDate = now;

        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
        const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

        console.log(`[JS] Renderizando calendário: ${monthNames[calendarMonth]} ${calendarYear}`);
        calendarDiv.innerHTML = `
            <div class="calendar-header">
                <button id="prev-month"><</button>
                <span>${monthNames[calendarMonth]} ${calendarYear}</span>
                <button id="next-month">></button>
            </div>
            <div class="calendar-grid">
                <span class="calendar-day-header">Dom</span>
                <span class="calendar-day-header">Seg</span>
                <span class="calendar-day-header">Ter</span>
                <span class="calendar-day-header">Qua</span>
                <span class="calendar-day-header">Qui</span>
                <span class="calendar-day-header">Sex</span>
                <span class="calendar-day-header">Sáb</span>
            </div>
            <div class="calendar-footer">
                <button id="today-button">Hoje</button>
            </div>
        `;

        const grid = calendarDiv.querySelector('.calendar-grid');
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('span');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const daySpan = document.createElement('span');
            daySpan.className = 'calendar-day';
            daySpan.textContent = day;
            if (day === today && calendarMonth === currentMonth && calendarYear === currentYear) {
                daySpan.className += ' current';
            }
            grid.appendChild(daySpan);
        }

        document.getElementById('prev-month').addEventListener('click', () => {
            calendarMonth--;
            if (calendarMonth < 0) {
                calendarMonth = 11;
                calendarYear--;
            }
            renderCalendar();
            console.log(`[JS] Mês anterior renderizado: ${monthNames[calendarMonth]} ${calendarYear}`);
        });

        document.getElementById('next-month').addEventListener('click', () => {
            calendarMonth++;
            if (calendarMonth > 11) {
                calendarMonth = 0;
                calendarYear++;
            }
            renderCalendar();
            console.log(`[JS] Próximo mês renderizado: ${monthNames[calendarMonth]} ${calendarYear}`);
        });

        document.getElementById('today-button').addEventListener('click', () => {
            calendarMonth = currentMonth;
            calendarYear = currentYear;
            renderCalendar();
            console.log(`[JS] Mês atual renderizado: ${monthNames[calendarMonth]} ${calendarYear}`);
        });

        console.log('[JS] Calendário renderizado');
    } catch (error) {
        console.error('[JS] Erro ao renderizar calendário:', error);
    }
}

function loadBackgrounds() {
    const backgrounds = [
        { file: 'abstrato.jpg', luminosity: 'dark' },
        { file: 'astronauta.jpg', luminosity: 'dark' },
        { file: 'fundo_claro.jpg', luminosity: 'light' },
        { file: 'marte.jpg', luminosity: 'dark' },
        { file: 'noite.jpg', luminosity: 'dark' },
        { file: 'ruaaugusta.jpg', luminosity: 'light' },

        ];
    console.log('[JS] Fundos carregados:', backgrounds);
    return backgrounds;
}

function renderBackgroundMenu() {
    console.log('[JS] Renderizando menu de fundos...');
    const backgroundList = document.getElementById('background-list');
    const backgroundError = document.getElementById('background-error');

    if (!backgroundList) {
        console.error('[JS] Elemento #background-list não encontrado');
        if (backgroundError) {
            backgroundError.textContent = 'Erro: Menu de fundos não encontrado.';
            backgroundError.style.display = 'block';
        }
        return;
    }

    backgroundList.innerHTML = '';
    const backgrounds = loadBackgrounds();
    if (backgrounds.length === 0) {
        if (backgroundError) {
            backgroundError.textContent = 'Nenhum fundo encontrado. Adicione imagens em backgrounds/.';
            backgroundError.style.display = 'block';
        }
        return;
    }

    backgrounds.forEach(bg => {
        const div = document.createElement('div');
        div.className = 'background-item';
        const img = document.createElement('img');
        img.src = `backgrounds/${bg.file}`;
        img.alt = bg.file;
        img.onerror = () => {
            console.error(`[JS] Erro ao carregar imagem: backgrounds/${bg.file}`);
            img.alt = 'Imagem não encontrada';
            img.style.display = 'none';
            if (backgroundError) {
                backgroundError.textContent = `Erro: ${bg.file} não encontrado.`;
                backgroundError.style.display = 'block';
            }
        };
        const span = document.createElement('span');
        span.textContent = bg.file;
        div.appendChild(img);
        div.appendChild(span);
        div.addEventListener('click', () => {
            console.log(`[JS] Tentando carregar backgrounds/${bg.file}`);
            document.body.style.backgroundImage = `url('backgrounds/${bg.file}?v=3.11')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center';
            document.body.className = `theme-${bg.luminosity}`;
            console.log(`[JS] Fundo alterado para ${bg.file}`);
            console.log(`[JS] Estilo aplicado: ${document.body.style.backgroundImage}`);
            document.getElementById('background-modal').style.display = 'none';
        });
        backgroundList.appendChild(div);
    });

    const defaultThemeButton = document.querySelector('.default-theme');
    if (defaultThemeButton) {
        defaultThemeButton.addEventListener('click', () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundPosition = '';
            document.body.className = 'theme-default';
            console.log('[JS] Tema padrão aplicado');
            document.getElementById('background-modal').style.display = 'none';
        });
    }
    console.log('[JS] Menu de fundos renderizado');
}

function setupBackgroundModal() {
    console.log('[JS] Configurando modal de fundos...');
    try {
        const backgroundIcon = document.querySelector('.background-icon');
        const modal = document.getElementById('background-modal');
        const closeModal = document.querySelector('.modal-close');

        if (!backgroundIcon || !modal || !closeModal) {
            console.error('[JS] Elementos do modal não encontrados:', {
                backgroundIcon: !!backgroundIcon,
                modal: !!modal,
                closeModal: !!closeModal
            });
            const sidebarError = document.getElementById('sidebar-error');
            if (sidebarError) {
                sidebarError.textContent = 'Erro: Modal de fundos não configurado.';
                sidebarError.style.display = 'block';
            }
            return;
        }

        backgroundIcon.addEventListener('click', () => {
            console.log('[JS] Ícone de fundos clicado');
            modal.style.display = 'flex';
            console.log('[JS] Modal de fundos aberto');
        });

        closeModal.addEventListener('click', () => {
            console.log('[JS] Botão de fechar modal clicado');
            modal.style.display = 'none';
            console.log('[JS] Modal de fundos fechado');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('[JS] Clique fora do modal');
                modal.style.display = 'none';
                console.log('[JS] Modal de fundos fechado (clique fora)');
            }
        });

        console.log('[JS] Modal de fundos configurado com sucesso');
    } catch (error) {
        console.error('[JS] Erro ao configurar modal de fundos:', error);
        const sidebarError = document.getElementById('sidebar-error');
        if (sidebarError) {
            sidebarError.textContent = 'Erro: Falha ao configurar modal.';
            sidebarError.style.display = 'block';
        }
    }
}

async function init() {
    console.log('[JS] Iniciando aplicação - Versão 3.11...');
    try {
        setupBackgroundModal();
        renderBackgroundMenu();
        const loadedConfig = await loadConfig();
        config = loadedConfig;
        renderSidebar(config.groups);
        console.log('[JS] Inicialização concluída - Versão 3.11');
    } catch (error) {
        console.error('[JS] Erro na inicialização:', error);
        const servicesArea = document.getElementById('services-area');
        if (servicesArea) {
            servicesArea.innerHTML = `<p style="color: red;">Erro na inicialização. Verifique o console.</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', init);