// Terminal UI for Convex Skills
// Handles navigation and skill opening

const SKILLS_BASE_PATH = '/skills/';

const skills = [
  { id: 'convex-best-practices', name: 'Convex Best Practices', description: 'Production-ready app guidelines' },
  { id: 'convex-component-authoring', name: 'Convex Component Authoring', description: 'Creating reusable components' },
  { id: 'convex-realtime', name: 'Convex Realtime', description: 'Reactive patterns and subscriptions' },
  { id: 'convex-functions', name: 'Convex Functions', description: 'Queries, mutations, actions' },
  { id: 'convex-file-storage', name: 'Convex File Storage', description: 'File upload and serving' },
  { id: 'convex-security-check', name: 'Convex Security Check', description: 'Quick security checklist' },
  { id: 'convex-security-audit', name: 'Convex Security Audit', description: 'Deep security review' },
  { id: 'convex-schema-validator', name: 'Convex Schema Validator', description: 'Schema definition and validation' },
  { id: 'convex-agents', name: 'Convex Agents', description: 'AI agents with Convex' },
];

let selectedIndex = 0;
let searchMode = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateSelection();
});

function setupEventListeners() {
  // Click handlers for tree items
  document.querySelectorAll('.tree-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      selectedIndex = index;
      updateSelection();
      openSkill(item.dataset.skill);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
  if (searchMode) {
    if (e.key === 'Escape') {
      closeSearch();
    }
    return;
  }

  switch (e.key) {
    case 'j':
    case 'ArrowDown':
      e.preventDefault();
      navigateDown();
      break;
    case 'k':
    case 'ArrowUp':
      e.preventDefault();
      navigateUp();
      break;
    case 'Enter':
      e.preventDefault();
      openSelectedSkill();
      break;
    case '/':
      e.preventDefault();
      openSearch();
      break;
    case 'Escape':
      closeSearch();
      break;
  }
}

function navigateDown() {
  if (selectedIndex < skills.length - 1) {
    selectedIndex++;
    updateSelection();
  }
}

function navigateUp() {
  if (selectedIndex > 0) {
    selectedIndex--;
    updateSelection();
  }
}

function updateSelection() {
  const items = document.querySelectorAll('.tree-item');
  items.forEach((item, index) => {
    item.classList.toggle('selected', index === selectedIndex);
  });

  // Scroll selected item into view
  items[selectedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function openSelectedSkill() {
  const skillId = skills[selectedIndex]?.id;
  if (skillId) {
    openSkill(skillId);
  }
}

function openSkill(skillId) {
  const url = `${SKILLS_BASE_PATH}${skillId}/SKILL.md`;
  window.open(url, '_blank');
}

function openSearch() {
  searchMode = true;
  
  // Create search overlay if it doesn't exist
  let overlay = document.querySelector('.search-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-box">
        <input type="text" class="search-input" placeholder="Search skills..." autofocus>
      </div>
    `;
    document.body.appendChild(overlay);
    
    const input = overlay.querySelector('.search-input');
    input.addEventListener('input', handleSearch);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openSelectedSkill();
        closeSearch();
      }
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeSearch();
      }
    });
  }
  
  overlay.classList.add('active');
  overlay.querySelector('.search-input').focus();
}

function closeSearch() {
  searchMode = false;
  const overlay = document.querySelector('.search-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.querySelector('.search-input').value = '';
  }
  resetFilter();
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const items = document.querySelectorAll('.tree-item');
  
  let firstVisible = -1;
  
  items.forEach((item, index) => {
    const skill = skills[index];
    const matches = skill.name.toLowerCase().includes(query) ||
                    skill.description.toLowerCase().includes(query) ||
                    skill.id.toLowerCase().includes(query);
    
    item.style.display = matches ? 'flex' : 'none';
    
    if (matches && firstVisible === -1) {
      firstVisible = index;
    }
  });
  
  if (firstVisible !== -1) {
    selectedIndex = firstVisible;
    updateSelection();
  }
}

function resetFilter() {
  document.querySelectorAll('.tree-item').forEach(item => {
    item.style.display = 'flex';
  });
}

// Export for testing
if (typeof module !== 'undefined') {
  module.exports = { skills, openSkill };
}
