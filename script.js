document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container'); // Get container
    const swordNameElement = document.getElementById('sword-name');
    const swordLevelElement = document.getElementById('sword-level');
    const strengthenButton = document.getElementById('strengthen-button');
    const resultMessageElement = document.getElementById('result-message');
    const successChanceElement = document.getElementById('success-chance');
    const swordPriceElement = document.getElementById('sword-price');
    const strengthenCostElement = document.getElementById('strengthen-cost'); // New
    const particleContainer = document.getElementById('particle-container');
    const sellButton = document.getElementById('sell-button'); // New
    const buyPreventionTicketButton = document.getElementById('buy-prevention-ticket'); // New
    const preventionTicketPriceElement = document.getElementById('prevention-ticket-price'); // New
    const preventionTicketCountElement = document.getElementById('prevention-ticket-count'); // New
    const confirmationButtons = document.getElementById('confirmation-buttons'); // New
    const confirmYesButton = document.getElementById('confirm-yes'); // New
    const confirmNoButton = document.getElementById('confirm-no'); // New
    const shakeTarget = document.querySelector('.shake-target'); // New
    const startOverlay = document.getElementById('start-overlay'); // New
    const startGameButton = document.getElementById('start-game-button'); // New
    const startSound = document.getElementById('start-sound'); // New
    const successSound = document.getElementById('success-sound'); // New
    const failureSound = document.getElementById('failure-sound'); // New
    const sellSound = document.getElementById('sell-sound'); // New
    const buySound = document.getElementById('buy-sound'); // New
    const achievementSound = document.getElementById('achievement-sound'); // New
    const priceResetTimerElement = document.getElementById('price-reset-timer'); // New

    const inventoryContainer = document.getElementById('inventory-container'); // New
    const achievementContainer = document.getElementById('achievement-container'); // New
    const shopContainer = document.getElementById('shop-container'); // New
    const mainLayout = document.getElementById('main-layout'); // New
    const swordBladeElement = document.getElementById('sword-blade'); // New
    const swordGuardElement = document.getElementById('sword-guard'); // New
    const swordHandleElement = document.getElementById('sword-handle'); // New
    const swordPommelElement = document.getElementById('sword-pommel'); // New
    const auraOuterElement = document.getElementById('aura-outer'); // New
    const auraMiddleElement = document.getElementById('aura-middle'); // New
    const auraInnerElement = document.getElementById('aura-inner'); // New
    const cheatCodeInput = document.getElementById('cheat-code-input'); // New
    const cheatCodeSubmit = document.getElementById('cheat-code-submit'); // New
    const autoUseToggle = document.getElementById('auto-use-toggle'); // New
    const swordCollectionButton = document.getElementById('sword-collection-button'); // New
    const swordCollectionModal = document.getElementById('sword-collection-modal'); // New
    const closeCollectionButton = document.getElementById('close-collection'); // New
    const swordCollectionGrid = document.getElementById('sword-collection-grid'); // New
    const buyLuckCharmButton = document.getElementById('buy-luck-charm'); // New
    const luckCharmCountElement = document.getElementById('luck-charm-count'); // New

    const hammerStatusElement = document.getElementById('hammer-status'); // New
    const buyDiceButton = document.getElementById('buy-dice'); // New
    const achievementsList = document.getElementById('achievements-list'); // New
    const achievementButton = document.getElementById('achievement-button'); // New
    const achievementModal = document.getElementById('achievement-modal'); // New
    const closeAchievementButton = document.getElementById('close-achievement'); // New
    const bgmVolumeSlider = document.getElementById('bgm-volume'); // New
    const sfxVolumeSlider = document.getElementById('sfx-volume'); // New
    const bgmVolumeDisplay = document.getElementById('bgm-volume-display'); // New
    const sfxVolumeDisplay = document.getElementById('sfx-volume-display'); // New
    const settingsButton = document.getElementById('settings-button'); // New
    const settingsModal = document.getElementById('settings-modal'); // New
    const closeSettingsButton = document.getElementById('close-settings'); // New


    
    let isCheatActive = false; // New
    let autoUsePreventionTicket = false; // New
    let luckCharmCount = 0; // New
    let achievements = {}; // New
    let totalStrengthenAttempts = 0; // New
    let totalGoldSpent = 0; // New
    let totalSwordsSold = 0; // New


    let currentLevel = 1;
    let currentGold = 1000000; // New
    let preventionTicketCount = 0; // New
    let preventionTicketPrice = 100000; // New - dynamic price
    let priceResetTimer = 60; // New - timer for price reset
    let maxLevelAchieved = 1; // New - track highest level reached
    const maxLevel = 100;

    const swordPrices = [];
    for (let i = 1; i <= 100; i++) {
        const price = Math.floor(100 * Math.pow(2.5, i));
        swordPrices.push(price);
    }

    const swordNames = [
        // ... (100 names array)
        "낡은 목검", "목검", "견습용 단검", "구리 검", "청동 검", "철 검", "강철 단검", "강철 검", "강화된 강철 검", "날카로운 강철 검",
        "모험가의 검", "용병의 검", "기사의 서임 소드", "은도금 검", "은 검", "백은 검", "고급 은 검", "수호자의 검", "정예병의 검", "백기사의 검",
        "마력이 깃든 검", "룬 소드", "마법사의 검", "신비로운 검", "사파이어 소드", "에메랄드 소드", "루비 소드", "다이아몬드 소드", "흑요석 검", "자수정 검",
        "불꽃의 검", "화염의 롱소드", "타오르는 검", "냉기의 검", "얼음의 클레이모어", "서리 내린 검", "번개의 검", "뇌격의 레이피어", "김상구의 마지막 라스트댄스검", "대지의 검",
        "미스릴 단검", "미스릴 검", "미스릴 롱소드", "오리할콘 검", "아다만티움 소드", "정령의 검", "고대 유물의 검", "영웅의 검", "챔피언의 검", "성검",
        "빛의 검", "신성한 검", "축복받은 성검", "천사의 검", "대천사의 검", "어둠의 검", "저주받은 검", "타락한 검", "악마의 검", "대악마의 검",
        "자연의 검", "숲의 검", "드라이어드의 검", "야수의 검", "늑대의 검", "곰의 대검", "독수리의 검", "와이번의 검", "그리핀의 검", "키메라의 검",
        "바람의 검", "불의 검", "물의 검", "땅의 검", "전설의 검", "잊혀진 영웅의 검", "왕의 검", "제왕의 검", "황제의 검", "정복자의 검",
        "드래곤의 발톱", "드래곤의 이빨", "용의 숨결", "용살자의 검", "드래곤 슬레이어", "별빛의 검", "달빛의 검", "태양의 검", "은하수의 검", "우주의 검",
        "신화의 검", "시간의 검", "공간의 검", "차원의 검", "창조의 검", "파괴의 검", "절대자의 검", "궁극의 알테마 소드", "[신화] 엑스칼리버", "[태초] 창조주의 검"
    ];

    const achievementData = [
        // 레벨 업적
        { id: 'level5', name: '입문자', desc: '5레벨 달성', target: 5, current: () => maxLevelAchieved, reward: 10000 },
        { id: 'level10', name: '첫 걸음', desc: '10레벨 달성', target: 10, current: () => maxLevelAchieved, reward: 50000 },
        { id: 'level25', name: '숙련자', desc: '25레벨 달성', target: 25, current: () => maxLevelAchieved, reward: 200000 },
        { id: 'level50', name: '전문가', desc: '50레벨 달성', target: 50, current: () => maxLevelAchieved, reward: 1000000 },
        { id: 'level75', name: '마스터', desc: '75레벨 달성', target: 75, current: () => maxLevelAchieved, reward: 5000000 },
        { id: 'level90', name: '그랜드마스터', desc: '90레벨 달성', target: 90, current: () => maxLevelAchieved, reward: 15000000 },
        { id: 'level100', name: '전설의 대장장이', desc: '100레벨 달성', target: 100, current: () => maxLevelAchieved, reward: 50000000 },
        
        // 강화 시도 업적
        { id: 'strengthen50', name: '노력가', desc: '강화 50회 시도', target: 50, current: () => totalStrengthenAttempts, reward: 50000 },
        { id: 'strengthen100', name: '백전백승', desc: '강화 100회 시도', target: 100, current: () => totalStrengthenAttempts, reward: 100000 },
        { id: 'strengthen500', name: '불굴의 의지', desc: '강화 500회 시도', target: 500, current: () => totalStrengthenAttempts, reward: 500000 },
        { id: 'strengthen1000', name: '강철 의지', desc: '강화 1000회 시도', target: 1000, current: () => totalStrengthenAttempts, reward: 2000000 },
        { id: 'strengthen2500', name: '불굴의 전사', desc: '강화 2500회 시도', target: 2500, current: () => totalStrengthenAttempts, reward: 10000000 },
        { id: 'strengthen5000', name: '강화의 신', desc: '강화 5000회 시도', target: 5000, current: () => totalStrengthenAttempts, reward: 25000000 },
        
        // 골드 소모 업적
        { id: 'gold1m', name: '소비자', desc: '100만 골드 소모', target: 1000000, current: () => totalGoldSpent, reward: 200000 },
        { id: 'gold5m', name: '대소비자', desc: '500만 골드 소모', target: 5000000, current: () => totalGoldSpent, reward: 1000000 },
        { id: 'gold10m', name: '부자', desc: '1000만 골드 소모', target: 10000000, current: () => totalGoldSpent, reward: 2000000 },
        { id: 'gold50m', name: '대부호', desc: '5000만 골드 소모', target: 50000000, current: () => totalGoldSpent, reward: 10000000 },
        { id: 'gold100m', name: '금고의 주인', desc: '1억 골드 소모', target: 100000000, current: () => totalGoldSpent, reward: 50000000 },
        
        // 판매 업적
        { id: 'sell10', name: '초보 상인', desc: '검 10개 판매', target: 10, current: () => totalSwordsSold, reward: 50000 },
        { id: 'sell50', name: '상인', desc: '검 50개 판매', target: 50, current: () => totalSwordsSold, reward: 300000 },
        { id: 'sell100', name: '전문 상인', desc: '검 100개 판매', target: 100, current: () => totalSwordsSold, reward: 800000 },
        { id: 'sell200', name: '대상인', desc: '검 200개 판매', target: 200, current: () => totalSwordsSold, reward: 1500000 },
        { id: 'sell500', name: '거대 상인', desc: '검 500개 판매', target: 500, current: () => totalSwordsSold, reward: 5000000 },
        { id: 'sell1000', name: '무기 제조업체', desc: '검 1000개 판매', target: 1000, current: () => totalSwordsSold, reward: 15000000 },
        
        // 연속 성공 업적
        { id: 'success5', name: '운이 좋네', desc: '연속 5회 강화 성공', target: 5, current: () => consecutiveSuccesses, reward: 100000 },
        { id: 'success10', name: '행운의 소유자', desc: '연속 10회 강화 성공', target: 10, current: () => consecutiveSuccesses, reward: 500000 },
        { id: 'success15', name: '기적의 주인공', desc: '연속 15회 강화 성공', target: 15, current: () => consecutiveSuccesses, reward: 2000000 },
        { id: 'success20', name: '전설의 행운아', desc: '연속 20회 강화 성공', target: 20, current: () => consecutiveSuccesses, reward: 10000000 },
        
        // 연속 실패 업적
        { id: 'fail10', name: '불운의 소유자', desc: '연속 10회 강화 실패', target: 10, current: () => consecutiveFailures, reward: 200000 },
        { id: 'fail20', name: '저주받은 자', desc: '연속 20회 강화 실패', target: 20, current: () => consecutiveFailures, reward: 1000000 },
        { id: 'fail30', name: '절망의 화신', desc: '연속 30회 강화 실패', target: 30, current: () => consecutiveFailures, reward: 5000000 },
        
        // 특별 업적
        { id: 'noFail100', name: '완벽주의자', desc: '방지권 없이 100레벨 달성', target: 1, current: () => (maxLevelAchieved >= 100 && totalPreventionTicketsUsed === 0) ? 1 : 0, reward: 100000000 },
        { id: 'speedrun', name: '스피드러너', desc: '강화 시도 500회 이하로 50레벨 달성', target: 1, current: () => (maxLevelAchieved >= 50 && totalStrengthenAttempts <= 500) ? 1 : 0, reward: 20000000 },
        { id: 'lucky7', name: '행운의 7', desc: '7레벨에서 77레벨로 한 번에 점프', target: 1, current: () => luckySevenAchieved, reward: 7777777 },
        { id: 'collector', name: '컴플리튰주의자', desc: '모든 검 도감 해금', target: 100, current: () => maxLevelAchieved, reward: 25000000 },
        { id: 'millionaire', name: '백만장자', desc: '동시에 100만 골드 보유', target: 1000000, current: () => currentGold, reward: 5000000 },
        { id: 'billionaire', name: '억만장자', desc: '동시에 1억 골드 보유', target: 100000000, current: () => currentGold, reward: 50000000 },
        
        // 아이템 사용 업적
        { id: 'charm50', name: '부적 수집가', desc: '행운의 부적 50개 사용', target: 50, current: () => totalLuckCharmsUsed, reward: 1000000 },
        { id: 'charm200', name: '부적 마니아', desc: '행운의 부적 200개 사용', target: 200, current: () => totalLuckCharmsUsed, reward: 5000000 },
        { id: 'dice100', name: '도박꾼', desc: '신비한 주사위 100개 사용', target: 100, current: () => totalDiceUsed, reward: 3000000 },
        { id: 'ticket100', name: '보험의 대가', desc: '방지권 100개 사용', target: 100, current: () => totalPreventionTicketsUsed, reward: 2000000 }
    ];
    
    let consecutiveSuccesses = 0;
    let consecutiveFailures = 0;
    let maxConsecutiveSuccesses = 0;
    let maxConsecutiveFailures = 0;
    let totalPreventionTicketsUsed = 0;
    let totalLuckCharmsUsed = 0;
    let totalDiceUsed = 0;
    let luckySevenAchieved = 0;



    function createSwordBreakEffect() {
        const swordRect = document.getElementById('sword-container').getBoundingClientRect();
        const centerX = swordRect.left + swordRect.width / 2;
        const centerY = swordRect.top + swordRect.height / 2;
        
        // 현재 검의 색상 가져오기
        const swordBlade = document.getElementById('sword-blade');
        const currentBladeColor = window.getComputedStyle(swordBlade).background;
        
        // 검 부서지는 애니메이션
        const swordContainer = document.getElementById('sword-container');
        swordContainer.style.animation = 'sword-break 0.3s ease-out';
        
        setTimeout(() => {
            swordContainer.style.animation = '';
        }, 300);
        
        // 검 파편 생성
        for (let i = 0; i < 8; i++) {
            const fragment = document.createElement('div');
            fragment.classList.add('sword-fragment');
            
            const width = 3 + Math.random() * 4;
            const height = 8 + Math.random() * 15;
            
            fragment.style.width = width + 'px';
            fragment.style.height = height + 'px';
            fragment.style.left = centerX + 'px';
            fragment.style.top = centerY + 'px';
            fragment.style.transformOrigin = 'center';
            fragment.style.background = currentBladeColor; // 현재 검 색상 적용
            fragment.style.boxShadow = swordBlade.style.boxShadow; // 현재 검 글로우 효과도 적용
            
            particleContainer.appendChild(fragment);
            
            setTimeout(() => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = 150 + Math.random() * 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance + Math.random() * 50;
                const rotation = Math.random() * 720 - 360;
                
                fragment.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                fragment.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                fragment.remove();
            }, 850);
        }
        
        // 폭발 스파크 생성
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            spark.classList.add('explosion-spark');
            
            spark.style.left = centerX + 'px';
            spark.style.top = centerY + 'px';
            
            particleContainer.appendChild(spark);
            
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 80 + Math.random() * 120;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                spark.style.transform = `translate(${x}px, ${y}px)`;
                spark.style.opacity = '0';
            }, 20);
            
            setTimeout(() => {
                spark.remove();
            }, 620);
        }
    }

    function getSwordName(level) {
        return swordNames[level - 1] || '알 수 없는 검';
    }
    
    function initAchievements() {
        achievementData.forEach(ach => {
            achievements[ach.id] = { completed: false, rewarded: false };
        });
        updateAchievements();
    }
    
    function giveReward(reward) {
        if (typeof reward === 'number') {
            // 숫자인 경우 골드로 처리
            currentGold += reward;
        } else if (reward && reward.type) {
            switch(reward.type) {
                case 'gold':
                    currentGold += reward.amount;
                    break;
                case 'charm':
                    luckCharmCount += reward.amount;
                    break;
                case 'ticket':
                    preventionTicketCount += reward.amount;
                    break;
            }
        }
    }
    
    function getRewardText(reward) {
        if (typeof reward === 'number') {
            return `${reward.toLocaleString()} G`;
        }
        if (!reward || !reward.type) return '보상 없음';
        switch(reward.type) {
            case 'gold':
                return `${reward.amount.toLocaleString()} G`;
            case 'charm':
                return `행운의 부적 ${reward.amount}개`;
            case 'ticket':
                return `방지권 ${reward.amount}개`;
            default:
                return `${reward.amount.toLocaleString()} G`;
        }
    }
    
    function updateAchievements() {
        achievementsList.innerHTML = '';
        
        achievementData.forEach(ach => {
            const current = ach.current();
            const progress = Math.min(current / ach.target * 100, 100);
            const isCompleted = current >= ach.target;
            const wasCompleted = achievements[ach.id].completed;
            
            if (isCompleted && !wasCompleted) {
                achievements[ach.id].completed = true;
                if (!achievements[ach.id].rewarded) {
                    giveReward(ach.reward);
                    achievements[ach.id].rewarded = true;
                    const rewardText = getRewardText(ach.reward);
                    resultMessageElement.textContent = `🏆 업적 달성! "${ach.name}" - ${rewardText} 획득!`;
                    resultMessageElement.style.color = '#f1c40f';
                    
                    // 업적 달성 효과음 재생
                    if (achievementSound) {
                        achievementSound.currentTime = 0;
                        achievementSound.play().catch(error => {
                            console.log('Achievement sound play failed:', error);
                        });
                    }
                }
            }
            
            const item = document.createElement('div');
            item.className = 'achievement-item';
            item.innerHTML = `
                <h3>${ach.name} ${isCompleted ? '✅' : ''}</h3>
                <p>${ach.desc}</p>
                <p>진행도: ${current.toLocaleString()} / ${ach.target.toLocaleString()}</p>
                <div style="background: #1a242f; border-radius: 10px; height: 8px; margin: 5px 0;">
                    <div style="background: ${isCompleted ? '#2ecc71' : '#3498db'}; height: 100%; width: ${progress}%; border-radius: 10px; transition: width 0.3s;"></div>
                </div>
                <p style="color: #f39c12;">보상: ${ach.reward ? getRewardText(ach.reward) : '보상 없음'}</p>
            `;
            
            if (isCompleted) {
                item.style.borderColor = '#2ecc71';
            }
            
            achievementsList.appendChild(item);
        });
    }
    
    function createMiniSword(level, isLocked = false) {
        const container = document.createElement('div');
        container.className = 'mini-sword-container';
        
        if (isLocked) {
            container.innerHTML = `
                <div class="mini-sword-blade locked-sword" style="width: 3px; height: 25px;"></div>
                <div class="mini-sword-guard locked-sword" style="width: 12px; height: 2px;"></div>
                <div class="mini-sword-handle locked-sword" style="width: 2px; height: 8px;"></div>
                <div class="mini-sword-pommel locked-sword" style="width: 4px; height: 3px;"></div>
            `;
            return container;
        }
        
        // 레벨별 검 스타일 계산 (기존 updateSwordVisual 로직 축소버전)
        const baseWidth = Math.min(2 + (level * 0.2), 6);
        const baseHeight = Math.min(15 + (level * 0.8), 40);
        const guardWidth = Math.min(8 + (level * 0.3), 20);
        const guardHeight = Math.min(1.5 + Math.floor(level / 20), 4);
        const handleHeight = Math.min(6 + (level * 0.1), 15);
        const pommelSize = Math.min(3 + (level * 0.08), 8);
        
        let bladeColor, handleColor, pommelColor, glowEffect;
        
        if (level <= 10) {
            const brownShade = Math.floor(139 + level * 5);
            bladeColor = `linear-gradient(to bottom, rgb(${brownShade}, ${Math.floor(brownShade*0.7)}, 19), rgb(${Math.floor(brownShade*0.6)}, ${Math.floor(brownShade*0.4)}, 19))`;
            handleColor = '#654321';
            pommelColor = `rgb(${brownShade}, ${Math.floor(brownShade*0.7)}, 19)`;
            glowEffect = level > 8 ? `0 0 ${level/2}px rgba(${brownShade}, ${Math.floor(brownShade*0.7)}, 19, 0.3)` : 'none';
        } else if (level <= 20) {
            const blueShade = Math.floor(65 + (level-10) * 15);
            bladeColor = `linear-gradient(to bottom, rgb(${blueShade}, ${Math.floor(blueShade*1.4)}, 225), rgb(0, 0, ${Math.floor(blueShade*1.2)}))`;
            handleColor = level > 15 ? '#2c3e50' : '#8b4513';
            pommelColor = `rgb(${blueShade}, ${Math.floor(blueShade*1.4)}, 225)`;
            glowEffect = `0 0 ${2 + (level-10)/2}px rgba(${blueShade}, ${Math.floor(blueShade*1.4)}, 225, 0.5)`;
        } else if (level <= 30) {
            const purpleShade = Math.floor(147 + (level-20) * 8);
            bladeColor = `linear-gradient(to bottom, rgb(${purpleShade}, 112, 219), rgb(${Math.floor(purpleShade*0.6)}, 43, 226))`;
            handleColor = '#4b0082';
            pommelColor = `rgb(${purpleShade}, 112, 219)`;
            glowEffect = `0 0 ${5 + (level-20)/2}px rgba(${purpleShade}, 112, 219, 0.6)`;
        } else if (level <= 40) {
            const redShade = Math.floor(255 - (level-30) * 2);
            bladeColor = `linear-gradient(to bottom, rgb(255, ${Math.floor(redShade*0.3)}, 0), rgb(${redShade}, 0, 0))`;
            handleColor = '#8b0000';
            pommelColor = `rgb(255, ${Math.floor(redShade*0.3)}, 0)`;
            glowEffect = `0 0 ${7 + (level-30)}px rgba(255, ${Math.floor(redShade*0.3)}, 0, 0.7)`;
        } else if (level <= 50) {
            const iceShade = Math.floor(135 + (level-40) * 12);
            bladeColor = `linear-gradient(to bottom, rgb(${iceShade}, 206, 250), rgb(70, 130, 180))`;
            handleColor = '#191970';
            pommelColor = `rgb(${iceShade}, 206, 250)`;
            glowEffect = `0 0 ${10 + (level-40)}px rgba(${iceShade}, 206, 250, 0.6)`;
        } else if (level <= 60) {
            const yellowShade = Math.floor(255 - (level-50) * 2);
            bladeColor = `linear-gradient(to bottom, rgb(255, 255, 0), rgb(${yellowShade}, 215, 0))`;
            handleColor = '#daa520';
            pommelColor = `rgb(255, 255, 0)`;
            glowEffect = `0 0 ${12 + (level-50)*1.5}px rgba(255, 255, 0, 0.8)`;
        } else if (level <= 70) {
            const greenShade = Math.floor(143 + (level-60) * 11);
            bladeColor = `linear-gradient(to bottom, rgb(${greenShade}, 188, ${greenShade}), rgb(85, 107, 47))`;
            handleColor = '#2f4f2f';
            pommelColor = `rgb(${greenShade}, 188, ${greenShade})`;
            glowEffect = `0 0 ${15 + (level-60)}px rgba(${greenShade}, 188, ${greenShade}, 0.6)`;
        } else if (level <= 80) {
            const mithrilShade = Math.floor(230 + (level-70) * 2.5);
            bladeColor = `linear-gradient(to bottom, rgb(${mithrilShade}, ${mithrilShade}, 250), rgb(221, 160, 221))`;
            handleColor = '#9370db';
            pommelColor = `rgb(${mithrilShade}, ${mithrilShade}, 250)`;
            glowEffect = `0 0 ${17 + (level-70)*1.5}px rgba(${mithrilShade}, ${mithrilShade}, 250, 0.7)`;
        } else if (level <= 90) {
            const holyShade = Math.floor(255 - (level-80) * 2);
            bladeColor = `linear-gradient(to bottom, rgb(255, 255, 255), rgb(${holyShade}, 215, 0), rgb(255, 255, 255))`;
            handleColor = '#ffd700';
            pommelColor = `rgb(255, 255, 255)`;
            glowEffect = `0 0 ${20 + (level-80)*2}px rgba(255, 255, 255, 0.8), 0 0 ${30 + (level-80)}px rgba(255, 215, 0, 0.6)`;
        } else {
            bladeColor = `linear-gradient(to bottom, rgb(255, 0, 0), rgb(255, 127, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 0, 255), rgb(75, 0, 130), rgb(148, 0, 211))`;
            handleColor = '#ffd700';
            pommelColor = `rgb(255, 255, 255)`;
            glowEffect = `0 0 ${25 + (level-90)*2.5}px rgba(255, 20, 147, 0.8), 0 0 ${35 + (level-90)*1.5}px rgba(0, 255, 0, 0.6), 0 0 ${45 + (level-90)}px rgba(0, 0, 255, 0.4)`;
        }
        
        let bladeStyle, bladeContent = '';
        
        // 레벨별 미니 검 모양
        if (level === 1) {
            bladeStyle = `width: 4px; height: 25px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0;`;
        } else if (level === 2) {
            bladeStyle = `width: 4px; height: 28px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 3) {
            bladeStyle = `width: 5px; height: 22px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 4) {
            bladeStyle = `width: 6px; height: 30px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0;`;
        } else if (level === 5) {
            bladeStyle = `width: 5px; height: 33px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 6) {
            bladeStyle = `width: 5px; height: 35px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0;`;
        } else if (level === 7) {
            bladeStyle = `width: 7px; height: 25px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 8) {
            bladeStyle = `width: 6px; height: 38px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0;`;
        } else if (level === 9) {
            bladeStyle = `width: 6px; height: 40px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(40% 0%, 60% 0%, 90% 50%, 100% 100%, 0% 100%, 10% 50%);`;
        } else if (level === 10) {
            bladeStyle = `width: 5px; height: 42px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(47% 0%, 53% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 11) {
            bladeStyle = `width: 6px; height: 45px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(45% 0%, 55% 0%, 85% 30%, 100% 100%, 0% 100%, 15% 30%);`;
        } else if (level === 12) {
            bladeStyle = `width: 8px; height: 40px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0;`;
        } else if (level === 13) {
            bladeStyle = `width: 5px; height: 50px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 14) {
            bladeStyle = `width: 5px; height: 42px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(42% 0%, 58% 0%, 80% 40%, 100% 100%, 0% 100%, 20% 40%);`;
        } else if (level === 15) {
            bladeStyle = `width: 6px; height: 45px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 16) {
            bladeStyle = `width: 6px; height: 47px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(40% 0%, 60% 0%, 90% 20%, 100% 100%, 0% 100%, 10% 20%);`;
        } else if (level === 17) {
            bladeStyle = `width: 7px; height: 45px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(38% 0%, 62% 0%, 85% 25%, 95% 50%, 100% 100%, 0% 100%, 5% 50%, 15% 25%);`;
        } else if (level === 18) {
            bladeStyle = `width: 8px; height: 42px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%);`;
        } else if (level === 19) {
            bladeStyle = `width: 6px; height: 50px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 1px 1px 0 0; clip-path: polygon(45% 0%, 55% 0%, 80% 30%, 100% 100%, 0% 100%, 20% 30%);`;
        } else if (level === 20) {
            bladeStyle = `width: 7px; height: 52px; background: ${bladeColor}; box-shadow: ${glowEffect}; border-radius: 2px 2px 0 0; clip-path: polygon(40% 0%, 60% 0%, 85% 20%, 95% 40%, 100% 100%, 0% 100%, 5% 40%, 15% 20%);`;
        } else if (level === 39) {
            bladeStyle = `width: 12px; height: ${baseHeight}px; background: ${bladeColor}; box-shadow: ${glowEffect}; clip-path: polygon(20% 0%, 80% 0%, 100% 15%, 100% 35%, 80% 50%, 100% 65%, 100% 85%, 80% 100%, 20% 100%, 0% 85%, 0% 65%, 20% 50%, 0% 35%, 0% 15%);`;
        } else {
            bladeStyle = `width: ${baseWidth}px; height: ${baseHeight}px; background: ${bladeColor}; box-shadow: ${glowEffect};`;
        }
        
        container.innerHTML = `
            <div class="mini-sword-blade" style="${bladeStyle}">${bladeContent}</div>
            <div class="mini-sword-guard" style="width: ${guardWidth}px; height: ${guardHeight}px;"></div>
            <div class="mini-sword-handle" style="width: ${Math.max(baseWidth-1, 2)}px; height: ${handleHeight}px; background: ${handleColor};"></div>
            <div class="mini-sword-pommel" style="width: ${pommelSize}px; height: ${Math.max(pommelSize*0.6, 2)}px; background: ${pommelColor};"></div>
        `;
        
        return container;
    }
    
    function openSwordCollection() {
        swordCollectionGrid.innerHTML = '';
        
        for (let i = 1; i <= 100; i++) {
            const item = document.createElement('div');
            item.className = 'sword-collection-item';
            
            const miniSword = createMiniSword(i, i > maxLevelAchieved);
            
            if (i <= maxLevelAchieved) {
                item.classList.add('unlocked');
                item.innerHTML = `
                    <h4>Lv.${i}</h4>
                    <p>${getSwordName(i)}</p>
                    <p>가치: ${swordPrices[i-1].toLocaleString()} G</p>
                `;
            } else {
                item.classList.add('locked');
                item.innerHTML = `
                    <h4>Lv.${i}</h4>
                    <p>???</p>
                    <p>미해금</p>
                `;
            }
            
            // 미니 검을 제목 뒤에 삽입
            const title = item.querySelector('h4');
            title.insertAdjacentElement('afterend', miniSword);
            
            swordCollectionGrid.appendChild(item);
        }
        
        swordCollectionModal.style.display = 'flex';
    }
    
    function closeSwordCollection() {
        swordCollectionModal.style.display = 'none';
    }
    


    function updateSwordVisual(level) {
        // 간단한 공식으로 각 레벨별 고유 스타일 생성
        const baseWidth = 4 + (level * 0.5);
        const baseHeight = 35 + (level * 1.5);
        const guardWidth = 15 + (level * 0.8);
        const guardHeight = 3 + Math.floor(level / 10);
        const handleHeight = 15 + (level * 0.3);
        const pommelSize = 6 + (level * 0.2);
        const borderRadius = 2 + Math.floor(level / 15);
        
        // 레벨별 색상 및 효과
        let bladeColor, handleColor, pommelColor, glowEffect;
        
        if (level <= 10) {
            // 목검 계열
            const brownShade = Math.floor(139 + level * 5); // 139-189
            bladeColor = `linear-gradient(to bottom, rgb(${brownShade}, ${Math.floor(brownShade*0.7)}, 19), rgb(${Math.floor(brownShade*0.6)}, ${Math.floor(brownShade*0.4)}, 19))`;
            handleColor = '#654321';
            pommelColor = `rgb(${brownShade}, ${Math.floor(brownShade*0.7)}, 19)`;
            glowEffect = level > 8 ? `0 0 ${level}px rgba(${brownShade}, ${Math.floor(brownShade*0.7)}, 19, 0.3)` : 'none';
        } else if (level <= 20) {
            // 모험가 계열 - 파란색
            const blueShade = Math.floor(65 + (level-10) * 15); // 65-215
            bladeColor = `linear-gradient(to bottom, rgb(${blueShade}, ${Math.floor(blueShade*1.4)}, 225), rgb(0, 0, ${Math.floor(blueShade*1.2)}))`;
            handleColor = level > 15 ? '#2c3e50' : '#8b4513';
            pommelColor = `rgb(${blueShade}, ${Math.floor(blueShade*1.4)}, 225)`;
            glowEffect = `0 0 ${5 + (level-10)}px rgba(${blueShade}, ${Math.floor(blueShade*1.4)}, 225, 0.5)`;
        } else if (level <= 30) {
            // 마법 계열 - 보라색
            const purpleShade = Math.floor(147 + (level-20) * 8); // 147-227
            bladeColor = `linear-gradient(to bottom, rgb(${purpleShade}, 112, 219), rgb(${Math.floor(purpleShade*0.6)}, 43, 226))`;
            handleColor = '#4b0082';
            pommelColor = `rgb(${purpleShade}, 112, 219)`;
            glowEffect = `0 0 ${10 + (level-20)}px rgba(${purpleShade}, 112, 219, 0.6)`;
        } else if (level <= 40) {
            // 불꽃 계열 - 빨간색
            const redShade = Math.floor(255 - (level-30) * 2); // 255-235
            bladeColor = `linear-gradient(to bottom, rgb(255, ${Math.floor(redShade*0.3)}, 0), rgb(${redShade}, 0, 0))`;
            handleColor = '#8b0000';
            pommelColor = `rgb(255, ${Math.floor(redShade*0.3)}, 0)`;
            glowEffect = `0 0 ${15 + (level-30)*2}px rgba(255, ${Math.floor(redShade*0.3)}, 0, 0.7)`;
        } else if (level <= 50) {
            // 얼음 계열 - 하늘색
            const iceShade = Math.floor(135 + (level-40) * 12); // 135-255
            bladeColor = `linear-gradient(to bottom, rgb(${iceShade}, 206, 250), rgb(70, 130, 180))`;
            handleColor = '#191970';
            pommelColor = `rgb(${iceShade}, 206, 250)`;
            glowEffect = `0 0 ${20 + (level-40)*2}px rgba(${iceShade}, 206, 250, 0.6)`;
        } else if (level <= 60) {
            // 번개 계열 - 노란색
            const yellowShade = Math.floor(255 - (level-50) * 2); // 255-235
            bladeColor = `linear-gradient(to bottom, rgb(255, 255, 0), rgb(${yellowShade}, 215, 0))`;
            handleColor = '#daa520';
            pommelColor = `rgb(255, 255, 0)`;
            glowEffect = `0 0 ${25 + (level-50)*3}px rgba(255, 255, 0, 0.8)`;
        } else if (level <= 70) {
            // 대지 계열 - 초록색
            const greenShade = Math.floor(143 + (level-60) * 11); // 143-253
            bladeColor = `linear-gradient(to bottom, rgb(${greenShade}, 188, ${greenShade}), rgb(85, 107, 47))`;
            handleColor = '#2f4f2f';
            pommelColor = `rgb(${greenShade}, 188, ${greenShade})`;
            glowEffect = `0 0 ${30 + (level-60)*2}px rgba(${greenShade}, 188, ${greenShade}, 0.6)`;
        } else if (level <= 80) {
            // 미스릴 계열 - 연보라색
            const mithrilShade = Math.floor(230 + (level-70) * 2.5); // 230-255
            bladeColor = `linear-gradient(to bottom, rgb(${mithrilShade}, ${mithrilShade}, 250), rgb(221, 160, 221))`;
            handleColor = '#9370db';
            pommelColor = `rgb(${mithrilShade}, ${mithrilShade}, 250)`;
            glowEffect = `0 0 ${35 + (level-70)*3}px rgba(${mithrilShade}, ${mithrilShade}, 250, 0.7)`;
        } else if (level <= 90) {
            // 성검 계열 - 금색+흰색
            const holyShade = Math.floor(255 - (level-80) * 2); // 255-235
            bladeColor = `linear-gradient(to bottom, rgb(255, 255, 255), rgb(${holyShade}, 215, 0), rgb(255, 255, 255))`;
            handleColor = '#ffd700';
            pommelColor = `rgb(255, 255, 255)`;
            glowEffect = `0 0 ${40 + (level-80)*4}px rgba(255, 255, 255, 0.8), 0 0 ${60 + (level-80)*2}px rgba(255, 215, 0, 0.6)`;
        } else {
            // 전설 계열 - 무지개
            const rainbowIntensity = Math.floor(200 + (level-90) * 5.5); // 200-255
            bladeColor = `linear-gradient(to bottom, rgb(255, 0, 0), rgb(255, 127, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 0, 255), rgb(75, 0, 130), rgb(148, 0, 211))`;
            handleColor = '#ffd700';
            pommelColor = `rgb(${rainbowIntensity}, ${rainbowIntensity}, ${rainbowIntensity})`;
            glowEffect = `0 0 ${50 + (level-90)*5}px rgba(255, 20, 147, 0.8), 0 0 ${70 + (level-90)*3}px rgba(0, 255, 0, 0.6), 0 0 ${90 + (level-90)*2}px rgba(0, 0, 255, 0.4)`;
        }
        
        // 칼날, 가드, 손잡이, 포멜 스타일 적용
        swordBladeElement.style.background = bladeColor;
        swordBladeElement.style.boxShadow = glowEffect;
        swordBladeElement.innerHTML = '';
        
        // 레벨별 고유 디자인 (이름에 맞는 색상과 모양)
        if (level === 1) {
            // 낡은 목검 - 갈색 목재
            swordBladeElement.style.width = '6px'; swordBladeElement.style.height = '40px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'none';
            swordGuardElement.style.background = '#8B4513'; swordGuardElement.style.width = '20px';
            swordHandleElement.style.background = '#654321'; swordPommelElement.style.background = '#8B4513';
        } else if (level === 2) {
            // 목검 - 더 나은 목재
            swordBladeElement.style.width = '7px'; swordBladeElement.style.height = '45px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#A0522D'; swordGuardElement.style.width = '22px';
            swordHandleElement.style.background = '#8B4513'; swordPommelElement.style.background = '#A0522D';
        } else if (level === 3) {
            // 견습용 단검 - 기본 철
            swordBladeElement.style.width = '8px'; swordBladeElement.style.height = '35px';
            swordBladeElement.style.borderRadius = '1px 1px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#708090'; swordGuardElement.style.width = '18px';
            swordHandleElement.style.background = '#654321'; swordPommelElement.style.background = '#708090';
        } else if (level === 4) {
            // 구리 검 - 주황빛 구리색
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '50px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'none';
            swordGuardElement.style.background = '#CD853F'; swordGuardElement.style.width = '25px';
            swordHandleElement.style.background = '#8B4513'; swordPommelElement.style.background = '#CD853F';
        } else if (level === 5) {
            // 청동 검 - 황금빛 청동색
            swordBladeElement.style.width = '8px'; swordBladeElement.style.height = '55px';
            swordBladeElement.style.borderRadius = '1px 1px 0 0'; swordBladeElement.style.clipPath = 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#DAA520'; swordGuardElement.style.width = '24px';
            swordHandleElement.style.background = '#8B4513'; swordPommelElement.style.background = '#DAA520';
        } else if (level === 6) {
            // 철 검 - 회색 철
            swordBladeElement.style.width = '9px'; swordBladeElement.style.height = '60px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'none';
            swordGuardElement.style.background = '#696969'; swordGuardElement.style.width = '26px';
            swordHandleElement.style.background = '#654321'; swordPommelElement.style.background = '#696969';
        } else if (level === 7) {
            // 강철 단검 - 밝은 강철
            swordBladeElement.style.width = '12px'; swordBladeElement.style.height = '40px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#C0C0C0'; swordGuardElement.style.width = '28px';
            swordHandleElement.style.background = '#8B4513'; swordPommelElement.style.background = '#C0C0C0';
        } else if (level === 8) {
            // 강철 검 - 강철색
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '65px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'none';
            swordGuardElement.style.background = '#B0C4DE'; swordGuardElement.style.width = '28px';
            swordHandleElement.style.background = '#654321'; swordPommelElement.style.background = '#B0C4DE';
        } else if (level === 9) {
            // 강화된 강철 검 - 푸른 강철
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '70px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 90% 50%, 100% 100%, 0% 100%, 10% 50%)';
            swordGuardElement.style.background = '#4682B4'; swordGuardElement.style.width = '30px';
            swordHandleElement.style.background = '#2F4F4F'; swordPommelElement.style.background = '#4682B4';
        } else if (level === 10) {
            // 날카로운 강철 검 - 빛나는 강철
            swordBladeElement.style.width = '9px'; swordBladeElement.style.height = '75px';
            swordBladeElement.style.borderRadius = '1px 1px 0 0'; swordBladeElement.style.clipPath = 'polygon(47% 0%, 53% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#E6E6FA'; swordGuardElement.style.width = '28px';
            swordHandleElement.style.background = '#483D8B'; swordPommelElement.style.background = '#E6E6FA';
        } else if (level === 11) {
            // 모험가의 검 - 모험가 스타일
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '80px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(45% 0%, 55% 0%, 85% 30%, 100% 100%, 0% 100%, 15% 30%)';
            swordGuardElement.style.background = '#8FBC8F'; swordGuardElement.style.width = '32px';
            swordHandleElement.style.background = '#556B2F'; swordPommelElement.style.background = '#8FBC8F';
        } else if (level === 12) {
            // 용병의 검 - 거친 용병 스타일
            swordBladeElement.style.width = '13px'; swordBladeElement.style.height = '70px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'none';
            swordGuardElement.style.background = '#A0522D'; swordGuardElement.style.width = '35px';
            swordHandleElement.style.background = '#8B4513'; swordPommelElement.style.background = '#A0522D';
        } else if (level === 13) {
            // 기사의 서임 소드 - 고귀한 기사 스타일
            swordBladeElement.style.width = '8px'; swordBladeElement.style.height = '90px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#FFD700'; swordGuardElement.style.width = '36px';
            swordHandleElement.style.background = '#8B0000'; swordPommelElement.style.background = '#FFD700';
        } else if (level === 14) {
            // 은도금 검 - 은빛 도금
            swordBladeElement.style.width = '9px'; swordBladeElement.style.height = '75px';
            swordBladeElement.style.borderRadius = '4px 4px 0 0'; swordBladeElement.style.clipPath = 'polygon(42% 0%, 58% 0%, 80% 40%, 100% 100%, 0% 100%, 20% 40%)';
            swordGuardElement.style.background = '#C0C0C0'; swordGuardElement.style.width = '30px';
            swordHandleElement.style.background = '#2F4F4F'; swordPommelElement.style.background = '#C0C0C0';
        } else if (level === 15) {
            // 은 검 - 순은색
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '80px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#E5E5E5'; swordGuardElement.style.width = '32px';
            swordHandleElement.style.background = '#2F4F4F'; swordPommelElement.style.background = '#E5E5E5';
        } else if (level === 16) {
            // 백은 검 - 밝은 은색
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '85px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 90% 20%, 100% 100%, 0% 100%, 10% 20%)';
            swordGuardElement.style.background = '#F5F5F5'; swordGuardElement.style.width = '34px';
            swordHandleElement.style.background = '#483D8B'; swordPommelElement.style.background = '#F5F5F5';
        } else if (level === 17) {
            // 고급 은 검 - 고급 은색
            swordBladeElement.style.width = '12px'; swordBladeElement.style.height = '80px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'polygon(38% 0%, 62% 0%, 85% 25%, 95% 50%, 100% 100%, 0% 100%, 5% 50%, 15% 25%)';
            swordGuardElement.style.background = '#DCDCDC'; swordGuardElement.style.width = '36px';
            swordHandleElement.style.background = '#191970'; swordPommelElement.style.background = '#DCDCDC';
        } else if (level === 18) {
            // 수호자의 검 - 수호자 스타일
            swordBladeElement.style.width = '14px'; swordBladeElement.style.height = '75px';
            swordBladeElement.style.borderRadius = '4px 4px 0 0'; swordBladeElement.style.clipPath = 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)';
            swordGuardElement.style.background = '#4169E1'; swordGuardElement.style.width = '38px';
            swordHandleElement.style.background = '#000080'; swordPommelElement.style.background = '#4169E1';
        } else if (level === 19) {
            // 정예병의 검 - 정예 스타일
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '90px';
            swordBladeElement.style.borderRadius = '1px 1px 0 0'; swordBladeElement.style.clipPath = 'polygon(45% 0%, 55% 0%, 80% 30%, 100% 100%, 0% 100%, 20% 30%)';
            swordGuardElement.style.background = '#DC143C'; swordGuardElement.style.width = '32px';
            swordHandleElement.style.background = '#8B0000'; swordPommelElement.style.background = '#DC143C';
        } else if (level === 20) {
            // 백기사의 검 - 성스러운 백기사
            swordBladeElement.style.width = '12px'; swordBladeElement.style.height = '95px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 85% 20%, 95% 40%, 100% 100%, 0% 100%, 5% 40%, 15% 20%)';
            swordGuardElement.style.background = '#FFFACD'; swordGuardElement.style.width = '40px';
            swordHandleElement.style.background = '#FFD700'; swordPommelElement.style.background = '#FFFACD';
        } else if (level === 21) {
            // 마력이 깃든 검 - 마법 에너지
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '85px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(42% 0%, 58% 0%, 90% 30%, 100% 100%, 0% 100%, 10% 30%)';
            swordGuardElement.style.background = '#9370DB'; swordGuardElement.style.width = '34px';
            swordHandleElement.style.background = '#4B0082'; swordPommelElement.style.background = '#9370DB';
        } else if (level === 22) {
            // 룬 소드 - 룬 문자 새겨진
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '88px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 85% 25%, 100% 100%, 0% 100%, 15% 25%)';
            swordGuardElement.style.background = '#8A2BE2'; swordGuardElement.style.width = '36px';
            swordHandleElement.style.background = '#2F4F4F'; swordPommelElement.style.background = '#8A2BE2';
        } else if (level === 23) {
            // 마법사의 검 - 마법사 스타일
            swordBladeElement.style.width = '9px'; swordBladeElement.style.height = '92px';
            swordBladeElement.style.borderRadius = '1px 1px 0 0'; swordBladeElement.style.clipPath = 'polygon(46% 0%, 54% 0%, 80% 40%, 100% 100%, 0% 100%, 20% 40%)';
            swordGuardElement.style.background = '#6A5ACD'; swordGuardElement.style.width = '32px';
            swordHandleElement.style.background = '#483D8B'; swordPommelElement.style.background = '#6A5ACD';
        } else if (level === 24) {
            // 신비로운 검 - 신비한 기운
            swordBladeElement.style.width = '10px'; swordBladeElement.style.height = '87px';
            swordBladeElement.style.borderRadius = '3px 3px 0 0'; swordBladeElement.style.clipPath = 'polygon(44% 0%, 56% 0%, 88% 35%, 100% 100%, 0% 100%, 12% 35%)';
            swordGuardElement.style.background = '#7B68EE'; swordGuardElement.style.width = '35px';
            swordHandleElement.style.background = '#191970'; swordPommelElement.style.background = '#7B68EE';
        } else if (level === 25) {
            // 사파이어 소드 - 파란 보석
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '90px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(42% 0%, 58% 0%, 85% 30%, 100% 100%, 0% 100%, 15% 30%)';
            swordGuardElement.style.background = '#0000FF'; swordGuardElement.style.width = '38px';
            swordHandleElement.style.background = '#000080'; swordPommelElement.style.background = '#4169E1';
        } else if (level === 26) {
            // 에메랄드 소드 - 초록 보석
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '90px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(42% 0%, 58% 0%, 85% 30%, 100% 100%, 0% 100%, 15% 30%)';
            swordGuardElement.style.background = '#00FF00'; swordGuardElement.style.width = '38px';
            swordHandleElement.style.background = '#006400'; swordPommelElement.style.background = '#32CD32';
        } else if (level === 27) {
            // 루비 소드 - 빨간 보석
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '90px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(42% 0%, 58% 0%, 85% 30%, 100% 100%, 0% 100%, 15% 30%)';
            swordGuardElement.style.background = '#FF0000'; swordGuardElement.style.width = '38px';
            swordHandleElement.style.background = '#8B0000'; swordPommelElement.style.background = '#DC143C';
        } else if (level === 28) {
            // 다이아몬드 소드 - 투명한 다이아몬드
            swordBladeElement.style.width = '11px'; swordBladeElement.style.height = '90px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(42% 0%, 58% 0%, 85% 30%, 100% 100%, 0% 100%, 15% 30%)';
            swordGuardElement.style.background = '#F0F8FF'; swordGuardElement.style.width = '38px';
            swordHandleElement.style.background = '#4682B4'; swordPommelElement.style.background = '#E0FFFF';
        } else if (level === 29) {
            // 흑요석 검 - 검은 화산석
            swordBladeElement.style.width = '12px'; swordBladeElement.style.height = '92px';
            swordBladeElement.style.borderRadius = '1px 1px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 90% 25%, 100% 100%, 0% 100%, 10% 25%)';
            swordGuardElement.style.background = '#2F2F2F'; swordGuardElement.style.width = '40px';
            swordHandleElement.style.background = '#000000'; swordPommelElement.style.background = '#2F2F2F';
        } else if (level === 30) {
            // 자수정 검 - 보라 수정
            swordBladeElement.style.width = '12px'; swordBladeElement.style.height = '95px';
            swordBladeElement.style.borderRadius = '2px 2px 0 0'; swordBladeElement.style.clipPath = 'polygon(40% 0%, 60% 0%, 88% 28%, 100% 100%, 0% 100%, 12% 28%)';
            swordGuardElement.style.background = '#9932CC'; swordGuardElement.style.width = '42px';
            swordHandleElement.style.background = '#4B0082'; swordPommelElement.style.background = '#DA70D6';
        } else if (level === 39) {
            // 39 모양의 칼날
            swordBladeElement.style.width = '20px'; swordBladeElement.style.height = '60px';
            swordBladeElement.style.borderRadius = '0'; swordBladeElement.style.clipPath = 'polygon(20% 0%, 80% 0%, 100% 15%, 100% 35%, 80% 50%, 100% 65%, 100% 85%, 80% 100%, 20% 100%, 0% 85%, 0% 65%, 20% 50%, 0% 35%, 0% 15%)';
        } else {
            // 기본 모양
            swordBladeElement.style.width = Math.min(baseWidth, 50) + 'px';
            swordBladeElement.style.height = Math.min(baseHeight, 180) + 'px';
            swordBladeElement.style.borderRadius = `${Math.min(borderRadius, 20)}px ${Math.min(borderRadius, 20)}px 0 0`;
            swordBladeElement.style.clipPath = 'none';
        }
        
        // 특별한 모양 (단검, 소드 등)
        if (level === 3 || level === 7) { // 단검
            swordBladeElement.style.height = Math.min(baseHeight * 0.7, 120) + 'px';
        } else if (level === 13) { // 소드
            swordBladeElement.style.height = Math.min(baseHeight * 1.3, 200) + 'px';
        }
        
        // 가드 스타일
        swordGuardElement.style.width = Math.min(guardWidth, 100) + 'px';
        swordGuardElement.style.height = Math.min(guardHeight, 15) + 'px';
        
        // 손잡이 스타일
        swordHandleElement.style.background = handleColor;
        swordHandleElement.style.height = Math.min(handleHeight, 80) + 'px';
        
        // 포멜 스타일
        swordPommelElement.style.background = pommelColor;
        swordPommelElement.style.width = Math.min(pommelSize, 40) + 'px';
        swordPommelElement.style.height = Math.min(pommelSize * 0.6, 24) + 'px';
        
        updateAura(level);
    }
    
    function updateAura(level) {
        // 오오라 초기화
        auraOuterElement.style.opacity = '0';
        auraMiddleElement.style.opacity = '0';
        auraInnerElement.style.opacity = '0';
        auraOuterElement.style.transform = 'scale(1)';
        auraMiddleElement.style.transform = 'scale(1)';
        auraInnerElement.style.transform = 'scale(1)';
        
        // 오오라 색상과 강도 설정
        let auraColor, auraOpacity;
        
        if (level < 20) {
            // 20레벨 미만: 오오라 없음
            return;
        } else if (level < 40) {
            // 20-39레벨: 약한 파란 오오라
            auraColor = '135, 206, 250'; // 하늘색
            auraOpacity = Math.min((level - 20) / 20 * 0.3, 0.3);
        } else if (level < 60) {
            // 40-59레벨: 보라색 오오라
            auraColor = '138, 43, 226'; // 보라색
            auraOpacity = Math.min((level - 40) / 20 * 0.5, 0.5);
        } else if (level < 80) {
            // 60-79레벨: 금색 오오라
            auraColor = '255, 215, 0'; // 금색
            auraOpacity = Math.min((level - 60) / 20 * 0.7, 0.7);
        } else {
            // 80-100레벨: 무지개 오오라
            const colors = [
                '255, 0, 0',    // 빨간
                '255, 165, 0',  // 주황
                '255, 255, 0',  // 노랑
                '0, 255, 0',    // 초록
                '0, 0, 255',    // 파랑
                '75, 0, 130',   // 남색
                '238, 130, 238' // 보라
            ];
            const colorIndex = Math.floor(Date.now() / 500) % colors.length;
            auraColor = colors[colorIndex];
            auraOpacity = Math.min((level - 80) / 20 * 0.9, 0.9);
        }
        
        // 오오라 적용
        if (level >= 20) {
            auraInnerElement.style.background = `radial-gradient(circle, transparent 40%, rgba(${auraColor}, ${auraOpacity * 1.5}) 100%)`;
            auraInnerElement.style.opacity = '1';
        }
        
        if (level >= 30) {
            auraMiddleElement.style.background = `radial-gradient(circle, transparent 50%, rgba(${auraColor}, ${auraOpacity}) 100%)`;
            auraMiddleElement.style.opacity = '1';
        }
        
        if (level >= 50) {
            auraOuterElement.style.background = `radial-gradient(circle, transparent 60%, rgba(${auraColor}, ${auraOpacity * 0.5}) 100%)`;
            auraOuterElement.style.opacity = '1';
        }
        
        // 고레벨에서 오오라 크기 증가
        if (level >= 70) {
            const scale = 1 + (level - 70) / 30 * 0.5; // 70레벨부터 최대 1.5배
            auraOuterElement.style.transform = `scale(${scale})`;
            auraMiddleElement.style.transform = `scale(${scale * 0.8})`;
            auraInnerElement.style.transform = `scale(${scale * 0.6})`;
        }
    }

    function updateUI() {
        swordLevelElement.textContent = currentLevel;
        swordNameElement.textContent = getSwordName(currentLevel);
        
        const goldDisplayElement = document.getElementById('current-gold');
        if (isCheatActive && currentGold === Infinity) {
            goldDisplayElement.textContent = '∞';
        } else {
            goldDisplayElement.textContent = currentGold.toLocaleString();
        }
        
        if (currentLevel === 1) {
            swordPriceElement.textContent = '없음';
            strengthenCostElement.textContent = '없음';
        } else {
            const price = swordPrices[currentLevel - 1];
            swordPriceElement.textContent = price.toLocaleString(); // Set price

            const strengthenCost = Math.floor(price * 0.1);
            strengthenCostElement.textContent = strengthenCost.toLocaleString(); // Display strengthen cost
        }

        preventionTicketCountElement.textContent = preventionTicketCount; // Display ticket count
        preventionTicketPriceElement.textContent = preventionTicketPrice.toLocaleString(); // Update price display
        priceResetTimerElement.textContent = priceResetTimer; // Update timer display
        
        // Update new shop items
        luckCharmCountElement.textContent = luckCharmCount;
        

        
        // Update sword visual
        updateSwordVisual(currentLevel);

        if (currentLevel >= maxLevel) {
            successChanceElement.textContent = '0.00';
            strengthenButton.disabled = true;
            resultMessageElement.textContent = `최고 레벨(${maxLevel})에 도달했습니다! 당신은 [태초]의 대장장이입니다!`;
        } else {
            strengthenButton.disabled = false;
            const baseChance = Math.pow(0.98, currentLevel - 1) * 100;
            if (luckCharmCount > 0) {
                const bonusChance = Math.min(10, (100 - baseChance));
                successChanceElement.innerHTML = `${baseChance.toFixed(2)} + <span style="color: #2ecc71">${bonusChance.toFixed(2)}</span>`;
            } else {
                successChanceElement.textContent = baseChance.toFixed(2);
            }
        }
    }

    // --- Confirmation Handling ---
    function handleConfirmation(useTicket) {
        if (useTicket) {
            preventionTicketCount--;
            resultMessageElement.textContent = `강화 실패! 강화 실패 방지권을 사용하여 레벨을 유지합니다.`;
            resultMessageElement.style.color = '#f1c40f';
        } else {
            resultMessageElement.textContent = '강화에 실패하여 1레벨으로 돌아갑니다...';
            resultMessageElement.style.color = '#e74c3c';
            currentLevel = 1; // Reset level
        }
        // Hide confirmation buttons, show strengthen/sell buttons
        confirmationButtons.style.display = 'none';
        strengthenButton.style.display = 'inline-block';
        sellButton.style.display = 'inline-block';
        updateUI();
    }

    // Auto-use toggle handling
    autoUseToggle.addEventListener('click', () => {
        autoUsePreventionTicket = !autoUsePreventionTicket;
        if (autoUsePreventionTicket) {
            autoUseToggle.textContent = '자동사용: ON';
            autoUseToggle.classList.add('active');
        } else {
            autoUseToggle.textContent = '자동사용: OFF';
            autoUseToggle.classList.remove('active');
        }
    });

    confirmYesButton.addEventListener('click', () => handleConfirmation(true));
    confirmNoButton.addEventListener('click', () => handleConfirmation(false));
    // --- End Confirmation Handling ---


    strengthenButton.addEventListener('click', () => {
        if (currentLevel >= maxLevel) {
            return;
        }

        let strengthenCost = currentLevel === 1 ? 0 : Math.floor(swordPrices[currentLevel - 1] * 0.1);

        if (!isCheatActive && currentGold < strengthenCost) {
            resultMessageElement.textContent = '골드가 부족합니다!';
            resultMessageElement.style.color = '#e74c3c';
            updateUI();
            return;
        }

        if (!isCheatActive) {
            currentGold -= strengthenCost; // Deduct cost only if cheat is not active
            totalGoldSpent += strengthenCost;
        }
        
        totalStrengthenAttempts++;

        let successChance = Math.pow(0.98, currentLevel - 1);
        
        // 행운의 부적 사용
        if (luckCharmCount > 0) {
            successChance = Math.min(successChance + 0.1, 0.99); // +10% 보너스, 최대 99%
            luckCharmCount--;
            totalLuckCharmsUsed++;
        }
        
        const isSuccess = Math.random() < successChance;

        if (isSuccess) {
            currentLevel++;
            consecutiveSuccesses++;
            consecutiveFailures = 0;
            maxConsecutiveSuccesses = Math.max(maxConsecutiveSuccesses, consecutiveSuccesses);
            
            // 행운의 7 업적 체크
            if (currentLevel === 77 && previousLevel === 7) {
                luckySevenAchieved = 1;
            }
            
            // Update max level achievement
            if (currentLevel > maxLevelAchieved) {
                maxLevelAchieved = currentLevel;
                resultMessageElement.textContent = `강화 성공! 새로운 최고 레벨 달성!`;
            } else {
                resultMessageElement.textContent = `강화 성공!`;
            }
            
            resultMessageElement.style.color = '#2ecc71';

            
            // Play success sound
            if (successSound) {
                successSound.volume = sfxVolume;
                successSound.currentTime = 0;
                successSound.play().catch(error => {
                    console.log('Success sound play failed:', error);
                });
            }
            
            // Add animation class to game container
            shakeTarget.classList.add('success-animation');
            shakeTarget.addEventListener('animationend', () => {
                shakeTarget.classList.remove('success-animation');
            }, { once: true });
            
            // Add shake animation to all UI containers
            const uiContainers = [inventoryContainer, achievementContainer, shopContainer];
            uiContainers.forEach(container => {
                container.classList.add('ui-success-animation');
                container.addEventListener('animationend', () => {
                    container.classList.remove('ui-success-animation');
                }, { once: true });
            });
            
            // Add screen shake animation to whole layout
            mainLayout.classList.add('screen-shake-animation');
            mainLayout.addEventListener('animationend', () => {
                mainLayout.classList.remove('screen-shake-animation');
            }, { once: true });

        } else {
            // Failure logic
            const previousLevel = currentLevel;
            consecutiveFailures++;
            consecutiveSuccesses = 0;
            maxConsecutiveFailures = Math.max(maxConsecutiveFailures, consecutiveFailures);
            
            createSwordBreakEffect(); // 검 부서지는 효과
            
            // Play failure sound
            if (failureSound) {
                failureSound.volume = sfxVolume;
                failureSound.currentTime = 0;
                failureSound.play().catch(error => {
                    console.log('Failure sound play failed:', error);
                });
            }
            
            gameContainer.classList.add('failure-animation');
            gameContainer.addEventListener('animationend', () => {
                gameContainer.classList.remove('failure-animation');
            }, { once: true });

            if (preventionTicketCount > 0) {
                if (autoUsePreventionTicket) {
                    // 자동사용 ON: 바로 방지권 사용
                    preventionTicketCount--;
                    totalPreventionTicketsUsed++;
                    resultMessageElement.textContent = `강화 실패! 자동으로 방지권을 사용하여 레벨을 유지합니다.`;
                    resultMessageElement.style.color = '#f1c40f';
                    updateUI();
                } else {
                    // 자동사용 OFF: 기존처럼 확인 버튼 표시
                    strengthenButton.style.display = 'none';
                    sellButton.style.display = 'none';
                    confirmationButtons.style.display = 'flex';
                    resultMessageElement.textContent = `강화 실패! 강화 실패 방지권을 사용하시겠습니까? (보유: ${preventionTicketCount}개)`;
                    resultMessageElement.style.color = '#f1c40f';
                }
            } else {
                resultMessageElement.textContent = '강화에 실패하여 1레벨으로 돌아갑니다...';
                resultMessageElement.style.color = '#e74c3c';
                currentLevel = 1; // Reset level
                updateUI(); // Update UI immediately if no ticket
            }
        }
        // Only updateUI here if no confirmation is needed, otherwise handleConfirmation will call it
        if (isSuccess || preventionTicketCount === 0 || autoUsePreventionTicket) { // If success or no ticket or auto-use, update UI immediately
            updateAchievements();
            updateUI();
        }
    });
        
    sellButton.addEventListener('click', () => {
        const soldPrice = swordPrices[currentLevel - 1];
        currentGold += soldPrice;
        totalSwordsSold++;
        currentLevel = 1; // Reset level after selling
        
        // Play sell sound
        if (sellSound) {
            sellSound.currentTime = 0;
            sellSound.play().catch(error => {
                console.log('Sell sound play failed:', error);
            });
        }
        
        resultMessageElement.textContent = `검을 판매하여 ${soldPrice.toLocaleString()} G를 획득했습니다!`;
        resultMessageElement.style.color = '#f1c40f'; // Gold color for sell message
        updateAchievements();
        updateUI();
    });
        
    buyPreventionTicketButton.addEventListener('click', () => {
        if (isCheatActive || currentGold >= preventionTicketPrice) {
            if (!isCheatActive) {
                currentGold -= preventionTicketPrice;
            }
            preventionTicketCount++;
            
            // Play buy sound
            if (buySound) {
                buySound.currentTime = 0;
                buySound.play().catch(error => {
                    console.log('Buy sound play failed:', error);
                });
            }
            
            resultMessageElement.textContent = `강화 실패 방지권을 구매했습니다! (보유: ${preventionTicketCount}개)`;
            resultMessageElement.style.color = '#2ecc71';
            
            // Increase price by 50% for next purchase
            preventionTicketPrice = Math.floor(preventionTicketPrice * 1.5);
        } else {
            resultMessageElement.textContent = '골드가 부족하여 구매할 수 없습니다!';
            resultMessageElement.style.color = '#e74c3c';
        }
        updateUI();
    });
    
    // 행운의 부적 구매
    buyLuckCharmButton.addEventListener('click', () => {
        const price = 500000;
        if (isCheatActive || currentGold >= price) {
            if (!isCheatActive) {
                currentGold -= price;
            }
            luckCharmCount++;
            
            if (buySound) {
                buySound.currentTime = 0;
                buySound.play().catch(error => console.log('Buy sound failed:', error));
            }
            
            resultMessageElement.textContent = `행운의 부적을 구매했습니다! 다음 강화 성공률 +10%`;
            resultMessageElement.style.color = '#f39c12';
        } else {
            resultMessageElement.textContent = '골드가 부족합니다!';
            resultMessageElement.style.color = '#e74c3c';
        }
        updateUI();
    });
    

    
    // 신비한 주사위 구매
    buyDiceButton.addEventListener('click', () => {
        const price = 1000000;
        if (isCheatActive || currentGold >= price) {
            if (!isCheatActive) {
                currentGold -= price;
            }
            
            const minLevel = 1;
            const maxLevel = Math.min(currentLevel + 5, 100);
            const randomLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
            
            if (buySound) {
                buySound.currentTime = 0;
                buySound.play().catch(error => console.log('Buy sound failed:', error));
            }
            
            totalDiceUsed++;
            
            if (randomLevel > currentLevel) {
                currentLevel = randomLevel;
                if (currentLevel > maxLevelAchieved) {
                    maxLevelAchieved = currentLevel;
                }
                resultMessageElement.textContent = `주사위 결과: ${randomLevel}레벨! 대성공!`;
                resultMessageElement.style.color = '#2ecc71';
            } else if (randomLevel === currentLevel) {
                resultMessageElement.textContent = `주사위 결과: ${randomLevel}레벨... 현상유지`;
                resultMessageElement.style.color = '#f39c12';
            } else {
                currentLevel = randomLevel;
                resultMessageElement.textContent = `주사위 결과: ${randomLevel}레벨... 레벨 하락!`;
                resultMessageElement.style.color = '#e74c3c';
            }
        } else {
            resultMessageElement.textContent = '골드가 부족합니다!';
            resultMessageElement.style.color = '#e74c3c';
        }
        updateUI();
    });

        
    // Price reset timer
    setInterval(() => {
        priceResetTimer--;
        if (priceResetTimer <= 0) {
            preventionTicketPrice = 100000; // Reset to base price
            priceResetTimer = 60; // Reset timer
            resultMessageElement.textContent = '강화방지권 가격이 초기화되었습니다!';
            resultMessageElement.style.color = '#3498db';
        }
        updateUI();
    }, 1000);

    // Initial setup
    confirmationButtons.style.display = 'none'; // Hide confirmation buttons initially
    strengthenButton.style.display = 'inline-block'; // Ensure visible
    sellButton.style.display = 'inline-block'; // Ensure visible
    initAchievements();
    updateUI();

    // Cheat code handling
    cheatCodeSubmit.addEventListener('click', () => {
        const code = cheatCodeInput.value.trim();
        if (code === '유강민') {
            isCheatActive = true;
            currentGold = Infinity;
            cheatCodeInput.value = '';
            cheatCodeInput.placeholder = '코드 활성화!';
            cheatCodeInput.style.borderColor = '#f1c40f';
            updateUI();
        } else {
            cheatCodeInput.value = '';
            cheatCodeInput.placeholder = '잘못된 코드';
            cheatCodeInput.style.borderColor = '#e74c3c';
            setTimeout(() => {
                cheatCodeInput.placeholder = '코드 입력...';
                cheatCodeInput.style.borderColor = '#2c3e50';
            }, 2000);
        }
    });
    
    cheatCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            cheatCodeSubmit.click();
        }
    });
    
    // 검 도감 이벤트
    swordCollectionButton.addEventListener('click', openSwordCollection);
    closeCollectionButton.addEventListener('click', closeSwordCollection);
    
    // 업적 이벤트
    achievementButton.addEventListener('click', () => {
        achievementModal.style.display = 'flex';
    });
    closeAchievementButton.addEventListener('click', () => {
        achievementModal.style.display = 'none';
    });
    
    // 설정 이벤트
    settingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });
    closeSettingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    
    // 모달 외부 클릭 시 닫기
    swordCollectionModal.addEventListener('click', (e) => {
        if (e.target === swordCollectionModal) {
            closeSwordCollection();
        }
    });
    achievementModal.addEventListener('click', (e) => {
        if (e.target === achievementModal) {
            achievementModal.style.display = 'none';
        }
    });
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Volume control
    let bgmVolume = 0.3;
    let sfxVolume = 0.5;
    
    function updateAllAudioVolumes() {
        if (backgroundMusic) backgroundMusic.volume = bgmVolume;
        if (startSound) startSound.volume = sfxVolume;
        if (successSound) successSound.volume = sfxVolume;
        if (failureSound) failureSound.volume = sfxVolume;
        if (sellSound) sellSound.volume = sfxVolume;
        if (buySound) buySound.volume = sfxVolume;
        if (achievementSound) achievementSound.volume = sfxVolume;
    }
    
    bgmVolumeSlider.addEventListener('input', (e) => {
        bgmVolume = e.target.value / 100;
        bgmVolumeDisplay.textContent = e.target.value;
        if (backgroundMusic) backgroundMusic.volume = bgmVolume;
    });
    
    sfxVolumeSlider.addEventListener('input', (e) => {
        sfxVolume = e.target.value / 100;
        sfxVolumeDisplay.textContent = e.target.value;
        updateAllAudioVolumes();
    });

    // Background music handling
    const backgroundMusic = document.getElementById('background-music');
    
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            console.log('Start button clicked');
            startOverlay.style.display = 'none';
            if (startSound) {
                startSound.volume = sfxVolume;
                startSound.play().catch(error => console.log('Start sound failed:', error));
            }
            if (backgroundMusic) {
                backgroundMusic.volume = bgmVolume;
                backgroundMusic.play().catch(error => console.log('Music play failed:', error));
            }
        });
    }
});