
class PizzaMaker {
    constructor() {
        this.selectedCrust = null;
        this.selectedSauce = null;
        this.selectedCheese = null;
        this.selectedToppings = [];
        this.droppedIngredients = [];
        this.totalPrice = 0;
        this.totalCalories = 0;
        
        // داده‌های مواد پیتزا
        this.ingredients = {
            pizza_maker: {
                sauces: [
                    {id: 1, name: "سس گوجه", price: 20000, calories: 50, image: "../images/sos.jpg", type: "sauce"},
                    {id: 2, name: "سس سفید", price: 25000, calories: 80, image: "../images/sos-sefid.jpg", type: "sauce"},
                    {id: 3, name: "سس باربیکیو", price: 30000, calories: 70, image: "../images/barbikio.jpg", type: "sauce"}
                ],
                cheeses: [
                    {id: 1, name: "پنیر پیتزا", price: 40000, calories: 150, image: "../images/panir.jpg", type: "cheese"},
                    {id: 2, name: "پنیر موزارلا", price: 45000, calories: 180, image: "../images/mozarela.jpg", type: "cheese"},
                    {id: 3, name: "پنیر چدار", price: 50000, calories: 120, image: "../images/chedar.jpg", type: "cheese"}
                ],
                toppings: [
                    {id: 1, name: "کالباس", price: 30000, calories: 100, image: "../images/kalbas.jpg", type: "topping", category: "گوشت"},
                    {id: 2, name: "پپرونی", price: 35000, calories: 120, image: "../images/peperoni.jpg", type: "topping", category: "گوشت"},
                    {id: 3, name: "مرغ", price: 40000, calories: 90, image: "../images/morgh.jpg", type: "topping", category: "گوشت"},
                    {id: 4, name: "قارچ", price: 20000, calories: 30, image: "../images/gharch.jpg", type: "topping", category: "سبزیجات"},
                    {id: 5, name: "فلفل دلمه", price: 15000, calories: 25, image: "../images/felfel.jpg", type: "topping", category: "سبزیجات"},
                    {id: 6, name: "زیتون", price: 25000, calories: 40, image: "../images/zeyton.jpg", type: "topping", category: "سبزیجات"},
                    {id: 7, name: "پیاز", price: 10000, calories: 20, image: "../images/piaz.jpg", type: "topping", category: "سبزیجات"},
                    {id: 8, name: "گوجه", price: 12000, calories: 15, image: "../images/goje.jpg", type: "topping", category: "سبزیجات"}
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        if (!this.checkRequiredElements()) {
            console.error('برخی المنت‌های مورد نیاز پیدا نشدند');
            return;
        }
        
        this.renderIngredients();
        this.setupEventListeners();
        this.updateSummary();
    }
    
    checkRequiredElements() {
        const requiredElements = [
            'sauces-list',
            'cheeses-list',
            'toppings-categories',
            'pizza-canvas',
            'selected-crust',
            'selected-sauce',
            'selected-cheese',
            'selected-toppings-list',
            'total-price',
            'total-calories'
        ];
        
        for (const id of requiredElements) {
            if (!document.getElementById(id)) {
                console.warn(`المنت با آی دی "${id}" پیدا نشد`);
                return false;
            }
        }
        
        return true;
    }
    
    renderIngredients() {
        this.renderSauces();
        this.renderCheeses();
        this.renderToppings();
        
        this.makeDraggable();
    }
    
    renderSauces() {
        const saucesList = document.getElementById('sauces-list');
        if (!saucesList) return;
        
        saucesList.innerHTML = '';
        
        this.ingredients.pizza_maker.sauces.forEach(sauce => {
            const sauceElement = this.createIngredientElement(sauce);
            sauceElement.addEventListener('click', () => this.selectSauce(sauce));
            saucesList.appendChild(sauceElement);
        });
    }
    
    renderCheeses() {
        const cheesesList = document.getElementById('cheeses-list');
        if (!cheesesList) return;
        
        cheesesList.innerHTML = '';
        
        this.ingredients.pizza_maker.cheeses.forEach(cheese => {
            const cheeseElement = this.createIngredientElement(cheese);
            cheeseElement.addEventListener('click', () => this.selectCheese(cheese));
            cheesesList.appendChild(cheeseElement);
        });
    }
    
    renderToppings() {
        const toppingsCategories = document.getElementById('toppings-categories');
        if (!toppingsCategories) return;
        
        toppingsCategories.innerHTML = '';
        
        const categories = {};
        this.ingredients.pizza_maker.toppings.forEach(topping => {
            if (!categories[topping.category]) {
                categories[topping.category] = [];
            }
            categories[topping.category].push(topping);
        });
        
        Object.keys(categories).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);
            
            const toppingsList = document.createElement('div');
            toppingsList.className = 'ingredients-list';
            
            categories[category].forEach(topping => {
                const toppingElement = this.createIngredientElement(topping);
                toppingsList.appendChild(toppingElement);
            });
            
            categoryDiv.appendChild(toppingsList);
            toppingsCategories.appendChild(categoryDiv);
        });
    }
    
