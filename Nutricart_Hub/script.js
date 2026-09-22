const state = {
  screen:'home',
  mode:'dock',
  budget:60,
  spent:0,
  priority:'price',
  chosenMeal:'Chicken Stir Fry',
  detached:false,
  items:[
    {name:'Chicken', by:'Recipe', qty:'1 pack', price:8.00, done:false},
    {name:'Capsicum', by:'Recipe', qty:'2', price:3.50, done:false},
    {name:'Broccoli', by:'Recipe', qty:'1', price:2.80, done:false},
    {name:'Milk', by:'Alex', qty:'1 bottle', price:3.40, done:false},
    {name:'Eggs', by:'Alex', qty:'1 dozen', price:5.60, done:false},
    {name:'Yoghurt', by:'Jess', qty:'1 tub', price:4.00, done:false},
    {name:'Bread', by:'You', qty:'1 loaf', price:3.50, done:false}
  ],
  customItems:[]
};

const screens = {
  home:{
    title:'Household Home',
    purpose:'Tests whether the shared device makes sense as a household planning point before anyone leaves for the store.',
    prompts:['What would you look at first?','Would this be useful in a shared kitchen?','Is anything here unnecessary?','Would you trust the information other housemates add?']
  },
  list:{
    title:'Shared Shopping List',
    purpose:'Tests whether shared ownership, quantities and who-added-what help coordination without becoming too complicated.',
    prompts:['Would you want to know who added each item?','Would priority labels help?','What would you add or remove from this view?']
  },
  meals:{
    title:'Meal Board',
    purpose:'Tests meal inspiration without using a social feed. The emphasis is cost, time and servings rather than a universal healthy label.',
    prompts:['Which details matter before choosing a meal?','Would you use suggestions from housemates?','Would you want to add your own meal?']
  },
  recipe:{
    title:'Recipe to Shopping List',
    purpose:'Tests whether turning a chosen meal into concrete ingredients reduces the effort of deciding what to buy.',
    prompts:['Would you check what is already at home?','Would you edit the ingredients before adding them?','Is this more useful than browsing recipes while already in-store?']
  },
  requests:{
    title:'Housemate Requests',
    purpose:'Tests social context as practical coordination rather than likes, feeds or leaderboards.',
    prompts:['Would housemates actually leave notes like this?','Which types of request would be useful?','Would this replace messages you currently send?']
  },
  ready:{
    title:'Ready to Shop',
    purpose:'Tests whether a short transition screen gives the shopper enough information before leaving home.',
    prompts:['Is this enough preparation before leaving?','Would you set a budget here?','Would you want any other reminder before detaching the unit?']
  },
  shopping:{
    title:"Today's Shop",
    purpose:'Tests low-effort in-store support: list first, budget visible, minimal interaction.',
    prompts:['Would this slow you down or help?','Would you actually tick items off?','Is the budget visible enough without becoming stressful?']
  },
  compare:{
    title:'Product Compare',
    purpose:'Tests user-controlled comparison instead of telling the shopper which product is healthy.',
    prompts:['Which row would you look at first?','Would you change the priority button during a real shop?','Is any information missing?']
  },
  social:{
    title:'Housemate Suggestion',
    purpose:'Tests whether recommendations are useful when they come from a trusted person and are directly relevant to the current purchase.',
    prompts:['Would this influence your choice?','Whose recommendations would you trust?','Should this appear automatically or only when requested?']
  },
  alerts:{
    title:'Context Alerts',
    purpose:'Tests whether deal information and already-at-home reminders are useful at the decision point.',
    prompts:['Would either alert change what you buy?','Would these become annoying if they appeared too often?','Which alert is more useful?']
  },
  split:{
    title:'Split Shop',
    purpose:'Tests coordination for two people shopping at once without needing a phone-based shared list.',
    prompts:['Would you actually divide a shop like this?','Should items disappear when the other person gets them?','Would this be useful with a partner or flatmate?']
  },
  summary:{
    title:'Shop Summary',
    purpose:'Tests whether the device can close the shopping task without turning it into health tracking or performance scoring.',
    prompts:['Would you care about this summary?','What would you want carried back to the Home Dock?','Is anything here unnecessary?']
  }
};

