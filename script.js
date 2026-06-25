/* ========================================
   EcoVision AI - JavaScript Interactions
   Interactive Features & Animations
   ======================================== */

// ============== AI Responses Database ==============
const aiResponses = {
    'dustbin|waste|trash|garbage|rubbish': {
        title: 'Waste Management Optimization',
        response: `I've analyzed your waste management challenge. Here are AI-powered recommendations:\n\n
        1. **Smart Collection Planning**: Implement IoT sensors in dustbins to detect fill levels. This optimizes collection routes and reduces unnecessary trips.\n
        2. **Waste Segregation**: Use ML algorithms to identify waste types at source, improving recycling rates by 35-40%.\n
        3. **Peak Hours Analysis**: Deploy bins near common areas during peak hours to prevent overflow.\n
        4. **Expected Impact**: 45% waste reduction, improved campus cleanliness, reduced collection costs.`,
        icon: 'fas fa-trash-alt'
    },
    'electricity|energy|power|light|consumption': {
        title: 'Energy Conservation Strategy',
        response: `I've developed a comprehensive energy optimization plan:\n\n
        1. **Smart Lighting**: Install motion-sensor LED lights in common areas. This reduces energy by 40-50%.\n
        2. **Peak Load Management**: Analyze consumption patterns and shift non-essential loads to off-peak hours.\n
        3. **HVAC Optimization**: Use AI to predict optimal temperatures based on occupancy and weather.\n
        4. **Renewable Integration**: Propose solar panel installation for 30% of electricity needs.\n
        5. **Expected Savings**: 35% reduction in electricity bills, 2000+ tons CO2 avoided annually.`,
        icon: 'fas fa-bolt'
    },
    'water|washroom|tap|shower|leak': {
        title: 'Water Conservation Initiative',
        response: `I've identified water-saving opportunities across your campus:\n\n
        1. **Leak Detection**: Deploy IoT sensors to detect leaks in real-time. Early detection saves 40% water waste.\n
        2. **Smart Taps**: Install aerators and sensors in all washrooms to reduce flow rates by 50%.\n
        3. **Rainwater Harvesting**: Design rainwater collection systems for landscaping and toilet flushing.\n
        4. **Consumption Optimization**: AI monitors usage patterns and alerts on abnormal spikes.\n
        5. **Expected Impact**: 42% water conservation, 15 lakh liters saved annually, reduced water bills.`,
        icon: 'fas fa-droplet'
    },
    'air|quality|pollution|emission|green': {
        title: 'Air Quality & Environmental Awareness',
        response: `I've created an environmental improvement strategy:\n\n
        1. **Air Quality Monitoring**: Deploy IoT sensors across campus to monitor AQI levels continuously.\n
        2. **Green Campus Initiative**: Plant 500+ trees focusing on pollution-absorbing species.\n
        3. **Vehicle Emissions**: Encourage electric vehicles through incentives and EV charging stations.\n
        4. **Awareness Programs**: Daily environmental tips and sustainability challenges for the community.\n
        5. **Carbon Offset**: Calculate and offset carbon footprint through tree-planting initiatives.\n
        6. **Expected Impact**: 40% AQI improvement, enhanced campus greenery, 89% community awareness.`,
        icon: 'fas fa-wind'
    },
    'recommendation|suggestion|help|advice': {
        title: 'Comprehensive Sustainability Audit',
        response: `Let me conduct a holistic sustainability assessment for your campus:\n\n
        1. **Energy Audit**: Comprehensive analysis of all energy-consuming systems (HVAC, lighting, appliances).\n
        2. **Water Audit**: Identify water waste sources and high-consumption areas.\n
        3. **Waste Analysis**: Sort waste streams and optimize recycling programs.\n
        4. **Carbon Footprint**: Calculate total emissions from operations and identify reduction opportunities.\n
        5. **Stakeholder Engagement**: Plan awareness campaigns and sustainability training programs.\n
        6. **ROI Calculation**: Show cost-benefit analysis for all recommendations with payback periods.`,
        icon: 'fas fa-lightbulb'
    }
};