    createIngredientElement(ingredient) {
        const div = document.createElement('div');
        div.className = 'ingredient-item';
        div.draggable = true;
        div.dataset.id = ingredient.id;
        div.dataset.type = ingredient.type;
        div.dataset.name = ingredient.name;
        div.dataset.price = ingredient.price;
        div.dataset.calories = ingredient.calories;
        div.dataset.image = ingredient.image;
        div.title = `${ingredient.name} - ${this.formatPrice(ingredient.price)}`;
        
        const img = document.createElement('img');
        img.src = ingredient.image;
        img.alt = ingredient.name;
        img.loading = "lazy";
        
        img.onerror = () => {
            img.style.display = 'none';
            const textSpan = document.createElement('span');
            textSpan.className = 'ingredient-text-fallback';
            textSpan.textContent = ingredient.name.substring(0, 2);
            textSpan.style.cssText = `
                font-size: 14px;
                color: #666;
                background: #f0f0f0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            `;
            div.appendChild(textSpan);
        };
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'ingredient-name';
        nameSpan.textContent = ingredient.name;
        
        const priceSpan = document.createElement('span');
        priceSpan.className = 'ingredient-price';
        priceSpan.textContent = this.formatPrice(ingredient.price);
        
        const caloriesSpan = document.createElement('span');
        caloriesSpan.className = 'ingredient-calories';
        caloriesSpan.textContent = `${ingredient.calories} کالری`;
        
        div.appendChild(img);
        div.appendChild(nameSpan);
        div.appendChild(priceSpan);
        div.appendChild(caloriesSpan);
        
        return div;
    }
    
    makeDraggable() {
        const ingredients = document.querySelectorAll('.ingredient-item');
        
        ingredients.forEach(ingredient => {
            ingredient.addEventListener('dragstart', this.handleDragStart.bind(this));
        });
        
        const pizzaCanvas = document.getElementById('pizza-canvas');
        if (!pizzaCanvas) return;
        
        pizzaCanvas.addEventListener('dragover', this.handleDragOver.bind(this));
        pizzaCanvas.addEventListener('drop', this.handleDrop.bind(this));
        pizzaCanvas.addEventListener('dragenter', this.handleDragEnter.bind(this));
        pizzaCanvas.addEventListener('dragleave', this.handleDragLeave.bind(this));
    }
    
    handleDragStart(e) {
        const imgElement = e.currentTarget.querySelector('img');
        const imageSrc = imgElement ? imgElement.src : e.currentTarget.dataset.image;
        
        const ingredientData = {
            id: e.currentTarget.dataset.id,
            type: e.currentTarget.dataset.type,
            name: e.currentTarget.dataset.name,
            price: e.currentTarget.dataset.price,
            calories: e.currentTarget.dataset.calories,
            image: imageSrc
        };
        
        e.dataTransfer.setData('application/json', JSON.stringify(ingredientData));
        e.dataTransfer.effectAllowed = 'copy';
        
        e.currentTarget.classList.add('dragging');
        
        if (imgElement) {
            e.dataTransfer.setDragImage(imgElement, 30, 30);
        }
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        if (e.target.id === 'pizza-canvas' || e.target.closest('#pizza-canvas')) {
            e.target.classList.add('drag-over');
        }
    }
    
