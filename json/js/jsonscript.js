//   تمرین اول خواندن گروه ها از فایل جیسون

// document.addEventListener('DOMContentLoaded', function() {
   
//     fetch('products.json') 
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             createProductBoxes(data);  
//         })
//         .catch(error => {
//             console.error('Error loading products data:', error);
          
//             const mainFoodsContainer = document.getElementById('main-foods');
//             mainFoodsContainer.innerHTML = '<p class="error-message">خطا در بارگذاری محصولات. لطفا دوباره تلاش کنید.</p>';
//         });
    
    
//     function createProductBoxes(productsData) {
//         const mainFoodsContainer = document.getElementById('main-foods');
        
//         // پاک کردن محتوای قبلی (اگر وجود دارد)
//         mainFoodsContainer.innerHTML = '';
        
//         // حلقه بر روی گروه‌های محصولات
//         productsData.product_groups.forEach(group => {
//             // ایجاد المنت باکس محصول
//             const foodBox = document.createElement('div');
//             foodBox.className = 'food-box';
            
//             // ایجاد ساختار داخلی باکس
//             foodBox.innerHTML = `
//                 <div class="menu-variant-1">
//                     <img src="${group.group_image}" alt="${group.group_title}" class="img-responsive reveal-inline-block" width="310" height="260">
//                     <div class="caption">
//                         <h5 class="title">
//                             <a href="menu-single.html" class="link-white">${group.group_title}</a>
//                         </h5>
//                     </div>
//                 </div>
//             `;
            
//             // اضافه کردن باکس به کانتینر
//             mainFoodsContainer.appendChild(foodBox);
//         });
        
//         // اعمال مجدد رویدادهای hover روی captionها
//         reapplyCaptionHoverEvents();
//     }
    
//     // تابع برای اعمال مجدد رویدادهای hover
//     function reapplyCaptionHoverEvents() {
//         const captions = document.querySelectorAll(".caption");
        
//         captions.forEach(caption => {
//             // حذف first event listenerهای قبلی برای جلوگیری از duplicate
//             caption.onmouseover = null;
//             caption.onmouseout = null;
            
//             // افزودن event listenerهای جدید
//             caption.addEventListener("mouseover", () => {
//                 caption.style.clipPath = "none";
//                 caption.style.textAlign = "center";
//             });
            
//             caption.addEventListener("mouseout", () => {
//                 caption.style.clipPath = "polygon(0 50%, 100% 0, 100% 100%, 0 100%)";
//                 caption.style.textAlign = "right";
//             });
//         });
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    // دریافت داده‌ها از فایل JSON
    fetch('./products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            createProductBoxes(data);
        })
        .catch(error => {
            console.error('Error loading products data:', error);
            const mainFoodsContainer = document.getElementById('main-foods');
            mainFoodsContainer.innerHTML = '<p class="error-message">خطا در بارگذاری محصولات. لطفا دوباره تلاش کنید.</p>';
        });
    
    // تابع برای ایجاد باکس‌های محصولات
    function createProductBoxes(productsData) {
        const mainFoodsContainer = document.getElementById('main-foods');
        
        // پاک کردن محتوای قبلی (اگر وجود دارد)
        mainFoodsContainer.innerHTML = '';
        
        // حلقه بر روی گروه‌های محصولات
        productsData.product_groups.forEach(group => {
            // ایجاد المنت باکس محصول
            const foodBox = document.createElement('div');
            foodBox.className = 'food-box';
            
            // ایجاد ساختار داخلی باکس
            foodBox.innerHTML = `
                <div class="menu-variant-1">
                    <img src="${group.group_image}" alt="${group.group_title}" class="img-responsive reveal-inline-block" width="310" height="260">
                    <div class="caption">
                        <h5 class="title">
                            <a href="menu-single.html?group=${group.group_id}" class="link-white">${group.group_title}</a>
                        </h5>
                    </div>
                </div>
            `;
            
            // اضافه کردن باکس به کانتینر
            mainFoodsContainer.appendChild(foodBox);
        });
        
        // اعمال مجدد رویدادهای hover روی captionها
        reapplyCaptionHoverEvents();
    }
    
    // تابع برای اعمال مجدد رویدادهای hover
    function reapplyCaptionHoverEvents() {
        const captions = document.querySelectorAll(".caption");
        
        captions.forEach(caption => {
            // حذف event listenerهای قبلی برای جلوگیری از duplicate
            caption.onmouseover = null;
            caption.onmouseout = null;
            
            // افزودن event listenerهای جدید
            caption.addEventListener("mouseover", () => {
                caption.style.clipPath = "none";
                caption.style.textAlign = "center";
            });
            
            caption.addEventListener("mouseout", () => {
                caption.style.clipPath = "polygon(0 50%, 100% 0, 100% 100%, 0 100%)";
                caption.style.textAlign = "right";
            });
        });
    }
});