const defaultResponse = {
    title: 'Sustainability Inquiry',
    response: `Thank you for your question! I'm analyzing your sustainability challenge.\n\n
    Based on EcoVision AI's comprehensive analysis, I recommend:\n\n
    1. **Data Collection**: Start by monitoring current resource usage patterns.\n
    2. **Baseline Assessment**: Establish KPIs for waste, energy, water, and emissions.\n
    3. **Implementation**: Deploy AI-driven solutions based on the priority areas.\n
    4. **Continuous Monitoring**: Track progress and adjust strategies based on real-time data.\n\n
    For specific guidance, please share details about:\n
    - Current waste management challenges\n
    - Energy consumption concerns\n
    - Water usage patterns\n
    - Environmental awareness goals`,
    icon: 'fas fa-robot'
};

// ============== DOM Elements ==============
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// ============== Chat Functionality ==============
function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;

    // Add user message to chat
    addUserMessage(message);
    
    // Clear input
    userInput.value = '';
    
    // Simulate typing indicator
    showTypingIndicator();
    
    // Get AI response after a delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = getAIResponse(message);
        addBotMessage(response);
    }, 1500);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function handleExampleQuery(query) {
    userInput.value = query;
    sendMessage();
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message fade-in-up';
    messageElement.innerHTML = `
        <div class="message-avatar" style="background: linear-gradient(135deg, #3b82f6, #1e40af); margin-left: auto; margin-right: var(--spacing-md);">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content" style="background: rgba(59, 130, 246, 0.1); border-left-color: #3b82f6;">
            ${escapeHtml(message)}
        </div>
    `;
    chatMessages.appendChild(messageElement);
    scrollChatToBottom();
}

function addBotMessage(response) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message fade-in-up';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="${response.icon}"></i>
        </div>
        <div class="message-content">
            <strong style="color: #10b981;">${response.title}</strong><br><br>
            ${response.response.replace(/\n/g, '<br>')}
        </div>
    `;
    chatMessages.appendChild(messageElement);
    scrollChatToBottom();
}

function showTypingIndicator() {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.id = 'typing-indicator';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <span style="display: inline-flex; gap: 4px;">
                <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1.4s infinite;"></span>
                <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></span>
                <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1.4s infinite 0.4s;"></span>
            </span>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    scrollChatToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keywords, response] of Object.entries(aiResponses)) {
        const keywordArray = keywords.split('|');
        if (keywordArray.some(keyword => lowerMessage.includes(keyword))) {
            return response;
        }
    }
    
    return defaultResponse;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============== Scroll Animations ==============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = entry.target.className.split(' ').slice(1).join(' ') + ' 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-down').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============== Counter Animation ==============
function animateCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    counterElements.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 50);
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                counter.textContent = targetValue;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(currentValue);
            }
        }, 50);
    });
}

// Trigger counter animation when impact section comes into view
const impactSection = document.getElementById('impact');
if (impactSection) {
    const impactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !entries[0].target.classList.contains('counted')) {
            animateCounters();
            entries[0].target.classList.add('counted');
        }
    }, { threshold: 0.5 });
    
    impactObserver.observe(impactSection);
}

// ============== Mobile Menu ==============
hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(!expanded));
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // close mobile menu after navigation
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
    });
});

// ============== Smooth Scroll Spy ==============
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-background');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 200;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;
        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ============== Add CSS for bounce animation ==============
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-8px);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px;
        gap: 10px;
    }
`;
document.head.appendChild(style);

// ============== Form Validation ==============
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    let status = form.querySelector('.form-status');
    if (!status) {
        status = document.createElement('div');
        status.className = 'form-status';
        status.setAttribute('aria-live', 'polite');
        form.appendChild(status);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = 'Thank you! Your request has been received.';
        status.classList.remove('error');
        status.classList.add('success');
        form.reset();
        if (typeof status.focus === 'function') {
            status.focus();
        }
    });
});

