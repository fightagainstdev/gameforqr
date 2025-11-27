// 全局音乐变量
let bgmAudio = null;
let isBGMPlaying = false;

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeButtonEffects();
    initializeScrollAnimations();
    initializeCursorEffects();
    initializeMusicControl();
    initializeBackgroundSelector();
    initializeGameSearch();
    initializeMusicPlayer();
});

// 粒子效果初始化
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // 创建动态粒子
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // 随机位置和大小
    const size = Math.random() * 4 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${getRandomColor()};
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: ${Math.random() * 0.6 + 0.2};
        animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
        box-shadow: 0 0 ${size * 2}px currentColor;
    `;
    
    container.appendChild(particle);
}

// 获取随机颜色
function getRandomColor() {
    const colors = [
        '#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0000',
        '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 按钮效果初始化
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // 鼠标悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            createRippleEffect(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 点击效果
        button.addEventListener('click', function(e) {
            createClickEffect(e, this);
        });
    });
}

// 创建涟漪效果
function createRippleEffect(button) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 创建点击效果
function createClickEffect(event, button) {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    clickEffect.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) scale(0);
        animation: clickExpand 0.5s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(clickEffect);
    
    setTimeout(() => {
        clickEffect.remove();
    }, 500);
}

// 滚动动画初始化
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.logo-section, .intro-section, .logo-description, .button-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 光标效果初始化
function initializeCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // 交互元素上的光标效果
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 255, 255, 0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(255, 255, 255, 0.2)';
        });
    });
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes clickExpand {
        to {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(0, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, background 0.2s ease;
        mix-blend-mode: difference;
    }
    
    .floating-particle {
        z-index: 1;
    }
    
    .ripple-effect, .click-effect {
        z-index: 2;
    }
`;

document.head.appendChild(style);

// 性能优化：减少重绘
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // 滚动时的视差效果
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.background-effects');
            
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// 页面加载完成后的庆祝效果
window.addEventListener('load', function() {
    setTimeout(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.animation = 'none';
            setTimeout(() => {
                mainContent.style.animation = 'fadeInUp 0.8s ease-out';
            }, 10);
        }
    }, 1000);
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // G键快速跳转到游戏选择
    if (e.key === 'g' || e.key === 'G') {
        const gamesBtn = document.querySelector('.btn-primary');
        if (gamesBtn) {
            gamesBtn.click();
        }
    }
    
    // D键快速跳转到捐赠页面
    if (e.key === 'd' || e.key === 'D') {
        const donateBtn = document.querySelector('.btn-secondary');
        if (donateBtn) {
            donateBtn.click();
        }
    }
});

// 控制台欢迎信息
console.log(`
%c🎮 Lumin Game Platform 🎮
%c欢迎来到我们的游戏平台！
%c使用快捷键：
%c- G键：快速选择游戏
%c- D键：快速捐赠支持
`, 
'color: #00ffff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ffff;',
'color: #ffffff; font-size: 14px;',
'color: #ffff00; font-size: 12px;',
'color: #00ff00; font-size: 12px;',
'color: #ff4444; font-size: 12px;'
);

// 音乐控制初始化
function initializeMusicControl() {
    const toggleSwitch = document.getElementById('bgm-toggle');
    if (!toggleSwitch) {
        console.log('未找到音乐切换开关');
        return;
    }

    console.log('音乐控制初始化完成');

    // 从本地存储读取音乐状态
    const savedState = localStorage.getItem('bgmState');
    console.log('从本地存储读取音乐状态:', savedState);
    if (savedState === 'on') {
        toggleSwitch.checked = true;
        console.log('设置开关为开启状态');
        // 延迟播放以避免自动播放限制
        setTimeout(() => {
            playBGM();
        }, 1000);
    }

    // 切换开关事件监听
    toggleSwitch.addEventListener('change', function() {
        console.log('开关状态改变:', this.checked);
        if (this.checked) {
            playBGM();
            localStorage.setItem('bgmState', 'on');
        } else {
            stopBGM();
            localStorage.setItem('bgmState', 'off');
        }
    });

    // 页面可见性变化时处理音乐
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时暂停音乐
            if (bgmAudio && !bgmAudio.paused) {
                bgmAudio.pause();
                console.log('页面隐藏，暂停音乐');
            }
        } else {
            // 页面显示时恢复音乐（如果之前是播放状态）
            if (toggleSwitch.checked && bgmAudio && bgmAudio.paused) {
                bgmAudio.play().catch(e => console.log('页面显示时恢复播放失败:', e));
            }
        }
    });

    // 添加全局点击事件监听器来解锁音频
    document.addEventListener('click', function() {
        if (toggleSwitch.checked && bgmAudio && bgmAudio.paused) {
            console.log('用户交互，尝试播放音乐');
            bgmAudio.play().then(() => {
                console.log('用户交互后音乐播放成功');
                isBGMPlaying = true;
            }).catch(e => {
                console.log('用户交互后播放失败:', e);
            });
        }
    });
}

