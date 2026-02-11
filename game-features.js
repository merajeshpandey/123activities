/*  Activity 1,2,3 Game - Feature Enhancements
 *  This file adds: Custom Activities, AI Integration, History, and Layout Toggle
 */

// Initialize new modals HTML when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Add modals HTML to body
    const modalsHTML = `
    <!-- Settings Modal -->
    <div class="modal" id="settingsModal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeSettings()">&times;</span>
            <h2>Settings</h2>
            <div class="form-group">
                <label for="aiProvider">AI Provider (Optional):</label>
                <select id="aiProvider" onchange="handleAIProviderChange()">
                    <option value="none">None (Use Fallback Activities)</option>
                    <option value="openai">OpenAI (GPT)</option>
                    <option value="anthropic">Anthropic (Claude)</option>
                    <option value="gemini">Google (Gemini)</option>
                    <option value="perplexity">Perplexity AI</option>
                </select>
            </div>
            <div class="form-group" id="apiKeyGroup" style="display: none;">
                <label for="apiKey">API Key:</label>
                <input type="password" id="apiKey" placeholder="Enter your API key">
                <small style="color: #666; display: block; margin-top: 5px;">Your API key is stored securely in your browser</small>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="generateOnStart">
                    Generate new activities when starting each game
                </label>
            </div>
            <button class="btn btn-primary" style="margin-top: 15px;" onclick="saveSettings()">Save Settings</button>
        </div>
    </div>

    <!-- History Modal -->
    <div class="modal" id="historyModal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeHistory()">&times;</span>
            <h2>Activity History</h2>
            <div style="margin-bottom: 15px;">
                <button class="btn btn-small btn-player" onclick="exportHistory()">📥 Export</button>
                <button class="btn btn-small btn-player" onclick="clearHistoryData()">🗑️ Clear All</button>
            </div>
            <div class="history-list" id="historyList">
                <p style="text-align: center; color: #666;">No history yet. Start playing to track your activities!</p>
            </div>
        </div>
    </div>

    <!-- Manage Activities Modal -->
    <div class="modal" id="manageActivitiesModal">
        <div class="modal-content">
            <span class="modal-close" onclick="closeManageActivities()">&times;</span>
            <h2>Manage Custom Activities</h2>
            
            <div id="activityFormContainer" style="display: none;">
                <h3 id="formTitle">Add New Activity</h3>
                <div class="form-group">
                    <label for="activityAgeGroup">Age Group:</label>
                    <select id="activityAgeGroup">
                        <option value="kids">Kids (3-9 years)</option>
                        <option value="adult">Adults</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="activityEn">Activity (English):</label>
                    <textarea id="activityEn" placeholder="E.g., Jump 5 times!"></textarea>
                </div>
                <div class="form-group">
                    <label for="activityNe">Activity (Nepali):</label>
                    <textarea id="activityNe" placeholder="E.g., ५ पटक उफ्र्नुहोस्!"></textarea>
                </div>
                <div class="form-group">
                    <label for="activityNl">Activity (Dutch):</label>
                    <textarea id="activityNl" placeholder="E.g., Spring 5 keer!"></textarea>
                </div>
                <button class="btn btn-small btn-primary" onclick="saveCustomActivity()">💾 Save</button>
                <button class="btn btn-small btn-player" onclick="cancelActivityForm()">❌ Cancel</button>
            </div>

            <div id="activityListContainer">
                <button class="btn btn-player" style="width: 100%; margin-bottom: 15px;" onclick="showActivityForm()">➕ Add New Activity</button>
                <h3>Your Custom Activities</h3>
                <div class="activity-list" id="customActivityList">
                    <p style="text-align: center; color: #666;">No custom activities yet.</p>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalsHTML);

    // Load saved data
    loadSettings();
    loadLayout();
    initializeHistory();
    loadCustomActivities();

    // Add click handlers for modal close on backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

// ========== LAYOUT TOGGLE ==========
function toggleLayout() {
    const body = document.body;
    const btn = document.getElementById('layoutBtn');

    if (!body.classList.contains('layout-portrait')) {
        body.classList.add('layout-portrait');
        btn.textContent = '📱';
        localStorage.setItem('activityGame_layout', 'portrait');
    } else {
        body.classList.remove('layout-portrait');
        btn.textContent = '🖥️';
        localStorage.setItem('activityGame_layout', 'landscape');
    }
    if (typeof playSound === 'function') playSound('click');
}

function loadLayout() {
    const layout = localStorage.getItem('activityGame_layout');
    const btn = document.getElementById('layoutBtn');
    if (layout === 'portrait' && btn) {
        document.body.classList.add('layout-portrait');
        btn.textContent = '📱';
    }
}

// ========== SETTINGS ==========
function showSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('active');
        loadSettings();
    }
    if (typeof playSound === 'function') playSound('click');
}

function closeSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.remove('active');
    if (typeof playSound === 'function') playSound('click');
}

function handleAIProviderChange() {
    const provider = document.getElementById('aiProvider');
    const apiKeyGroup = document.getElementById('apiKeyGroup');

    if (provider && apiKeyGroup) {
        if (provider.value !== 'none') {
            apiKeyGroup.style.display = 'block';
        } else {
            apiKeyGroup.style.display = 'none';
        }
    }
}

function saveSettings() {
    const aiProvider = document.getElementById('aiProvider');
    const apiKey = document.getElementById('apiKey');
    const generateOnStart = document.getElementById('generateOnStart');

    if (!aiProvider) return;

    const settings = {
        aiProvider: aiProvider.value,
        apiKey: apiKey ? apiKey.value : '',
        generateOnStart: generateOnStart ? generateOnStart.checked : false
    };

    localStorage.setItem('activityGame_settings', JSON.stringify(settings));
    if (typeof playSound === 'function') playSound('success');
    alert('Settings saved!');
    closeSettings();
}

function loadSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('activityGame_settings') || '{"aiProvider":"none","apiKey":"","generateOnStart":false}');

        const aiProvider = document.getElementById('aiProvider');
        const apiKey = document.getElementById('apiKey');
        const generateOnStart = document.getElementById('generateOnStart');

        if (aiProvider) aiProvider.value = settings.aiProvider || 'none';
        if (apiKey) apiKey.value = settings.apiKey || '';
        if (generateOnStart) generateOnStart.checked = settings.generateOnStart || false;
        handleAIProviderChange();
    } catch (e) {
        console.error('Error loading settings:', e);
    }
}

// ========== ACTIVITY HISTORY ==========
let currentSessionId = null;
let activityHistory = [];

function initializeHistory() {
    try {
        activityHistory = JSON.parse(localStorage.getItem('activityGame_history') || '[]');
    } catch (e) {
        activityHistory = [];
    }
    currentSessionId = 'session_' + Date.now();
}

function recordActivity(playerNum, activity) {
    if (!currentSessionId) {
        currentSessionId = 'session_' + Date.now();
    }

    const record = {
        sessionId: currentSessionId,
        timestamp: new Date().toISOString(),
        player: playerNum,
        activity: activity,
        round: typeof gameState !== 'undefined' ? gameState.currentRound : 1
    };

    activityHistory.push(record);

    // Keep only last 200 activities
    if (activityHistory.length > 200) {
        activityHistory = activityHistory.slice(-200);
    }

    localStorage.setItem('activityGame_history', JSON.stringify(activityHistory));
}

function showHistory() {
    const modal = document.getElementById('historyModal');
    if (modal) {
        modal.classList.add('active');
        renderHistory();
    }
    if (typeof playSound === 'function') playSound('click');
}

function closeHistory() {
    const modal = document.getElementById('historyModal');
    if (modal) modal.classList.remove('active');
    if (typeof playSound === 'function') playSound('click');
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    if (activityHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #666;">No history yet. Start playing to track your activities!</p>';
        return;
    }

    // Group by session
    const sessions = {};
    activityHistory.forEach(record => {
        if (!sessions[record.sessionId]) {
            sessions[record.sessionId] = [];
        }
        sessions[record.sessionId].push(record);
    });

    let html = '';
    Object.keys(sessions).reverse().forEach(sessionId => {
        const activities = sessions[sessionId];
        const firstActivity = activities[0];
        const date = new Date(firstActivity.timestamp);

        html += `
            <div class="history-session">
                <h4>Session: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</h4>
                ${activities.map(a => `
                    <div class="history-activity">
                        <strong>Round ${a.round}, Player ${a.player}:</strong> ${a.activity}
                    </div>
                `).join('')}
            </div>
        `;
    });

    historyList.innerHTML = html;
}

function exportHistory() {
    const dataStr = JSON.stringify(activityHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'activity-history-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    if (typeof playSound === 'function') playSound('success');
}

function clearHistoryData() {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        activityHistory = [];
        localStorage.removeItem('activityGame_history');
        renderHistory();
        if (typeof playSound === 'function') playSound('success');
    }
}

// ========== CUSTOM ACTIVITIES ==========
let customActivities = { kids: [], adult: [] };
let editingActivityIndex = null;

function loadCustomActivities() {
    try {
        customActivities = JSON.parse(localStorage.getItem('activityGame_customActivities') || '{"kids":[],"adult":[]}');
    } catch (e) {
        customActivities = { kids: [], adult: [] };
    }
}

function saveCustomActivitiesDB() {
    localStorage.setItem('activityGame_customActivities', JSON.stringify(customActivities));
}

function showManageActivities() {
    loadCustomActivities();
    const modal = document.getElementById('manageActivitiesModal');
    if (modal) {
        modal.classList.add('active');
        renderCustomActivities();
    }
    if (typeof playSound === 'function') playSound('click');
}

function closeManageActivities() {
    const modal = document.getElementById('manageActivitiesModal');
    if (modal) modal.classList.remove('active');
    cancelActivityForm();
    if (typeof playSound === 'function') playSound('click');
}

function showActivityForm(ageGroup, index) {
    const formContainer = document.getElementById('activityFormContainer');
    const listContainer = document.getElementById('activityListContainer');

    if (!formContainer || !listContainer) return;

    formContainer.style.display = 'block';
    listContainer.style.display = 'none';

    if (ageGroup !== undefined && index !== undefined) {
        // Edit mode
        editingActivityIndex = { ageGroup, index };
        const activity = customActivities[ageGroup][index];
        document.getElementById('activityAgeGroup').value = ageGroup;
        document.getElementById('activityEn').value = activity.en;
        document.getElementById('activityNe').value = activity.ne;
        document.getElementById('activityNl').value = activity.nl;
        document.getElementById('formTitle').textContent = 'Edit Activity';
    } else {
        // Add mode
        editingActivityIndex = null;
        document.getElementById('activityAgeGroup').value = 'kids';
        document.getElementById('activityEn').value = '';
        document.getElementById('activityNe').value = '';
        document.getElementById('activityNl').value = '';
        document.getElementById('formTitle').textContent = 'Add New Activity';
    }
}

function cancelActivityForm() {
    const formContainer = document.getElementById('activityFormContainer');
    const listContainer = document.getElementById('activityListContainer');

    if (formContainer) formContainer.style.display = 'none';
    if (listContainer) listContainer.style.display = 'block';
    editingActivityIndex = null;
}

function saveCustomActivity() {
    const ageGroupEl = document.getElementById('activityAgeGroup');
    const enEl = document.getElementById('activityEn');
    const neEl = document.getElementById('activityNe');
    const nlEl = document.getElementById('activityNl');

    if (!ageGroupEl || !enEl || !neEl || !nlEl) return;

    const ageGroup = ageGroupEl.value;
    const activity = {
        en: enEl.value.trim(),
        ne: neEl.value.trim(),
        nl: nlEl.value.trim()
    };

    if (!activity.en || !activity.ne || !activity.nl) {
        alert('Please fill in all language fields!');
        return;
    }

    if (editingActivityIndex !== null) {
        // Edit existing
        customActivities[editingActivityIndex.ageGroup][editingActivityIndex.index] = activity;
    } else {
        // Add new
        customActivities[ageGroup].push(activity);
    }

    saveCustomActivitiesDB();
    cancelActivityForm();
    renderCustomActivities();
    if (typeof playSound === 'function') playSound('success');
}

function deleteCustomActivity(ageGroup, index) {
    if (confirm('Are you sure you want to delete this activity?')) {
        customActivities[ageGroup].splice(index, 1);
        saveCustomActivitiesDB();
        renderCustomActivities();
        if (typeof playSound === 'function') playSound('click');
    }
}

function renderCustomActivities() {
    const list = document.getElementById('customActivityList');
    if (!list) return;

    const totalActivities = customActivities.kids.length + customActivities.adult.length;

    if (totalActivities === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666;">No custom activities yet.</p>';
        return;
    }

    let html = '';

    if (customActivities.kids.length > 0) {
        html += '<h4 style="color: #667eea; margin-top: 15px;">Kids Activities</h4>';
        customActivities.kids.forEach((activity, index) => {
            html += `
                <div class="activity-item">
                    <div>
                        <strong>EN:</strong> ${activity.en}<br>
                        <small><strong>NE:</strong> ${activity.ne}</small><br>
                        <small><strong>NL:</strong> ${activity.nl}</small>
                    </div>
                    <div class="activity-actions">
                        <button class="btn-icon btn-edit" onclick="showActivityForm('kids', ${index})">✏️</button>
                        <button class="btn-icon btn-delete" onclick="deleteCustomActivity('kids', ${index})">🗑️</button>
                    </div>
                </div>
            `;
        });
    }

    if (customActivities.adult.length > 0) {
        html += '<h4 style="color: #667eea; margin-top: 15px;">Adult Activities</h4>';
        customActivities.adult.forEach((activity, index) => {
            html += `
                <div class="activity-item">
                    <div>
                        <strong>EN:</strong> ${activity.en}<br>
                        <small><strong>NE:</strong> ${activity.ne}</small><br>
                        <small><strong>NL:</strong> ${activity.nl}</small>
                    </div>
                    <div class="activity-actions">
                        <button class="btn-icon btn-edit" onclick="showActivityForm('adult', ${index})">✏️</button>
                        <button class="btn-icon btn-delete" onclick="deleteCustomActivity('adult', ${index})">🗑️</button>
                    </div>
                </div>
            `;
        });
    }

    list.innerHTML = html;
}

// ========== UTILITY FUNCTIONS ==========
function getCustomActivity(ageGroup) {
    loadCustomActivities();
    const activities = customActivities[ageGroup] || [];
    if (activities.length > 0 && Math.random() > 0.5) {
        return activities[Math.floor(Math.random() * activities.length)];
    }
    return null;
}

console.log('Game features loaded successfully!');