    handleDragLeave(e) {
        if (e.target.id === 'pizza-canvas' || e.target.closest('#pizza-canvas')) {
            e.target.classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const pizzaCanvas = document.getElementById('pizza-canvas');
        pizzaCanvas.classList.remove('drag-over');
        
        try {
            const dataStr = e.dataTransfer.getData('application/json');
            if (!dataStr) {
                console.error('No data in dataTransfer');
                return;
            }
            
            const ingredient = JSON.parse(dataStr);
            
            const rect = pizzaCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            
            if (distance > centerX - 20) {
                this.showMessage('لطفا مواد را روی خود پیتزا رها کنید!', 'warning');
                return;
            }
            
            this.addIngredientToPizza(ingredient, x, y);
            
        } catch (error) {
            console.error('Error in drop:', error);
        }
        
        document.querySelectorAll('.ingredient-item.dragging').forEach(el => {
            el.classList.remove('dragging');
        });
    }
    
    addIngredientToPizza(ingredient, x, y) {
        const droppedIngredient = document.createElement('div');
        droppedIngredient.className = 'dropped-ingredient';
        droppedIngredient.style.cssText = `
            position: absolute;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            z-index: 100;
            cursor: pointer;
        `;
        droppedIngredient.dataset.name = ingredient.name;
        
        const img = document.createElement('img');
        img.src = ingredient.image;
        img.alt = ingredient.name;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            pointer-events: none;
            display: block;
        `;
        
        img.onload = () => {
            droppedIngredient.style.border = '2px solid #4caf50';
        };
        
        img.onerror = (e) => {
            const altPaths = [
                ingredient.image,
                ingredient.image.replace(window.location.origin, ''),
                '../' + ingredient.image.split('/').pop(),
                'images/' + ingredient.image.split('/').pop(),
                '../images/' + ingredient.image.split('/').pop()
            ];
            
            let loaded = false;
            altPaths.forEach(path => {
                if (loaded) return;
                
                const testImg = new Image();
                testImg.src = path;
                testImg.onload = () => {
                    img.src = path;
                    loaded = true;
                };
            });
            
            if (!loaded) {
                img.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #ff6b6b, #ffa726);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 10px;
                    text-align: center;
                    padding: 5px;
                `;
                fallback.textContent = ingredient.name;
                droppedIngredient.appendChild(fallback);
            }
        };
        
