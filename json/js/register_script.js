document.addEventListener('DOMContentLoaded', function() {
    const popupForm = document.getElementById('popup-form');
    const registerForm = document.getElementById('register-form');
    const btnPopup = document.querySelector('.btn-popup');
    const validationList = document.querySelector('.summery-validation');
    const form = document.getElementById('register-form');
    
    // 1. تنظیم حالت اولیه
    function initForm() {
        popupForm.classList.add('active');
        registerForm.classList.add('active');
        btnPopup.classList.add('active');
    }
    
    initForm();
    
    // 2. مدیریت دکمه ضربدر/بعلاوه
    btnPopup.addEventListener('click', function() {
        if (popupForm.classList.contains('active')) {
            // بستن فرم با انیمیشن
            popupForm.classList.add('closing');
            
            setTimeout(() => {
                popupForm.classList.remove('active');
                registerForm.classList.remove('active');
                this.classList.remove('active');
                popupForm.classList.remove('closing');
            }, 600); // مدت انیمیشن
            
        } else {
            // باز کردن فرم با انیمیشن
            popupForm.classList.add('opening');
            popupForm.classList.add('active');
            
            setTimeout(() => {
                registerForm.classList.add('active');
                this.classList.add('active');
            }, 150);
            
            setTimeout(() => {
                popupForm.classList.remove('opening');
            }, 600);
        }
    });
    
    // 3. توابع اعتبارسنجی 
    function validateNotEmpty(value, label) {
        if (!value.trim()) {
            return `${label} نمی‌تواند خالی باشد`;
        }
        return '';
    }
    
    function validateMobile(value, label) {
        if (!value.trim()) {
            return `${label} نمی‌تواند خالی باشد`;
        }
        
        const mobileRegex = /^09[0-9]{9}$/;
        if (!mobileRegex.test(value.trim())) {
            return `${label} معتبر نیست (مثال: 09123456789)`;
        }
        
        return '';
    }
    
    // 4. تابع اعتبارسنجی کل فرم
    function validateForm() {
        const inputs = form.querySelectorAll('input[data-validation]');
        const errors = [];
        
        inputs.forEach(input => {
            const value = input.value;
            const label = input.dataset.label;
            const validations = input.dataset.validation.split(' ');
            
            validations.forEach(validation => {
                let error = '';
                
                switch(validation) {
                    case 'notEmpty':
                        error = validateNotEmpty(value, label);
                        break;
                    case 'isMobile':
                        error = validateMobile(value, label);
                        break;
                }
                
                if (error && !errors.includes(error)) {
                    errors.push(error);
                }
            });
        });
        
        return errors;
    }
    
    // 5. نمایش خطاها 
    function displayErrors(errors) {
        validationList.innerHTML = '';
        
        if (errors.length === 0) {
            return;
        }
        
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            validationList.appendChild(li);
        });
    }
    
    // 6. مدیریت ارسال فرم 
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        validationList.innerHTML = '';
        
        const errors = validateForm();
        
        if (errors.length > 0) {
            displayErrors(errors);
            
            popupForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                popupForm.style.animation = '';
            }, 500);
        } else {
            alert('ثبت نام با موفقیت انجام شد!');
            form.reset();
            
            // بستن فرم بعد از ثبت موفق
            popupForm.classList.add('closing');
            setTimeout(() => {
                popupForm.classList.remove('active');
                registerForm.classList.remove('active');
                btnPopup.classList.remove('active');
                popupForm.classList.remove('closing');
            }, 600);
        }
    });
    
    // 7.انیمیشن‌ها
    if (!document.querySelector('#form-animations')) {
        const style = document.createElement('style');
        style.id = 'form-animations';
        style.textContent = `
            /* فقط انیمیشن‌های جدید - بدون تغییر استایل‌های موجود */
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            /* انیمیشن بسته شدن - از راست و چپ به مرکز جمع شدن */
            #popup-form.closing {
                animation: closeFromSides 0.6s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards;
                overflow: hidden;
                transform-origin: center;
            }
            
            @keyframes closeFromSides {
                0% {
                    transform: scaleX(1);
                    opacity: 1;
                }
                100% {
                    transform: scaleX(0);
                    opacity: 0;
                }
            }
            
            /* انیمیشن باز شدن - از مرکز به راست و چپ باز شدن */
            #popup-form.opening {
                animation: openFromCenter 0.6s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards;
                transform-origin: center;
            }
            
            @keyframes openFromCenter {
                0% {
                    transform: scaleX(0);
                    opacity: 0;
                }
                100% {
                    transform: scaleX(1);
                    opacity: 1;
                }
            }
            
            /* انیمیشن برای فیلدهای نامعتبر */
            .form-control.error {
                animation: fieldError 0.3s ease;
            }
            
            @keyframes fieldError {
                0% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
                100% { transform: translateX(0); }
            }
            
            /* انیمیشن ظاهر شدن خطاها */
            .summery-validation li {
                animation: fadeInUp 0.3s ease forwards;
                opacity: 0;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    // 9. مدیریت کیبورد 
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (popupForm.classList.contains('active')) {
                popupForm.classList.add('closing');
                setTimeout(() => {
                    popupForm.classList.remove('active');
                    registerForm.classList.remove('active');
                    btnPopup.classList.remove('active');
                    popupForm.classList.remove('closing');
                }, 600);
            }
        }
    });
});