// ============== Initialize tooltips with Font Awesome icons ==============
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
            `;
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// ============== Preload Images ==============
function preloadImages() {
    const imageUrls = [
        'https://via.placeholder.com/300x300?text=Sustainability'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// ============== Accessibility - Keyboard Navigation ==============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
    }
});

// ============== Performance - Lazy Loading ==============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============== Initialize on DOM Load ==============
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initializeTooltips();
});

// ============== AI Demo Buttons (Enhanced) ==============
function initDemoButtons() {
    const buttons = document.querySelectorAll('.demo-load');
    const queryText = document.getElementById('demoQueryText');
    const responseText = document.getElementById('demoResponseText');

    const demoLoading = document.getElementById('demoLoading');

    if (!buttons.length || !queryText || !responseText) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.getAttribute('data-query');
            const r = btn.getAttribute('data-response');
            // show query immediately
            queryText.textContent = q;
            // show loading animation
            if (demoLoading) {
                demoLoading.style.display = 'flex';
                demoLoading.setAttribute('aria-hidden', 'false');
            }
            responseText.textContent = '';
            // update aria-pressed on buttons for accessibility
            buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('active');
            // simulate AI response delay, then display professional response
            setTimeout(() => {
                if (demoLoading) {
                    demoLoading.style.display = 'none';
                    demoLoading.setAttribute('aria-hidden', 'true');
                }
                responseText.textContent = r;
                setTimeout(() => btn.classList.remove('active'), 300);
                // reset aria-pressed after response shown
                setTimeout(() => btn.setAttribute('aria-pressed', 'false'), 300);
            }, 900);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDemoButtons();
});

// ============== Project Impact Counters ==============
function animateStatCardNumbers(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const numbers = section.querySelectorAll('.stat-number');
    numbers.forEach(el => el.textContent = '0');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                numbers.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                    const duration = 1600;
                    const stepTime = Math.max(20, Math.floor(duration / (target || 50)));
                    let current = 0;
                    const increment = target > 0 ? Math.max(1, Math.floor(target / (duration / stepTime))) : 1;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            // If large number (>=1000) show + sign
                            if (target >= 1000) el.textContent = target + '+';
                            else el.textContent = target;
                        } else {
                            el.textContent = current;
                        }
                    }, stepTime);
                });
                obs.unobserve(section);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(section);
}

document.addEventListener('DOMContentLoaded', () => {
    animateStatCardNumbers('project-impact');
});

// ============== Error Handling ==============
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // Implement error tracking/logging here
});


// ============== Add Animation CSS Dynamically ==============
function addAnimationStyles() {
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes floatingAnimation {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .floating-element {
            animation: floatingAnimation 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .gradient-animated {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-up {
            animation: slideUp 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(animationStyle);
}

addAnimationStyles();

// ============== Advanced Features ==============

// Real-time stats update simulation
function updateStatsInRealTime() {
    const stats = document.querySelectorAll('.stat-number');
    setInterval(() => {
        stats.forEach(stat => {
            const max = parseInt(stat.getAttribute('data-count'));
            const increment = Math.floor(Math.random() * 2);
            let current = parseInt(stat.textContent);
            
            if (current < max) {
                stat.textContent = Math.min(current + increment, max);
            }
        });
    }, 5000);
}

// ============== Social Share Functionality ==============
function addShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = btn.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out EcoVision AI - AI-Powered Campus Sustainability!');
            
            let shareUrl;
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// ============== Print Functionality ==============
function setupPrintButton() {
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// ============== Initialize All Features ==============
document.addEventListener('DOMContentLoaded', () => {
    addShareButtons();
    setupPrintButton();
});

// ============== Export for potential module use ==============
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendMessage,
        handleExampleQuery,
        getAIResponse
    };
}
