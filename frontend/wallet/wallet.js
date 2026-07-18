export class AuthGuard {
    constructor(checkUrl, loginUrl) {
        this.checkUrl = checkUrl;
        this.loginUrl = loginUrl;
    }

    async verify() {
        try {
            const response = await fetch(this.checkUrl, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();

            if (data.success || data.approved) {
                return true;
            } else {
                this.redirectToLogin();
                console.error(data.error);
                return false;
            }
        } catch (err) {
            console.error("Auth check failed");
            this.redirectToLogin();
            return false;
        }
    }

    redirectToLogin() {
        window.location.href = this.loginUrl;
    }
}


window.addEventListener("DOMContentLoaded", () => {
    const auth = new AuthGuard('/authenticate', '/auth');
    const allowed = auth.verify();

    if (allowed) {
        console.log("User is authenticated");
    }
})


// --- Shared Database Source (Static Mock) ---
const transactionsDB = [
    { id: 1, title: 'French Audio Transcription', ref: 'Task ID #49281', category: 'Transcription Payout', date: 'Jul 11, 2026', amount: '₦15,000.00', type: 'credit', status: 'Completed', icon: 'credit' },
    { id: 2, title: 'Amber Auto-Invest Allocation', ref: 'Routed from Task #49281 (25%)', category: 'Investment', date: 'Jul 11, 2026', amount: '₦3,750.00', type: 'debit', status: 'Completed', icon: 'investment' },
    { id: 3, title: 'Spanish Translation Task', ref: 'Task ID #48291', category: 'Translation Payout', date: 'Jul 09, 2026', amount: '₦18,500.00', type: 'credit', status: 'Completed', icon: 'credit' },
    { id: 4, title: 'Amber Auto-Invest Allocation', ref: 'Routed from Task #48291 (25%)', category: 'Investment', date: 'Jul 09, 2026', amount: '₦4,625.00', type: 'debit', status: 'Completed', icon: 'investment' },
    { id: 5, title: 'Standard Bank Payout', ref: 'Wema Bank - 0291****29', category: 'Withdrawal', date: 'Jul 05, 2026', amount: '₦45,000.00', type: 'debit', status: 'Completed', icon: 'payout' },
    { id: 6, title: 'Hmong Conversational Audio', ref: 'Task ID #47118', category: 'Transcription Payout', date: 'Jul 01, 2026', amount: '₦9,450.00', type: 'credit', status: 'Completed', icon: 'credit' },
    { id: 7, title: 'External Card Deposit', ref: 'Visa Card **** 4291', category: 'Deposit', date: 'Jun 28, 2026', amount: '₦50,000.00', type: 'credit', status: 'Pending', icon: 'credit' }
];

const messagesDB = {
    '1': {
        subject: 'French Transcription Payout Confirmed',
        sender: 'Task Approvals Reviewer',
        email: 'reviews@amberscript.com',
        date: 'July 11, 2026',
        avatar: 'TA',
        body: `<p>Hi James,</p><br><p>Your transcription submission for <strong>French Audio Project #49281</strong> has been successfully reviewed and approved by our native language experts.</p><br><p>A transcription payout of <strong>+₦15,000.00</strong> has been processed and successfully credited to your Available Balance.</p><br><p>Because you have <strong>Amber Auto-Invest</strong> active at <strong>25%</strong>, <strong>₦3,750.00</strong> of your earnings has been automatically routed to your compounding Amber Student Savings Portfolio. The remaining ₦11,250.00 is available for immediate card purchases, transfers, or withdrawal in your virtual card balance.</p><br><p>Thank you for contributing to AmberScript!</p><br><p>Best regards,<br>The AmberScript Review Team</p>`
    },
    '2': {
        subject: 'Welcome to AmberScript Wallet!',
        sender: 'Amber Security',
        email: 'security@amberscript.com',
        date: 'June 25, 2026',
        avatar: 'AS',
        body: `<p>Welcome James!</p><br><p>Your <strong>Amber Virtual Card</strong> has been successfully created and linked to your digital workspace.</p><br><p>You can now start taking transcription and translation tasks, earn payments in real-time, deposit funds, or configure automated compounding savings plans. Your account starts on our <strong>Free Student Tier</strong>, meaning all payouts, transfers, and standard card checkouts have absolute 0% transaction fees.</p><br><p>If you have any questions, visit our Support Center or view security documentation in Settings.</p><br><p>Best regards,<br>The AmberScript Security Team</p>`
    }
};

// --- Date setup ---
const dateEl = document.getElementById('current-date');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateEl.innerText = new Date().toLocaleDateString('en-US', options);

// --- SPA Views Tab Switch Logic ---
const viewTabs = {
    'nav-dashboard': 'view-dashboard',
    'nav-transactions': 'view-ledger',
    'nav-investments': 'view-investments',
    'nav-inbox': 'view-inbox',
    'nav-settings': 'view-settings'
};

Object.entries(viewTabs).forEach(([tabId, viewId]) => {
    document.getElementById(tabId).addEventListener('click', (e) => {
        e.preventDefault();
        // Set active tab class
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');

        // Toggle visibility
        document.querySelectorAll('.wallet-view').forEach(el => el.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    });
});

// "View All Ledger" link inside dashboard grid
document.getElementById('goto-ledger-link').addEventListener('click', () => {
    document.getElementById('nav-transactions').click();
});

// --- Populate Ledger Tables ---
function renderLedgers(filterText = '', filterType = 'all') {
    const dashboardTbody = document.querySelector('#view-dashboard .ledger-rows-tbody');
    const ledgerTbody = document.querySelector('#view-ledger .ledger-rows-tbody');

    const filteredTxns = transactionsDB.filter(txn => {
        const matchesSearch = txn.title.toLowerCase().includes(filterText.toLowerCase()) ||
            txn.ref.toLowerCase().includes(filterText.toLowerCase()) ||
            txn.category.toLowerCase().includes(filterText.toLowerCase());
        const matchesFilter = filterType === 'all' || txn.type === filterType;
        return matchesSearch && matchesFilter;
    });

    function buildRowsHtml(list) {
        return list.map(txn => {
            let svgIcon = '';
            if (txn.icon === 'credit') {
                svgIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/></svg>`;
            } else if (txn.icon === 'investment') {
                svgIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
            } else if (txn.icon === 'payout') {
                svgIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>`;
            }

            const amtSign = txn.type === 'credit' ? '+' : '-';
            const amtClass = txn.type === 'credit' ? 'credit' : 'debit';
            const statusClass = txn.status.toLowerCase();

            return `
                        <tr class="ledger-row clickable-row" data-txn-id="${txn.id}" style="cursor: pointer;">
                            <td>
                                <div class="ledger-item">
                                    <div class="item-icon ${txn.icon}">
                                        ${svgIcon}
                                    </div>
                                    <div class="item-info">
                                        <p class="item-title">${txn.title}</p>
                                        <p class="item-subtitle">${txn.ref}</p>
                                    </div>
                                </div>
                            </td>
                            <td><span class="ledger-category">${txn.category}</span></td>
                            <td><span class="ledger-date">${txn.date}</span></td>
                            <td><span class="ledger-amount ${amtClass}">${amtSign}${txn.amount}</span></td>
                            <td><span class="ledger-status ${statusClass}">${txn.status}</span></td>
                        </tr>
                    `;
        }).join('');
    }

    if (dashboardTbody) {
        // Show at most 4 items on the dashboard recent transactions list
        dashboardTbody.innerHTML = buildRowsHtml(filteredTxns.slice(0, 4));
    }
    if (ledgerTbody) {
        // Show all items on the detailed ledger page
        ledgerTbody.innerHTML = buildRowsHtml(filteredTxns);
    }

    // Re-attach click listeners to rows to open receipts
    document.querySelectorAll('.clickable-row').forEach(row => {
        row.addEventListener('click', () => {
            const id = parseInt(row.dataset.txnId);
            const txn = transactionsDB.find(t => t.id === id);
            if (txn) {
                openReceiptModal(txn);
            }
        });
    });
}

// --- Receipt Modal Details Renderer ---
function openReceiptModal(txn) {
    const modal = document.getElementById('modal-receipt');
    const placeholder = document.getElementById('receipt-icon-placeholder');
    const title = document.getElementById('receipt-modal-title');
    const ref = document.getElementById('receipt-modal-ref');
    const amount = document.getElementById('receipt-modal-amount');
    const date = document.getElementById('receipt-modal-date');
    const category = document.getElementById('receipt-modal-category');
    const status = document.getElementById('receipt-modal-status');

    // Build icon
    placeholder.className = `item-icon ${txn.icon}`;
    placeholder.style.width = '56px';
    placeholder.style.height = '56px';
    placeholder.style.borderRadius = '14px';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';

    let svgIcon = '';
    if (txn.icon === 'credit') {
        svgIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8"/></svg>`;
    } else if (txn.icon === 'investment') {
        svgIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
    } else if (txn.icon === 'payout') {
        svgIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>`;
    }
    placeholder.innerHTML = svgIcon;

    // Fill text fields
    title.innerText = txn.title;
    ref.innerText = `Reference: ${txn.ref}`;
    amount.innerText = `${txn.type === 'credit' ? '+' : '-'}${txn.amount}`;
    amount.className = txn.type === 'credit' ? 'credit' : 'debit';
    date.innerText = `${txn.date}, 10:45 AM`;
    category.innerText = txn.category;
    status.innerText = txn.status;
    status.className = `ledger-status ${txn.status.toLowerCase()}`;

    modal.classList.add('visible');
}

// Add event listener for ledger search input
const searchInput = document.getElementById('ledger-search-input');
const filterButtons = document.querySelectorAll('#view-ledger .filter-btn');

searchInput.addEventListener('input', (e) => {
    const activeFilterBtn = document.querySelector('#view-ledger .filter-btn.active');
    const filterType = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    renderLedgers(e.target.value, filterType);
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLedgers(searchInput.value, btn.dataset.filter);
    });
});

// Initialize table
renderLedgers();


// --- Quick Invest Modal trigger ---
document.getElementById('btn-quick-invest-modal').addEventListener('click', () => {
    if (isCardFrozen) {
        showToast('Card is frozen. Cannot transfer funds.', 'error');
        return;
    }
    document.getElementById('modal-quick-invest').classList.add('visible');
});

document.getElementById('form-quick-invest').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('modal-quick-invest').classList.remove('visible');
    showToast('Investment processed. Balance credited.', 'success');
    e.target.reset();
});


// --- Investments Compounding Simulator Logic ---
const invInitial = document.getElementById('invest-calc-initial');
const invMonthly = document.getElementById('invest-calc-monthly');
const invInitialLbl = document.getElementById('invest-calc-initial-lbl');
const invMonthlyLbl = document.getElementById('invest-calc-monthly-lbl');
const invOutlay = document.getElementById('invest-outlay-3y');
const invYield = document.getElementById('invest-yield-3y');

const APY_RATE = 0.124;

function runCompoundingMath() {
    const p = parseFloat(invInitial.value);
    const m = parseFloat(invMonthly.value);
    invInitialLbl.innerText = `₦${p.toLocaleString()}`;
    invMonthlyLbl.innerText = `₦${m.toLocaleString()}`;

    const outlay = p + (m * 12 * 3);
    invOutlay.innerText = `₦${outlay.toLocaleString()}`;

    // Compound formula over 3 years
    const t = 3;
    const n = 12;
    const compoundPrincipal = p * Math.pow(1 + APY_RATE / n, n * t);
    let compoundAnnuity = 0;
    if (m > 0) {
        compoundAnnuity = m * ((Math.pow(1 + APY_RATE / n, n * t) - 1) / (APY_RATE / n));
    }
    const totalYield = Math.round(compoundPrincipal + compoundAnnuity);
    invYield.innerText = `₦${totalYield.toLocaleString()}`;
}

invInitial.addEventListener('input', runCompoundingMath);
invMonthly.addEventListener('input', runCompoundingMath);
runCompoundingMath();


// --- Inbox Master-Detail Controller ---
const inboxItems = document.querySelectorAll('.inbox-item');
const inboxReadingPane = document.getElementById('inbox-reading-pane');
const msgSubject = document.getElementById('msg-subject');
const msgSenderName = document.getElementById('msg-sender-name');
const msgSenderEmail = document.getElementById('msg-sender-email');
const msgDate = document.getElementById('msg-date');
const msgBody = document.getElementById('msg-body');
const inboxBadgeCount = document.getElementById('inbox-badge-count');

inboxItems.forEach(item => {
    item.addEventListener('click', () => {
        inboxItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        const id = item.dataset.msgId;
        const message = messagesDB[id];
        if (message) {
            msgSubject.innerText = message.subject;
            msgSenderName.innerText = message.sender;
            msgSenderEmail.innerText = message.email;
            msgDate.innerText = message.date;
            msgBody.innerHTML = message.body;

            // Mark as read
            if (item.classList.contains('unread')) {
                item.classList.remove('unread');
                const dot = item.querySelector('.inbox-unread-dot');
                if (dot) dot.remove();
                showToast('Message marked as read.', 'info');
                // Update badge
                let count = parseInt(inboxBadgeCount.innerText);
                if (count > 0) {
                    count--;
                    inboxBadgeCount.innerText = count;
                    if (count === 0) inboxBadgeCount.style.display = 'none';
                }
            }
        }
    });
});


// --- Settings Sub-panel Tabs Switcher ---
const settingsMenuItems = document.querySelectorAll('.settings-menu-item');
const settingsPanels = document.querySelectorAll('.settings-panel');

settingsMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        settingsMenuItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        const target = item.dataset.settingsTarget;
        settingsPanels.forEach(panel => {
            if (panel.id === target) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    });
});

// Limit slider inside Settings view
const settingsSlider = document.getElementById('settings-limit-slider');
const settingsLimitVal = document.getElementById('settings-limit-val');
settingsSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    settingsLimitVal.innerText = `₦${val.toLocaleString()}`;
});


// --- Notification Center Dropdown Controller ---
const bellBtn = document.getElementById('notification-bell-btn');
const notifDropdown = document.getElementById('notification-dropdown');
const bellBadge = document.getElementById('bell-badge');
let unreadNotificationsCount = 2; // Default starting count

// Toggle dropdown open/close
bellBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('visible');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!notifDropdown.contains(e.target) && e.target !== bellBtn) {
        notifDropdown.classList.remove('visible');
    }
});

// Mark all read action
document.getElementById('mark-all-read').addEventListener('click', () => {
    document.querySelectorAll('.notif-item').forEach(item => {
        item.classList.remove('unread');
    });
    unreadNotificationsCount = 0;
    bellBadge.style.display = 'none';
    showToast('All notifications marked as read.', 'success');
});

// Clear all notifications action
document.getElementById('clear-all-notifs').addEventListener('click', () => {
    document.getElementById('notification-list').innerHTML = `
                <div class="notif-disabled-msg" style="text-align: center; padding: 2rem; color: var(--color-text-secondary); font-size: 0.8rem;">
                    No new notifications
                </div>
            `;
    unreadNotificationsCount = 0;
    bellBadge.style.display = 'none';
    showToast('Notifications cleared.', 'info');
});

// Individual notification dismiss
document.querySelectorAll('.notif-dismiss').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = btn.closest('.notif-item');
        if (item) {
            if (item.classList.contains('unread')) {
                unreadNotificationsCount--;
                if (unreadNotificationsCount <= 0) {
                    bellBadge.style.display = 'none';
                }
            }
            item.remove();

            // Show empty state message if no items left
            if (document.querySelectorAll('.notif-item').length === 0) {
                document.getElementById('notification-list').innerHTML = `
                            <div class="notif-disabled-msg" style="text-align: center; padding: 2rem; color: var(--color-text-secondary); font-size: 0.8rem;">
                                No new notifications
                            </div>
                        `;
            }
        }
    });
});


// --- Card Freezing Mechanism ---
let isCardFrozen = false;
const debitCard = document.getElementById('debit-card');
const btnFreeze = document.getElementById('btn-freeze-card');
const freezeText = document.getElementById('freeze-text');
const freezeIconWrap = document.getElementById('freeze-icon-wrap');
const cardFrozenOverlay = document.getElementById('card-frozen-overlay');

btnFreeze.addEventListener('click', () => {
    isCardFrozen = !isCardFrozen;
    if (isCardFrozen) {
        debitCard.classList.add('frozen');
        cardFrozenOverlay.classList.add('visible');
        freezeText.innerText = 'Unfreeze Card';
        freezeIconWrap.classList.add('card-is-frozen');
        showToast('Virtual card frozen successfully.', 'warning');
    } else {
        debitCard.classList.remove('frozen');
        cardFrozenOverlay.classList.remove('visible');
        freezeText.innerText = 'Freeze Card';
        freezeIconWrap.classList.remove('card-is-frozen');
        showToast('Virtual card active and ready.', 'success');
    }
});

// --- Auto-Invest Setting UI Interactions ---
const autoinvestToggle = document.getElementById('autoinvest-toggle');
const autoinvestSettings = document.getElementById('autoinvest-settings-box');
const autoinvestDisabledMsg = document.getElementById('autoinvest-disabled-msg');
const allocationSlider = document.getElementById('autoinvest-allocation');
const allocationVal = document.getElementById('allocation-val');
const payoutSplit = document.getElementById('payout-split');
const investAutoStatusText = document.getElementById('invest-auto-status-text');

autoinvestToggle.addEventListener('change', () => {
    if (autoinvestToggle.checked) {
        autoinvestSettings.style.display = 'block';
        autoinvestDisabledMsg.style.display = 'none';
        investAutoStatusText.innerText = `Active (${allocationSlider.value}%)`;
        investAutoStatusText.className = 'val-plan success';
        showToast('Auto-invest activated.', 'success');
    } else {
        autoinvestSettings.style.display = 'none';
        autoinvestDisabledMsg.style.display = 'flex';
        investAutoStatusText.innerText = 'Inactive';
        investAutoStatusText.className = 'val-plan error';
        showToast('Auto-invest disabled.', 'info');
    }
});

allocationSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    allocationVal.innerText = `${val}%`;
    payoutSplit.innerText = `₦${val} of every ₦100 earned`;
    if (autoinvestToggle.checked) {
        investAutoStatusText.innerText = `Active (${val}%)`;
    }
});

// --- Modal Dialog Toggle Controllers ---
const openModalBtns = {
    'btn-deposit-modal': 'modal-deposit',
    'btn-withdraw-modal': 'modal-withdraw',
    'btn-transfer-modal': 'modal-transfer'
};

Object.entries(openModalBtns).forEach(([btnId, modalId]) => {
    document.getElementById(btnId).addEventListener('click', () => {
        if (isCardFrozen && (modalId === 'modal-withdraw' || modalId === 'modal-transfer')) {
            showToast('Cannot perform outgoing transactions when card is frozen!', 'error');
            return;
        }
        const modal = document.getElementById(modalId);
        modal.classList.add('visible');
    });
});

// Close logic
document.querySelectorAll('[data-close]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = element.getAttribute('data-close');
        document.getElementById(modalId).classList.remove('visible');
    });
});

// Close on overlay backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('visible');
        }
    });
});

// Form Submit preventDefault + toast feedback
const forms = {
    'form-deposit': { msg: 'Deposit processing in background.', modal: 'modal-deposit' },
    'form-withdraw': { msg: 'Withdrawal request submitted.', modal: 'modal-withdraw' },
    'form-transfer': { msg: 'Payment transferred successfully.', modal: 'modal-transfer' }
};

Object.entries(forms).forEach(([formId, data]) => {
    document.getElementById(formId).addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById(data.modal).classList.remove('visible');
        showToast(data.msg, 'success');
        e.target.reset();
    });
});

// --- Interactive SVG Chart Tooltips ---
const svgChart = document.getElementById('svg-chart');
const tooltip = document.getElementById('chart-tooltip');
const tooltipMonth = tooltip.querySelector('.tooltip-month');
const tooltipValue = tooltip.querySelector('.tooltip-value');
const chartDots = document.querySelectorAll('.chart-dot');

chartDots.forEach(dot => {
    dot.addEventListener('mouseenter', (e) => {
        const val = dot.getAttribute('data-val');
        const month = dot.getAttribute('data-month');
        const isIncome = dot.classList.contains('income');

        tooltipMonth.innerText = `${month} 2026`;
        tooltipValue.innerText = `${isIncome ? 'Earned' : 'Invested'}: ${val}`;
        tooltipValue.style.color = isIncome ? 'var(--color-accent)' : 'var(--color-investment)';

        // Position tooltip relative to chart container
        const rect = dot.getBoundingClientRect();
        const containerRect = svgChart.getBoundingClientRect();

        const leftPos = rect.left - containerRect.left + (rect.width / 2) - 60;
        const topPos = rect.top - containerRect.top - 55;

        tooltip.style.left = `${leftPos}px`;
        tooltip.style.top = `${topPos}px`;
        tooltip.classList.add('visible');
    });

    dot.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
});

// --- Toast Alert system ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Get SVGs based on alert type
    let iconSvg = '';
    if (type === 'success') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'warning') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else if (type === 'error') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
                <div class="toast-icon">${iconSvg}</div>
                <div class="toast-body">${message}</div>
            `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    // Remove after 3.5s
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}

// --- Mobile Sidebar Toggle Logic ---
const hamburgerBtn = document.getElementById('hamburger-menu-btn');
const sidebar = document.getElementById('app-sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

function toggleSidebar() {
    sidebar.classList.toggle('open');
    sidebarBackdrop.classList.toggle('open');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleSidebar);
}
if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
}
navItems.forEach(item => {
    item.addEventListener('click', closeSidebar);
});