        droppedIngredient.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeIngredientFromPizza(droppedIngredient);
        });
        
        droppedIngredient.appendChild(img);
        
        const canvas = document.getElementById('pizza-canvas');
        if (canvas) {
            canvas.appendChild(droppedIngredient);
        }
        
        this.droppedIngredients.push({
            element: droppedIngredient,
            data: ingredient
        });
        
        switch(ingredient.type) {
            case 'crust':
                this.selectCrust(ingredient);
                break;
            case 'sauce':
                this.selectSauce(ingredient);
                break;
            case 'cheese':
                this.selectCheese(ingredient);
                break;
            case 'topping':
                this.addTopping(ingredient);
                break;
        }
        
        this.updateSummary();
        this.showMessage(`"${ingredient.name}" اضافه شد!`, 'success');
    }
    
    removeIngredientFromPizza(ingredientElement) {
        const ingredientName = ingredientElement.dataset.name;
        
        ingredientElement.remove();
        
        const index = this.droppedIngredients.findIndex(item => item.element === ingredientElement);
        if (index > -1) {
            const ingredient = this.droppedIngredients[index].data;
            
            switch(ingredient.type) {
                case 'crust':
                    this.selectedCrust = null;
                    break;
                case 'sauce':
                    this.selectedSauce = null;
                    break;
                case 'cheese':
                    this.selectedCheese = null;
                    break;
                case 'topping':
                    this.removeTopping(ingredient.id);
                    break;
            }
            
            this.droppedIngredients.splice(index, 1);
            this.updateSummary();
            this.showMessage(`"${ingredientName}" حذف شد!`, 'info');
        }
    }
    
    selectCrust(crust) {
        this.selectedCrust = crust;
        
        document.querySelectorAll('.ingredient-item[data-type="crust"]').forEach(item => {
            item.classList.remove('selected');
        });
        
        const crustElement = document.querySelector(`.ingredient-item[data-id="${crust.id}"]`);
        if (crustElement) {
            crustElement.classList.add('selected');
        }
        
        const pizzaBase = document.querySelector('.pizza-base-image');
        if (pizzaBase) {
            pizzaBase.src = crust.image;
            pizzaBase.alt = crust.name;
        }
    }
    
    selectSauce(sauce) {
        this.selectedSauce = sauce;
        
        document.querySelectorAll('.ingredient-item[data-type="sauce"]').forEach(item => {
            item.classList.remove('selected');
        });
        
        const sauceElement = document.querySelector(`.ingredient-item[data-id="${sauce.id}"]`);
        if (sauceElement) {
            sauceElement.classList.add('selected');
        }
    }
    
    selectCheese(cheese) {
        this.selectedCheese = cheese;
        
        document.querySelectorAll('.ingredient-item[data-type="cheese"]').forEach(item => {
            item.classList.remove('selected');
        });
        
        const cheeseElement = document.querySelector(`.ingredient-item[data-id="${cheese.id}"]`);
        if (cheeseElement) {
            cheeseElement.classList.add('selected');
        }
    }
    
    addTopping(topping) {
        const existingIndex = this.selectedToppings.findIndex(t => t.id == topping.id);
        if (existingIndex === -1) {
            this.selectedToppings.push(topping);
        }
    }
    
    removeTopping(toppingId) {
        this.selectedToppings = this.selectedToppings.filter(t => t.id != toppingId);
    }
    
    updateSummary() {
        this.totalPrice = 0;
        this.totalCalories = 0;
        
        // 1. محاسبه قیمت و کالری سس (اگر انتخاب شده)
        if (this.selectedSauce) {
            this.totalPrice += parseInt(this.selectedSauce.price);
            this.totalCalories += parseInt(this.selectedSauce.calories);
        }
        
        // 2. محاسبه قیمت و کالری پنیر (اگر انتخاب شده)
        if (this.selectedCheese) {
            this.totalPrice += parseInt(this.selectedCheese.price);
            this.totalCalories += parseInt(this.selectedCheese.calories);
        }
        
        // 3. محاسبه قیمت و کالری تمام مواد اضافی که روی پیتزا هستند
        if (this.selectedToppings.length > 0) {
            this.selectedToppings.forEach(topping => {
                this.totalPrice += parseInt(topping.price);
                this.totalCalories += parseInt(topping.calories);
            });
        }
        
        // 4. به‌روزرسانی نمایش در HTML
        
        // سس
        const sauceElement = document.getElementById('selected-sauce');
        if (sauceElement) {
            sauceElement.textContent = this.selectedSauce ? this.selectedSauce.name : 'انتخاب نشده';
        }
        
        // پنیر
        const cheeseElement = document.getElementById('selected-cheese');
        if (cheeseElement) {
            cheeseElement.textContent = this.selectedCheese ? this.selectedCheese.name : 'انتخاب نشده';
        }
        
        // مواد اضافی - لیست کامل
        const toppingsList = document.getElementById('selected-toppings-list');
        if (toppingsList) {
            toppingsList.innerHTML = '';
            
            if (this.selectedToppings.length > 0) {
                // نمایش تمام مواد اضافی
                this.selectedToppings.forEach(topping => {
                    const item = document.createElement('div');
                    item.className = 'summary-item';
                    item.innerHTML = `
                        <span>${topping.name}</span>
                        <span>${this.formatPrice(topping.price)}</span>
                    `;
                    toppingsList.appendChild(item);
                });
            } else {
                const item = document.createElement('div');
                item.className = 'summary-item';
                item.innerHTML = `
                    <span>مواد اضافی:</span>
                    <span>هیچکدام</span>
                `;
                toppingsList.appendChild(item);
            }
        }
        
        // 5. نمایش قیمت و کالری کل
        const totalPriceElement = document.getElementById('total-price');
        const totalCaloriesElement = document.getElementById('total-calories');
        
        if (totalPriceElement) {
            totalPriceElement.textContent = this.formatPrice(this.totalPrice);
        }
        
        if (totalCaloriesElement) {
            totalCaloriesElement.textContent = `${this.totalCalories} کالری`;
        }
    }
    
    formatPrice(price) {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    }
    
    setupEventListeners() {
        const clearBtn = document.getElementById('clear-pizza');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearPizza();
            });
        }
        
        const resetBtn = document.getElementById('reset-pizza');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetPizza();
            });
        }
        
        const orderBtn = document.getElementById('btn-order');
        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                this.orderPizza();
            });
        }
        
        const saveBtn = document.getElementById('btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.savePizza();
            });
        }
    }
    
    clearPizza() {
        this.droppedIngredients.forEach(item => {
            if (item.element && item.element.parentNode) {
                item.element.remove();
            }
        });
        
        this.droppedIngredients = [];
        this.selectedToppings = [];
        
        this.selectedCrust = null;
        this.selectedSauce = null;
        this.selectedCheese = null;
        
        const pizzaBase = document.querySelector('.pizza-base-image');
        if (pizzaBase) {
            pizzaBase.src = '../images/goje.jpg';
            pizzaBase.alt = 'پیتزا پایه';
        }
        
        document.querySelectorAll('.ingredient-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        this.updateSummary();
        this.showMessage('همه مواد پاک شدند!', 'info');
    }
    
    resetPizza() {
        this.clearPizza();
        
        const pizzaNameInput = document.getElementById('pizza-name-input');
        if (pizzaNameInput) {
            pizzaNameInput.value = '';
        }
        
        this.showMessage('پیتزا با موفقیت ریست شد!', 'success');
    }
    
    orderPizza() {
        if (this.totalPrice === 0) {
            this.showMessage('لطفا ابتدا مواد پیتزا را انتخاب کنید!', 'warning');
            return;
        }
        
        const pizzaNameInput = document.getElementById('pizza-name-input');
        const pizzaName = pizzaNameInput ? (pizzaNameInput.value || 'پیتزا سفارشی') : 'پیتزا سفارشی';
        
        const orderDetails = {
            name: pizzaName,
            crust: this.selectedCrust ? this.selectedCrust.name : 'ندارد',
            sauce: this.selectedSauce ? this.selectedSauce.name : 'ندارد',
            cheese: this.selectedCheese ? this.selectedCheese.name : 'ندارد',
            toppings: this.selectedToppings.map(t => t.name),
            price: this.totalPrice,
            calories: this.totalCalories,
            timestamp: new Date().toISOString()
        };
        
        let cart = JSON.parse(localStorage.getItem('pizzaCart') || '[]');
        cart.push(orderDetails);
        localStorage.setItem('pizzaCart', JSON.stringify(cart));
        
        this.showMessage(`پیتزای "${pizzaName}" با موفقیت به سبد خرید اضافه شد!\nقیمت: ${this.formatPrice(this.totalPrice)}`, 'success');
        
        this.updateCartCount();
    }
    
    savePizza() {
        if (this.totalPrice === 0) {
            this.showMessage('لطفا ابتدا مواد پیتزا را انتخاب کنید!', 'warning');
            return;
        }
        
        const pizzaNameInput = document.getElementById('pizza-name-input');
        if (!pizzaNameInput) {
            this.showMessage('خطا در ذخیره سازی!', 'error');
            return;
        }
        
        const pizzaName = pizzaNameInput.value.trim();
        if (!pizzaName) {
            this.showMessage('لطفا نامی برای پیتزای خود انتخاب کنید!', 'warning');
            pizzaNameInput.focus();
            return;
        }
        
        const pizzaData = {
            name: pizzaName,
            crust: this.selectedCrust,
            sauce: this.selectedSauce,
            cheese: this.selectedCheese,
            toppings: this.selectedToppings,
            totalPrice: this.totalPrice,
            totalCalories: this.totalCalories,
            timestamp: new Date().toISOString()
        };
        
        let savedPizzas = JSON.parse(localStorage.getItem('savedPizzas') || '[]');
        savedPizzas.push(pizzaData);
        localStorage.setItem('savedPizzas', JSON.stringify(savedPizzas));
        
        this.showMessage(`پیتزای "${pizzaName}" با موفقیت ذخیره شد!`, 'success');
    }
    
    showMessage(message, type = 'info') {
        const existingMessages = document.querySelectorAll('.pizza-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `pizza-message pizza-message-${type}`;
        messageDiv.textContent = message;
        
        const styles = {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '15px 30px',
            borderRadius: '10px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            textAlign: 'center',
            maxWidth: '80%',
            animation: 'slideDown 0.3s ease-out'
        };
        
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = '#4caf50';
                break;
            case 'warning':
                backgroundColor = '#ff9800';
                break;
            case 'error':
                backgroundColor = '#f44336';
                break;
            default:
                backgroundColor = '#2196f3';
        }
        
        styles.backgroundColor = backgroundColor;
        
        Object.assign(messageDiv.style, styles);
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.opacity = '0';
                messageDiv.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 500);
            }
        }, 3000);
    }
    
    updateCartCount() {
        const cartCountElement = document.querySelector('.navbar-shop .text-white');
        if (cartCountElement) {
            const cart = JSON.parse(localStorage.getItem('pizzaCart') || '[]');
            cartCountElement.textContent = `(${cart.length})`;
        }
    }
}

// Initialize the Pizza Maker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            new PizzaMaker();
            console.log('Pizza Maker initialized successfully!');
        } catch (error) {
            console.error('Error initializing Pizza Maker:', error);
            
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #f44336;
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                z-index: 10000;
                max-width: 80%;
            `;
            errorDiv.innerHTML = `
                <h3>خطا در بارگذاری صفحه</h3>
                <p>صفحه تهیه پیتزا به درستی بارگذاری نشد.</p>
                <p>لطفا صفحه را رفرش کنید یا بعدا تلاش کنید.</p>
                <button onclick="location.reload()" style="margin-top: 10px; padding: 10px 20px; background: white; color: #f44336; border: none; border-radius: 5px; cursor: pointer;">
                    رفرش صفحه
                </button>
            `;
            document.body.appendChild(errorDiv);
        }
    }, 100);
});