// 播放背景音乐
function playBGM() {
    console.log('开始播放背景音乐');
    
    if (!bgmAudio) {
        console.log('创建新的音频对象');
        bgmAudio = new Audio('1.mp3');
        bgmAudio.loop = true;
        bgmAudio.volume = 0.5;
        
        // 处理音频加载错误
        bgmAudio.addEventListener('error', function() {
            console.error('无法加载背景音乐文件 1.mp3');
            const toggleSwitch = document.getElementById('bgm-toggle');
            if (toggleSwitch) {
                toggleSwitch.checked = false;
                localStorage.setItem('bgmState', 'off');
            }
        });

        // 添加加载成功事件
        bgmAudio.addEventListener('canplaythrough', function() {
            console.log('音频文件可以播放');
        });
    }

    // 检查音频是否已加载
    if (bgmAudio.readyState < 2) {
        console.log('音频尚未加载完成，等待加载');
        bgmAudio.load();
    }

    // 尝试播放音乐
    bgmAudio.play().then(() => {
        isBGMPlaying = true;
        console.log('背景音乐开始播放成功');
    }).catch(error => {
        console.log('自动播放被阻止，需要用户交互:', error);
        console.log('错误详情:', error.name, error.message);
        // 显示提示信息
        showMusicPlayHint();
    });
}

// 停止背景音乐
function stopBGM() {
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
        isBGMPlaying = false;
        console.log('背景音乐已停止');
    }
}

// 显示音乐播放提示
function showMusicPlayHint() {
    const hint = document.createElement('div');
    hint.className = 'music-hint';
    hint.innerHTML = `
        <div class="hint-content">
            <p>🎵 点击页面任意位置以启用背景音乐</p>
        </div>
    `;
    
    document.body.appendChild(hint);
    
    // 点击页面任意位置后尝试播放音乐
    const playOnClick = function() {
        if (bgmAudio && !isBGMPlaying) {
            bgmAudio.play().then(() => {
                isBGMPlaying = true;
                hint.remove();
                document.removeEventListener('click', playOnClick);
            }).catch(e => {
                console.log('播放失败:', e);
            });
        }
    };
    
    document.addEventListener('click', playOnClick);
    
    // 5秒后自动移除提示
    setTimeout(() => {
        if (hint.parentNode) {
            hint.remove();
            document.removeEventListener('click', playOnClick);
        }
    }, 5000);
}