function money(v){ return '$'+v.toFixed(2); }
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove('show'),1500);
}
function updateSidebar(){
  document.querySelectorAll('.nav-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.screen===state.screen);
  });
}
function setScreen(screen, mode){
  state.screen=screen; state.mode=mode || (['home','list','meals','recipe','requests','ready'].includes(screen)?'dock':'cart');
  render();
}
document.querySelectorAll('.nav-btn').forEach(b=>{
  b.addEventListener('click',()=>setScreen(b.dataset.screen,b.dataset.mode));
});

function render(){
  updateSidebar();
  const s=screens[state.screen];
  document.getElementById('pageTitle').textContent=s.title;
  document.getElementById('testPurpose').textContent=s.purpose;
  document.getElementById('deviceWrap').innerHTML = state.mode==='dock' ? dockShell(renderDockScreen()) : cartShell(renderCartScreen());
}
function dockShell(inner){
  return `<div class="dock">
    <div class="dock-header"><strong>NutriCart Hub</strong><span class="dock-badge">HOME DOCK</span></div>
    <div class="screen">${inner}</div>
  </div>`;
}
function cartShell(inner){
  return `<div class="cart-unit"><div class="clip"></div>
    <div class="dock-header"><strong>NutriCart</strong><span class="dock-badge">CART UNIT</span></div>
    <div class="cart-screen">${inner}</div>
  </div>`;
}
function renderDockScreen(){
  if(state.screen==='home') return homeScreen();
  if(state.screen==='list') return listScreen();
  if(state.screen==='meals') return mealsScreen();
  if(state.screen==='recipe') return recipeScreen();
  if(state.screen==='requests') return requestsScreen();
  return readyScreen();
}
function renderCartScreen(){
  if(state.screen==='shopping') return shoppingScreen();
  if(state.screen==='compare') return compareScreen();
  if(state.screen==='social') return socialScreen();
  if(state.screen==='alerts') return alertsScreen();
  if(state.screen==='split') return splitScreen();
  return summaryScreen();
}

