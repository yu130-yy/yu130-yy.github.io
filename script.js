// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // 用户认证状态管理
  const auth = {
    isAuthenticated: false,
    currentUser: null,
    
    // 登录方法（预设测试账号）
    login(username, password) {
      console.log('Attempting to login with:', username, password);
      
      if (username === '1' && password === '1234') {
        this.isAuthenticated = true;
        this.currentUser = { username: '1', id: 'test-user', avatar: 'https://picsum.photos/id/64/200/200' };
        console.log('Login successful:', this.currentUser);
        this.updateUI();
        return true;
      }
      
      console.log('Login failed: invalid credentials');
      return false;
    },
    
    // 更新UI
    updateUI() {
      console.log('Updating UI based on auth state:', this.isAuthenticated);
      
      const authButtons = document.getElementById('auth-buttons');
      const userProfile = document.getElementById('user-profile');
      const userAvatar = document.getElementById('user-avatar');
      
      if (this.isAuthenticated) {
        authButtons.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userAvatar.src = this.currentUser.avatar;
        
        // 显示登录后的内容
        document.getElementById('not-logged-in').classList.add('hidden');
        document.getElementById('ranking-list').classList.remove('hidden');
        
        document.getElementById('not-logged-in-games').classList.add('hidden');
        document.getElementById('game-types-container').classList.remove('hidden');
        
        document.getElementById('not-logged-in-messages').classList.add('hidden');
        document.getElementById('messages-list').classList.remove('hidden');
        
        document.getElementById('profile-not-logged-in').classList.add('hidden');
        document.getElementById('profile-content').classList.remove('hidden');
        
        // 显示新增按钮
        document.getElementById('add-work-btn').classList.remove('hidden');
        document.getElementById('add-game-type-btn').classList.remove('hidden');
      } else {
        authButtons.classList.remove('hidden');
        userProfile.classList.add('hidden');
        
        // 隐藏登录后的内容
        document.getElementById('ranking-list').classList.add('hidden');
        document.getElementById('not-logged-in').classList.remove('hidden');
        
        document.getElementById('game-types-container').classList.add('hidden');
        document.getElementById('not-logged-in-games').classList.remove('hidden');
        
        document.getElementById('messages-list').classList.add('hidden');
        document.getElementById('not-logged-in-messages').classList.remove('hidden');
        
        document.getElementById('profile-content').classList.add('hidden');
        document.getElementById('profile-not-logged-in').classList.remove('hidden');
        
        // 隐藏新增按钮
        document.getElementById('add-work-btn').classList.add('hidden');
        document.getElementById('add-game-type-btn').classList.add('hidden');
      }
    }
  };

  // 登录表单处理
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (auth.login(username, password)) {
      alert('登录成功！');
      document.getElementById('auth-modal').classList.add('hidden');
      loginForm.reset();
    } else {
      alert('用户名或密码错误！');
    }
  });

  // 打开登录模态框
  const loginBtn = document.getElementById('login-btn');
  loginBtn.addEventListener('click', function() {
    console.log('Login button clicked');
    document.getElementById('auth-modal').classList.remove('hidden');
  });

  // 关闭模态框
  const closeAuthModal = document.getElementById('close-auth-modal');
  closeAuthModal.addEventListener('click', function() {
    console.log('Closing auth modal');
    document.getElementById('auth-modal').classList.add('hidden');
  });

  // 切换登录/注册表单
  document.getElementById('switch-to-register').addEventListener('click', function() {
    console.log('Switching to register form');
    document.getElementById('auth-title').textContent = '注册';
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
  });

  document.getElementById('switch-to-login').addEventListener('click', function() {
    console.log('Switching to login form');
    document.getElementById('auth-title').textContent = '登录';
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
  });

  // 处理图片预览功能
  function setupImagePreview(inputId, previewId, containerId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const container = document.getElementById(containerId);
    
    if (input && preview && container) {
      input.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            preview.src = e.target.result;
            container.classList.remove('hidden');
          }
          
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }
  }

  // 设置图片预览功能
  setupImagePreview('work-image', 'preview-img', 'image-preview');
  setupImagePreview('type-image', 'type-preview-img', 'type-image-preview');
  setupImagePreview('edit-avatar-input', 'edit-avatar-preview', 'edit-avatar-container');

  // 模拟数据
  const mockData = {
    gameTypes: [
      { id: '1', name: '策略类', image: 'https://picsum.photos/id/225/400/300', description: '需要策略规划和决策的桌游' },
      { id: '2', name: '冒险类', image: 'https://picsum.photos/id/287/400/300', description: '充满探索和冒险元素的桌游' },
      { id: '3', name: '家庭类', image: 'https://picsum.photos/id/325/400/300', description: '适合全家一起玩的轻松桌游' }
    ],
    works: [
      { 
        id: '1', 
        name: '卡坦岛', 
        type: '1', 
        image: 'https://picsum.photos/id/225/400/300', 
        description: '经典的资源争夺桌游，玩家通过建造和交易发展自己的殖民地。',
        players: [
          { name: '玩家A', score: 8 },
          { name: '玩家B', score: 6 },
          { name: '玩家C', score: 7 }
        ],
        date: '2024-05-15',
        status: 'approved'
      },
      { 
        id: '2', 
        name: '车票之旅', 
        type: '1', 
        image: 'https://picsum.photos/id/287/400/300', 
        description: '连接城市线路的策略桌游，玩家需要收集和匹配不同颜色的火车卡。',
        players: [
          { name: '玩家D', score: 9 },
          { name: '玩家E', score: 5 },
          { name: '玩家F', score: 7 },
          { name: '玩家G', score: 8 }
        ],
        date: '2024-05-10',
        status: 'approved'
      },
      { 
        id: '3', 
        name: '瘟疫危机', 
        type: '2', 
        image: 'https://picsum.photos/id/325/400/300', 
        description: '合作类桌游，玩家需要共同对抗全球流行病，拯救世界。',
        players: [
          { name: '玩家H', score: 8 },
          { name: '玩家I', score: 8 },
          { name: '玩家J', score: 7 },
          { name: '玩家K', score: 9 }
        ],
        date: '2024-05-05',
        status: 'pending'
      }
    ]
  };

  // 渲染桌游类型与游戏
  function renderGameTypesWithGames() {
    const container = document.getElementById('game-types-container');
    container.innerHTML = ''; // 清空现有内容

    mockData.gameTypes.forEach(type => {
      // 筛选该类型下的所有游戏
      const typeGames = mockData.works.filter(work => work.type === type.id);
      
      // 创建类型卡片
      const typeCard = document.createElement('div');
      typeCard.className = 'bg-white rounded-xl shadow-md overflow-hidden card-hover';
      typeCard.innerHTML = `
        <div class="h-40 overflow-hidden">
          <img src="${type.image}" alt="${type.name}" class="w-full h-full object-cover">
        </div>
        <div class="p-4">
          <h3 class="text-lg font-bold text-primary mb-2">${type.name}</h3>
          <p class="text-gray-600 text-sm mb-4">${type.description}</p>
          <div class="space-y-2">
            ${typeGames.length > 0 ? 
              typeGames.map(work => `
                <div class="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex justify-between items-center">
                    <span class="font-medium">${work.name}</span>
                    <span class="text-xs text-gray-500">${work.players.length}人游玩</span>
                  </div>
                  <div class="flex items-center mt-1">
                    ${work.players.slice(0, 3).map(player => `
                      <img src="https://picsum.photos/id/${player.name.charCodeAt(0)}/30/30" alt="${player.name}" class="w-6 h-6 rounded-full border-2 border-white -ml-1">
                    `).join('')}
                    ${work.players.length > 3 ? `<span class="ml-1 text-xs text-gray-500">+${work.players.length - 3}</span>` : ''}
                  </div>
                </div>
              `).join('') : 
              '<p class="text-gray-500 text-sm italic">暂无该类型的桌游记录</p>'
            }
          </div>
        </div>
      `;
      container.appendChild(typeCard);
    });

    // 空状态处理
    if (mockData.gameTypes.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-xl shadow-md p-8 text-center card-hover w-full">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-dice text-gray-400 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">暂无桌游类型</h3>
          <p class="text-gray-600 mb-6">创建你的第一个桌游类别，开始分类管理游戏</p>
          <button id="add-first-type-btn" class="btn-accent">
            <i class="fa fa-plus mr-2"></i> 添加桌游类型
          </button>
        </div>
      `;
      
      // 绑定添加首个类型按钮事件
      document.getElementById('add-first-type-btn').addEventListener('click', function() {
        document.getElementById('add-type-modal').classList.remove('hidden');
      });
    }
  }

  // 渲染桌游排名列表
  function renderRankings() {
    const container = document.getElementById('ranking-list');
    const noRankings = document.getElementById('no-ranking');
    
    if (mockData.works.length === 0) {
      container.classList.add('hidden');
      noRankings.classList.remove('hidden');
      return;
    }
    
    container.innerHTML = '';
    container.classList.remove('hidden');
    noRankings.classList.add('hidden');
    
    // 按平均分排序
    const sortedWorks = [...mockData.works].sort((a, b) => {
      const avgA = a.players.reduce((sum, p) => sum + p.score, 0) / a.players.length;
      const avgB = b.players.reduce((sum, p) => sum + p.score, 0) / b.players.length;
      return avgB - avgA;
    });
    
    sortedWorks.forEach((work, index) => {
      const avgScore = work.players.reduce((sum, p) => sum + p.score, 0) / work.players.length;
      const type = mockData.gameTypes.find(t => t.id === work.type) || { name: '未知类型' };
      
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md overflow-hidden card-hover';
      card.innerHTML = `
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3 h-40 md:h-auto overflow-hidden">
            <img src="${work.image}" alt="${work.name}" class="w-full h-full object-cover">
          </div>
          <div class="md:w-2/3 p-6">
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center">
                <span class="text-2xl font-bold text-primary mr-2">${index + 1}</span>
                <h3 class="text-xl font-bold">${work.name}</h3>
              </div>
              <span class="badge bg-primary/10 text-primary">${type.name}</span>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-2">${work.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${work.players.map(p => `
                <span class="flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm">
                  ${p.name}: ${p.score}分
                </span>
              `).join('')}
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <i class="fa fa-calendar-o text-gray-400 mr-1"></i>
                <span class="text-sm text-gray-500">${work.date}</span>
              </div>
              <div class="flex items-center">
                <i class="fa fa-star text-yellow-400 mr-1"></i>
                <span class="font-bold">${avgScore.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // 处理审批功能
  function handleApproval(workId, approved) {
    const workIndex = mockData.works.findIndex(work => work.id === workId);
    if (workIndex === -1) return;
    
    // 更新状态
    mockData.works[workIndex].status = approved ? 'approved' : 'rejected';
    
    // 更新UI
    renderMessages();
    renderRankings();
    
    // 显示提示
    alert(approved ? '桌游记录已批准！' : '桌游记录已拒绝！');
  }

  // 渲染消息列表
  function renderMessages() {
    const container = document.getElementById('messages-list');
    const noMessages = document.getElementById('no-messages');
    
    // 筛选待审批的工作
    const pendingWorks = mockData.works.filter(w => w.status === 'pending');
    
    if (pendingWorks.length === 0) {
      container.classList.add('hidden');
      noMessages.classList.remove('hidden');
      return;
    }
    
    container.innerHTML = '';
    container.classList.remove('hidden');
    noMessages.classList.add('hidden');
    
    // 更新消息计数
    document.getElementById('message-count').textContent = pendingWorks.length;
    
    pendingWorks.forEach(work => {
      const type = mockData.gameTypes.find(t => t.id === work.type) || { name: '未知类型' };
      
      const messageCard = document.createElement('div');
      messageCard.className = 'bg-white rounded-lg shadow-md p-4 card-hover';
      messageCard.innerHTML = `
        <div class="flex items-start">
          <img src="${work.image}" alt="${work.name}" class="w-16 h-16 rounded-md object-cover mr-4">
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <h4 class="font-bold">${work.name}</h4>
              <span class="badge bg-yellow-100 text-yellow-800">待审批</span>
            </div>
            <p class="text-gray-600 text-sm mt-1">${work.description.substring(0, 50)}...</p>
            <div class="flex justify-between items-center mt-3">
              <div class="flex items-center">
                <span class="text-xs text-gray-500">${work.date}</span>
              </div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm reject-work-btn" data-id="${work.id}">
                  拒绝
                </button>
                <button class="px-3 py-1 bg-green-500 text-white rounded-md text-sm approve-work-btn" data-id="${work.id}">
                  批准
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(messageCard);
    });
  }

  // 初始化游戏类型下拉菜单
  function initGameTypeSelect() {
    const select = document.getElementById('work-type');
    select.innerHTML = '<option value="">请选择类型</option>';
    
    mockData.gameTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type.id;
      option.textContent = type.name;
      select.appendChild(option);
    });
  }

  // 初始化应用
  function initApp() {
    console.log('Initializing application...');
    renderGameTypesWithGames();
    renderRankings();
    renderMessages();
    initGameTypeSelect();
    auth.updateUI();
    console.log('Application initialized successfully');
  }

  // 注册表单处理
  document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Register form submitted');
    alert('注册功能将在未来版本中实现！');
  });

  // 打开新增桌游记录模态框
  document.getElementById('add-work-btn').addEventListener('click', function() {
    console.log('Opening add work modal');
    document.getElementById('add-work-modal').classList.remove('hidden');
  });

  // 关闭新增桌游记录模态框
  document.getElementById('close-work-modal').addEventListener('click', function() {
    console.log('Closing add work modal');
    document.getElementById('add-work-modal').classList.add('hidden');
  });

  // 新增玩家字段
  document.getElementById('add-work-player-btn').addEventListener('click', function() {
    console.log('Adding new player field');
    const container = document.getElementById('work-players-container');
    const newPlayer = document.createElement('div');
    newPlayer.className = 'flex items-center';
    newPlayer.innerHTML = `
      <input type="text" placeholder="玩家姓名" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary">
      <input type="number" min="1" max="10" placeholder="分数" class="w-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary ml-2">
      <button type="button" class="remove-player-btn ml-2 text-gray-500 hover:text-gray-700">
        <i class="fa fa-minus-circle"></i>
      </button>
    `;
    container.insertBefore(newPlayer, this.parentElement);
    
    // 添加删除事件
    newPlayer.querySelector('.remove-player-btn').addEventListener('click', function() {
      console.log('Removing player field');
      container.removeChild(newPlayer);
    });
  });

  // 删除玩家字段
  document.querySelectorAll('.remove-player-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Removing player field');
      const container = document.getElementById('work-players-container');
      if (container.children.length > 2) { // 至少保留两个玩家字段
        container.removeChild(this.parentElement);
      }
    });
  });

  // 新增桌游记录表单提交
  document.getElementById('add-work-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Submitting new work form');
    
    const name = document.getElementById('work-name').value;
    const type = document.getElementById('work-type').value;
    const description = document.getElementById('work-description').value;
    
    if (!name || !type || !description) {
      alert('请填写所有必填字段！');
      return;
    }
    
    // 收集玩家信息
    const playerInputs = document.querySelectorAll('#work-players-container input[type="text"]');
    const scoreInputs = document.querySelectorAll('#work-players-container input[type="number"]');
    
    const players = [];
    for (let i = 0; i < playerInputs.length; i++) {
      if (playerInputs[i].value && scoreInputs[i].value) {
        players.push({
          name: playerInputs[i].value,
          score: parseInt(scoreInputs[i].value)
        });
      }
    }
    
    if (players.length < 2) {
      alert('至少需要两名玩家！');
      return;
    }
    
    // 创建新工作
    const newWork = {
      id: Date.now().toString(),
      name,
      type,
      image: 'https://picsum.photos/id/225/400/300', // 默认图片
      description,
      players,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    mockData.works.push(newWork);
    
    // 更新UI
    renderGameTypesWithGames();
    renderRankings();
    renderMessages();
    
    alert('桌游记录已提交，等待审批！');
    document.getElementById('add-work-modal').classList.add('hidden');
    this.reset();
  });

  // 打开新增桌游类型模态框
  document.getElementById('add-game-type-btn').addEventListener('click', function() {
    console.log('Opening add game type modal');
    document.getElementById('add-type-modal').classList.remove('hidden');
  });

  // 关闭新增桌游类型模态框
  document.getElementById('close-type-modal').addEventListener('click', function() {
    console.log('Closing add game type modal');
    document.getElementById('add-type-modal').classList.add('hidden');
  });

  // 新增桌游类型表单提交
  document.getElementById('add-type-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Submitting new game type form');
    
    const name = document.getElementById('type-name').value;
    const description = document.getElementById('type-description').value;
    
    if (!name || !description) {
      alert('请填写所有必填字段！');
      return;
    }
    
    // 创建新类型
    const newType = {
      id: Date.now().toString(),
      name,
      image: 'https://picsum.photos/id/225/400/300', // 默认图片
      description
    };
    
    mockData.gameTypes.push(newType);
    
    // 更新UI
    renderGameTypesWithGames();
    initGameTypeSelect();
    
    alert('桌游类型已添加！');
    document.getElementById('add-type-modal').classList.add('hidden');
    this.reset();
  });

  // 打开编辑个人资料模态框
  document.getElementById('edit-profile-btn').addEventListener('click', function() {
    console.log('Opening edit profile modal');
    document.getElementById('edit-profile-modal').classList.remove('hidden');
    // 填充当前资料
    document.getElementById('edit-username').value = auth.currentUser.username;
  });

  // 关闭编辑个人资料模态框
  document.getElementById('close-edit-profile-modal').addEventListener('click', function() {
    console.log('Closing edit profile modal');
    document.getElementById('edit-profile-modal').classList.add('hidden');
  });

  // 编辑个人资料表单提交
  document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Submitting edit profile form');
    
    const newUsername = document.getElementById('edit-username').value;
    
    if (newUsername) {
      auth.currentUser.username = newUsername;
      document.getElementById('username-display').textContent = newUsername;
    }
    
    alert('个人资料已更新！');
    document.getElementById('edit-profile-modal').classList.add('hidden');
  });

  // 登出功能
  document.getElementById('logout-btn').addEventListener('click', function() {
    console.log('Logging out user');
    auth.isAuthenticated = false;
    auth.currentUser = null;
    auth.updateUI();
    alert('已成功登出！');
  });

  // 移动端菜单切换
  document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    console.log('Toggling mobile menu');
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
    nav.classList.toggle('flex-col');
    nav.classList.toggle('absolute');
    nav.classList.toggle('top-16');
    nav.classList.toggle('left-0');
    nav.classList.toggle('bg-primary');
    nav.classList.toggle('w-full');
    nav.classList.toggle('p-4');
    nav.classList.toggle('shadow-lg');
  });

  // 登录提示按钮
  document.querySelectorAll('[id^="login-prompt-"]').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Login prompt button clicked');
      document.getElementById('auth-modal').classList.remove('hidden');
    });
  });

  // 绑定审批按钮事件
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('approve-work-btn')) {
      handleApproval(e.target.dataset.id, true);
    } else if (e.target.classList.contains('reject-work-btn')) {
      handleApproval(e.target.dataset.id, false);
    }
  });

  // 初始化应用
  initApp();
});