// 添加音乐提示样式
const musicStyle = document.createElement('style');
musicStyle.textContent = `
    .music-hint {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00ffff;
        border-radius: 15px;
        padding: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        animation: hintPulse 2s infinite;
    }
    
    .hint-content p {
        color: #00ffff;
        font-family: 'Orbitron', monospace;
        font-size: 1.1rem;
        text-align: center;
        margin: 0;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    }
    
    @keyframes hintPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.05); }
    }
    
    @media (max-width: 768px) {
        .music-hint {
            width: 90%;
            max-width: 300px;
        }
        
        .hint-content p {
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(musicStyle);

// 背景选择器初始化
function initializeBackgroundSelector() {
    const backgroundSelector = document.createElement('div');
    backgroundSelector.className = 'background-selector';
    backgroundSelector.innerHTML = `
        <span class="background-selector-label">背景</span>
        <div class="background-dropdown">
            <button class="background-btn" id="background-btn">
                <span id="current-bg-name">默认</span>
            </button>
            <div class="background-menu" id="background-menu">
                <button class="background-option active" data-bg="default">默认</button>
                <button class="background-option" data-bg="neon">霓虹</button>
                <button class="background-option" data-bg="ocean">海洋</button>
                <button class="background-option" data-bg="sunset">日落</button>
                <button class="background-option" data-bg="forest">森林</button>
                <button class="background-option" data-bg="space">太空</button>
            </div>
        </div>
    `;

    document.body.appendChild(backgroundSelector);

    // 从本地存储加载背景设置
    const savedBg = localStorage.getItem('selectedBackground') || 'default';
    setBackground(savedBg);

    // 绑定事件
    const bgBtn = document.getElementById('background-btn');
    const bgMenu = document.getElementById('background-menu');

    bgBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        bgMenu.classList.toggle('show');
        bgBtn.classList.toggle('active');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function() {
        bgMenu.classList.remove('show');
        bgBtn.classList.remove('active');
    });

    // 背景选项点击事件
    const bgOptions = document.querySelectorAll('.background-option');
    bgOptions.forEach(option => {
        option.addEventListener('click', function() {
            const bgType = this.getAttribute('data-bg');
            setBackground(bgType);

            // 更新UI状态
            bgOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // 关闭菜单
            bgMenu.classList.remove('show');
            bgBtn.classList.remove('active');
        });
    });
}

// 设置背景
function setBackground(bgType) {
    // 移除所有背景类
    document.body.className = document.body.className.replace(/bg-\w+/g, '').trim();

    // 添加新背景类
    if (bgType !== 'default') {
        document.body.classList.add(`bg-${bgType}`);
    }

    // 更新按钮文本
    const bgNames = {
        'default': '默认',
        'neon': '霓虹',
        'ocean': '海洋',
        'sunset': '日落',
        'forest': '森林',
        'space': '太空'
    };

    const currentBgName = document.getElementById('current-bg-name');
    if (currentBgName) {
        currentBgName.textContent = bgNames[bgType] || '默认';
    }

    // 保存到本地存储
    localStorage.setItem('selectedBackground', bgType);
}

// 音乐播放器初始化
function initializeMusicPlayer() {
    const musicBtn = document.getElementById('music-btn');
    const musicMenu = document.getElementById('music-menu');
    const currentSongSpan = document.getElementById('current-song');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const replayBtn = document.getElementById('replay-btn');
    const musicOptions = document.querySelectorAll('.music-option');

    if (!musicBtn || !musicMenu) {
        return; // 如果不在有音乐播放器的页面，跳过初始化
    }

    let currentAudio = null;
    let currentSong = null;

    // 音乐下拉菜单切换 - 支持触摸和点击事件
    function toggleMusicMenu(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        musicMenu.classList.toggle('show');
        musicBtn.classList.toggle('active');
    }

    // 为移动设备和桌面设备添加事件监听
    musicBtn.addEventListener('click', toggleMusicMenu);
    musicBtn.addEventListener('touchstart', function(e) {
        // 防止触摸事件触发点击事件
        e.preventDefault();
    });
    musicBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleMusicMenu();
    });

    // 点击其他地方关闭菜单
    function closeMusicMenu(e) {
        if (!musicBtn.contains(e.target) && !musicMenu.contains(e.target)) {
            musicMenu.classList.remove('show');
            musicBtn.classList.remove('active');
        }
    }

    document.addEventListener('click', closeMusicMenu);
    document.addEventListener('touchstart', closeMusicMenu);

    // 歌曲选择事件处理函数
    function handleSongSelection(option) {
        const songName = option.getAttribute('data-name');
        
        // 更新当前歌曲显示
        currentSongSpan.textContent = songName;
        currentSong = songName;

        // 更新UI状态
        musicOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        // 启用控制按钮
        playBtn.disabled = false;
        pauseBtn.disabled = false;
        replayBtn.disabled = false;

        // 关闭菜单
        musicMenu.classList.remove('show');
        musicBtn.classList.remove('active');

        // 如果已经有音频在播放，停止它
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // 从Base64数据创建音频对象
        try {
            const base64Data = getAudioData(songName);
            if (!base64Data) {
                throw new Error(`未找到歌曲数据: ${songName}`);
            }
            
            // 创建音频对象
            currentAudio = new Audio(`data:audio/mpeg;base64,${base64Data}`);
            currentAudio.loop = false;
            currentAudio.volume = 0.5;

            // 音频加载错误处理
            currentAudio.addEventListener('error', function() {
                console.error(`无法加载歌曲: ${songName}`);
                alert(`无法加载歌曲: ${songName}`);
                resetMusicControls();
            });

            // 音频播放结束事件
            currentAudio.addEventListener('ended', function() {
                playBtn.disabled = false;
                pauseBtn.disabled = true;
            });

            console.log(`歌曲 ${songName} 已加载`);
        } catch (error) {
            console.error('创建音频对象失败:', error);
            alert(`加载歌曲失败: ${error.message}`);
            resetMusicControls();
        }
    }

    // 歌曲选择事件 - 支持触摸和点击
    musicOptions.forEach(option => {
        // 点击事件
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            handleSongSelection(this);
        });
        
        // 触摸事件
        option.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        
        option.addEventListener('touchend', function(e) {
            e.stopPropagation();
            e.preventDefault();
            handleSongSelection(this);
        });
    });

    // 播放按钮事件
    playBtn.addEventListener('click', function() {
        if (currentAudio && currentSong) {
            currentAudio.play().then(() => {
                playBtn.disabled = true;
                pauseBtn.disabled = false;
                replayBtn.disabled = false;
            }).catch(error => {
                console.error('播放失败:', error);
                alert('播放失败，请检查音频文件');
            });
        }
    });

    // 暂停按钮事件
    pauseBtn.addEventListener('click', function() {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    });

    // 重播按钮事件
    replayBtn.addEventListener('click', function() {
        if (currentAudio && currentSong) {
            currentAudio.currentTime = 0;
            currentAudio.play().then(() => {
                playBtn.disabled = true;
                pauseBtn.disabled = false;
                replayBtn.disabled = false;
            }).catch(error => {
                console.error('重播失败:', error);
                alert('重播失败，请检查音频文件');
            });
        }
    });

    // 重置音乐控制状态
    function resetMusicControls() {
        playBtn.disabled = true;
        pauseBtn.disabled = true;
        replayBtn.disabled = true;
        currentSong = null;
        currentAudio = null;
        currentSongSpan.textContent = '选择歌曲';
        musicOptions.forEach(opt => opt.classList.remove('active'));
    }

    // 页面可见性变化时处理音乐
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }
    });
}

// 游戏搜索初始化
function initializeGameSearch() {
    const categoryDropdownBtn = document.getElementById('category-dropdown-btn');
    const categoryDropdownMenu = document.getElementById('category-dropdown-menu');
    const selectedCategoriesSpan = document.getElementById('selected-categories');
    const nameInput = document.getElementById('name-input');
    const checkboxes = document.querySelectorAll('#category-dropdown-menu input[type="checkbox"]');

    if (!categoryDropdownBtn || !categoryDropdownMenu || !selectedCategoriesSpan || !nameInput) {
        return; // 如果不在游戏页面，跳过初始化
    }

    // 类别下拉菜单切换
    categoryDropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        categoryDropdownMenu.classList.toggle('show');
        this.classList.toggle('active');
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!categoryDropdownBtn.contains(e.target) && !categoryDropdownMenu.contains(e.target)) {
            categoryDropdownMenu.classList.remove('show');
            categoryDropdownBtn.classList.remove('active');
        }
    });

    // 复选框变化事件
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedCategoriesDisplay(selectedCategoriesSpan, checkboxes);
            filterGames();
        });
    });

    // 名称输入事件
    nameInput.addEventListener('input', function() {
        filterGames();
    });

    // 搜索模式切换事件
    const modeRadios = document.querySelectorAll('input[name="search-mode"]');
    modeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            filterGames();
        });
    });
}

// 更新选中类别显示
function updateSelectedCategoriesDisplay(span, checkboxes) {
    const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    if (selected.length === 0) {
        span.textContent = '选择类别';
    } else if (selected.length === 1) {
        span.textContent = selected[0];
    } else {
        span.textContent = `${selected[0]} 等${selected.length}个`;
    }
}

// 过滤游戏
function filterGames() {
    const nameInput = document.getElementById('name-input');
    const checkboxes = document.querySelectorAll('#category-dropdown-menu input[type="checkbox"]');
    const gameCards = document.querySelectorAll('.game-card');
    const noResultsMessage = document.getElementById('no-results-message');
    const searchMode = document.querySelector('input[name="search-mode"]:checked').value;

    const nameQuery = nameInput.value.toLowerCase().trim();
    const selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    let visibleCount = 0;

    gameCards.forEach(card => {
        const gameName = card.querySelector('.game-name').textContent.toLowerCase();
        const gameCategories = card.getAttribute('data-categories') ?
            card.getAttribute('data-categories').split(',') : [];

        // 检查名称匹配
        const nameMatch = !nameQuery || gameName.includes(nameQuery);

        // 检查类别匹配 - 根据搜索模式
        let categoryMatch;
        if (selectedCategories.length === 0) {
            categoryMatch = true; // 没有选择类别时显示所有游戏
        } else if (searchMode === 'and') {
            // 叠加模式：游戏必须包含所有选中的类别
            categoryMatch = selectedCategories.every(cat =>
                gameCategories.includes(cat.trim())
            );
        } else {
            // 全部模式：游戏只要包含任意一个选中的类别
            categoryMatch = selectedCategories.some(cat =>
                gameCategories.includes(cat.trim())
            );
        }

        // 显示或隐藏卡片
        if (nameMatch && categoryMatch) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // 显示或隐藏无结果消息
    if (visibleCount === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}