function homeScreen(){
  return `
    <div class="home-prototype">

      <div class="home-prototype-title">
        NutriCart<br>Hub
      </div>

      <div class="home-prototype-grid">

        <button class="home-menu-card" onclick="setScreen('meals','dock')">
          <div class="home-menu-icon">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 53S10 41 10 23c0-8 6-13 13-13 5 0 8 3 9 6 2-3 5-6 10-6 7 0 13 5 13 13 0 18-23 30-23 30Z"/>
            </svg>
          </div>
          <span>Meals</span>
        </button>

        <button class="home-menu-card" onclick="setScreen('list','dock')">
          <div class="home-menu-icon">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <rect x="16" y="12" width="34" height="43" rx="2"/>
              <path d="M25 12V8h16v4"/>
              <path d="M24 25h18M24 34h18M24 43h18"/>
            </svg>
          </div>
          <span>Shopping<br>List</span>
        </button>

        <button class="home-menu-card" onclick="setScreen('requests','dock')">
          <div class="home-menu-icon">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="22" r="8"/>
              <circle cx="16" cy="27" r="6"/>
              <circle cx="48" cy="27" r="6"/>
              <path d="M20 49c1-10 6-15 12-15s11 5 12 15"/>
              <path d="M5 49c1-8 5-12 11-12 3 0 5 1 7 3"/>
              <path d="M59 49c-1-8-5-12-11-12-3 0-5 1-7 3"/>
            </svg>
          </div>
          <span>Household</span>
        </button>

        <button class="home-menu-card start-card" onclick="setScreen('ready','dock')">
          <div class="home-menu-icon">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M23 13l27 19-27 19Z"/>
            </svg>
          </div>
          <span>Start<br>Shopping</span>
        </button>

      </div>

    </div>
  `;
}
function listScreen(){
  const all=[...state.items,...state.customItems];
  return `
    <h3>Shared Shopping List</h3>
    <div class="sub">Items from the household and selected meals.</div>
    <div class="panel">
      <div class="list">${all.map((i,idx)=>`
        <div class="list-item">
          <div class="check"></div>
          <div><strong>${i.name}</strong><div class="tiny">Added by ${i.by || 'You'} · ${i.qty || '1'}</div></div>
          <span class="tag">${i.by==='Recipe'?'MEAL':'HOUSEHOLD'}</span>
        </div>`).join('')}</div>
    </div>
    <div class="divider"></div>
    <h4>Add an item</h4>
    <div class="input-row"><input id="newItem" placeholder="e.g. Coffee"><button class="btn" onclick="addItem()">Add</button></div>
    <div class="btn-row"><button class="btn" onclick="setScreen('home','dock')">Back home</button><button class="btn primary" onclick="setScreen('ready','dock')">Continue</button></div>
  `;
}
function mealsScreen(){
  const meals=[
    ['Chicken Stir Fry','Jess','$15','20 mins','3 servings'],
    ['Pasta','Alex','$10','15 mins','4 servings'],
    ['Burrito Bowls','You','$18','25 mins','3 servings']
  ];
  return `
    <h3>Meal Board</h3>
    <div class="sub">Household suggestions shown with practical details, not a healthy score.</div>
    ${meals.map(m=>`
      <div class="meal-card">
        <strong>${m[0]}</strong>
        <div class="tiny">Suggested by ${m[1]}</div>
        <div class="meta">${m[2]} · ${m[3]} · ${m[4]}</div>
        <button class="btn" onclick="chooseMeal('${m[0]}')">${state.chosenMeal===m[0]?'Selected':'Choose meal'}</button>
      </div>`).join('')}
    <div class="btn-row"><button class="btn" onclick="setScreen('home','dock')">Back</button><button class="btn primary" onclick="setScreen('recipe','dock')">View selected recipe</button></div>
  `;
}
function recipeScreen(){
  return `
    <h3>${state.chosenMeal}</h3>
    <div class="sub">Convert a chosen meal into the things the household actually needs to buy.</div>
    <div class="split-cols">
      <div class="panel">
        <h4>Ingredients</h4>
        <p>Chicken</p><p>Rice</p><p>Capsicum</p><p>Broccoli</p><p>Soy sauce</p>
      </div>
      <div class="panel">
        <h4>Already at home</h4>
        <p>Rice</p><p>Soy sauce</p>
        <div class="divider"></div>
        <h4>Need to buy</h4>
        <p>Chicken</p><p>Capsicum</p><p>Broccoli</p>
      </div>
    </div>
    <div class="btn-row">
      <button class="btn" onclick="setScreen('meals','dock')">Back to meals</button>
      <button class="btn primary" onclick="recipeToList()">Add needed items to list</button>
    </div>
  `;
}
function requestsScreen(){
  return `
    <h3>Housemate Requests</h3>
    <div class="sub">Practical notes for the next person who shops.</div>
    <div class="panel"><p><strong>Jess</strong></p><p>"If you see the cheap Greek yoghurt, grab one."</p></div>
    <div class="panel" style="margin-top:10px"><p><strong>Alex</strong></p><p>"We still have rice, don't buy more."</p></div>
    <div class="panel" style="margin-top:10px"><p><strong>You</strong></p><p>"Need something quick for lunch."</p></div>
    <div class="btn-row"><button class="btn" onclick="setScreen('home','dock')">Back home</button><button class="btn primary" onclick="setScreen('ready','dock')">Continue</button></div>
  `;
}
function readyScreen(){
  return `
    <h3>Ready to Shop</h3>
    <div class="sub">Last check before the smaller unit leaves the kitchen.</div>
    <div class="panel">
      <p><strong>${state.items.length + state.customItems.length} items</strong></p>
      <p>Estimated household budget: <strong>$${state.budget}</strong></p>
      <p>Meal: <strong>${state.chosenMeal}</strong></p>
      <p>Housemate requests: <strong>2</strong></p>
      <p class="muted">The in-store view will only show the information needed while shopping.</p>
    </div>
    <div class="btn-row"><button class="btn" onclick="setScreen('list','dock')">Review list</button><button class="btn primary" onclick="openDetach()">Detach Cart Unit</button></div>
  `;
}
function shoppingScreen(){
  const all=[...state.items,...state.customItems];
  const spentPct=Math.min(100,(state.spent/state.budget)*100);
  return `
    <h3>Today's Shop</h3>
    <div class="panel">
      <strong>Budget</strong>
      <div class="budget-track"><div class="budget-fill" style="width:${spentPct}%"></div></div>
      <div><strong>${money(state.spent)}</strong> / $${state.budget}</div>
      <div class="tiny">${money(Math.max(0,state.budget-state.spent))} remaining</div>
    </div>
    <div class="divider"></div>
    <div class="list">${all.map((i,idx)=>`
      <div class="list-item">
        <button class="check ${i.done?'done':''}" onclick="toggleItem(${idx})">${i.done?'✓':''}</button>
        <div><strong>${i.name}</strong><div class="tiny">${i.qty || '1'} ${i.price? '· '+money(i.price):''}</div></div>
        <span class="tag">${i.by || 'You'}</span>
      </div>`).join('')}</div>
    <div class="divider"></div>
    <div class="btn-row">
      <button class="btn" onclick="setScreen('compare','cart')">Compare products</button>
      <button class="btn" onclick="setScreen('alerts','cart')">Check alerts</button>
      <button class="btn primary" onclick="setScreen('summary','cart')">Finish shop</button>
    </div>
  `;
}
function compareScreen(){
  const p=state.priority;
  const rows = p==='price'
    ? [['Price','$4.00','$5.20'],['Per 100 g','$0.80','$1.04'],['Protein','8 g','15 g'],['Sugar','9 g','4 g']]
    : p==='nutrition'
    ? [['Protein','8 g','15 g'],['Sugar','9 g','4 g'],['Price','$4.00','$5.20'],['Per 100 g','$0.80','$1.04']]
    : [['Preparation','Need to cook','Ready to eat'],['Price','$4.00','$5.20'],['Protein','8 g','15 g'],['Sugar','9 g','4 g']];
  return `
    <h3>Compare</h3>
    <div class="priority">
      <button class="${p==='price'?'active':''}" onclick="setPriority('price')">PRICE</button>
      <button class="${p==='time'?'active':''}" onclick="setPriority('time')">TIME</button>
      <button class="${p==='nutrition'?'active':''}" onclick="setPriority('nutrition')">NUTRITION</button>
    </div>
    <table class="compare">
      <tr><th></th><th>Product A</th><th>Product B</th></tr>
      ${rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
    </table>
    <div class="btn-row">
      <button class="btn primary" onclick="showToast('Product A selected')">Choose A</button>
      <button class="btn primary" onclick="showToast('Product B selected')">Choose B</button>
    </div>
    <div class="divider"></div>
    <button class="btn" onclick="setScreen('shopping','cart')">Back to list</button>
  `;
}
function socialScreen(){
  return `
    <h3>Jess recommended</h3>
    <div class="panel">
      <p><strong>Tomato sauce</strong></p>
      <p>"Get the cheaper Woolworths one. I used it last time and it was fine."</p>
    </div>
    <div class="btn-row">
      <button class="btn accent" onclick="showToast('Suggestion used')">Use suggestion</button>
      <button class="btn" onclick="showToast('Suggestion ignored')">Ignore</button>
    </div>
    <div class="divider"></div>
    <button class="btn" onclick="setScreen('shopping','cart')">Back to shop</button>
  `;
}
function alertsScreen(){
  return `
    <h3>Context Alerts</h3>
    <div class="panel">
      <h4>Deal nearby</h4>
      <p><strong>Chicken breast</strong></p>
      <p>Usually $12</p>
      <p>Today $8</p>
      <button class="btn" onclick="showToast('Deal saved to list')">Use this deal</button>
    </div>
    <div class="panel" style="margin-top:12px">
      <h4>Already at home</h4>
      <p><strong>Rice</strong></p>
      <p>Alex marked: "About half a bag left."</p>
      <div class="btn-row"><button class="btn" onclick="showToast('Rice kept on list')">Still add</button><button class="btn" onclick="showToast('Rice removed from list')">Skip</button></div>
    </div>
    <div class="btn-row"><button class="btn" onclick="setScreen('social','cart')">View housemate suggestion</button><button class="btn" onclick="setScreen('shopping','cart')">Back to shop</button></div>
  `;
}
function splitScreen(){
  return `
    <h3>Split Shop</h3>
    <div class="split-cols">
      <div class="panel">
        <h4>You</h4>
        <p>Chicken</p><p>Milk</p><p>Bread</p>
      </div>
      <div class="panel">
        <h4>Jess</h4>
        <p>Capsicum</p><p>Broccoli</p><p>Eggs</p><p>Yoghurt</p>
      </div>
    </div>
    <div class="divider"></div>
    <button class="btn" onclick="setScreen('shopping','cart')">Back to shop</button>
  `;
}
function summaryScreen(){
  const done=[...state.items,...state.customItems].filter(i=>i.done).length;
  const total=state.items.length+state.customItems.length;
  return `
    <h3>Shop Complete</h3>
    <div class="panel">
      <p><strong>${done} / ${total} items completed</strong></p>
      <p>Spent: <strong>${money(state.spent)}</strong></p>
      <p>Budget: <strong>$${state.budget}</strong></p>
      <p>Remaining: <strong>${money(Math.max(0,state.budget-state.spent))}</strong></p>
      <p>Meal ingredients: <strong>${done>=3?'Mostly complete':'Still incomplete'}</strong></p>
    </div>
    <div class="btn-row">
      <button class="btn" onclick="setScreen('shopping','cart')">Back to list</button>
      <button class="btn primary" onclick="returnDock()">Return Cart Unit to Dock</button>
    </div>
  `;
}

