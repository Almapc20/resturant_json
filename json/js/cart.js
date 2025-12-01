//  مدیریت سبد خرید با localStorage
class CartManager {
    constructor() {
        this.cartKey = 'restaurant_cart';
        this.cart = this.getCartFromStorage(); // ذخیره در property برای دسترسی سریع
        this.updateCartIcon();
    }
    
    // خواندن از localStorage و قرار دادن در آرایه
    getCartFromStorage() {
        try {
            const cartData = localStorage.getItem(this.cartKey);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('خطا در خواندن سبد خرید:', error);
            return [];
        }
    }
    
    // ذخیره آرایه در localStorage
    saveCartToStorage() {
        try {
            localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
            this.updateCartIcon();
            return true;
        } catch (error) {
            console.error('خطا در ذخیره سبد خرید:', error);
            return false;
        }
    }
    
    // به‌روزرسانی آیکون سبد
// در cart.js - تابع updateCartIcon را اینگونه اصلاح کنید:
updateCartIcon() {
    const uniqueItemsCount = this.cart.length;
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        // فقط عدد را تغییر دهید، نه استایل‌ها
        element.textContent = uniqueItemsCount;
        
        // فقط نمایش/مخفی کردن را کنترل کنید
        if (uniqueItemsCount > 0) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
    
    console.log('آیکون سبد به‌روزرسانی شد. تعداد:', uniqueItemsCount);
}
    
    // ✅ تابع جدید: افزودن محصول به سبد (طبق تمرین)
    addToCart(productId, productName, sizeType, price, groupId) {
        // بارگیری مجدد از localStorage برای اطمینان
        this.cart = this.getCartFromStorage();
        
        // تبدیل مقادیر به عدد
        const numProductId = parseInt(productId);
        const numPrice = parseInt(price);
        const numGroupId = parseInt(groupId);
        
        // جستجوی محصول در آرایه
        const existingItemIndex = this.cart.findIndex(item => 
            item.productId === numProductId && item.sizeType === sizeType
        );
        
        let isNewItem = false;
        
        if (existingItemIndex !== -1) {
            // ✅ اگر محصول با این سایز قبلاً اضافه شده: فقط تعداد را افزایش بده
            this.cart[existingItemIndex].quantity += 1;
            console.log(`تعداد "${productName}" (${sizeType}) افزایش یافت به: ${this.cart[existingItemIndex].quantity}`);
        } else {
            // ✅ اگر محصول جدید است: آیتم جدید به آرایه اضافه کن
            const newItem = {
                id: Date.now(), // شناسه منحصر به فرد
                productId: numProductId,
                productName: productName,
                sizeType: sizeType,
                price: numPrice,
                quantity: 1,
                groupId: numGroupId,
                addedAt: new Date().toISOString()
            };
            
            this.cart.push(newItem);
            isNewItem = true;
            console.log(`"${productName}" (${sizeType}) به سبد اضافه شد (آیتم جدید)`);
        }
        
        // ذخیره مجدد آرایه در localStorage
        const saved = this.saveCartToStorage();
        
        if (saved) {
            return {
                success: true,
                isNewItem: isNewItem,
                message: isNewItem ? 
                    `"${productName}" (${sizeType}) به سبد اضافه شد` : 
                    `تعداد "${productName}" (${sizeType}) افزایش یافت`
            };
        }
        
        return { success: false, message: 'خطا در ذخیره سبد خرید' };
    }
    
    // گرفتن تمام آیتم‌های سبد
    getItems() {
        return [...this.cart];
    }
    
    // محاسبه تعداد کل آیتم‌ها (مجموع quantityها)
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    // محاسبه تعداد آیتم‌های منحصر به فرد
    getUniqueItemsCount() {
        return this.cart.length;
    }
    
    // محاسبه مبلغ کل
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // ✅ تابع جدید: بررسی وجود محصول در سبد
    isInCart(productId, sizeType) {
        const numProductId = parseInt(productId);
        return this.cart.some(item => 
            item.productId === numProductId && item.sizeType === sizeType
        );
    }
    
    // ✅ تابع جدید: گرفتن تعداد یک محصول خاص
    getItemQuantity(productId, sizeType) {
        const numProductId = parseInt(productId);
        const item = this.cart.find(item => 
            item.productId === numProductId && item.sizeType === sizeType
        );
        
        return item ? item.quantity : 0;
    }
    
    // حذف یک آیتم از سبد
    removeItem(itemId) {
        const numItemId = parseInt(itemId);
        const initialLength = this.cart.length;
        
        // حذف از آرایه
        this.cart = this.cart.filter(item => item.id !== numItemId);
        
        if (this.cart.length < initialLength) {
            console.log('آیتم از سبد حذف شد');
            // ذخیره مجدد در localStorage
            return this.saveCartToStorage();
        }
        
        return false;
    }
    
    // تغییر تعداد یک آیتم
    updateQuantity(itemId, newQuantity) {
        const numItemId = parseInt(itemId);
        const itemIndex = this.cart.findIndex(item => item.id === numItemId);
        
        if (itemIndex === -1) return false;
        
        if (newQuantity <= 0) {
            // اگر تعداد صفر یا منفی شد، حذف کن
            return this.removeItem(itemId);
        } else {
            // به‌روزرسانی تعداد
            this.cart[itemIndex].quantity = newQuantity;
            // ذخیره مجدد در localStorage
            return this.saveCartToStorage();
        }
    }
    
    // خالی کردن سبد
    clearCart() {
        this.cart = [];
        return this.saveCartToStorage();
    }
    
    // ✅ تابع جدید: نمایش اطلاعات سبد (برای دیباگ)
    debugCart() {
        console.log('=== وضعیت سبد خرید ===');
        console.log('تعداد آیتم‌های منحصر به فرد:', this.getUniqueItemsCount());
        console.log('مجموع quantityها:', this.getTotalItems());
        console.log('مبلغ کل:', this.getTotalPrice());
        console.log('آیتم‌ها:', this.cart);
        console.log('====================');
    }
}

// ایجاد نمونه جهانی
let cartManager;

// مقداردهی وقتی DOM لود شد
document.addEventListener('DOMContentLoaded', function() {
    cartManager = new CartManager();
    console.log('سیستم سبد خرید آماده است');
    
    // برای دیباگ: نمایش وضعیت اولیه
    cartManager.debugCart();
});

// fallback برای مواقعی که DOMContentLoaded اتفاق نیفتاده
if (typeof cartManager === 'undefined') {
    cartManager = new CartManager();
}