function setBudget(){
  const v=Number(document.getElementById('budgetInput').value);
  if(v>0){state.budget=v;showToast('Budget updated');render();}
}
function addItem(){
  const el=document.getElementById('newItem');
  const name=el.value.trim();
  if(!name)return;
  state.customItems.push({name,by:'You',qty:'1',price:0,done:false});
  showToast(name+' added');
  render();
}
function chooseMeal(name){state.chosenMeal=name;showToast(name+' selected');render();}
function recipeToList(){showToast('Needed ingredients added to shared list');setScreen('list','dock');}
function openDetach(){
  document.getElementById('modalBudget').textContent='$'+state.budget;
  document.getElementById('detachOverlay').classList.add('show');
}
function closeOverlay(){document.getElementById('detachOverlay').classList.remove('show');}
function detachUnit(){state.detached=true;closeOverlay();setScreen('shopping','cart');showToast('Cart Unit detached');}
function toggleItem(idx){
  const all=[...state.items,...state.customItems];
  const item=all[idx];
  item.done=!item.done;
  if(item.price) state.spent += item.done ? item.price : -item.price;
  if(state.spent<0)state.spent=0;
  render();
}
function setPriority(p){state.priority=p;render();}
function returnDock(){
  state.detached=false;
  showToast('Cart Unit returned to kitchen dock');
  setTimeout(()=>setScreen('home','dock'),300);
}

render();
